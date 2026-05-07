import type { Ending } from "@/data/books";
import { useLang, t } from "@/lib/i18n";

const styles: Record<Ending, string> = {
  HE: "bg-[color:var(--he)]/15 text-[color:var(--he)] border-[color:var(--he)]/30",
  BE: "bg-[color:var(--be)]/15 text-[color:var(--be)] border-[color:var(--be)]/30",
  OE: "bg-[color:var(--oe)]/15 text-[color:var(--oe)] border-[color:var(--oe)]/30",
  Bittersweet: "bg-[color:var(--bittersweet)]/15 text-[color:var(--bittersweet)] border-[color:var(--bittersweet)]/30",
  Ambiguous: "bg-[color:var(--ambiguous)]/15 text-[color:var(--ambiguous)] border-[color:var(--ambiguous)]/30",
  Unknown: "bg-muted text-muted-foreground border-border",
};

export function EndingBadge({ ending, full = false }: { ending: Ending; full?: boolean }) {
  const lang = useLang();
  const labelKey = (full ? `ending${ending}` : `endingShort${ending}`) as
    | "endingHE" | "endingBE" | "endingOE" | "endingBittersweet" | "endingAmbiguous" | "endingUnknown"
    | "endingShortHE" | "endingShortBE" | "endingShortOE" | "endingShortBittersweet" | "endingShortAmbiguous" | "endingShortUnknown";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[ending]}`}>
      {t[labelKey][lang]}
    </span>
  );
}
