import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24">
      <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">SMRITI</p>
      <h1 className="mt-4 font-serif text-4xl">This memory space could not be found.</h1>
      <Link href="/patients" className="mt-8 inline-flex min-h-12 items-center underline">
        Choose a memory space
      </Link>
    </main>
  );
}
