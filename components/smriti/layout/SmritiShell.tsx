import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type TopBarProps = {
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  title?: string;
  meta?: string;
  action?: React.ReactNode;
};

export function TopBar({
  backHref,
  backLabel = "Back",
  eyebrow = "SMRITI",
  title = "Memory Roots",
  meta,
  action,
}: TopBarProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex min-w-0 items-start gap-4">
          {backHref ? (
            <Link
              href={backHref}
              className="mt-0.5 inline-flex min-h-11 items-center gap-2 text-base text-foreground hover:underline"
            >
              <ArrowLeft className="size-5" aria-hidden />
              <span>{backLabel}</span>
            </Link>
          ) : null}
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
              {eyebrow}
            </p>
            <p className="font-serif text-2xl leading-tight text-foreground">{title}</p>
            {meta ? <p className="mt-1 text-base text-muted-foreground">{meta}</p> : null}
          </div>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </header>
  );
}

export function SmritiShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      {children}
    </div>
  );
}

export function PageMain({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14", className)}>
      {children}
    </main>
  );
}
