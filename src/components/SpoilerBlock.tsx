import { useState } from "react";
import { useLang, t } from "@/lib/i18n";
import { Eye, EyeOff, Lock, AlertTriangle } from "lucide-react";

export function SpoilerBlock({ level, title, children }: { level: "soft" | "hard"; title: string; children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const lang = useLang();
  const tone = level === "hard" ? "border-destructive/40 bg-destructive/5" : "border-[color:var(--caution)]/40 bg-[color:var(--caution)]/5";

  const confirmText = lang === "zh" ? "確定要看完整劇透？" : "Are you sure you want to see full spoilers?";
  const yesText = lang === "zh" ? "是，展開" : "Yes, reveal";
  const cancelText = lang === "zh" ? "取消" : "Cancel";

  const handleClick = () => {
    if (revealed) {
      setRevealed(false);
      setConfirming(false);
      return;
    }
    if (level === "hard" && !confirming) {
      setConfirming(true);
      return;
    }
    setRevealed(true);
    setConfirming(false);
  };

  return (
    <div className={`rounded-lg border ${tone} p-4`}>
      <div className="flex items-center justify-between mb-2 gap-2">
        <h3 className="font-display text-sm font-semibold flex items-center gap-1.5">
          {level === "hard" && <Lock className="h-3.5 w-3.5" />} {title}
        </h3>
        <button
          onClick={handleClick}
          aria-expanded={revealed}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {revealed ? t.hide[lang] : t.reveal[lang]}
        </button>
      </div>

      {revealed ? (
        <p className="text-sm leading-relaxed">{children}</p>
      ) : confirming && level === "hard" ? (
        <div className="text-sm space-y-3">
          <p className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" /> {confirmText}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setRevealed(true)}
              className="px-3 py-1.5 rounded-md bg-destructive text-destructive-foreground text-xs font-medium"
            >
              {yesText}
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="px-3 py-1.5 rounded-md border border-border text-xs"
            >
              {cancelText}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="text-sm leading-relaxed text-left w-full text-muted-foreground italic"
        >
          {lang === "zh" ? "（內容已折疊，點擊展開）" : "(Hidden — click to reveal)"}
        </button>
      )}
    </div>
  );
}
