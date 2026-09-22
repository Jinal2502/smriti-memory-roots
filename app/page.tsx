import Link from "next/link";
import { PageMain, SmritiShell } from "@/components/smriti/layout/SmritiShell";
import { EditorialImage } from "@/components/smriti/media/EditorialImage";
import { visuals } from "@/lib/memory/visuals";

export default function LandingPage() {
  return (
    <SmritiShell>
      <div className="gamosa-band" aria-hidden />
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <p className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
              SMRITI
            </p>
            <p className="font-serif text-2xl">Memory Roots</p>
          </div>
          <Link href="/patients" className="btn-primary min-h-12 px-5 text-base">
            Enter Memory Space
          </Link>
        </div>
      </header>

      <PageMain className="space-y-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
              Northeast India
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.12] text-foreground sm:text-6xl">
              Memories feel closer when they feel familiar.
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground">
              A personalized cognitive memory companion built around the people, places,
              languages and everyday moments that matter most.
            </p>
            <p className="mt-5 max-w-xl text-lg text-foreground">
              Designed with Northeast India in mind — for culturally and linguistically
              diverse communities across the region.
            </p>
            <p className="mt-3 text-base text-muted-foreground">
              Demonstration experience · Assam
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/patients" className="btn-primary">
                Enter Memory Space
              </Link>
              <Link href="#experience" className="btn-secondary">
                Explore the experience
              </Link>
            </div>
          </div>
          <figure>
            <EditorialImage
              src={visuals.motherSon}
              alt="Mother and son from Assam in Bihu dress — a family moment"
              className="aspect-[4/5] max-h-[540px] border border-border"
            />
            <figcaption className="mt-3 text-base text-muted-foreground">
              Family is the heart of a memory space. Demonstration photograph from Assam.
            </figcaption>
          </figure>
        </section>

        <section className="grid gap-6 border-y border-border py-10 sm:grid-cols-4">
          {[
            { src: visuals.teaGarden, label: "Assam tea gardens" },
            { src: visuals.brahmaputra, label: "The Brahmaputra" },
            { src: visuals.gamosa, label: "The gamosa" },
            { src: visuals.bihu, label: "Bihu" },
          ].map((item) => (
            <figure key={item.label}>
              <EditorialImage src={item.src} alt={item.label} className="aspect-[16/10] border border-border" />
              <figcaption className="mt-2 text-base text-foreground">{item.label}</figcaption>
            </figure>
          ))}
        </section>

        <section id="experience" className="scroll-mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm tracking-[0.18em] text-muted-foreground uppercase">Featured demonstration</p>
            <h2 className="mt-3 font-serif text-4xl">Anima Aita</h2>
            <p className="mt-2 text-lg text-muted-foreground">71 · Guwahati, Assam · Assamese</p>
            <p className="mt-5 text-lg leading-relaxed">
              A fictional grandmother whose memory world is built from family names, Assam tea,
              the river, pitha, Bihu music and evening talk. SMRITI never diagnoses. It only
              returns what belongs to her.
            </p>
            <Link href="/memory/patient_demo_001?prepare=1" className="btn-primary mt-8">
              Enter Anima Aita&apos;s space
            </Link>
          </div>
          <EditorialImage
            src={visuals.anima}
            alt="Elderly Assamese woman, used as the demonstration portrait for Anima Aita"
            className="aspect-[4/5] max-h-[420px] border border-border"
          />
        </section>

        <section>
          <h2 className="font-serif text-4xl">Gentle activities, not tests</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Each activity works differently. Remember is the one that uses voice and Anima&apos;s own memories.
          </p>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              ["Remember", "Speak or choose — voice becomes a grounded answer."],
              ["Recognize", "Find a familiar person by name."],
              ["Put it together", "Arrange a morning in the usual order."],
              ["Match", "Connect people and things that belong together."],
              ["Talk", "Share a place or a story aloud."],
            ].map(([title, copy], index) => (
              <li key={title} className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">0{index + 1}</p>
                <h3 className="mt-1 font-serif text-2xl">{title}</h3>
                <p className="mt-2 text-lg text-muted-foreground">{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border border-border bg-card p-8">
          <h2 className="font-serif text-3xl">How a spoken memory is answered</h2>
          <ol className="mt-6 space-y-3 text-lg">
            <li>1. She speaks.</li>
            <li>2. Speech is understood.</li>
            <li>3. Only Anima Aita&apos;s memories are searched.</li>
            <li>4. A warm answer is spoken back — never invented family facts.</li>
          </ol>
        </section>
      </PageMain>
    </SmritiShell>
  );
}
