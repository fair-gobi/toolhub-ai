export async function grokChat(prompt: string) {
  const key = process.env.GROK_API_KEY;
  if (!key) throw new Error("GROK_API_KEY missing");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    })
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(data);
    throw new Error(data.error?.message || JSON.stringify(data));
  }
  return data.choices[0].message.content;
}