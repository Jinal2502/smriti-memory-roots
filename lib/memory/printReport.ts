import type { DailyReport, SessionEntry } from "./sessionLog";
import { familiarityLabel } from "./sessionLog";

export function printDailyReport(args: {
  patientName: string;
  city: string;
  state: string;
  report: DailyReport;
  entries: SessionEntry[];
}) {
  const { patientName, city, state, report, entries } = args;
  const remember = entries.filter((entry) => entry.activity === "remember");
  const talk = entries.filter((entry) => entry.activity === "talk");
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>SMRITI daily report · ${patientName} · ${report.date}</title>
  <style>
    body { font-family: Georgia, serif; color: #2c1810; padding: 40px; max-width: 720px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 4px; }
    h2 { font-size: 20px; margin-top: 28px; }
    p, li { font-size: 15px; line-height: 1.5; }
    .meta { color: #5c4638; }
    .box { border: 1px solid #e2d3bf; padding: 12px 16px; margin: 10px 0; }
    @media print { button { display: none; } }
  </style>
</head>
<body>
  <p class="meta">SMRITI — Memory Roots · Prototype caregiver report · not a clinical assessment</p>
  <h1>${patientName}</h1>
  <p class="meta">${city}, ${state} · ${report.date}</p>
  <p>Mood: ${report.mood} · Energy: ${report.energy}</p>
  <h2>Featured session</h2>
  <p>Remember: ${remember.length} moment(s) · Talk: ${talk.length} story sitting(s)</p>
  ${[...remember, ...talk].map((entry) => `
    <div class="box">
      <p><strong>${entry.activity}</strong> · ${familiarityLabel(entry.familiarity)}</p>
      <p>${entry.prompt}</p>
      <p>She said: ${entry.heard}</p>
      ${entry.smritiSaid ? `<p>SMRITI: ${entry.smritiSaid}</p>` : ""}
      ${entry.correction ? `<p>Correction: ${entry.correction}</p>` : ""}
      ${entry.caregiverNote ? `<p>Note: ${entry.caregiverNote}</p>` : ""}
    </div>`).join("")}
  <h2>Daily check-ins</h2>
  <ul>
    <li>Recognize: ${report.checkins.recognize ? "done" : "not yet"}</li>
    <li>Put it together: ${report.checkins.sequence ? "done" : "not yet"}</li>
    <li>Match: ${report.checkins.match ? "done" : "not yet"}</li>
  </ul>
  <h2>Ask the family</h2>
  <ul>
    ${report.familyAsks.map((ask) => `<li>${ask.question} ${ask.asked ? "— asked" : "— still to ask"}${ask.familyNote ? ` · ${ask.familyNote}` : ""}</li>`).join("")}
  </ul>
  <h2>Day note</h2>
  <p>${report.dayNote || "No extra note."}</p>
  <button onclick="window.print()">Save as PDF</button>
</body>
</html>`;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("title", "Daily report print");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);
  const frame = iframe.contentWindow;
  if (!frame) return;
  frame.document.open();
  frame.document.write(html);
  frame.document.close();
  window.setTimeout(() => {
    frame.focus();
    frame.print();
    window.setTimeout(() => iframe.remove(), 1500);
  }, 250);
}
