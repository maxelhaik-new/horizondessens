/**
 * Édition d'un texte DIRECTEMENT dans l'élément de la page.
 *
 * Principe (sûr pour React) : on ne retire ni ne modifie jamais les nœuds
 * rendus par React. On masque ses enfants (CSS `[data-cms-active]`) et on
 * ajoute à la fin de l'élément un `<span contenteditable>` qui hérite de
 * TOUS ses styles (police, italique, couleur, interlignage, équilibrage
 * des lignes…) : Élodie tape dans la vraie mise en page, qui se recalcule
 * en direct. Après l'enregistrement, on garde ce span affiché jusqu'à ce que
 * React ait réaffiché le texte enregistré (pas de retour visuel à l'ancien
 * texte), puis on le retire.
 */

export type TextSessionOptions = {
  el: HTMLElement;
  value: string;
  maxLength: number;
  multiline: boolean;
  label: string;
  /** Longueur courante, à chaque frappe. */
  onInput: (length: number) => void;
  /** Saisie bloquée par la limite de caractères. */
  onLimit: () => void;
  /** Texte vide refusé. */
  onEmpty: () => void;
  /** Enregistre ; renvoie false si l'enregistrement a échoué. */
  onCommit: (text: string) => Promise<boolean>;
  /** Fin de session (annulation, enregistrement ou échec). */
  onEnd: () => void;
};

export type TextSession = {
  el: HTMLElement;
  commit: () => void;
  cancel: () => void;
  isInside: (node: Node | null) => boolean;
};

const INTERACTIVE = "a, button, summary, label";

