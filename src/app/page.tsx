import { AppHeader } from "@/components/registration/AppHeader";
import { PageTitleBar } from "@/components/registration/PageTitleBar";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { WelcomeHero } from "@/components/registration/WelcomeHero";

export default function GuestRegistrationPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col bg-cream pt-2 pb-10">
        <PageTitleBar title="Guest Registration" />
        <div className="flex w-full flex-col gap-6 px-4 pt-4">
          <WelcomeHero />
          <RegistrationForm />
        </div>
      </main>
    </>
  );
}
