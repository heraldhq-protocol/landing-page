"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How it works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-bg-base/85 backdrop-blur-xl border-b border-border py-3 shadow-[0_1px_0_0_rgba(14,42,61,0.8)]"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">

        {/* ── Brand ─────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            {/* Glow behind logo */}
            <div className="absolute inset-0 bg-teal blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg" />
            <div className="relative w-8 h-8 bg-teal rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <span className="text-sm font-black text-bg-base tracking-tighter">H</span>
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-text-primary font-display">
            Herald
          </span>
        </Link>

        {/* ── Desktop nav links ──────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200 rounded-md hover:bg-bg-surface"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ── Desktop CTAs ───────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/for-protocols"
            className="text-sm font-medium text-text-muted hover:text-teal transition-colors duration-200 flex items-center gap-1 group"
          >
            For Protocols
            <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </Link>
          <Button
            asChild
            className="bg-teal text-bg-base hover:bg-teal/90 font-bold rounded-lg px-5 h-9 text-sm shadow-[0_0_20px_rgba(0,200,150,0.2)] hover:shadow-[0_0_30px_rgba(0,200,150,0.35)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Link href="https://notify.herald.xyz/register">Register →</Link>
          </Button>
        </div>

        {/* ── Mobile toggle ─────────────────────────────────────────── */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-2 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg-surface/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
            <Link
              href="/for-protocols"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 text-base font-medium text-text-muted hover:text-teal rounded-lg transition-colors"
            >
              For Protocols
            </Link>
            <Button className="w-full bg-teal text-bg-base font-bold h-12 rounded-xl shadow-[0_0_20px_rgba(0,200,150,0.2)]">
              Register your wallet →
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}