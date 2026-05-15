import type { Metadata } from "next";
import ErrorView from "@/components/marketing/shared/ErrorView";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Unauthorized | Herald",
  description: "You do not have permission to access this page.",
  robots: { index: false, follow: false },
};

export default function UnauthorizedPage() {
  return (
    <ErrorView
      icon={<ShieldAlert className="text-amber-500" size={40} />}
      code="401"
      title="Access Restricted"
      message="Your current session does not hold the necessary authorization to view this internal relay. Access has been disallowed."
      action={{
        label: "Secure Authentication",
        href: "/",
      }}
    />
  );
}
