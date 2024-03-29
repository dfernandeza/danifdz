import React, { useEffect, useState } from "react";

import "./toggle.css";

export default function Toggle() {
  const [theme, setTheme] = useState();

  function onChange(e) {
    const theme = e.target.checked ? "dark" : "light";
    setTheme(theme);

    window.__theme = theme;

    try {
      localStorage.setItem("dfdz-theme", theme);
    } catch {}

    document.body.classList.remove(theme === "light" ? "dark" : "light");
    document.body.classList.add(theme);

    window.gtag("event", "changeTheme", {
      event_category: "theme",
      event_label: "Theme toggler",
      theme
    });
  }

  useEffect(() => {
    setTheme(window.__theme);
  }, []);

  return (
    <div className="themeToggle">
      <div className="themeToggle-wrapper">
        {theme !== undefined ? (
          <label className="themeToggle-label">
            <input
              className="themeToggle-input"
              type="checkbox"
              checked={theme !== "light"}
              onChange={onChange}
            />
            <span className="themeToggle-slider"></span>
          </label>
        ) : null}
      </div>
    </div>
  );
}
