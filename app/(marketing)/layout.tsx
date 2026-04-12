import NavBar from "@/components/marketing/shared/NavBar";
import Footer from "@/components/marketing/shared/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <NavBar />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}