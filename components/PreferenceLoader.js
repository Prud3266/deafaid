"use client";

import { useEffect } from "react";

const DEFAULTS = {
  fontSize: "medium",
  theme: "light"
};

export default function PreferenceLoader() {
  useEffect(() => {
    // Read preferences from localStorage
    const stored = localStorage.getItem("deafaid-preferences");
    let fontSize = DEFAULTS.fontSize;
    let theme = DEFAULTS.theme;
    if (stored) {
      try {
        const prefs = JSON.parse(stored);
        fontSize = prefs.fontSize || fontSize;
        theme = prefs.theme || theme;
      } catch {}
    }
    // Apply classes to <body>
    const body = document.body;
    body.classList.remove("font-small", "font-medium", "font-large", "theme-light", "theme-dark", "theme-high-contrast");
    body.classList.add(`font-${fontSize}`, `theme-${theme}`);
  }, []);

  return null; // This component does not render anything
}