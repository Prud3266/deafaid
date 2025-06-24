"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: "2em auto", padding: "1em" }}>
      <h1 tabIndex="0">DeafAid</h1>
      <p>
        Welcome to DeafAid, an accessibility-focused app for deaf and hard-of-hearing users.
      </p>
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <Link href="/speech">Speech-to-Text</Link>
          </li>
          <li>
            <Link href="/feedback">Feedback</Link>
          </li>
          <li>
            <Link href="/preferences">Preferences</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
          <li>
            <Link href="/chat">Chat Room</Link>
          </li>
          <li>
            <Link href="/video">Video Call</Link>
          </li>
          <li>
            <Link href="/text-to-speech">Text-to-Speech</Link>
          </li>
          <li>
            <Link href="/sign-language">Sign Language Recognition</Link>
          </li>
          <li>
            <Link href="/sign-display">Text-to-Sign Display</Link>
          </li>
          <li>
            <Link href="/alerts">Visual & Vibration Alerts</Link>
          </li>
          <li>
            <Link href="/accessibility">Accessibility Help</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
// This is the main page of the DeafAid app, providing links to various features and services.