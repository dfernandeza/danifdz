import React, { useState } from "react";

import "./toggle.css";

const isBrowser = typeof window !== undefined;

export default function Toggle() {
  const [theme, setTheme] = useState(
    typeof isBrowser ? globalThis.__theme : "light"
  );

  function onChange(e) {
    const theme = e.target.checked ? "dark" : "light";
    setTheme(theme);

    window.__theme = theme;

    try {
      localStorage.setItem("dfdz-theme", theme);
    } catch {}

    document.body.classList.remove(theme === "light" ? "dark" : "light");
    document.body.classList.add(theme);
  }

  return (
    <div className="themeToggle">
      <div className="themeToggle-wrapper">
        <label className="themeToggle-label">
          <input
            className="themeToggle-input"
            type="checkbox"
            checked={theme !== "light"}
            onChange={onChange}
          />
          <span className="themeToggle-slider"></span>
        </label>
      </div>
    </div>
  );
}
