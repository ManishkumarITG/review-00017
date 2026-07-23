import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

// Browser extensions (Grammarly, LanguageTool, LastPass, etc.) inject
// attributes/elements into the DOM before React hydrates. React 18 treats
// any mismatch as a hydration failure and re-renders the whole document,
// which drops the dev-injected stylesheets. Strip that junk first.
function removeExtensionArtifacts() {
  const junkAttrPrefixes = ["data-gr-", "data-new-gr-", "data-lt-", "data-lastpass"];
  for (const el of [document.documentElement, document.body]) {
    for (const attr of [...el.attributes]) {
      if (junkAttrPrefixes.some((p) => attr.name.startsWith(p))) {
        el.removeAttribute(attr.name);
      }
    }
  }
  document
    .querySelectorAll(
      "grammarly-desktop-integration, grammarly-extension, grammarly-popups, gr-in-page-notifications, lt-container, deepl-input-controller",
    )
    .forEach((el) => el.remove());
}

removeExtensionArtifacts();

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
