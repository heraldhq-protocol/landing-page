import { LucideIcon } from "lucide-react";

export default function FeatureIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative group">
      {/* The "Herald Glow" effect */}
      <div className="absolute inset-0 bg-teal/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-card-2 border border-border-alt group-hover:border-teal/50 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-teal/10 transition-all duration-300">
        <Icon className="w-6 h-6 text-text-secondary group-hover:text-teal transition-colors" />
      </div>
    </div>
  );
}