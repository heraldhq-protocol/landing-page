"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "How it works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 w-full pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-500 w-full max-w-4xl rounded-full px-4 py-3 flex items-center justify-between ${
            isScrolled || mobileMenuOpen
              ? "bg-bg-surface/80 backdrop-blur-xl border border-border shadow-2xl"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* ── Brand ─────────────────────────────────────────────────── */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group pl-2"
          >
            <div className="relative w-7 h-7">
              {/* Glow behind logo */}
              <div className="absolute inset-0 bg-teal blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg" />
              {/* <div className="relative w-7 h-7 bg-teal rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <span className="text-xs font-black text-bg-base tracking-tighter">H</span>
              </div> */}
              <Image width={28} height={28} src={'/logo_icon.svg'} alt="Herald Logo" priority/>
            </div>
            <span className="text-base font-bold tracking-tight text-text-primary font-display">
              Herald
            </span>
          </Link>

          {/* ── Desktop nav links ──────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200 rounded-full hover:bg-white/5"
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
              className="bg-teal text-bg-base hover:bg-teal/90 font-bold rounded-full px-5 h-8 text-xs shadow-[0_0_20px_rgba(0,200,150,0.2)] hover:shadow-[0_0_30px_rgba(0,200,150,0.35)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link href="https://notify.herald.xyz/register">Register →</Link>
            </Button>
          </div>

          {/* ── Mobile toggle ─────────────────────────────────────────── */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Fullscreen Menu ─────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-bg-base/95 backdrop-blur-3xl pt-32 px-6 pb-8 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-extrabold text-text-secondary hover:text-teal transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/for-protocols"
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-display font-extrabold text-teal transition-colors mt-6 pt-6 border-t border-border/50"
            >
              For Protocols
            </Link>
          </div>

          <div className="mt-12 flex flex-col gap-4">
            <Button className="w-full bg-teal text-bg-base font-bold h-14 rounded-2xl shadow-[0_0_30px_rgba(0,200,150,0.2)] text-lg">
              Register your wallet →
            </Button>
            <p className="text-center text-xs text-text-muted mt-4">
              © 2026 Herald Protocol
            </p>
          </div>
        </div>
      )}
    </>
  );
}