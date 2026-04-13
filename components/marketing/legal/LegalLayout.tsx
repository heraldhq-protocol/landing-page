"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  updatedAt: string;
  version: string;
}

export default function LegalLayout({ children, title, updatedAt, version }: LegalLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-bg-base relative min-h-screen selection:bg-teal/30 selection:text-teal font-sans">
      {/* Background texture */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-teal/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Floating accent glows */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-teal/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-3/4 -right-64 w-96 h-96 bg-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header section */}
          <div ref={headerRef} className="mb-16 border-b border-border/50 pb-12 relative">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-[10px] font-bold uppercase tracking-[0.2em]">
                Legal Protocol
              </span>
              <span className="px-3 py-1 rounded-full bg-bg-surface border border-border/50 text-text-muted text-[10px] font-mono tracking-wider">
                REV {version}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-8 tracking-tighter leading-[0.9] text-glow">
              {title}
            </h1>
            
            <div className="flex items-center gap-6 text-xs text-text-muted font-mono tracking-[0.1em] uppercase">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                <span>Effective: {updatedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple" />
                <span>Issuer: Herald Protocol</span>
              </div>
            </div>
          </div>
          
          {/* Content section */}
          <div ref={contentRef} className="relative">
            <div className="prose prose-invert prose-teal max-w-none 
              prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tighter
              prose-h2:text-3xl prose-h2:mt-24 prose-h2:mb-8 prose-h2:pt-8 prose-h2:border-t prose-h2:border-border/20 prose-h2:text-text-primary
              prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-text-secondary
              prose-p:text-text-secondary/90 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
              prose-li:text-text-secondary/90 prose-li:text-lg prose-li:mb-3
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-l-teal prose-blockquote:bg-teal/5 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-text-primary prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:my-12
              prose-table:border prose-table:border-border/30 prose-table:rounded-2xl prose-table:overflow-hidden prose-table:my-12
              prose-th:bg-bg-surface prose-th:px-6 prose-th:py-4 prose-th:text-text-primary prose-th:text-[10px] prose-th:uppercase prose-th:tracking-[0.2em] prose-th:font-bold prose-th:border-b prose-th:border-border/30
              prose-td:px-6 prose-td:py-4 prose-td:border-t prose-td:border-border/10 prose-td:text-sm prose-td:text-text-secondary
              prose-hr:my-20 prose-hr:border-border/20
            ">
              {children}
            </div>
          </div>

          {/* Footer - Legal specific */}
          <div className="mt-32 pt-16 border-t border-border/30">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="max-w-md">
                <h4 className="text-text-primary font-bold mb-4 uppercase tracking-widest text-xs">Compliance Verification</h4>
                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  Herald Protocol's privacy architecture is open-source and cryptographically attested. 
                  Users and protocol teams can verify our technical guarantees at 
                  <a href="https://github.com/herald-protocol" className="text-teal hover:underline ml-1">github.com/herald-protocol</a>.
                </p>
                <p className="text-xs text-text-muted italic">
                  © 2026 Herald Protocol. Federal University of Technology, Owerri, Imo State, Nigeria.
                </p>
              </div>
              
              <div className="bg-bg-surface p-8 rounded-2xl border border-border/50 backdrop-blur-sm">
                <h4 className="text-text-primary font-bold mb-3 text-sm">Regulatory Contact</h4>
                <p className="text-xs text-text-muted mb-4 leading-relaxed">
                  Direct all privacy and regulatory inquiries to our data protection team.
                </p>
                <a href="mailto:privacy@useherald.xyz" className="inline-flex items-center gap-2 text-teal font-bold hover:gap-3 transition-all">
                  privacy@useherald.xyz
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
