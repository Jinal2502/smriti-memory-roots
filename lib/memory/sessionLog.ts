export type SessionActivity = "remember" | "talk" | "recognize" | "sequence" | "match";

export type Familiarity = "came_back" | "needed_hint" | "caregiver_helped";

export type SessionEntry = {
  id: string;
  at: string;
  patientId: string;
  activity: SessionActivity;
  prompt: string;
  heard: string;
  smritiSaid?: string;
  familiarity: Familiarity;
  caregiverNote: string;
  correction: string;
};

export type CarePlan = {
  tryRohanAgain: boolean;
  eveningTeaPhotos: boolean;
  shorterQuestions: boolean;
  moreVoice: boolean;
  gardenWalk: boolean;
  nextSessionNote: string;
};

const ENTRIES_KEY = "smriti-session-entries";
const PLAN_KEY = "smriti-care-plan";

const defaultPlan = (): CarePlan => ({
  tryRohanAgain: true,
  eveningTeaPhotos: false,
  shorterQuestions: true,
  moreVoice: true,
  gardenWalk: false,
  nextSessionNote: "",
});

export function loadSessionEntries(patientId: string): SessionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ENTRIES_KEY);
    const all = raw ? (JSON.parse(raw) as SessionEntry[]) : [];
    return all.filter((entry) => entry.patientId === patientId);
  } catch {
    return [];
  }
}

export function saveSessionEntry(
  entry: Pick<SessionEntry, "patientId" | "activity" | "prompt" | "heard"> &
    Partial<SessionEntry>
) {
  const next: SessionEntry = {
    familiarity: "came_back",
    caregiverNote: "",
    correction: "",
    smritiSaid: "",
    ...entry,
    id: entry.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    at: entry.at || new Date().toISOString(),
  };
  const raw = window.localStorage.getItem(ENTRIES_KEY);
  const all = raw ? (JSON.parse(raw) as SessionEntry[]) : [];
  window.localStorage.setItem(ENTRIES_KEY, JSON.stringify([next, ...all].slice(0, 80)));
  return next;
}

export function updateSessionEntry(id: string, patch: Partial<SessionEntry>) {
  const raw = window.localStorage.getItem(ENTRIES_KEY);
  const all = raw ? (JSON.parse(raw) as SessionEntry[]) : [];
  const next = all.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry));
  window.localStorage.setItem(ENTRIES_KEY, JSON.stringify(next));
}

export function loadCarePlan(patientId: string): CarePlan {
  if (typeof window === "undefined") return defaultPlan();
  try {
    const raw = window.localStorage.getItem(`${PLAN_KEY}-${patientId}`);
    return raw ? { ...defaultPlan(), ...(JSON.parse(raw) as CarePlan) } : defaultPlan();
  } catch {
    return defaultPlan();
  }
}

export function saveCarePlan(patientId: string, plan: CarePlan) {
  window.localStorage.setItem(`${PLAN_KEY}-${patientId}`, JSON.stringify(plan));
}

export function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function localDateKey(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso.slice(0, 10);
  return todayKey(date);
}

export function entriesForDate(patientId: string, dateKey: string) {
  return loadSessionEntries(patientId).filter((entry) => localDateKey(entry.at) === dateKey);
}

export type FamilyAsk = {
  id: string;
  question: string;
  asked: boolean;
  familyNote: string;
};

export type DailyReport = {
  date: string;
  patientId: string;
  mood: string;
  energy: string;
  checkins: {
    recognize: boolean;
    sequence: boolean;
    match: boolean;
  };
  familyAsks: FamilyAsk[];
  dayNote: string;
};

const REPORT_KEY = "smriti-daily-reports";

function defaultAsks(): FamilyAsk[] {
  return [
    {
      id: "mitali-tea",
      question: "Can Mitali confirm how often she sits for evening tea?",
      asked: false,
      familyNote: "",
    },
    {
      id: "rohan-photo",
      question: "Can the family share a recent photograph of Rohan for Remember?",
      asked: false,
      familyNote: "",
    },
    {
      id: "arun-visit",
      question: "Did Arun visit or help with errands this week?",
      asked: false,
      familyNote: "",
    },
  ];
}

export function defaultDailyReport(patientId: string, date: string): DailyReport {
  return {
    date,
    patientId,
    mood: "calm",
    energy: "gentle",
    checkins: { recognize: false, sequence: false, match: false },
    familyAsks: defaultAsks(),
    dayNote: "",
  };
}

export function loadDailyReport(patientId: string, date: string): DailyReport {
  if (typeof window === "undefined") return defaultDailyReport(patientId, date);
  try {
    const raw = window.localStorage.getItem(REPORT_KEY);
    const all = raw ? (JSON.parse(raw) as DailyReport[]) : [];
    return (
      all.find((report) => report.patientId === patientId && report.date === date) ??
      defaultDailyReport(patientId, date)
    );
  } catch {
    return defaultDailyReport(patientId, date);
  }
}

export function saveDailyReport(report: DailyReport) {
  const raw = window.localStorage.getItem(REPORT_KEY);
  const all = raw ? (JSON.parse(raw) as DailyReport[]) : [];
  const next = [
    report,
    ...all.filter((item) => !(item.patientId === report.patientId && item.date === report.date)),
  ].slice(0, 60);
  window.localStorage.setItem(REPORT_KEY, JSON.stringify(next));
}

export function listReportDates(patientId: string): string[] {
  if (typeof window === "undefined") return [todayKey()];
  const fromEntries = loadSessionEntries(patientId).map((entry) => localDateKey(entry.at));
  try {
    const raw = window.localStorage.getItem(REPORT_KEY);
    const all = raw ? (JSON.parse(raw) as DailyReport[]) : [];
    const fromReports = all.filter((report) => report.patientId === patientId).map((report) => report.date);
    return Array.from(new Set([todayKey(), ...fromReports, ...fromEntries])).sort().reverse();
  } catch {
    return [todayKey()];
  }
}

export function familiarityLabel(value: Familiarity) {
  if (value === "came_back") return "Came back easily";
  if (value === "needed_hint") return "Needed a hint";
  return "Caregiver helped";
}
