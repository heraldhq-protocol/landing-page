'use client';

interface Props {
  overallStatus: 'operational' | 'degraded' | 'major_outage';
  lastUpdated: string;
}

const statusConfig = {
  operational: {
    label: 'All Systems Operational',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  degraded: {
    label: 'Degraded Performance',
    color: 'bg-amber-500',
    textColor: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  major_outage: {
    label: 'Major System Outage',
    color: 'bg-rose-500',
    textColor: 'text-rose-700 dark:text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
  },
};

export default function StatusHeader({ overallStatus }: Props) {
  const config = statusConfig[overallStatus];

  return (
    <div className={`w-full rounded-2xl p-6 sm:p-10 border ${config.borderColor} ${config.bgColor} backdrop-blur-xl shadow-2xl shadow-black/5`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="relative">
          <div className={`w-5 h-5 rounded-full ${config.color} animate-ping absolute opacity-75`} />
          <div className={`w-5 h-5 rounded-full ${config.color} relative shadow-[0_0_15px_rgba(0,0,0,0.2)]`} />
        </div>
        <div>
          <h1 className={`text-2xl sm:text-4xl font-bold tracking-tight ${config.textColor}`}>
            {config.label}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium opacity-80">
            Real-time monitoring for the Herald Protocol infrastructure
          </p>
        </div>
      </div>
    </div>
  );
}
