import { useLang } from "@/lib/i18n";

export function LangSwitch() {
  const [lang, setLang] = useLang();
  return (
    <div className="inline-flex rounded-md border border-border bg-card text-xs font-medium overflow-hidden">
      <button
        onClick={() => setLang("zh")}
        className={`px-2.5 py-1 transition-colors ${lang === "zh" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={lang === "zh"}
      >
        中文
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
