import Image from "next/image";

export function WelcomeHero() {
  return (
    <section className="flex w-full flex-col overflow-hidden rounded-xl bg-espresso shadow-hero">
      <div className="relative -mb-6 h-48 w-full">
        <Image
          src="/images/hero-sanctuary.jpg"
          alt="Worshippers gathered in the sanctuary"
          fill
          priority
          sizes="(max-width: 480px) 100vw, 480px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-espresso via-espresso/60 to-espresso/0" />
        <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-espresso/80 px-3 py-1.5 shadow-field backdrop-blur-md">
          <Image src="/images/tkp-logo.png" alt="" width={27} height={27} className="size-[27px] object-cover" />
          <span className="text-[12px] leading-4 font-semibold tracking-[0.6px] text-gold-light uppercase">
            RCCG The King&apos;s Palace
          </span>
        </div>
      </div>

      <div className="relative flex flex-col gap-1 rounded-t-xl bg-espresso p-6">
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-gold/20 px-2.5 py-1">
          <Image src="/icons/sparkle.svg" alt="" width={12.8333} height={12.8333} />
          <span className="text-[12px] leading-4 font-semibold tracking-[0.96px] text-gold-light">
            First Time Visitor
          </span>
        </span>
        <h2 className="pt-1 font-display text-[28px] leading-9 font-semibold tracking-[-0.7px] text-gold-light">
          Welcome to RCCG The King’s Palace!
        </h2>
        <p className="pt-[3px] text-[15px] leading-[24.38px] text-parchment">
          We’re so glad you’re here. Take 60 seconds to fill out this form, so we can welcome and follow-up
          with you.
        </p>
      </div>
    </section>
  );
}
