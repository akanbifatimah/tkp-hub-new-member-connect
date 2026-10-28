import Image from "next/image";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 h-14 w-full bg-ivory/85 shadow-header backdrop-blur-[24px]">
      <div className="mx-auto flex h-14 max-w-[480px] items-center px-4">
        <div className="flex items-center gap-2">
          <Image src="/images/tkp-logo.png" alt="" width={27} height={27} className="size-[27px] object-cover" priority />
          <span className="font-display text-[16px] leading-[18px] font-semibold tracking-[-0.45px] text-ink">
            TKP Hub
          </span>
        </div>
      </div>
    </header>
  );
}
