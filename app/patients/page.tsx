import Link from "next/link";
import { PageMain, SmritiShell, TopBar } from "@/components/smriti/layout/SmritiShell";
import { EditorialImage } from "@/components/smriti/media/EditorialImage";
import { NamePortrait } from "@/components/smriti/media/NamePortrait";
import { getFeaturedPatient, getSupportingPatients } from "@/lib/memory/patients";
import { visuals } from "@/lib/memory/visuals";

export default function PatientsPage() {
  const featured = getFeaturedPatient();
  const others = getSupportingPatients();

  return (
    <SmritiShell>
      <div className="gamosa-band" aria-hidden />
      <TopBar backHref="/" backLabel="Home" title="Memory spaces" />
      <PageMain>
        <p className="text-sm tracking-[0.18em] text-primary uppercase">Choose a memory space</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          Anima Aita is the featured demonstration.
        </h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-muted-foreground">
          These are fictional profiles. They do not represent entire communities. SMRITI is designed
          for culturally and linguistically diverse communities across Northeast India.
        </p>

        <Link
          href={`/memory/${featured.id}?prepare=1`}
          className="mt-12 grid overflow-hidden border border-primary bg-card lg:grid-cols-[280px_1fr]"
        >
          <EditorialImage
            src={visuals.anima}
            alt="Anima Aita, featured Assam demonstration profile"
            className="aspect-[4/5] lg:aspect-auto"
          />
          <div className="flex flex-col justify-center gap-4 p-8">
            <p className="text-sm tracking-[0.18em] text-primary uppercase">
              Featured demonstration · Assam
            </p>
            <h2 className="font-serif text-4xl">{featured.preferredName}</h2>
            <p className="text-lg text-muted-foreground">
              {featured.age} · {featured.city} · {featured.primaryLanguage}
            </p>
            <p className="max-w-xl text-lg leading-relaxed">
              Family evenings, Assam tea, the Brahmaputra, Bihu, and stories for her grandson Rohan.
            </p>
            <p className="text-base font-medium text-primary">Enter her memory space</p>
          </div>
        </Link>

        <h2 className="mt-16 font-serif text-2xl">Other demonstration profiles</h2>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          These show that SMRITI can hold more than one person&apos;s world. Their memory spaces are not fully built for this demo.
        </p>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {others.map((patient) => (
            <li key={patient.id}>
              <Link href={`/memory/${patient.id}`} className="flex items-center gap-4 py-4 hover:bg-card">
                <NamePortrait name={patient.preferredName} className="size-14 shrink-0" />
                <div>
                  <p className="text-xl text-foreground">{patient.preferredName}</p>
                  <p className="text-base text-muted-foreground">
                    {patient.age} · {patient.state} · {patient.primaryLanguage}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </PageMain>
    </SmritiShell>
  );
}
