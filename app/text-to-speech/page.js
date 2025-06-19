"use client";
import { useState } from "react";

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);

  function speak() {
    if (!window.speechSynthesis) {
      alert("Sorry, your browser does not support Text-to-Speech.");
      return;
    }
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  return (
    <main style={{ maxWidth: 600, margin: "2em auto", padding: "1em" }}>
      <h1 tabIndex="0">Text-to-Speech</h1>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={4}
        style={{ width: "100%", fontSize: "1.1em" }}
        placeholder="Enter text to speak..."
        aria-label="Text to speak"
      />
      <div style={{ marginTop: "1em" }}>
        <button onClick={speak} disabled={!text || speaking}>
          Speak
        </button>
        <button onClick={stop} disabled={!speaking} style={{ marginLeft: "1em" }}>
          Stop
        </button>
      </div>
    </main>
  );
}