"use client";

export default function AccessibilityPage() {
  return (
    <main style={{ maxWidth: 600, margin: "2em auto", padding: "1em" }}>
      <h1 tabIndex="0">Accessibility Help</h1>
      <ul>
        <li>Use <kbd>Tab</kbd> to navigate between links and form fields.</li>
        <li>All buttons and links are keyboard accessible.</li>
        <li>Screen readers will announce alerts and updates automatically.</li>
        <li>Font size and theme color can be customized in Preferences.</li>
      </ul>
      <p>
        If you have suggestions to improve accessibility, please leave feedback!
      </p>
    </main>
  );
}