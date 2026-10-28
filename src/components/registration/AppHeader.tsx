import Image from "next/image";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 h-14 w-full bg-ivory/85 shadow-header backdrop-blur-[24px]">
      <div className="mx-auto flex h-14 max-w-[480px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image src="/images/tkp-logo.png" alt="" width={27} height={27} className="size-[27px] object-cover" priority />
          <span className="font-display text-[16px] leading-[18px] font-semibold tracking-[-0.45px] text-ink">
            TKP Hub
          </span>
        </div>

        <div className="flex items-center gap-2" aria-hidden>
          <span className="relative flex size-11 items-center justify-center rounded-full">
            <Image src="/icons/bell.svg" alt="" width={14.6667} height={18.3333} />
            <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-gold shadow-[0_0_0_2px_var(--color-ivory)]" />
          </span>
          <span className="relative flex size-[34px] items-center justify-center rounded-full bg-sand drop-shadow-hairline">
            <span className="relative size-[34px] overflow-hidden rounded-full">
              <Image
                src="/images/avatar.jpg"
                alt=""
                width={80}
                height={143}
                className="absolute top-[-39.51%] left-0 h-[179.02%] w-full max-w-none"
              />
            </span>
            <span className="absolute right-0 bottom-1 size-2.5 rounded-full bg-success shadow-[0_0_0_2px_var(--color-cream)]" />
          </span>
        </div>
      </div>
    </header>
  );
}
