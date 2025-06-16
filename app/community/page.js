"use client";

import { useState, useEffect } from "react";

export default function CommunityPage() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("deafaid-community");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("deafaid-community", JSON.stringify(messages));
  }, [messages]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) {
      setError("Message cannot be empty.");
      return;
    }
    setError("");
    const newMsg = {
      name: name.trim() || "Anonymous",
      content: content.trim(),
      time: new Date().toLocaleString(),
    };
    setMessages([newMsg, ...messages]);
    setContent("");
  }

  return (
    <main style={{ maxWidth: 600, margin: "2em auto", padding: "1em" }}>
      <h1 tabIndex="0">Community Forum</h1>
      <form onSubmit={handleSubmit} aria-label="Post a new message" style={{ marginBottom: "1.5em" }}>
        <label htmlFor="community-name">Name (optional):</label>
        <input
          id="community-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", margin: "0.5em 0" }}
          maxLength={32}
        />
        <label htmlFor="community-message">Message:</label>
        <textarea
          id="community-message"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={3}
          style={{ width: "100%", margin: "0.5em 0" }}
          required
          aria-required="true"
        />
        <button type="submit">Post</button>
      </form>
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            marginBottom: "1em",
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
      <section aria-live="polite" aria-atomic="true">
        <h2 tabIndex="0">Messages</h2>
        {messages.length === 0 ? (
          <p>No messages yet. Be the first to post!</p>
        ) : (
          <ul style={{ padding: 0, listStyle: "none" }}>
            {messages.map((msg, i) => (
              <li key={i} style={{
                marginBottom: "1.5em",
                padding: "1em",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#fafafa"
              }}>
                <div style={{ fontWeight: "bold" }}>{msg.name}</div>
                <div style={{ margin: "0.5em 0" }}>{msg.content}</div>
                <div style={{ fontSize: "0.85em", color: "#888" }}>{msg.time}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}