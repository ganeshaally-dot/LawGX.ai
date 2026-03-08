import Image from "next/image";
import { cn } from "@/lib/utils";

type LawGXLogoProps = {
  compact?: boolean;
  className?: string;
};

export function LawGXLogo({ compact = false, className }: LawGXLogoProps) {
  return (
    <Image
      src={compact ? "/lawgx-mark.svg" : "/lawgx-logo.svg"}
      alt="LawGX Law Governance Execution"
      width={compact ? 96 : 1216}
      height={compact ? 96 : 440}
      className={cn(compact ? "h-11 w-11" : "h-auto w-full max-w-[260px]", className)}
      priority
    />
  );
}