'use client';

import ErrorView from "@/components/marketing/shared/ErrorView";
import { ZapOff } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorView
          icon={<ZapOff className="w-10 h-10 text-rose-500" />}
          code="CRITICAL"
          title="Core Failure"
          message="The Herald backbone has suffered a catastrophic failure. Manual reset required."
          action={{
            label: "Force Reboot",
            onClick: () => reset(),
          }}
        />
      </body>
    </html>
  );
}
