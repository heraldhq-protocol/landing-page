import ErrorView from "@/components/marketing/shared/ErrorView";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <ErrorView
      icon={<ShieldAlert className="w-10 h-10 text-amber-500" />}
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
