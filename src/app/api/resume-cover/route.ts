// app/api/resume-cover/route.ts
export const runtime = "nodejs"; // 環境変数を使うので nodejs 実行

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const jobTitle = String(form.get("job_title") || "").trim();
    const experience = String(form.get("experience") || "").trim();
    const skills = String(form.get("skills") || "").trim();
    const coverDraft = String(form.get("cover_letter") || "").trim();

    if (!name || !jobTitle || !experience || !skills) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    // ── 環境変数（Vercel: Project Settings > Environment Variables）
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
    // 必要に応じて他のキーも同様に: MAILER_DSN など

    // ▼ ここで OpenAI を使うなら（例・擬似コード）
    // if (OPENAI_API_KEY) {
    //   const prompt = `Create a concise resume and a short cover letter for:\nName: ${name}\nJob: ${jobTitle}\nExperience:\n${experience}\nSkills: ${skills}\nDraft:\n${coverDraft}`;
    //   const r = await fetch("https://api.openai.com/v1/chat/completions", {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `Bearer ${OPENAI_API_KEY}`,
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       model: "gpt-4o-mini", // 例。使いたいモデルに変更
    //       messages: [{ role: "user", content: prompt }]
    //     })
    //   });
    //   const j = await r.json();
    //   const text = j?.choices?.[0]?.message?.content?.trim();
    //   if (text) return Response.json({ result: text });
    // }

    // ▼ キー未設定時のフォールバック（まずは即動く）
    const resume =
      `Name: ${name}\nTarget: ${jobTitle}\n\nExperience:\n${experience}\n\nSkills:\n${skills}`;
    const cover =
      `Dear Hiring Manager,\n\n${coverDraft || `I’m excited to apply for the ${jobTitle} role.`}\n\nSincerely,\n${name}`;
    const result = `=== Resume ===\n${resume}\n\n=== Cover Letter ===\n${cover}`;

    return Response.json({ result });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
export async function GET() {
  return Response.json({ ok: true, route: "/api/resume-cover" });
}
