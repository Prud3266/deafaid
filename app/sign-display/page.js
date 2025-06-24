"use client";

import { useState } from "react";
import SignDisplay from "../../components/SignDisplay";

export default function SignDisplayPage() {
  const [input, setInput] = useState("");
  const [signs, setSigns] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const words = input.trim().toLowerCase().split(/\s+/);
    const newSigns = [];
    words.forEach(word => {
      // Try to use a word sign image
      if (word && isWordSignAvailable(word)) {
        newSigns.push({
          src: `/signs/${word}.png`,
          alt: `Sign for "${word}"`
        });
      } else {
        // Fallback: spell out each letter
        for (const letter of word) {
          if (/[a-z]/.test(letter) && isLetterSignAvailable(letter)) {
            newSigns.push({
              src: `/signs/${letter}.png`,
              alt: `Sign for letter "${letter}"`
            });
          }
        }
      }
    });
    setSigns(newSigns);
  }

  
  // Helper: check if a word sign image exists (basic, assumes common words)
  function isWordSignAvailable(word) {
    // For demo, assume images exist for "hello", "thank", "you"
    return ["Afternoon", "Good", "Hi", "Hello", "How are you", "MY", "my", "Look at that", "is", "Morning", "My", "name", "night", "Thank you", "What", "your"].includes(word);
  }
  // Helper: check if a letter sign image exists (a-z)
  function isLetterSignAvailable(letter) {
    return /^[a-z]$/.test(letter);
  }

  return (
    <main style={{ maxWidth: 700, margin: "2em auto", padding: "1em" }}>
      <h1 tabIndex="0">Text-to-Sign Converter</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1em" }}>
        <label htmlFor="sign-input">Enter a short sentence:</label>
        <input
          id="sign-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ width: "100%", margin: "0.5em 0", fontSize: "1.1em" }}
          maxLength={60}
          aria-label="Sentence to convert to sign language"
          required
        />
        <button type="submit">Show Signs</button>
      </form>
      <SignDisplay signs={signs} />
    </main>
    
  );
}