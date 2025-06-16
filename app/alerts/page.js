"use client";

import { useRef } from "react";
import Alert from "../../components/Alert";

export default function AlertsPage() {
  const visualRef = useRef();
  const audioRef = useRef();
  const vibrationRef = useRef();

  return (
    <main style={{ maxWidth: 600, margin: "2em auto", padding: "1em" }}>
      <h1 tabIndex="0">Alerts Demo</h1>
      <div style={{ display: "flex", gap: "1em", marginBottom: "2em" }}>
        <button onClick={() => visualRef.current.trigger()}>Visual Alert</button>
        <button onClick={() => audioRef.current.trigger()}>Audio Alert</button>
        <button onClick={() => vibrationRef.current.trigger()}>Vibration Alert</button>
      </div>
      <Alert
        ref={visualRef}
        type="visual"
        message="⚡ Visual Alert Active!"
      />
      <Alert
        ref={audioRef}
        type="audio"
        message="🔊 Audio Alert Active!"
      />
      <Alert
        ref={vibrationRef}
        type="vibration"
        message="📳 Vibration Alert Active!"
      />
    </main>
  );
}