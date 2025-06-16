"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    socket.on("chat history", (msgs) => {
      setMessages(msgs);
    });
    socket.on("chat message", msg => {
      setMessages(msgs => [...msgs, msg]);
    });
    return () => {
      socket.off("chat history");
      socket.off("chat message");
    };
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    if (input.trim()) {
      const msg = {
        text: input,
        user: username || "Anonymous",
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("chat message", msg);
      setInput("");
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main style={{ maxWidth: 600, margin: "2em auto" }}>
      <h1 tabIndex="0">Real-Time Chat</h1>
      <div style={{ marginBottom: 10 }}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your name"
          style={{ padding: "0.5em", borderRadius: 4, border: "1px solid #ccc", width: "50%" }}
        />
      </div>
      <div style={{
        border: "1px solid #ccc",
        height: 300,
        overflowY: "auto",
        padding: 10,
        borderRadius: 8,
        background: "#fafafa"
      }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.user}</strong> [{msg.time}]: {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: 10, display: "flex", gap: "0.5em" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, padding: "0.5em", borderRadius: 4, border: "1px solid #ccc" }}
          aria-label="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}