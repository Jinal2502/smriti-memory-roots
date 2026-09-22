"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MemoryLoading } from "@/components/smriti/memory/MemoryLoading";
import { AnimaWorld, SupportingProfile } from "@/components/smriti/memory/AnimaWorld";
import { PageMain } from "@/components/smriti/layout/SmritiShell";
import { isFeaturedPatient } from "@/lib/memory/patients";
import type { Patient } from "@/lib/memory/types";

export function MemoryWorld({ patient }: { patient: Patient }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const featured = isFeaturedPatient(patient.id);
  const [preparing, setPreparing] = useState(
    featured && searchParams.get("prepare") === "1"
  );

  const finish = useCallback(() => {
    setPreparing(false);
    router.replace(`/memory/${patient.id}`);
  }, [patient.id, router]);

  if (preparing) {
    return (
      <PageMain>
        <MemoryLoading name={patient.preferredName} onDone={finish} />
      </PageMain>
    );
  }

  return (
    <PageMain>
      {featured ? <AnimaWorld patient={patient} /> : <SupportingProfile patient={patient} />}
    </PageMain>
  );
}
