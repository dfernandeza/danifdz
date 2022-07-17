/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";

// Dark mode implementation inspired in https://github.com/joshwcomeau/dark-mode-minimal/
function init() {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersDarkFromMQ = mql.matches;
  const persistedPreference = localStorage.getItem("dfdz-theme");

  let colorMode = "light";

  const hasUsedToggle = typeof persistedPreference === "string";

  if (hasUsedToggle) {
    colorMode = persistedPreference;
  } else {
    colorMode = prefersDarkFromMQ ? "dark" : "light";
  }

  window.__theme = colorMode;
  document.body.classList.add(colorMode);

  const supportsClipTxt = window.CSS.supports(
    "-webkit-background-clip",
    "text"
  );

  document.body.classList.add(supportsClipTxt ? "bg--clip-text" : "bg--solid");
}

const MagicScriptTag = () => {
  const boundFn = String(init);
  const calledFunction = `(${boundFn})()`;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<MagicScriptTag key={1} />]);
};
