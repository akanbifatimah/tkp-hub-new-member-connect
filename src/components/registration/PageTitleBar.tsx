"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function PageTitleBar({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex h-16 w-full items-center gap-[2px] px-4">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors hover:bg-sand focus-visible:outline-2 focus-visible:outline-gold-deep"
      >
        <Image src="/icons/arrow-back.svg" alt="" width={16} height={16} />
      </button>
      <h1 className="truncate font-display text-[18px] leading-6 font-semibold tracking-[-0.45px] text-ink-soft">
        {title}
      </h1>
    </div>
  );
}
