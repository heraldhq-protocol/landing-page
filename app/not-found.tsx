import ErrorView from "@/components/marketing/shared/ErrorView";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <ErrorView
      icon={<Search className="text-blue-500" size={40} />}
      code="404"
      title="Lost in the Relay"
      message="The requested coordinates do not exist within the Herald Protocol. This notification path remains unmapped."
    />
  );
}
