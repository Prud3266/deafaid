"use client";

import { useState, useRef } from "react";

export default function SpeechPage() {
  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  async function handleTranscriptChange(newText) {
    setTranscript(newText);
    if (newText.trim()) {
      const fr = await translateText(newText);
      setTranslation(fr);
    } else {
      setTranslation("");
    }
  }

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          interimTranscript += event.results[i][0].transcript;
        }
        handleTranscriptChange(interimTranscript);
      };
      recognitionRef.current.onend = () => setListening(false);
    }
    recognitionRef.current.start();
    setListening(true);
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  }

  async function translateText(text) {
    setError("");
    try {
      // Use a more reliable endpoint
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: "fr",
          format: "text"
        })
      });
      if (!res.ok) throw new Error("Translation API error");
      const data = await res.json();
      if (!data.translatedText) throw new Error("No translation returned");
      return data.translatedText;
    } catch (e) {
      setError("Translation failed. Please try again.");
      console.error(e);
      return "";
    }
  }

  return (
    <main>
      <h1 tabIndex="0">Speech-to-Text</h1>
      <button
        onClick={listening ? stopListening : startListening}
        aria-pressed={listening}
        aria-label={listening ? "Stop listening" : "Start listening"}
      >
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <section
        aria-live="polite"
        aria-atomic="true"
        style={{
          marginTop: "1em",
          minHeight: "2em",
          border: "1px solid #ccc",
          padding: "1em",
          borderRadius: "8px",
          background: "#f9f9f9",
          fontSize: "1.2em",
        }}
      >
        <div>
          <strong>Transcript (EN):</strong><br />
          {transcript || <span style={{ color: "#888" }}>Your speech will appear here...</span>}
        </div>
        <div style={{ marginTop: "1em", background: "#e3f2fd", padding: "0.5em", borderRadius: "6px" }}>
          <strong>Translation (FR):</strong><br />
          {translation || <span style={{ color: "#888" }}>French translation will appear here...</span>}
        </div>
        {error && (
          <div
            role="alert"
            style={{
              marginTop: "1em",
              background: "#ffe0e0",
              color: "#d32f2f",
              padding: "0.5em",
              borderRadius: "6px"
            }}
          >
            {error}
          </div>
        )}
      </section>
    </main>
  );
}