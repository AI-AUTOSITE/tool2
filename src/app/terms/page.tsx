import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — AI Resume",
  description: "Simple terms for this demo tool.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="mt-3 text-sm text-neutral-700">
        This is a demo tool provided “as is.” Outputs may be inaccurate.
        You are responsible for reviewing and using results at your own risk.
      </p>

      <ul className="mt-4 list-disc pl-5 text-sm leading-6 text-neutral-800">
        <li>No guarantees of availability or fitness for a particular purpose.</li>
        <li>Do not submit illegal, harmful, or copyrighted content you do not own.</li>
        <li>We may rate-limit or block abusive usage.</li>
        <li>Jurisdiction and governing law: your local regulations may apply.</li>
      </ul>

      <p className="mt-6 text-sm text-neutral-600">Last updated: {new Date().toLocaleDateString()}</p>
    </main>
  );
}
