// app/api/resume-cover/route.ts
export const runtime = "nodejs";

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

    const hasOpenAI = !!process.env.OPENAI_API_KEY;

    // ▼ OpenAI を使うならここで呼び出し（hasOpenAI を参照）
    // if (hasOpenAI) { ... }

    const resume = `Name: ${name}\nTarget: ${jobTitle}\n\nExperience:\n${experience}\n\nSkills:\n${skills}`;
    const cover  = `Dear Hiring Manager,\n\n${coverDraft || `I’m excited to apply for the ${jobTitle} role.`}\n\nSincerely,\n${name}`;
    const result = `=== Resume ===\n${resume}\n\n=== Cover Letter ===\n${cover}`;

    return Response.json({ result, hasOpenAI });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

// 任意：GETでの死活確認
export async function GET() {
  return Response.json({ ok: true, route: "/api/resume-cover" });
}
