// functions/api/generate.ts
export async function onRequestPost({ request, env }: { request: Request; env: any }) {
  try {
    const body = await request.json();

    const target =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    const res = await fetch(target, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return new Response(res.body, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), {
      status: 500,
    });
  }
}
