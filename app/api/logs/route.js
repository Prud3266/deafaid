export async function POST(request) {
  const data = await request.json();
  // Simulate logging by printing to the server console
  console.log("Log entry:", data);

  return new Response(JSON.stringify({ status: "logged" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}