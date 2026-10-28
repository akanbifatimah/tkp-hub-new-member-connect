import { Icon } from "@/components/Icon";

export function SuccessCard({ firstName }: { firstName?: string }) {
  return (
    <section
      role="status"
      className="relative w-full overflow-hidden rounded-xl bg-night p-6 shadow-toast"
    >
      <div aria-hidden className="absolute -right-6 -bottom-6 size-32 rounded-full bg-gold/10" />
      <div className="relative flex items-start gap-2">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-gold-light)_0%,var(--color-gold-deep)_100%)] shadow-hero">
          <Icon src="/icons/heart.svg" width={20} height={18.35} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-[12px] leading-4 font-semibold tracking-[0.6px] text-gold-light uppercase">
            Hospitality Reassurance
          </p>
          <h2 className="font-display text-[18px] leading-[24.75px] font-semibold text-ivory">
            {firstName ? `Welcome to the family, ${firstName}!` : "Welcome to the family!"}
          </h2>
          <p className="pt-0.5 text-[14px] leading-[22px] text-parchment">
            Someone from our welcome team will say hello this week. Please feel free to stop by the Hospitality
            Lounge after service for refreshments.
          </p>
        </div>
      </div>
    </section>
  );
}
