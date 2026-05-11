"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import NavBar from "@/components/marketing/shared/NavBar";
import Footer from "@/components/marketing/shared/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="dark flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="grow"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
