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
          icon={<ZapOff className="text-rose-500" size={40} />}
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
