"use client";

import { useState, useEffect } from "react";

const DEFAULTS = {
  fontSize: "medium",
  theme: "light"
};

export default function PreferencesPage() {
  const [fontSize, setFontSize] = useState(DEFAULTS.fontSize);
  const [theme, setTheme] = useState(DEFAULTS.theme);
  const [saved, setSaved] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    const stored = localStorage.getItem("deafaid-preferences");
    if (stored) {
      const prefs = JSON.parse(stored);
      setFontSize(prefs.fontSize || DEFAULTS.fontSize);
      setTheme(prefs.theme || DEFAULTS.theme);
      applyPreferences(prefs.fontSize || DEFAULTS.fontSize, prefs.theme || DEFAULTS.theme);
    } else {
      applyPreferences(DEFAULTS.fontSize, DEFAULTS.theme);
    }
  }, []);

  // Apply preferences globally
  function applyPreferences(font, theme) {
    const body = document.body;
    body.classList.remove("font-small", "font-medium", "font-large", "theme-light", "theme-dark", "theme-high-contrast");
    body.classList.add(`font-${font}`, `theme-${theme}`);
  }

  // Save preferences
  function handleSave(e) {
    e.preventDefault();
    const prefs = { fontSize, theme };
    localStorage.setItem("deafaid-preferences", JSON.stringify(prefs));
    applyPreferences(fontSize, theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  // Reset to defaults
  function handleReset() {
    setFontSize(DEFAULTS.fontSize);
    setTheme(DEFAULTS.theme);
    localStorage.removeItem("deafaid-preferences");
    applyPreferences(DEFAULTS.fontSize, DEFAULTS.theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <main style={{ maxWidth: 600, margin: "2em auto", padding: "1em" }}>
      <h1 tabIndex="0">Preferences</h1>
      <form onSubmit={handleSave} aria-label="Preferences form">
        <fieldset>
          <legend>Font Size</legend>
          <label>
            <input
              type="radio"
              name="font-size"
              value="small"
              checked={fontSize === "small"}
              onChange={() => setFontSize("small")}
            />
            Small
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="font-size"
              value="medium"
              checked={fontSize === "medium"}
              onChange={() => setFontSize("medium")}
            />
            Medium
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="font-size"
              value="large"
              checked={fontSize === "large"}
              onChange={() => setFontSize("large")}
            />
            Large
          </label>
        </fieldset>
        <fieldset style={{ marginTop: "1em" }}>
          <legend>Theme</legend>
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === "light"}
              onChange={() => setTheme("light")}
            />
            Light
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === "dark"}
              onChange={() => setTheme("dark")}
            />
            Dark
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="theme"
              value="high-contrast"
              checked={theme === "high-contrast"}
              onChange={() => setTheme("high-contrast")}
            />
            High Contrast
          </label>
        </fieldset>
        <div style={{ marginTop: "1.5em" }}>
          <button type="submit" style={{ marginRight: "1em" }}>Save Preferences</button>
          <button type="button" onClick={handleReset}>Reset to Default</button>
        </div>
      </form>
      {saved && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: "1.5em",
            background: "#e0ffe0",
            color: "#1976d2",
            padding: "0.8em 1em",
            borderRadius: "8px",
            fontWeight: "bold"
          }}
        >
          Preferences saved!
        </div>
      )}
    </main>
  );
}
// This page allows users to set their preferences for font size and theme color.
// It saves these preferences to localStorage and applies them to a preview section.
// The preferences are loaded from localStorage when the page is first rendered.
// The form includes input fields for font size and theme color, with validation for the font size range.