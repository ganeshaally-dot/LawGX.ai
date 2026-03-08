import Image from "next/image";
import { cn } from "@/lib/utils";

type LawGXLogoProps = {
  compact?: boolean;
  className?: string;
};

export function LawGXLogo({ compact = false, className }: LawGXLogoProps) {
  if (compact) {
    return (
      <Image
        src="/lawgx-mark.svg"
        alt="LawGX logo"
        width={44}
        height={44}
        className={cn("h-11 w-11", className)}
        priority
      />
    );
  }

  return (
    <Image
      src="/lawgx-logo.svg"
      alt="LawGX Law Governance Execution"
      width={760}
      height={200}
      className={cn("h-auto w-full max-w-[240px]", className)}
      priority
    />
  );
}