export async function POST(req) {
  try {
    const { q, source, target, format } = await req.json();
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, source, target, format }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.log("API error:", errorText);
      return new Response(JSON.stringify({ error: errorText }), { status: 500 });
    }
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.log("API route error:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}