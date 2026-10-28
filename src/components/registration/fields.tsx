import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

const errorRing = "ring-1 ring-danger";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-[12px] leading-4 text-danger">
      {message}
    </p>
  );
}

type IconFieldProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  icon: { src: string; width: number; height: number };
  error?: string;
};

/** Cream, icon-led input used in the "Your Contact Details" card. */
export function IconField({ id, label, hint, required, icon, error, className = "", ...inputProps }: IconFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex w-full items-center justify-between">
        <label htmlFor={id} className="text-[13px] leading-[18px] font-medium text-ink">
          {label}
          {required && <span className="text-gold-ink"> *</span>}
        </label>
        {hint && <span className="text-[12px] leading-4 tracking-[0.96px] text-muted">{hint}</span>}
      </div>
      <div className="relative flex w-full items-center">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required={required}
          className={`h-12 w-full rounded-field bg-cream pr-4 pl-11 font-body text-[15px] text-ink shadow-field outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-gold ${
            error ? errorRing : ""
          } ${className}`}
          {...inputProps}
        />
        <span className="pointer-events-none absolute left-4 flex w-[17px] justify-center">
          <Image src={icon.src} alt="" width={icon.width} height={icon.height} />
        </span>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

const plainBase =
  "w-full bg-white text-[15px] leading-[22px] text-ink-soft shadow-field outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-gold";

export function PlainInput({ error, className = "", ...props }: ComponentProps<"input"> & { error?: boolean }) {
  return <input className={`${plainBase} rounded-lg ${error ? errorRing : ""} ${className}`} {...props} />;
}

export function PlainTextarea({ className = "", ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      rows={3}
      className={`${plainBase} min-h-[98px] resize-y rounded-lg px-4 pt-4 pb-2 ${className}`}
      {...props}
    />
  );
}

type ChoiceProps = ComponentProps<"input"> & { children: ReactNode; className?: string };

/** A visually-styled radio option; selected styling is driven by `has-checked:` on the label. */
export function Choice({ children, className = "", ...radioProps }: ChoiceProps) {
  return (
    <label
      className={`cursor-pointer select-none has-focus-visible:ring-2 has-focus-visible:ring-gold-deep ${className}`}
    >
      <input type="radio" className="sr-only" {...radioProps} />
      {children}
    </label>
  );
}
