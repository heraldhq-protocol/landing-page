import React from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

interface ErrorViewProps {
  icon: React.ReactNode;
  code?: string;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

export default function ErrorView({ icon, code, title, message, action }: ErrorViewProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-colors" />
            <div className="relative w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl shadow-2xl">
              {icon}
            </div>
          </div>

          <div className="space-y-3">
            {code && (
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-500/60 font-mono">
                System Code: {code}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter font-display leading-tight">
              {title}
            </h1>
            <p className="text-gray-400 font-medium text-lg max-w-md mx-auto leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {action?.href ? (
            <Link
              href={action.href}
              className="px-8 py-3 bg-white text-black rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95 uppercase tracking-widest flex items-center gap-2"
            >
              {action.label}
            </Link>
          ) : action?.onClick ? (
            <button
              onClick={action.onClick}
              className="px-8 py-3 bg-white text-black rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95 uppercase tracking-widest flex items-center gap-2"
            >
              {action.label}
            </button>
          ) : (
             <Link
              href="/"
              className="px-8 py-3 bg-white text-black rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95 uppercase tracking-widest flex items-center gap-2"
            >
              Return to Relay
            </Link>
          )}

          <Link
            href="/status"
            className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all active:scale-95 uppercase tracking-widest"
          >
            System Status
          </Link>
        </div>
      </div>

      {/* Footer link back */}
      <div className="mt-20 flex items-center gap-2 text-gray-500 hover:text-white transition-colors cursor-default group">
        <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <Link href="/" className="text-xs font-bold uppercase tracking-widest">Back to Frontline</Link>
      </div>
    </main>
  );
}
