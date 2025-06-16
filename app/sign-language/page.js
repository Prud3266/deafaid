"use client";
import { useEffect, useRef, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export default function SignLanguageRecognition() {
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !videoRef.current) return;
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });
    hands.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          ctx.fillStyle = "#00FF00";
          for (const point of landmarks) {
            ctx.beginPath();
            ctx.arc(point.x * canvas.width, point.y * canvas.height, 5, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
    });
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });
    camera.start();
    return () => {
      camera.stop();
      hands.close();
    };
  }, [isClient]);

  return (
    <main style={{ maxWidth: 700, margin: "2em auto", padding: "1em" }}>
      <h1 tabIndex="0">Sign Language Recognition (Demo)</h1>
      {isClient && (
        <div style={{ position: "relative", width: 640, height: 480 }}>
          <video ref={videoRef} style={{ display: "none" }} width={640} height={480} playsInline />
          <canvas ref={canvasRef} width={640} height={480} style={{ borderRadius: 8, border: "1px solid #ccc" }} />
        </div>
      )}
      <p style={{ marginTop: "1em" }}>
        This demo uses your webcam to detect hands. Try signing in front of your camera!
      </p>
    </main>
  );
}