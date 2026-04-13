'use client';

import { useEffect } from 'react';
import ErrorView from "@/components/marketing/shared/ErrorView";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorView
      icon={<AlertTriangle className="w-10 h-10 text-rose-500" />}
      code="500"
      title="Relay Anomaly"
      message="A critical interruption occurred within the notification layer. Our engineers have been alerted to the breakdown."
      action={{
        label: "Re-sync Signal",
        onClick: () => reset(),
      }}
    />
  );
}
