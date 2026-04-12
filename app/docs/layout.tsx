import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout 
        tree={source.pageTree} 
        nav={{ 
          title: (
            <div className="flex items-center gap-2.5">
              <Image 
                src="https://ucshdejvxzanuxlxrano.supabase.co/storage/v1/object/public/herald-public-asset/herald-logo.svg" 
                alt="Herald Logo" 
                width={24} 
                height={24} 
                className="rounded-sm"
              />
              <span className="font-display font-bold tracking-tight text-lg text-fd-foreground">Herald Docs</span>
            </div>
          )
        }}
    >
      {children}
    </DocsLayout>
  );
}
