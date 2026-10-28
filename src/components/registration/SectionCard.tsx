import Image from "next/image";
import type { ReactNode } from "react";

type Icon = { src: string; width: number; height: number };

type SectionCardProps = {
  id: string;
  title: string;
  children: ReactNode;
  description?: ReactNode;
  /** "feature" cards carry an icon badge and Fraunces heading; "step" cards carry a numbered badge. */
  badge: { icon: Icon } | { step: number };
  optional?: boolean;
  className?: string;
};

export function SectionCard({ id, title, description, badge, optional, className = "", children }: SectionCardProps) {
  const headingId = `${id}-heading`;
  const isFeature = "icon" in badge;

  return (
    <section
      aria-labelledby={headingId}
      className={`flex w-full flex-col bg-sand p-6 ${
        isFeature ? "rounded-card drop-shadow-card" : "rounded-xl drop-shadow-hairline"
      } ${className}`}
    >
      <div className={`flex w-full items-center ${isFeature ? "gap-2.5" : "gap-2"}`}>
        {isFeature ? (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20">
            <Image src={badge.icon.src} alt="" width={badge.icon.width} height={badge.icon.height} />
          </span>
        ) : (
          <span
            aria-hidden
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-[14px] leading-5 font-semibold text-gold-deep"
          >
            {badge.step}
          </span>
        )}
        <div className="flex min-w-0 flex-col">
          <h2
            id={headingId}
            className={
              isFeature
                ? "font-heading text-[20px] leading-7 font-semibold text-ink [font-variation-settings:'SOFT'_0,'WONK'_1]"
                : "font-display text-[18px] leading-6 font-semibold text-ink-soft"
            }
          >
            {title}
            {optional && <span className="ml-1 font-sans text-[13px] leading-[18px] font-normal text-muted">(Optional)</span>}
          </h2>
          {isFeature && description && (
            <p className="font-body text-[15px] leading-[22px] text-body">{description}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}
