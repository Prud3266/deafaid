"use client";

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
            <a href="/speech">Speech-to-Text</a>
          </li>
          <li>
            <a href="/feedback">Feedback</a>
          </li>
          <li>
            <a href="/preferences">Preferences</a>
          </li>
          <li>
            <a href="/community">Community</a>
          </li>
          <li>
            <a href="/chat">Chat Room</a>
          </li>
          <li>
            <a href="/video">Video Call</a>
          </li>
          <li>
            <a href="/text-to-speech">Text-to-Speech</a>
          </li>
          <li>
            <a href="/sign-language">Sign Language Recognition</a>
          </li>
          <li>
            <a href="/sign-display">Text-to-Sign Display</a>
          </li>
          <li>
            <a href="/alerts">Visual & Vibration Alerts</a>
          </li>
          <li>
            <a href="/accessibility">Accessibility Help</a>
          </li>
        </ul>
      </nav>
    </main>
  );
}