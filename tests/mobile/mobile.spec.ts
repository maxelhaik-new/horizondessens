import { expect, test, type Page } from "@playwright/test";

const pages = [
  "/",
  "/kobido",
  "/massage-5-continents",
  "/massage-calme-et-harmonie",
  "/jambes-legeres-reflexologie-plantaire",
  "/rituel-horizon",
  "/le-salon",
  "/carte-cadeau",
  "/reserver",
  "/contact",
  "/cgv",
];

/** Le site anime à l'arrivée : on attend la fin du hero. */
async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
}

for (const path of pages) {
  test(`aucun défilement horizontal : ${path}`, async ({ page }, info) => {
    await open(page, path);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
    await page.screenshot({
      path: info.outputPath(
        `haut${path.replace(/\//g, "_") || "_accueil"}.png`,
      ),
    });
  });
}

test("menu : entrées identiques, sous-menu Soins, retour, fermeture", async ({
  page,
}, info) => {
  await open(page, "/");
  await page.getByRole("button", { name: "Ouvrir le menu" }).tap();
  const main = page.getByRole("navigation", { name: "Navigation mobile" });
  const soinsButton = main.getByRole("button", { name: "Soins" });
  await expect(soinsButton).toBeVisible();
  await page.waitForTimeout(1800);

  // Toutes les entrées de premier niveau ont la même taille.
  const sizes = await main
    .locator("[data-item]")
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).fontSize));
  expect(sizes).toHaveLength(6);
  expect(new Set(sizes).size).toBe(1);

  // Le menu tient dans l'écran (mesuré une fois les glissements d'entrée
  // terminés : un élément encore décalé agrandit la zone défilable).
  const menuBox = page.locator("#menu-mobile > div.relative");
  await expect
    .poll(() => menuBox.evaluate((el) => el.scrollHeight - el.clientHeight), {
      timeout: 6000,
    })
    .toBeLessThanOrEqual(4);
  await page.screenshot({ path: info.outputPath("menu.png") });

  // Sous-menu : même taille, une ligne par soin.
  await soinsButton.tap();
  const sub = page.getByRole("navigation", { name: "Nos soins" });
  await expect(sub.getByRole("link", { name: "Kobido" })).toBeVisible();
  await page.waitForTimeout(900);
  const subItems = sub.locator("ul a");
  await expect(subItems).toHaveCount(5);
  const sub0 = await subItems
    .first()
    .evaluate((el) => getComputedStyle(el).fontSize);
  expect(sub0).toBe(sizes[0]);
  const lines = await subItems.evaluateAll((els) =>
    els.map((el) => {
      const r = document.createRange();
      r.selectNodeContents(el);
      return r.getClientRects().length;
    }),
  );
  expect(lines.every((n) => n === 1)).toBe(true);
  await expect(main).toHaveJSProperty("inert", true);
  await page.screenshot({ path: info.outputPath("menu-soins.png") });

  // Retour.
  await sub.getByRole("button", { name: "Menu" }).tap();
  await expect(soinsButton).toBeFocused();

  // Fermeture depuis le sous-menu, puis réouverture pendant l'animation de
  // fermeture : on repart toujours du panneau principal.
  await soinsButton.tap();
  await page.getByRole("button", { name: "Fermer le menu" }).tap();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: "Ouvrir le menu" }).tap();
  await expect(sub).toHaveJSProperty("inert", true);
  await page.waitForTimeout(2000);

  // Fermeture complète depuis le sous-menu.
  await soinsButton.tap();
  await page.getByRole("button", { name: "Fermer le menu" }).tap();
  await expect(page.locator("#menu-mobile")).toHaveClass(/(^|\s)hidden(\s|$)/, {
    timeout: 4000,
  });
  await page.getByRole("button", { name: "Ouvrir le menu" }).tap();
  await expect(sub).toHaveJSProperty("inert", true);
  await expect(main).toHaveJSProperty("inert", false);
});

test("rail des soins : défilement horizontal aimanté et jauge", async ({
  page,
}) => {
  await open(page, "/");
  const rail = page.getByRole("list", { name: "Les soins" });
  await rail.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  // WebKit mobile ne simule ni la molette ni le glissement : on fait
  // défiler de 220 px en JS (plus d'une demi-carte), l'aimantation CSS doit finir le mouvement.
  await rail.evaluate((el) => el.scrollBy({ left: 220, behavior: "smooth" }));
  await page.waitForTimeout(1500);
  const { left, starts } = await rail.evaluate((el: HTMLElement) => ({
    left: el.scrollLeft,
    starts: Array.from(el.children).map(
      (c) => (c as HTMLElement).offsetLeft - el.offsetLeft - 20,
    ),
  }));
  expect(left).toBeGreaterThan(0);
  // Aimanté : arrêté au début d'une carte (à 2 px près).
  expect(starts.some((s) => Math.abs(s - left) <= 2)).toBe(true);
  await expect(page.getByText(/^0[2-4] \/ 04$/)).toBeVisible();
});

test("en-tête : masqué en descendant, de retour en remontant", async ({
  page,
}) => {
  await open(page, "/kobido");
  const header = page.locator("header").first();
  // Défilement par paliers (WebKit mobile ne simule pas la molette).
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.scrollBy(0, 150));
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(800);
  const hidden = await header.evaluate(
    (el) => el.getBoundingClientRect().bottom,
  );
  expect(hidden).toBeLessThanOrEqual(0);
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollBy(0, -60));
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(800);
  const shown = await header.evaluate((el) => el.getBoundingClientRect().top);
  expect(shown).toBeGreaterThanOrEqual(0);
});

test("pied de page compact", async ({ page }) => {
  await open(page, "/contact");
  const height = await page
    .locator("footer")
    .evaluate((el) => el.getBoundingClientRect().height);
  expect(height).toBeLessThan(950);
});

test("module : coordonnées seulement après le choix d'un créneau", async ({
  page,
}) => {
  await open(page, "/massage-calme-et-harmonie#reserver");
  const day = page
    .getByRole("group", { name: "Jour" })
    .locator("button[aria-pressed]:not([disabled])")
    .first();
  // Sans agenda (API indisponible), le module affiche un repli : on s'arrête.
  test.skip(
    !(await day.isVisible({ timeout: 15_000 }).catch(() => false)),
    "Agenda SimplyBook indisponible",
  );
  const name = page.locator("#booking-name");
  await expect(name).toBeHidden();
  await day.tap();
  await page.locator("fieldset button[aria-pressed]").first().tap();
  await expect(name).toBeVisible();
  await page.waitForTimeout(900);
  const top = await page
    .getByText("Vos coordonnées", { exact: true })
    .evaluate((el) => el.getBoundingClientRect().top);
  expect(top).toBeLessThan(400);
  // Aucun envoi : on ne remplit ni ne valide le formulaire.
});
