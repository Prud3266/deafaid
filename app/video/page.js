export default function VideoPage() {
  return (
    <main style={{ maxWidth: 700, margin: "2em auto", padding: "1em", position: "relative" }}>
      <h1 tabIndex="0">Video Call Room</h1>
      <div style={{ position: "relative" }}>
        <iframe
          src="https://meet.jit.si/DeafAidDemoRoom"
          style={{ width: "100%", height: 500, border: 0, borderRadius: 8 }}
          allow="camera; microphone; fullscreen; display-capture"
          title="Jitsi Video Call"
        />
        {/* Interpreter Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            width: 180,
            height: 140,
            background: "#0008",
            borderRadius: 8,
            border: "2px solid #fff",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff"
          }}
          aria-label="Sign interpreter overlay"
        >
          {/* Replace with interpreter video stream if available */}
          <span>Interpreter</span>
        </div>
      </div>
      <p style={{ marginTop: "1em" }}>
        Share this page link with your interpreter or friends to join the same video call.
      </p>
    </main>
  );
}