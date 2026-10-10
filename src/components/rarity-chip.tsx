import type { Rarity } from "@/data/game";
import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  Zenless: "border-[color:var(--rarity-zenless)]/60 text-[color:var(--rarity-zenless)] bg-[color:var(--rarity-zenless)]/10",
  Arcane: "border-[color:var(--rarity-arcane)]/60 text-[color:var(--rarity-arcane)] bg-[color:var(--rarity-arcane)]/10",
  Mythic: "border-[color:var(--rarity-mythic)]/60 text-[color:var(--rarity-mythic)] bg-[color:var(--rarity-mythic)]/10",
  Legendary: "border-[color:var(--rarity-legendary)]/60 text-[color:var(--rarity-legendary)] bg-[color:var(--rarity-legendary)]/10",
  Epic: "border-[color:var(--rarity-epic)]/60 text-[color:var(--rarity-epic)] bg-[color:var(--rarity-epic)]/10",
};

export function RarityChip({
  rarity,
  count,
  className,
}: {
  rarity: Rarity | string;
  count?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-xs font-medium",
        STYLES[rarity] ?? "border-rule-hard text-muted-foreground",
        className,
      )}
    >
      {rarity}
      {typeof count === "number" && <span className="opacity-70">{count}</span>}
    </span>
  );
}
