import { type LucideIcon, Package } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = Package,
  title,
  message,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  const action = actionHref
    ? { as: Link, href: actionHref }
    : { as: "button", onClick: onAction };

  return (
    <div className="max-w-2xl text-center py-16 sm:py-24 px-4 mx-auto">
      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-bg-surface border border-bg-border mb-6">
        <Icon className="text-text-muted" size={28} />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold font-display mb-3 sm:mb-4 text-text-primary">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-text-secondary max-w-md mx-auto">
        {message}
      </p>
      {actionLabel && (
        <div className="mt-8">
          <action.as
            href={actionHref ?? ""}
            onClick={onAction}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-navy font-bold rounded-xl hover:scale-105 transition-transform text-sm"
          >
            {actionLabel}
          </action.as>
        </div>
      )}
    </div>
  );
}
