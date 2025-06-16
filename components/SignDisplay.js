"use client";
import Image from "next/image";

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
          <Image
            key={i}
            src={sign.src}
            alt={sign.alt}
            height={64}
            width={64} // Adjust if you know the actual width, or keep as 64 for square
            style={{ borderRadius: 8, background: "#fff", width: "auto" }}
          />
        ))
      )}
    </div>
  );
}