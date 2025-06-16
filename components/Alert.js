"use client";

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";

const ALERT_DURATION = 1500; // ms

const Alert = forwardRef(function Alert({ type = "visual", message = "Alert!", className = "" }, ref) {
  const [active, setActive] = useState(false);
  const audioRef = useRef(null);

  // Expose a trigger function to parent via ref
  useImperativeHandle(ref, () => ({
    trigger: () => {
      setActive(true);

      // Visual: just set active state (handled by CSS)
      // Audio: play sound if available
      if (type === "audio" && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      // Vibration: check for support
      if (type === "vibration" && typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }

      // Reset after duration
      setTimeout(() => setActive(false), ALERT_DURATION);
    }
  }));

  // For accessibility: announce alert when active
  useEffect(() => {
    if (active && type !== "audio") {
      // Optionally, focus or announce for screen readers
      // (Visual and vibration are handled visually/audibly)
    }
  }, [active, type]);

  return (
    <div
      role="status"
      aria-live="assertive"
      className={className}
      style={{
        margin: "1em 0",
        padding: "1em",
        borderRadius: "8px",
        background: active && type === "visual" ? "#ffeb3b" : "#f5f5f5",
        border: active && type === "visual" ? "3px solid #d32f2f" : "1px solid #ccc",
        color: active && type === "visual" ? "#d32f2f" : "#222",
        fontWeight: "bold",
        fontSize: "1.1em",
        boxShadow: active && type === "visual" ? "0 0 12px 2px #ffeb3b" : "none",
        transition: "all 0.2s"
      }}
    >
      {message}
      {/* Audio element for alert sound */}
      {type === "audio" && (
        <audio ref={audioRef} src="/sounds/alert.mp3" preload="auto" />
      )}
    </div>
  );
});

export default Alert;