export function startTextSession(o: TextSessionOptions): TextSession {
  const { el, maxLength, multiline } = o;
  const computed = getComputedStyle(el);

  const live = document.createElement("span");
  live.dataset.cmsLive = "";
  live.setAttribute("role", "textbox");
  live.setAttribute("aria-label", o.label);
  if (multiline) live.setAttribute("aria-multiline", "true");
  try {
    live.contentEditable = "plaintext-only";
  } catch {
    live.contentEditable = "true";
  }
  if (live.contentEditable !== "plaintext-only") live.contentEditable = "true";
  live.spellcheck = true;
  live.textContent = o.value;
  // L'élément passe en font-size 0 (pour masquer ses propres nœuds texte) :
  // on fige ses valeurs calculées sur le span.
  Object.assign(live.style, {
    fontSize: computed.fontSize,
    lineHeight: computed.lineHeight,
    letterSpacing: computed.letterSpacing,
    wordSpacing: computed.wordSpacing,
    whiteSpace: multiline ? "pre-wrap" : "normal",
  });

  el.setAttribute("data-cms-active", "");
  el.appendChild(live);
  live.focus({ preventScroll: true });
  placeCaretAtEnd(live);

  const insideInteractive = Boolean(el.closest(INTERACTIVE));
  let finished = false;
  let observer: MutationObserver | null = null;
  let fallback: number | undefined;

  const readText = () => {
    let text = "";
    const walk = (node: Node) => {
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) text += child.nodeValue ?? "";
        else if (child.nodeName === "BR") text += "\n";
        else {
          if (text && /^(DIV|P)$/.test(child.nodeName) && !text.endsWith("\n"))
            text += "\n";
          walk(child);
        }
      });
    };
    walk(live);
    return text;
  };

  const selectedLength = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return 0;
    const range = selection.getRangeAt(0);
    return live.contains(range.commonAncestorContainer)
      ? range.toString().length
      : 0;
  };

  const fits = (data: string) =>
    readText().length - selectedLength() + data.length <= maxLength;

  const insert = (text: string) => {
    if (!text) return;
    document.execCommand("insertText", false, text);
  };

  const onBeforeInput = (event: InputEvent) => {
    const type = event.inputType;
    if (type === "insertParagraph" || type === "insertLineBreak") {
      event.preventDefault();
      if (multiline && fits("\n")) insert("\n");
      return;
    }
    if (type === "insertFromDrop" || type.startsWith("format")) {
      event.preventDefault();
      return;
    }
    if (type.startsWith("insert") && type !== "insertFromPaste") {
      const data = event.data ?? "";
      if (!fits(data)) {
        event.preventDefault();
        o.onLimit();
        // Saisie groupée (dictée, suggestion) : on insère ce qui tient.
        const room = maxLength - (readText().length - selectedLength());
        if (data.length > 1 && room > 0) insert(data.slice(0, room));
      }
    }
  };

  const onPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    let text = event.clipboardData?.getData("text/plain") ?? "";
    text = text.replace(/\r\n?/g, "\n");
    if (!multiline) text = text.replace(/\s*\n\s*/g, " ");
    const room = maxLength - (readText().length - selectedLength());
    if (text.length > room) {
      text = text.slice(0, Math.max(0, room));
      o.onLimit();
    }
    insert(text);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a") {
      // « Tout sélectionner » = le texte du champ, pas toute la page.
      event.preventDefault();
      const range = document.createRange();
      range.selectNodeContents(live);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (!multiline || event.metaKey || event.ctrlKey) live.blur();
      else if (fits("\n")) insert("\n");
      else o.onLimit();
    } else if (event.key === " " && insideInteractive) {
      // Dans un bouton / lien / <summary>, l'espace déclencherait l'élément.
      event.preventDefault();
      if (fits(" ")) insert(" ");
      else o.onLimit();
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    event.stopPropagation();
    if (event.key === " " && insideInteractive) event.preventDefault();
  };

  const onInput = () => o.onInput(readText().length);

  const onBlur = (event: FocusEvent) => {
    // Clic sur la pastille d'outils de l'éditeur : on garde la session.
    const next = event.relatedTarget as Element | null;
    if (next?.closest("[data-cms-ui]")) return;
    commit();
  };

  live.addEventListener("beforeinput", onBeforeInput);
  live.addEventListener("paste", onPaste);
  live.addEventListener("keydown", onKeyDown);
  live.addEventListener("keyup", onKeyUp);
  live.addEventListener("input", onInput);
  live.addEventListener("blur", onBlur);
  live.addEventListener("drop", (e) => e.preventDefault());

  const detach = () => {
    live.removeEventListener("beforeinput", onBeforeInput);
    live.removeEventListener("paste", onPaste);
    live.removeEventListener("keydown", onKeyDown);
    live.removeEventListener("keyup", onKeyUp);
    live.removeEventListener("input", onInput);
    live.removeEventListener("blur", onBlur);
  };

  const cleanup = () => {
    observer?.disconnect();
    window.clearTimeout(fallback);
    live.remove();
    el.removeAttribute("data-cms-active");
    el.removeAttribute("data-cms-saving");
  };

  function cancel() {
    if (finished) return;
    finished = true;
    detach();
    cleanup();
    o.onEnd();
  }

  function commit() {
    if (finished) return;
    let text = readText().replace(/ /g, " ");
    text = multiline
      ? text
          .split("\n")
          .map((line) => line.replace(/[ \t]+$/, ""))
          .join("\n")
          .replace(/\n{3,}/g, "\n\n")
          .trim()
      : text.replace(/\s+/g, " ").trim();

    if (text === o.value.trim()) {
      cancel();
      return;
    }
    if (!text) {
      o.onEmpty();
      live.focus();
      return;
    }

    finished = true;
    detach();
    live.contentEditable = "false";
    el.setAttribute("data-cms-saving", "");

    // Dès que React réaffiche l'élément avec le texte enregistré, on retire
    // le span (mutation hors du span). Filet de sécurité : 6 s.
    observer = new MutationObserver((mutations) => {
      const fromReact = mutations.some((m) => {
        if (m.target === live || live.contains(m.target)) return false;
        if (m.type === "childList") {
          const nodes = [...m.addedNodes, ...m.removedNodes];
          return nodes.some((n) => n !== live);
        }
        return true;
      });
      if (fromReact) cleanup();
    });
    observer.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    fallback = window.setTimeout(cleanup, 6000);

    o.onEnd();
    void o.onCommit(text).then((ok) => {
      if (!ok) cleanup();
    });
  }

  return {
    el,
    commit,
    cancel,
    isInside: (node) => !!node && (node === live || live.contains(node)),
  };
}

function placeCaretAtEnd(node: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(false);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}
