import { cn } from "@/lib/utils";

export function NamePortrait({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "S";
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#9c3b2c] text-[#fffdf8]",
        className
      )}
      aria-hidden
    >
      <span className="font-serif text-4xl">{initial}</span>
    </div>
  );
}
