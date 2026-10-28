import { Icon } from "@/components/Icon";
import type { ReactNode } from "react";

type SectionCardProps = {
  id: string;
  title: string;
  icon: { src: string; width: number; height: number };
  children: ReactNode;
  description?: ReactNode;
  optional?: boolean;
  className?: string;
};

export function SectionCard({ id, title, icon, description, optional, className = "", children }: SectionCardProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={`flex w-full flex-col rounded-card bg-sand p-6 drop-shadow-card ${className}`}
    >
      <div className="flex w-full items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20">
          <Icon src={icon.src} width={icon.width} height={icon.height} />
        </span>
        <div className="flex min-w-0 flex-col">
          <h2
            id={headingId}
            className="font-heading text-[20px] leading-7 font-semibold text-ink [font-variation-settings:'SOFT'_0,'WONK'_1]"
          >
            {title}
            {optional && (
              <span className="ml-1 font-sans text-[13px] leading-[18px] font-normal text-muted">(Optional)</span>
            )}
          </h2>
          {description && <p className="font-body text-[15px] leading-[22px] text-body">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
