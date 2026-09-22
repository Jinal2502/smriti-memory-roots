"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

export function EditorialImage({
  src,
  alt,
  className,
  imgClassName,
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden bg-[#ece7dc]", className)}
      role="img"
      aria-label={alt}
    >
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={cn("h-full w-full object-cover", imgClassName)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#ece7dc,#d8d0c2)]" />
      )}
    </div>
  );
}
