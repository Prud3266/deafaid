"use client";

import { useState, useRef } from "react";

// Main component for Speech-to-Text
export default function SpeechToText() {
  // State to hold the transcribed text
  const [transcript, setTranscript] = useState("");
  // State to track if recognition is active
  const [listening, setListening] = useState(false);
  // Reference to the recognition instance
  const recognitionRef = useRef(null);

  // Function to start speech recognition
  function startListening() {
    // Check if browser supports the Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }
    // Create a new recognition instance if not already created
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // Keep listening until stopped
      recognitionRef.current.interimResults = true; // Show partial results
      recognitionRef.current.lang = "en-US"; // Set language
      // When speech is recognized, update the transcript
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          interimTranscript += event.results[i][0].transcript;
        }
        setTranscript(interimTranscript);
      };
      // When recognition ends, update state
      recognitionRef.current.onend = () => setListening(false);
    }
    recognitionRef.current.start();
    setListening(true);
  }

  // Function to stop speech recognition
  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  }

  return (
    <main>
      <h1 tabIndex="0">Speech-to-Text Transcription</h1>
      <p>
        Click <strong>Start Listening</strong> and speak. Your speech will appear as text below.
      </p>
      <div>
        <button
          onClick={listening ? stopListening : startListening}
          aria-pressed={listening}
          aria-label={listening ? "Stop listening" : "Start listening"}
        >
          {listening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
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
        {transcript || <span style={{ color: "#888" }}>Your speech will appear here...</span>}
      </section>
    </main>
  );
}