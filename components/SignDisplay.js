"use client";

export default function SignDisplay({ signs }) {
  return (
    <div
      aria-label="Sign language translation"
      style={{
        display: "flex",
        gap: "0.5em",
        overflowX: "auto",
        padding: "1em 0",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        marginBottom: "1em"
      }}
    >
      {signs.length === 0 ? (
        <span style={{ color: "#888" }}>No signs to display.</span>
      ) : (
        signs.map((sign, i) => (
          <img
            key={i}
            src={sign.src}
            alt={sign.alt}
            style={{ height: 64, width: "auto", borderRadius: 8, background: "#fff" }}
          />
        ))
      )}
    </div>
  );
}