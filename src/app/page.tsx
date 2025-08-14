"use client";

import { useMemo, useState } from "react";

type StepKey = "name" | "job_title" | "experience" | "skills" | "cover_letter";

type StepDef = {
  key: StepKey;
  label: string;
  placeholder?: string;
  type: "input" | "textarea";
  required?: boolean;
};

const STEPS: StepDef[] = [
  { key: "name", label: "Name", type: "input", required: true, placeholder: "Jane Doe" },
  { key: "experience", label: "Experience (bullets ok)", type: "textarea", required: true, placeholder: "- Led X\n- Shipped Y" },
  { key: "skills", label: "Skills (comma separated)", type: "input", required: true, placeholder: "React, SQL, PM, Analytics" },
  { key: "job_title", label: "Target Job Title", type: "input", required: true, placeholder: "Full Stack Developer" },
  { key: "cover_letter", label: "Cover Letter Draft (optional)", type: "textarea", required: false, placeholder: "Why you're a fit..." },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 入力値はフォームから拾うので React state は不要（バリデーションはHTMLで）
  const last = useMemo(() => STEPS.length - 1, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/resume-cover", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setResult(data.result);
      // 完了後は最終ステップに揃える
      setStep(last);
    } catch (err: any) {
      setError(err?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  const gotoNext = () => setStep((s) => Math.min(s + 1, last));
  const gotoPrev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      {/* ブランドヘッダ */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-indigo-100">
          {/* シンプルなアイコン（提供HTMLの雰囲気に寄せた円＋記号） */}
          <svg viewBox="0 0 40 40" className="h-6 w-6">
            <circle cx="20" cy="20" r="18" fill="#6366f1" opacity="0.12" />
            <path d="M14 20a6 6 0 1 1 12 0" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="20" r="4" fill="#6366f1" opacity="0.22" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          AI Resume & Cover Letter
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          No sign-up. Enter, generate, and copy.
        </p>
      </div>

      {/* カード */}
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-md rounded-2xl border border-indigo-100 bg-white p-5 shadow-[0_6px_32px_0_rgba(80,80,120,0.13)]">
        {/* ステッパー（ドット） */}
        <div className="mb-5 flex items-center justify-center gap-2">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={[
                "h-2.5 w-2.5 rounded-full transition-all",
                i === step ? "bg-indigo-600" : "bg-indigo-200",
              ].join(" ")}
            />
          ))}
        </div>

        {/* ステップ群（非表示でもフォームに残して FormData へ載せる） */}
        <div className="grid gap-4">
          {STEPS.map((s, i) => (
            <div key={s.key} aria-hidden={i !== step} className={i === step ? "block" : "hidden"}>
              <label className="mb-1 block text-sm font-semibold text-neutral-800">{s.label}{s.required && " *"}</label>
              {s.type === "input" ? (
                <input
                  name={s.key}
                  required={!!s.required}
                  placeholder={s.placeholder}
                  className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 outline-none ring-indigo-400 placeholder:text-neutral-400 focus:border-indigo-500 focus:ring"
                />
              ) : (
                <textarea
                  name={s.key}
                  required={!!s.required}
                  placeholder={s.placeholder}
                  rows={i === 1 ? 4 : 3}
                  className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 outline-none ring-indigo-400 placeholder:text-neutral-400 focus:border-indigo-500 focus:ring"
                />
              )}
            </div>
          ))}
        </div>

        {/* ナビゲーション */}
        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={gotoPrev}
            disabled={step === 0 || loading}
            className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
          >
            Back
          </button>

          {step < last ? (
            <button
              type="button"
              onClick={gotoNext}
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          )}
        </div>
      </form>

      {/* エラー／結果 */}
      {error && (
        <div className="mx-auto mt-4 max-w-md rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-indigo-100 bg-white p-5 shadow-[0_6px_32px_0_rgba(80,80,120,0.13)]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Result</h2>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="rounded-md border px-3 py-1.5 text-xs"
            >
              Copy
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm leading-6 text-neutral-800">{result}</pre>
        </div>
      )}
      {/* How it works */}
<section id="how-it-works" className="mx-auto mt-12 max-w-3xl rounded-2xl border border-indigo-100 bg-white p-6 shadow-[0_6px_32px_0_rgba(80,80,120,0.08)]">
  <h2 className="text-lg font-semibold">How it works</h2>
  <ol className="mt-3 list-decimal pl-5 text-sm leading-6 text-neutral-800">
    <li>Fill the 5 quick fields (Name, Job Title, Experience, Skills, Draft).</li>
    <li>Click <span className="font-medium">Generate</span> to create a resume + cover letter.</li>
    <li>Copy the result (or export later if you add that feature).</li>
  </ol>
  <p className="mt-3 text-xs text-neutral-600">
    Note: This demo processes inputs in memory; no persistent storage.
  </p>
</section>

{/* Features */}
<section id="features" className="mx-auto mt-8 max-w-5xl">
  <h2 className="mb-3 text-lg font-semibold">Features</h2>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div className="rounded-xl border bg-white p-4">
      <p className="text-sm font-medium">No Sign-up</p>
      <p className="mt-1 text-sm text-neutral-600">Start instantly—no accounts.</p>
    </div>
    <div className="rounded-xl border bg-white p-4">
      <p className="text-sm font-medium">Step UI</p>
      <p className="mt-1 text-sm text-neutral-600">Minimal steps, clear progress.</p>
    </div>
    <div className="rounded-xl border bg-white p-4">
      <p className="text-sm font-medium">Serverless API</p>
      <p className="mt-1 text-sm text-neutral-600">Edge-ready route handler.</p>
    </div>
    <div className="rounded-xl border bg-white p-4">
      <p className="text-sm font-medium">Clipboard</p>
      <p className="mt-1 text-sm text-neutral-600">One-click copy of results.</p>
    </div>
  </div>
</section>

    </main>
  );
}
