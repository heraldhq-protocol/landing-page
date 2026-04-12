import UserHero from "@/components/marketing/users/UserHero";
import PrivacyExplainer from "@/components/marketing/users/PrivacyExplainer";
import RegistrationGuide from "@/components/marketing/users/RegistrationGuide";
import FinalCTA from "@/components/marketing/home/FinalCTA";
import LogoMarquee from "@/components/marketing/home/LogoMarquee";

export default function ForUsersPage() {
  return (
    <div className="flex flex-col">
      <UserHero />
      <PrivacyExplainer />
      <RegistrationGuide />
      <div className="py-24 text-center border-t border-border/30">
         <h2 className="text-3xl md:text-4xl font-bold font-display mb-8">Already integrated with Herald</h2>
         <LogoMarquee />
      </div>
      <FinalCTA />
    </div>
  );
}
