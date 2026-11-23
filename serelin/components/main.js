
		import * as Framer from "framer";
import { ResolveLinks, useSiteRefs } from "framer";
import * as React from "react";
import { createPortal } from "react-dom";
import * as ReactDOM from "react-dom/client";
import TemplateMain from "https://framerusercontent.com/modules/1zJNU5q5e9uibq0IXhce/7Gx5CEKnJAryKT0QjV3v/phfCE2XYJ.js";

		const routes = {augiA20Il: {elements: {UrMqPtX3E: "nav-trigger"}, page: Framer.lazy(() => import("https://framerusercontent.com/modules/7CsIOdiq5lyG4RuPCukn/tbPuma6deVLquIbM39Wj/augiA20Il.js")), path: "/"}, fyxHY82ZH: {elements: {aQc4WB0cL: "nav-trigger", uWKHTDhZa: "team"}, page: Framer.lazy(() => import("https://framerusercontent.com/modules/KbEbUEowQdVWsH7Tgx9V/90sq2Dsl5ZHpLLCzXB77/fyxHY82ZH.js")), path: "/about"}, oSqiE1i1k: {elements: {NiOSDOe_q: "form", xRPO87ldD: "nav-trigger"}, page: Framer.lazy(() => import("https://framerusercontent.com/modules/nWw0xp6oLF0V8aRiYmao/PUb3zcm9fcsayOnbq7jt/oSqiE1i1k.js")), path: "/contact"}, KBlFSas6i: {elements: {V576OfAgk: "nav-trigger"}, page: Framer.lazy(() => import("https://framerusercontent.com/modules/sVsi05bZgBmhdi63zC1x/wZetb4a0v2daYHsgliFe/KBlFSas6i.js")), path: "/404"}, M5V2oA3nm: {elements: {jnz2UZf24: "treatments", N_NDdv3uo: "nav-trigger"}, page: Framer.lazy(() => import("https://framerusercontent.com/modules/5q6fFL2Lp40l2Fewsxuq/vht5PJ0jHUK6LYrYOvmt/M5V2oA3nm.js")), path: "/treatments"}, OciATyKum: {collectionId: "tLKK_iffS", elements: {eYIPBH9gz: "transparency-trigger", ULwRzYj1m: "nav-trigger"}, page: Framer.lazy(() => import("https://framerusercontent.com/modules/kg7AqDTYJ1skuXHqGO7i/RrYPBjwghb2gtMP0rUAt/OciATyKum.js")), path: "/treatments/:ajoeXKLvl"}, ZVG0pzQKK: {collectionId: "k9rl3R1d_", elements: {IdYhMZMEE: "nav-trigger"}, page: Framer.lazy(() => import("https://framerusercontent.com/modules/oM0fnYRzTgVse1I0hK2y/lSH3tPCcPjPpLVch1Wl6/ZVG0pzQKK.js")), path: "/legal/:IPmABoCeP"}}

		const locales = [{code: "en", id: "default", name: "English", slug: "", textDirection: "ltr"}]
		const collectionUtils = {epKVnOWIx: async () => (await import("https://framerusercontent.com/modules/gcJTvQxCJg8BtkUK9yDj/t9zfmKRr6ESWzOwP1Wzp/epKVnOWIx.js"))?.["utils"], k9rl3R1d_: async () => (await import("https://framerusercontent.com/modules/eUpBu1gP9dAT3Iqj3CCq/9cEl0YnW4VLqeSN34TTq/k9rl3R1d_.js"))?.["utils"], tLKK_iffS: async () => (await import("https://framerusercontent.com/modules/f1HPbpgpLuQRekA4Je3W/u8ireVZCNFdmtRnPcTRr/tLKK_iffS.js"))?.["utils"]}
		const serverDatabaseClient = undefined
		const framerSiteId = "80c078a552f5c5beb1adb7cbaf06aba8ff81f64fc07e04c59526e0659e7f2202"
		function Template({webPageId, children, style, ...rest}) {const props1 = {aLXPMz1wA: "fLKzucXcA", rjf4kDAb0: "fLKzucXcA", TnLN6yq0L: "ZKmX4lElp", Vcw2WS4q2: true, W6tJglycH: {href: {hash: ":UrMqPtX3E", webPageId: "augiA20Il"}, refKey: true}}
const props2 = {...props1, W6tJglycH: {href: {hash: ":aQc4WB0cL", webPageId: "fyxHY82ZH"}, refKey: true}}
const props3 = {...props1, W6tJglycH: {href: {hash: ":xRPO87ldD", webPageId: "oSqiE1i1k"}, refKey: true}}
const props4 = {...props1, aLXPMz1wA: "IXM2hBIat", rjf4kDAb0: "IXM2hBIat", TnLN6yq0L: "duRwL_X3Z", Vcw2WS4q2: false, W6tJglycH: undefined}
const props5 = {...props1, W6tJglycH: {href: {hash: ":N_NDdv3uo", webPageId: "M5V2oA3nm"}, refKey: true}}
const props6 = {...props1, W6tJglycH: {href: {hash: ":ULwRzYj1m", webPageId: "OciATyKum"}, refKey: true}}
const props7 = {...props1, W6tJglycH: {href: {hash: ":IdYhMZMEE", webPageId: "ZVG0pzQKK"}, refKey: true}}
const siteRef = useSiteRefs()
const templateProps = {augiA20Il: props1, fyxHY82ZH: props2, KBlFSas6i: props4, M5V2oA3nm: props5, OciATyKum: props6, oSqiE1i1k: props3, ZVG0pzQKK: props7}
const props = templateProps[webPageId] ?? {}
switch (webPageId) {case "augiA20Il":
case "fyxHY82ZH":
case "oSqiE1i1k":
case "KBlFSas6i":
case "M5V2oA3nm":
case "OciATyKum":
case "ZVG0pzQKK":
return React.createElement(ResolveLinks, {links: [props["W6tJglycH"]]}, (resolvedLinks) => React.createElement(TemplateMain, {...props, key: "TemplateMain", style, W6tJglycH: siteRef(resolvedLinks[0])}, children(true)));
default: { return children(false) }}}
export function getLayoutTemplateBreakpoints(routeId) {switch (routeId) {case "augiA20Il":
case "fyxHY82ZH":
case "oSqiE1i1k":
case "KBlFSas6i":
case "M5V2oA3nm":
case "OciATyKum":
case "ZVG0pzQKK":
return [{hash: "4iw1p4", mediaQuery: "(max-width: 809.98px)"}, {hash: "1baqmse", mediaQuery: "(min-width: 810px) and (max-width: 1199.98px)"}, {hash: "goic35", mediaQuery: "(min-width: 1200px)"}]
default: { return undefined }}}

		const isBrowser = typeof document !== "undefined"
		const isBot = isBrowser && /bot|-google|google-|yandex|ia_archiver|crawl|spider/iu.test(navigator.userAgent)

		
		

		export async function getPageRoot({
			routeId,
			pathVariables,
			canonicalPathVariables,
			localeId,
			collectionItemId,
			contentLocaleId,
			shouldResolveInitialRouteContentState = false,
		}) {
			const rootPreload = routes[routeId].page.preload()

			

			Framer.setLibraryFeatures({checkServerSideRouter: false, disableCustomCode: false, editorBarDisableFrameAncestorsSecurity: false, motionDivToDiv: false, onPageLocalizationSupport: true, onPageMoveTool: true, onPageRichTextBlockSelection: true, scrollRestoration: true, synchronousNavigationOnDesktop: false, yieldOnTap: false})
			Framer.setCurrentSiteId(framerSiteId)

			const content = React.createElement(
				Framer.PageRoot,
				{
					isWebsite: true,
					environment: "site",
					routeId,
					pathVariables,
					canonicalPathVariables,
					routes,
					collectionUtils,
					serverDatabaseClient,
					framerSiteId,
					notFoundPage: Framer.lazy(() => import("https://framerusercontent.com/modules/sVsi05bZgBmhdi63zC1x/wZetb4a0v2daYHsgliFe/KBlFSas6i.js")),
					isReducedMotion: undefined,
					localeId,
					locales,
					preserveQueryParams: undefined,
					siteCanonicalURL: "https://serelin.framer.website",
					EditorBar: 
			typeof window !== "undefined" ? (() => {
				if (isBot) {
					console.log("[Framer On-Page Editing] Unavailable because navigator is bot")
					return
				}

				return Framer.lazy(async () => {
					const dependencies = {
						__version: 3,
						framer: {
							useCurrentRoute: Framer.useCurrentRoute,
							useLocaleInfo: Framer.useLocaleInfo,
							useRouter: Framer.useRouter,
						},
						react: {
							createElement: React.createElement,
							Fragment: React.Fragment,
							memo: React.memo,
							useCallback: React.useCallback,
							useEffect: React.useEffect,
							useRef: React.useRef,
							useState: React.useState,
							useLayoutEffect: React.useLayoutEffect,
						},
						"react-dom": { createPortal },
					}

					window.__framer_editorBarDependencies = dependencies

					const { createEditorBar } = await import("https://framer.com/edit/init.mjs")
					return {
						default: createEditorBar(),
					}
				})
			})() : undefined
		,
					adaptLayoutToTextDirection: false,
					LayoutTemplate: Template,
					loadSnippetsModule: new Framer.LazyValue(() => import("https://framerusercontent.com/modules/FEqYKreuy9LJwQOSHNL5/F31vlPmZlNPxk0220xEa/snippets.js")),
					initialCollectionItemId: collectionItemId,
					initialContentLocaleIdOverride: contentLocaleId,
				}
			)

			const contentWithGracefullyDegradingErrorBoundary = React.createElement(Framer.GracefullyDegradingErrorBoundary, {
				children: content
			})

			
			const page = React.createElement(Framer.PageEffectsProvider, {
				children: contentWithGracefullyDegradingErrorBoundary,
				value: {global: {enter: {mask: {type: "circle", x: "50%", y: "-8%"}, opacity: 1, rotate: 0, rotate3d: false, rotateX: 0, rotateY: 0, scale: 1, transition: {damping: 30, delay: 0, duration: 1.2, ease: [0.6, 0, 0.4, 1], mass: 1, stiffness: 400, type: "tween"}, x: "0px", y: "0px"}}, routes: {}}
			})

			// We don't want the initial render to immediately have to suspend.
			await rootPreload
			return page
		}
	

		if (isBrowser) {
			// Note: HTTPArchive also uses this function to detect Framer sites; see https://github.com/HTTPArchive/wappalyzer/blob/371a17583f74fd9171b9077f59a5619b24062891/src/technologies/f.json#L1722-L1748.
			window.__framer_importFromPackage = (packageAndFilename, exportIdentifier) => () => {
				return React.createElement(Framer.ErrorPlaceholder, { error: 'Package component not supported: "' + exportIdentifier + '" in "' + packageAndFilename + '"' })
			}

			window.__framer_events = window.__framer_events || []

			// Initialize lazy modules cache for hydration
			Framer.initLazyModulesCache()

			const container = document.getElementById("main")
			// We know that #main is parsed before this script, so we don't need to wait for DOMContentLoaded or similar events.
			if ("framerHydrateV2" in container.dataset) main(true, container)
			else main(false, container)
		}

		function track() {
			if (!isBrowser) return
			window.__framer_events.push(arguments)
		}

		async function main(shouldHydrate, container) {
			function handleError(error, errorInfo, recoverable = true) {
				if (error.caught || window.__framer_hadFatalError) return // we already logged it

				const componentStack = errorInfo?.componentStack
				if (recoverable) {
					console.warn("Caught a recoverable error. The site is still functional, but might have some UI flickering or degraded page load performance. If you are the author of this website, update external components and check recently added custom code or code overrides to fix the following server/client mismatches:\n", error, componentStack)
					// we only want to collect 1%, because this can be quite noisy (floods the data pipeline)
					if (Math.random() > 0.01) return
				} else {
					console.error("Caught a fatal error. Please report the following to the Framer team via https://www.framer.com/contact/:\n", error, componentStack)
				}
				track(recoverable ? "published_site_load_recoverable_error" : "published_site_load_error", {
					message: String(error),
					componentStack, // componentStack is more useful
					stack: componentStack ? undefined : error instanceof Error && typeof error.stack === "string" ? error.stack : null,
				})
			}

			try {
				let routeId, localeId, contentLocaleId, pathVariables, canonicalPathVariables, breakpoints, routeData
				if (shouldHydrate) {
					routeData = JSON.parse(container.dataset["framerHydrateV2"])
					routeId = routeData.routeId
					localeId = routeData.localeId
					contentLocaleId = routeData.contentLocaleId
					pathVariables = routeData.pathVariables
					canonicalPathVariables = routeData.canonicalPathVariables
					breakpoints = routeData.breakpoints

					routeId = Framer.patchRoutesForABTesting(routes, routeId) // Prioritize optimized route id to avoid flickering in browsers not supporting the server-timing header (Safari older than 16.4)
				} else {
					Framer.patchRoutesForABTesting(routes, undefined) // This must happen before inferInitialRouteFromPath

					
					const serverRoute = performance.getEntriesByType("navigation")[0]?.serverTiming?.find(e => e.name === "route")?.description
					if (serverRoute) {
						const routeData = new URLSearchParams(serverRoute)
						routeId = routeData.get("id")
						localeId = routeData.get("locale")
						for (const [key, value] of routeData.entries()) {
							if (!key.startsWith("var.")) continue
							pathVariables ??= {}
							pathVariables[key.slice(4)] = value
						}
					}
					if (!routeId || !localeId) {
						const routeData = Framer.inferInitialRouteFromPath(routes, decodeURIComponent(location.pathname), true, locales)
						routeId = routeData.routeId
						localeId = routeData.localeId
						pathVariables = routeData.pathVariables
					}
					
				}

				const pagePromise = getPageRoot({
					routeId,
					localeId,
					contentLocaleId,
					pathVariables,
					canonicalPathVariables,
					collectionItemId: shouldHydrate ? routeData?.collectionItemId : undefined,
					shouldResolveInitialRouteContentState: !shouldHydrate,
				})

				
if (typeof window !== "undefined") {
	void (async () => {
		const route = routes[routeId]

		const defaultLocaleId = "default"
		const framerLocale = locales.find(({ id }) => !localeId ? id === defaultLocaleId : id === localeId).code

		
		let collectionItemId = routeData?.collectionItemId ?? null
		if (collectionItemId === null && route?.collectionId && collectionUtils) {
			const utils = await collectionUtils[route.collectionId]?.()
			const [slug] = Object.values(pathVariables)
			if (utils && typeof slug === "string") {
				collectionItemId = (await utils.getRecordIdBySlug(slug, framerLocale || undefined)) ?? null
			}
		}
	

		const resolvedDateTimeOptions = Intl.DateTimeFormat().resolvedOptions()
		const timezone = resolvedDateTimeOptions.timeZone
		const locale = resolvedDateTimeOptions.locale

		// wait for the page to be activated before sending the pageview event
		// https://developer.chrome.com/docs/web-platform/prerender-pages#impact-on-analytics
		await new Promise((resolve) => {
			if (document.prerendering) {
				document.addEventListener("prerenderingchange", resolve, { once: true })
			} else {
				resolve()
			}
		})

		window.__framer_events.push([
			"published_site_pageview",
			{
				framerSiteId,
				version: 2,
				routePath: route?.path || "/",
				collectionItemId,
				framerLocale: framerLocale || null,
				webPageId: route?.abTestingVariantId ?? routeId,
				abTestId: route?.abTestId,
				referrer: document.referrer || null,
				url: window.location.href,
				hostname: window.location.hostname || null,
				pathname: window.location.pathname || null,
				hash: window.location.hash || null,
				search: window.location.search || null,
				timezone,
				locale,
			},
			"eager"
		])

		// Yield to avoid blocking the main thread with the user code
		await Framer.yieldToMain({ priority: "background", ensureContinueBeforeUnload: true, continueAfter: "paint" })

		document.dispatchEvent(new CustomEvent("framer:pageview", {
			detail: { framerLocale: framerLocale || null }
		}))
	})()
}


				const page = await pagePromise
				if (shouldHydrate) {
					

					Framer.withPerformanceMarks("framer-rewrite-breakpoints", () => {
						Framer.removeHiddenBreakpointLayersV2(breakpoints)
						window.__framer_onRewriteBreakpoints?.(breakpoints)
					})

					

					const startTransition = isBot ? cb => cb() : React.startTransition
					startTransition(() => {
						Framer.markHydrationStart()
						Framer.turnOffReactEventHandling()
						ReactDOM.hydrateRoot(container, page, { onRecoverableError: handleError })
					})
				} else {
					
					ReactDOM.createRoot(container, { onRecoverableError: handleError }).render(page)
				}
			} catch (error) {
				handleError(error, undefined, false)
				throw error
			}
		}

		

		
		;(function () {
			if (!isBrowser) return

			React.startTransition(() => {
				ReactDOM.hydrateRoot(
					document.getElementById("__framer-badge-container"),
					React.createElement(React.Suspense, {}, React.createElement(React.lazy(() => import("__framer-badge"))))
				)
			})
		})()
	