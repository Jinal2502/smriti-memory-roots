"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Memory, Patient } from "@/lib/memory/types";
import {
  entriesForDate,
  familiarityLabel,
  listReportDates,
  loadDailyReport,
  loadSessionEntries,
  saveDailyReport,
  todayKey,
  updateSessionEntry,
  type DailyReport,
  type Familiarity,
  type SessionEntry,
} from "@/lib/memory/sessionLog";
import { printDailyReport } from "@/lib/memory/printReport";

export function CaregiverDesk({
  patient,
  memories,
}: {
  patient: Patient;
  memories: Memory[];
}) {
  const [date, setDate] = useState(todayKey());
  const [dates, setDates] = useState<string[]>([todayKey()]);
  const [entries, setEntries] = useState<SessionEntry[]>([]);
  const [report, setReport] = useState<DailyReport>(() =>
    loadDailyReport(patient.id, todayKey())
  );

  useEffect(() => {
    setDates(listReportDates(patient.id));
    setEntries(entriesForDate(patient.id, date));
    setReport(loadDailyReport(patient.id, date));
  }, [patient.id, date]);

  const remember = useMemo(
    () => entries.filter((entry) => entry.activity === "remember"),
    [entries]
  );
  const talk = useMemo(
    () => entries.filter((entry) => entry.activity === "talk"),
    [entries]
  );

  function patchReport(next: DailyReport) {
    setReport(next);
    saveDailyReport(next);
  }

  function refreshEntries() {
    setEntries(entriesForDate(patient.id, date));
    setDates(listReportDates(patient.id));
  }

  return (
    <div className="space-y-12">
      <p className="border border-border bg-card px-4 py-3 text-base text-muted-foreground">
        Daily caregiver report — not a clinical assessment. Fill this at the end of each sitting.
        {memories.length} memories live in this demonstration space.
      </p>

      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm tracking-[0.18em] text-primary uppercase">Daily report</p>
          <h2 className="mt-2 font-serif text-4xl">{patient.preferredName}</h2>
          <p className="mt-1 text-lg text-muted-foreground">
            {patient.city}, {patient.state}
          </p>
        </div>
        <label className="text-lg">
          Date
          <input
            type="date"
            className="mt-1 block min-h-12 border border-border bg-card px-3"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
      </section>

      {dates.length > 1 ? (
        <p className="text-base text-muted-foreground">
          Other days: {dates.filter((item) => item !== date).slice(0, 5).join(" · ")}
        </p>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2">
        <label className="border border-border bg-card p-5">
          <span className="text-sm text-muted-foreground">How did the day feel?</span>
          <select
            className="mt-2 min-h-12 w-full border border-border bg-background px-3 text-lg"
            value={report.mood}
            onChange={(event) => patchReport({ ...report, mood: event.target.value })}
          >
            <option value="calm">Calm</option>
            <option value="bright">Bright</option>
            <option value="tired">Tired</option>
            <option value="restless">Restless</option>
          </select>
        </label>
        <label className="border border-border bg-card p-5">
          <span className="text-sm text-muted-foreground">Energy for the sitting</span>
          <select
            className="mt-2 min-h-12 w-full border border-border bg-background px-3 text-lg"
            value={report.energy}
            onChange={(event) => patchReport({ ...report, energy: event.target.value })}
          >
            <option value="gentle">Gentle</option>
            <option value="steady">Steady</option>
            <option value="short">Needed a short sitting</option>
          </select>
        </label>
      </section>

      <section>
        <h3 className="font-serif text-3xl">Featured sitting</h3>
        <p className="mt-2 text-lg text-muted-foreground">
          Remember {remember.length} · Talk {talk.length}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link href={`/memory/${patient.id}/activities/recall`} className="btn-primary">
            Remember
          </Link>
          <Link href={`/memory/${patient.id}/talk`} className="btn-secondary">
            Talk
          </Link>
        </div>
        {[...remember, ...talk].length === 0 ? (
          <p className="mt-6 text-lg">No Remember or Talk moments logged for this date yet.</p>
        ) : (
          <ul className="mt-6 space-y-5">
            {[...remember, ...talk].map((entry) => (
              <LogCard key={entry.id} entry={entry} onChange={refreshEntries} />
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-serif text-3xl">Daily check-ins</h3>
        <p className="mt-2 text-lg text-muted-foreground">
          Optional short games. Tick them when you have done them today.
        </p>
        <ul className="mt-4 space-y-3">
          <CheckinRow
            label="Recognize"
            href={`/memory/${patient.id}/activities/recognize`}
            checked={report.checkins.recognize}
            onChange={(checked) =>
              patchReport({
                ...report,
                checkins: { ...report.checkins, recognize: checked },
              })
            }
          />
          <CheckinRow
            label="Put it together"
            href={`/memory/${patient.id}/activities/sequence`}
            checked={report.checkins.sequence}
            onChange={(checked) =>
              patchReport({
                ...report,
                checkins: { ...report.checkins, sequence: checked },
              })
            }
          />
          <CheckinRow
            label="Match"
            href={`/memory/${patient.id}/activities/match`}
            checked={report.checkins.match}
            onChange={(checked) =>
              patchReport({
                ...report,
                checkins: { ...report.checkins, match: checked },
              })
            }
          />
        </ul>
      </section>

      <section>
        <h3 className="font-serif text-3xl">Ask the family</h3>
        <p className="mt-2 text-lg text-muted-foreground">
          After the sitting, send these to Mitali or Arun. Their answers make tomorrow&apos;s session kinder.
        </p>
        <ul className="mt-6 space-y-5">
          {report.familyAsks.map((ask, index) => (
            <li key={ask.id} className="border border-border bg-card p-5">
              <label className="flex items-start gap-3 text-lg">
                <input
                  type="checkbox"
                  className="mt-2 size-5"
                  checked={ask.asked}
                  onChange={(event) => {
                    const familyAsks = report.familyAsks.map((item, i) =>
                      i === index ? { ...item, asked: event.target.checked } : item
                    );
                    patchReport({ ...report, familyAsks });
                  }}
                />
                <span>{ask.question}</span>
              </label>
              <textarea
                className="mt-3 w-full border border-border bg-background p-3 text-lg"
                rows={2}
                placeholder="What the family said…"
                value={ask.familyNote}
                onChange={(event) => {
                  const familyAsks = report.familyAsks.map((item, i) =>
                    i === index ? { ...item, familyNote: event.target.value } : item
                  );
                  patchReport({ ...report, familyAsks });
                }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-serif text-3xl">Note for this day</h3>
        <textarea
          className="mt-3 w-full border border-border bg-card p-4 text-lg"
          rows={4}
          value={report.dayNote}
          onChange={(event) => patchReport({ ...report, dayNote: event.target.value })}
          placeholder="She mixed Arun and Rohan once, then settled when we said grandson. Try Rohan again tomorrow with the photograph."
        />
      </section>

      <button
        type="button"
        className="btn-primary"
        onClick={() =>
          printDailyReport({
            patientName: patient.preferredName,
            city: patient.city,
            state: patient.state,
            report,
            entries: loadSessionEntries(patient.id).filter(
              (entry) => todayKey(new Date(entry.at)) === date
            ),
          })
        }
      >
        Download this day&apos;s PDF
      </button>
      <p className="text-base text-muted-foreground">
        A print window opens. Choose Save as PDF. Allow pop-ups if the browser asks.
      </p>
    </div>
  );
}

function CheckinRow({
  label,
  href,
  checked,
  onChange,
}: {
  label: string;
  href: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card px-4 py-3">
      <label className="flex min-h-12 items-center gap-3 text-lg">
        <input
          type="checkbox"
          className="size-5"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        {label}
      </label>
      <Link href={href} className="underline">
        Open
      </Link>
    </li>
  );
}

function LogCard({
  entry,
  onChange,
}: {
  entry: SessionEntry;
  onChange: () => void;
}) {
  return (
    <li className="border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">
        {new Date(entry.at).toLocaleString()} · {entry.activity} · {familiarityLabel(entry.familiarity)}
      </p>
      <p className="mt-2 text-lg">{entry.prompt}</p>
      <p className="mt-2 text-xl">She said: {entry.heard}</p>
      {entry.smritiSaid ? (
        <p className="mt-2 text-lg text-muted-foreground">SMRITI: {entry.smritiSaid}</p>
      ) : null}
      <label className="mt-4 block text-base">How did it feel?</label>
      <select
        className="mt-1 min-h-12 w-full max-w-sm border border-border bg-background px-3 text-lg"
        value={entry.familiarity}
        onChange={(event) => {
          updateSessionEntry(entry.id, { familiarity: event.target.value as Familiarity });
          onChange();
        }}
      >
        <option value="came_back">{familiarityLabel("came_back")}</option>
        <option value="needed_hint">{familiarityLabel("needed_hint")}</option>
        <option value="caregiver_helped">{familiarityLabel("caregiver_helped")}</option>
      </select>
      <label className="mt-4 block text-base">Correction</label>
      <input
        className="mt-1 min-h-12 w-full border border-border bg-background px-3 text-lg"
        defaultValue={entry.correction}
        placeholder="Rohan is the grandson. Arun is the son."
        onBlur={(event) => {
          updateSessionEntry(entry.id, { correction: event.target.value });
          onChange();
        }}
      />
      <label className="mt-4 block text-base">Your note</label>
      <textarea
        className="mt-1 w-full border border-border bg-background p-3 text-lg"
        rows={2}
        defaultValue={entry.caregiverNote}
        onBlur={(event) => {
          updateSessionEntry(entry.id, { caregiverNote: event.target.value });
          onChange();
        }}
      />
    </li>
  );
}
