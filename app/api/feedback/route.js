export async function POST(request) {
  const { message } = await request.json();
  console.log("Feedback received:", message);
  return new Response(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}