import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AI Resume",
  description: "How we handle data in this demo tool.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="mt-3 text-sm text-neutral-700">
        This demo does not create accounts or store user data on a database.
        Form inputs are processed in memory and returned to the browser.
      </p>

      <ul className="mt-4 list-disc pl-5 text-sm leading-6 text-neutral-800">
        <li>No sign-up, no tracking IDs embedded.</li>
        <li>No files are saved on the serverless runtime.</li>
        <li>
          If AI APIs are enabled, prompts may be sent to the AI provider to
          generate outputs. Do not include confidential information.
        </li>
        <li>You can contact us to request deletion of any incident logs.</li>
      </ul>

      <p className="mt-6 text-sm text-neutral-600">Last updated: {new Date().toLocaleDateString()}</p>
    </main>
  );
}
