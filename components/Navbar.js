"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/speech", label: "Speech-to-Text" },
    { href: "/sign-display", label: "Text-to-Sign" },
    { href: "/alerts", label: "Alerts" },
    { href: "/accessibility", label: "Accessibility Help" },
    { href: "/sign-language", label: "Sign Language Recognition" },
    { href: "/text-to-speech", label: "Text-to-Speech" },
    { href: "/preferences", label: "Preferences" },
    { href: "/video", label: "Video Call" },
    { href: "/community", label: "Community" },
    { href: "/chat", label: "Chat Room" },
    { href: "/feedback", label: "Feedback" },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-top-row">
        <h1 tabIndex="0" className="navbar-title" style={{ display: "flex", alignItems: "center", gap: "0.5em", margin: 0 }}>
          <span role="img" aria-label="Ear with hearing aid" style={{ fontSize: "1.2em" }}>🦻</span>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>DeafAid</a>
        </h1>
        <button
          className="navbar-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(o => !o)}
          type="button"
        >
          <span className="navbar-hamburger-bar"></span>
          <span className="navbar-hamburger-bar"></span>
          <span className="navbar-hamburger-bar"></span>
        </button>
        <select
          className="theme-switcher"
          aria-label="Switch theme"
          onChange={e => {
            document.body.classList.remove("theme-light", "theme-dark", "theme-high-contrast");
            document.body.classList.add(e.target.value);
          }}
          defaultValue="theme-light"
          style={{ marginLeft: "1em", borderRadius: 4, padding: "0.3em" }}
        >
          <option value="theme-light">🌞 Light</option>
          <option value="theme-dark">🌙 Dark</option>
          <option value="theme-high-contrast">⚡ High Contrast</option>
        </select>
      </div>
      <p className="navbar-desc">
        Accessibility-focused communication app for deaf and hard-of-hearing users.
      </p>
      <nav
        aria-label="Main navigation"
        className={`navbar-nav${open ? " open" : ""}`}
        id="main-nav"
      >
        <ol className="navbar-list">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={pathname === link.href ? "active" : ""}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}