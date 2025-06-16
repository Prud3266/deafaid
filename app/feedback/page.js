"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Feedback cannot be empty.");
      return;
    }
    setError("");
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (res.ok) {
      setSubmitted(true);
      setMessage("");
      setTimeout(() => setSubmitted(false), 2000);
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "2em auto", padding: "1em" }}>
      <h1 tabIndex="0">Feedback</h1>
      <form onSubmit={handleSubmit} aria-label="Feedback form">
        <label htmlFor="feedback-message">Your feedback:</label>
        <textarea
          id="feedback-message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={4}
          style={{ width: "100%", margin: "1em 0" }}
          aria-required="true"
        />
        <button type="submit">Submit</button>
      </form>
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            marginTop: "1em",
            background: "#ffe0e0",
            color: "#d32f2f",
            padding: "0.8em 1em",
            borderRadius: "8px",
            fontWeight: "bold"
          }}
        >
          {error}
        </div>
      )}
      {submitted && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: "1em",
            background: "#e0ffe0",
            color: "#1976d2",
            padding: "0.8em 1em",
            borderRadius: "8px",
            fontWeight: "bold"
          }}
        >
          Thank you for your feedback!
        </div>
      )}
    </main>
  );
}