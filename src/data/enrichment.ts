// Hand-authored enrichment for the 20 highest-value SEO pages.
// Kept separate from books.ts / collections.ts so structural data stays clean
// and content edits don't risk breaking core types.

export type Bi = { zh: string; en: string };
export type BiList = { zh: string[]; en: string[] };
export type BiFaq = { q: Bi; a: Bi }[];

export interface CollectionEnrichment {
  howToUse: Bi;        // "How to use this page"
  whatItMeans: Bi;     // "What this ending / warning really means"
  decisionTips: BiList;// 4–6 bullet decision tips
  recommended?: string[]; // book slugs to feature (5–10)
  faq: BiFaq;          // 4–6 deeper FAQ
}

export interface BookEnrichment {
  endingTone: Bi;
  warningsExplained: Bi;
  verdict: Bi;            // spoiler-safe verdict, 2–3 sentences
  similarByEnding?: string[];
  similarByWarning?: string[];
  faq: BiFaq;
}

export interface AuthorEnrichment {
  bio: Bi;                       // 200–400 zh / 120–250 en words
  endingTendency: Bi;            // common ending tendencies in their work
  commonWarnings: Bi;            // common trigger warnings across their books
  whoFor: BiList;                // 3–5 reader fits
  whoNot: BiList;                // 3–5 reader misfits
  startWith: Bi;                 // recommended entry point
  relatedGenres?: string[];      // genre slugs (slugify(genre.en))
  relatedEndings?: string[];     // ending codes
  relatedWarnings?: string[];    // trigger codes
  faq: BiFaq;
}

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export const COLLECTION_ENRICHMENT: Record<string, CollectionEnrichment> = {
  "happy-ending-books": {
    howToUse: {
      en: "Sort by confidence first — a 90+ HE label is verified by two independent sources, while 60–80 means we're confident but the ending hinges on interpretation. Open the trigger matrix on each card before committing; an HE finish doesn't erase a hard middle. If you're picking for someone in a low mood, stick to titles tagged read with confidence ≥ 85 and no high-intensity warnings.",
      zh: "先看信心分數：90 分以上的 HE 是兩個獨立來源確認過的，60–80 分代表我們相信但結局有解讀空間。每張卡片都先點開避雷矩陣再下手——HE 不代表中段不痛。若是為情緒低落的人挑書，請只選 read 決策、信心 ≥ 85、且無高強度避雷標籤的書。",
    },
    whatItMeans: {
      en: "In our system, HE means three conditions hold simultaneously at the final page: main characters are alive, the central relationship is restored or fulfilled, and the protagonist's most important goal is achieved in a way that doesn't get undercut in an epilogue. Stories that meet two-of-three are demoted to Bittersweet. Stories that resolve the romance but leave the world bleak (common in dark romance) are still HE only when the couple's outcome is unambiguous.",
      zh: "我們對 HE 的定義是：書本翻到最後一頁時，三件事必須同時成立——主角活著、核心關係修復或圓滿、主角最在意的目標真正達成（且後記不會把它推翻）。三選二會被降級為 Bittersweet。在黑暗向羅曼史中，世界依然殘酷但戀人結局明確的，仍算 HE。",
    },
    decisionTips: {
      en: [
        "Match mood, not just label — a 'feel-good HE' and a 'survived-the-war HE' read very differently.",
        "Check page count + ending tone together; a 600-page slow-burn HE asks more emotional patience than a 300-page rom-com.",
        "If you only have one evening, prefer confidence ≥ 85 to avoid 'wait, was that actually happy?' debates.",
        "Trigger tags override ending tag. A HE with on-page sexual violence is not a safe pick for a sensitive reader.",
        "Series finishes count: an HE for book 1 of 5 may still leave you on a cliffhanger. Cross-check with our Is the series finished collection.",
      ],
      zh: [
        "看氣氛而不是只看標籤——「治癒系 HE」和「劫後餘生 HE」讀起來完全是兩件事。",
        "把頁數和結局調性一起看：600 頁慢燃 HE 對情緒耐力的要求遠高於 300 頁的浪漫喜劇。",
        "只有一個晚上時間，優先選信心 ≥ 85 的書，避免「這真的算 HE 嗎？」的爭論。",
        "避雷標籤的優先順序高於結局標籤。含性暴力的 HE 對敏感讀者依然不安全。",
        "系列是否完結也要看：第一集 HE 但全套五集可能仍是斷頭，請對照「系列是否完結」清單。",
      ],
    },
    recommended: ["pride-and-prejudice", "beach-read", "the-hating-game", "red-white-and-royal-blue", "the-house-in-the-cerulean-sea"],
    faq: [
      { q: { en: "Is HE the same as 'happily ever after'?", zh: "HE 等於「從此過著幸福快樂的生活」嗎？" }, a: { en: "Closely related but not identical. HEA is a romance-genre convention requiring the couple's future to be explicitly secure. HE is broader — it covers any genre where the main arc lands well, even if the romance is secondary or absent.", zh: "相關但不完全相同。HEA 是言情類型約定，要求戀人未來明確穩定。HE 適用範圍更廣，只要主線善終，即使戀情非主軸或不存在也算。" } },
      { q: { en: "Why do some HE books still feel sad?", zh: "為什麼有些 HE 讀完還是覺得悶？" }, a: { en: "Tone ≠ ending. A book can end happily and still be heavy if the journey involved deep loss. Look at our 'Ending tone explained' notes on each book page.", zh: "調性不等於結局。即使結局圓滿，如果過程經歷沉重失去，整體閱讀感仍會偏沉。請看每本書頁的「結局調性說明」。" } },
      { q: { en: "How do you handle epilogue-only HE?", zh: "只在後記給 HE 的書你們怎麼判？" }, a: { en: "If the epilogue retroactively secures the main couple or main goal and the main text doesn't actively contradict it, we tag HE with confidence reduced by 5–10 points and a note in spoiler-soft.", zh: "若後記確實兜回主線且正文未明確反駁，我們仍標 HE，但信心扣 5–10 分，並在輕劇透裡註明。" } },
      { q: { en: "What's the difference between HE and Bittersweet here?", zh: "你們的 HE 和 Bittersweet 怎麼分？" }, a: { en: "HE clears all three bars (alive / relationship / goal). Bittersweet means a meaningful win is paired with a meaningful loss the text refuses to wave away.", zh: "HE 必須三項全達標。Bittersweet 是有重要的得，也有同等重量的失，且文本不打算粉飾。" } },
      { q: { en: "Can a book with major character death still be HE?", zh: "出現主角死亡還能算 HE 嗎？" }, a: { en: "Only if the death is a side character or framed as a fulfilled sacrifice with the surviving leads landing safely. Otherwise we move it to Bittersweet or BE.", zh: "除非死的是配角，或是已完成意義的犧牲且倖存的主要角色結局明確安全，否則我們會降為 Bittersweet 或 BE。" } },
    ],
  },

  "romance-ending-finder": {
    howToUse: {
      en: "Use this page like a filter, not a recommendation feed. Decide first what you cannot tolerate today (cheating? a tragic ending? on-page sex?), then scan the trigger matrices to eliminate, and only then look at the genre/ending grid. The fastest way to mis-pick a romance is to start from 'most popular' instead of 'lowest risk for me right now.'",
      zh: "把這頁當成篩選器，而不是推薦流。先決定你今天「絕對不要」什麼（出軌？BE？露骨性描寫？），用避雷矩陣淘汰，最後才看類型／結局格。挑錯言情最快的方法，就是從「人氣最高」開始挑，而不是「對我風險最低」。",
    },
    whatItMeans: {
      en: "Romance has its own ending vocabulary. HEA = guaranteed happy together; HFN = happy for now (open-ended but warm); BE in romance usually means the couple does not end together for any reason (death, choice, structural impossibility). Our tags map to these but are stricter: a HFN that ends mid-conflict will be Open Ending, not HEA.",
      zh: "言情自有一套結局詞彙：HEA 是保證在一起；HFN 是暫時甜的開放收尾；BE 在言情通常指戀人最終沒有在一起（死亡、選擇、結構性無法）。本站對應這些詞但更嚴格：在衝突中收尾的 HFN 會被歸到 Open Ending，而不是 HEA。",
    },
    decisionTips: {
      en: [
        "Sub-genre changes the same trigger's weight: a 'mafia romance' rape warning is different from a literary novel's, and you should treat them differently.",
        "If you avoid third-act breakup drama, filter by reviews that mention 'no third-act breakup' rather than ending type alone.",
        "Slow burn ≠ low spice; spice level is independent. Always check sex tag intensity.",
        "Cheating tag in romance is a hard stop for many readers. Don't rely on the blurb — open the trigger matrix.",
      ],
      zh: [
        "次類型會改變同一個避雷的重量：「黑幫言情」裡的性暴力標籤和文學小說裡的份量不同，請分別看待。",
        "若你怕第三幕分手戲，請以「無第三幕分手」的評論為準，光看結局類型不夠。",
        "慢熱不等於低肉度，兩者獨立。請務必看性描寫強度。",
        "出軌標籤對很多言情讀者是直接出局。不要只信文案，請點開避雷矩陣。",
      ],
    },
    recommended: ["beach-read", "the-hating-game", "red-white-and-royal-blue", "people-we-meet-on-vacation", "me-before-you", "the-paper-palace"],
    faq: [
      { q: { en: "What's HEA vs HFN?", zh: "HEA 和 HFN 差別？" }, a: { en: "HEA is a forever-promise ending. HFN is together-and-good-for-now without explicit forever. Standalones default to HEA; series romances often only deliver HFN per book.", zh: "HEA 承諾永遠在一起；HFN 是當下幸福、未來開放。單行本通常 HEA，系列言情常常每本只給 HFN。" } },
      { q: { en: "Why isn't every popular romance HEA in your data?", zh: "為什麼熱門言情不一定被你們標為 HEA？" }, a: { en: "Some books readers call HEA actually leave one major thread unresolved (a parent's illness, a court case). We mark those Bittersweet to be honest with new readers.", zh: "有些讀者口中的 HEA，文本其實留下一條重大未解線（病情、訴訟）。為了對新讀者誠實，我們會標 Bittersweet。" } },
      { q: { en: "Does 'spice level' affect ending tag?", zh: "肉度會影響結局標籤嗎？" }, a: { en: "No. Spice (sex tag intensity) and ending type are independent axes. Filter both separately.", zh: "不會。肉度（sex 標籤強度）和結局類型是兩條獨立軸線，請分開篩。" } },
      { q: { en: "Where do dark romance picks live?", zh: "黑暗言情在哪？" }, a: { en: "They're tagged across multiple warning pages — start from sexual-violence-warning and cross-filter by ending HE.", zh: "散落於各避雷頁——從性暴力避雷開始，再交叉篩 HE 結局。" } },
    ],
  },

  "cheating-warning": {
    howToUse: {
      en: "Cheating means very different things to different readers. On each card we mark whether the cheating is on-page or referenced, whether it happens to a POV character, and whether it's resolved or unresolved by the ending. Read those three details before judging the book — they decide whether the same tag is a hard pass or a mild caution.",
      zh: "「出軌」對不同讀者意義天差地遠。每張卡片我們會註明：出軌是正面描寫還是側面提及、是否發生在 POV 角色身上、結局是否處理完成。在下判斷前先看這三點——同一個標籤可能是「絕不」也可能是「可以接受」。",
    },
    whatItMeans: {
      en: "We use 'cheating' as the umbrella tag for emotional infidelity, physical infidelity, micro-cheating, and structural betrayal of an established relationship. Open marriages and clearly negotiated non-monogamy do not get this tag. Books where infidelity is the engine of the plot (Madame Bovary, Anna Karenina) are tagged high intensity even when handled with literary distance.",
      zh: "「cheating」是傘狀標籤，涵蓋精神出軌、肉體出軌、微出軌與對既有關係的結構性背叛。開放式關係與雙方明確談妥的非單偶制不算。當出軌是整本書的引擎（如《包法利夫人》《安娜・卡列尼娜》），即使文學筆法克制，我們仍標高強度。",
    },
    decisionTips: {
      en: [
        "Infidelity in literary fiction is usually examined; in romance it's usually punished or reconciled — preferences differ.",
        "Check whether the cheating partner gets a redemption arc; many readers find that more upsetting than the cheating itself.",
        "Look at ending type together with cheating tag: a cheating storyline + HE is the polarizing combo, not cheating alone.",
        "If you're recently navigating real infidelity, even literary-distance treatments can be triggering. Default to skip for a few months.",
      ],
      zh: [
        "文學小說裡的出軌通常被剖析；言情裡的出軌通常被懲罰或修復——讀者偏好差異很大。",
        "請看出軌一方是否被「洗白」——對許多讀者來說，這比出軌本身更難接受。",
        "把結局類型與出軌標籤合看：出軌＋HE 才是最具爭議的組合，不是出軌本身。",
        "若你最近正在處理現實中的不忠，即使是文學筆法的書也可能誘發情緒，建議先 skip 幾個月。",
      ],
    },
    recommended: ["madame-bovary", "anna-karenina", "the-paper-palace", "gone-girl"],
    faq: [
      { q: { en: "Do you tag micro-cheating?", zh: "微出軌也算嗎？" }, a: { en: "Yes, but at low intensity and only when the text frames it as a betrayal rather than a misread.", zh: "算，但只標低強度，且要文本本身將其呈現為背叛，而非單純誤會。" } },
      { q: { en: "Does open relationship count as cheating?", zh: "開放式關係算出軌嗎？" }, a: { en: "Not by itself. Only when a partner breaks the agreed terms.", zh: "本身不算。只有當一方破壞雙方協議時才會標。" } },
      { q: { en: "Why is the same book sometimes 'high' and sometimes 'mid'?", zh: "為什麼同一本書有時標 high 有時標 mid？" }, a: { en: "Intensity considers screen-time + emotional weight. A single off-page affair = mid; sustained POV-character infidelity = high.", zh: "強度同時考量篇幅與情緒分量。單一場景的場外外遇＝mid；POV 角色長期外遇＝high。" } },
      { q: { en: "Are there cheating-themed books with happy endings?", zh: "有出軌題材但結局圓滿的書嗎？" }, a: { en: "Yes, mostly in romance with explicit forgiveness/repair arcs. They're polarizing — read reviews carefully.", zh: "有，多在言情且有明確修復線。爭議很大，請細看評論。" } },
    ],
  },

  "bl-danmei-warnings": {
    howToUse: {
      en: "BL and Danmei content warnings work differently from mainstream Western romance: the heavy beats are concentrated in the middle, not the ending, and conventions around dub-con, captivity, age gap and power dynamics show up far more often. This page is a proceed-with-caution checklist for BL novels — read the trigger matrix on each card before the synopsis, because translated blurbs almost always soften the rougher elements. Sort by HE / BE first if you only want a guaranteed ending tone.",
      zh: "BL／耽美的內容警告（content warnings）和西方主流言情運作不同：重戲集中在中段而非結局，dub-con、囚禁、年齡差、權力差等套路出現頻率高得多。本頁是 BL 小說的「proceed with caution」清單——請在看簡介前先看每張卡的避雷矩陣，翻譯文案幾乎一律把較重的部分軟化。只想要保證結局調性的讀者，請先用 HE／BE 排序。",
    },
    whatItMeans: {
      en: "BL covers Japanese boys-love manga/light novels; Danmei (耽美) is the Chinese male-male romance tradition; both share an audience but differ in tropes — Danmei often blends xianxia, wuxia or historical settings, while BL leans modern/school. Danmei novels with sad endings (BE) typically end with one lead dying or permanently separated; Danmei novels with happy endings (HE) usually require both leads to survive and stay together, with little Western-style 'Bittersweet' middle ground. Our list collects only the BL / Danmei titles with on-page warnings worth flagging — not a generic genre catalogue.",
      zh: "BL 指日本男男漫畫／輕小說；耽美（Danmei）是中文男男傳統，讀者重疊但常見套路不同——耽美常融合仙俠、武俠、古裝，BL 多現代／校園。耽美 BE（bad ending）多以一方死亡或永久分離收場；耽美 HE 則通常要求雙主角同時活下來且在一起，幾乎沒有西方式 Bittersweet 的中間地帶。本頁只收錄含值得標註避雷的 BL／耽美作品，不是泛類型書單。",
    },
    decisionTips: {
      en: [
        "Translation matters: fan translation vs licensed edition can change the on-page intensity of dub-con and torture scenes.",
        "'Sweet' Danmei (糖文) can still include on-page non-con; 'angst' (虐文) BL does not always include death — read the matrix, not the label.",
        "Cultivation / xianxia danmei often layers body horror and torture even when the romance is sweet.",
        "If you want a Danmei happy ending, filter by HE plus 'is series finished' so you don't get caught mid-arc.",
        "If you want a Danmei sad ending on purpose, BE titles here are reliably tagged so you can prepare emotionally.",
        "BL trigger warnings and Western romance trigger warnings do not map 1:1 — a 'mild' BL tag is often closer to mid-intensity in Western terms.",
      ],
      zh: [
        "翻譯版本會改變 dub-con 與酷刑場景的呈現強度：同人翻譯與授權版差別很大。",
        "「糖文」耽美仍可能含正面 non-con；「虐文」BL 不一定有死亡——看避雷矩陣，不要只看標籤。",
        "修真／仙俠耽美即使戀情甜，也常含身體恐怖與酷刑。",
        "想要耽美 HE 的讀者，請用 HE ＋ 已完結交叉過濾，避免追到一半。",
        "刻意想看耽美 BE 的讀者，本頁的 BE 標籤可靠，可預先做好情緒準備。",
        "BL 避雷標籤與西方言情避雷不是 1:1 對照——BL 標「輕度」往往接近西方標的「中度」。",
      ],
    },
    recommended: [],
    faq: [
      { q: { en: "What are BL / Danmei content warnings?", zh: "BL／耽美的內容警告（content warnings）是什麼？" }, a: { en: "BL / Danmei content warnings flag the recurring intense tropes in this genre: dub-con / non-con, captivity, torture, body horror in xianxia settings, large age gaps, power-imbalance pairings, and major character death. Because the genre normalises some of these tropes, mainstream blurbs often skip them — that's why a dedicated warning list exists.", zh: "BL／耽美的內容警告專門標出此類型反覆出現的高強度套路：dub-con／non-con、囚禁、酷刑、仙俠設定的身體恐怖、大年齡差、權力不對等配對，以及主角死亡。由於這些套路在類型內被視為常態，主流文案常常略過——因此需要一份專屬警告清單。" } },
      { q: { en: "Which BL novels should I proceed with caution?", zh: "哪些 BL 小說需要 proceed with caution？" }, a: { en: "Treat any BL / Danmei novel as proceed-with-caution if it carries one or more of: high-intensity dub-con, sustained captivity, torture, ABO dynamics with coerced bonding, or a BE ending. Open the trigger matrix on each card — the higher the intensity rating, the more emotional preparation the book needs.", zh: "任何 BL／耽美若含以下任一項，請以 proceed-with-caution 看待：高強度 dub-con、長期囚禁、酷刑、含強制標記的 ABO，或 BE 結局。請點開每張卡的避雷矩陣，強度越高，越需要事前情緒準備。" } },
      { q: { en: "What are Danmei novels with sad endings (BE)?", zh: "哪些是耽美 BE 小說（Danmei novels with sad endings）？" }, a: { en: "In Danmei, 'BE' (bad ending) almost always means one or both leads die or are permanently separated. There is rarely a middle ground. We tag every BE title with a confidence score and a spoiler-safe note so you can pick BE intentionally, not by accident.", zh: "在耽美中，BE 幾乎一律意味著一方或雙方死亡，或永久分離。中間地帶極少。本站每本 BE 都標信心分數與免雷說明，讓你刻意選 BE，而不是踩雷。" } },
      { q: { en: "What are Danmei novels with happy endings (HE)?", zh: "哪些是耽美 HE 小說（Danmei novels with happy endings）？" }, a: { en: "Danmei HE requires both leads to survive and stay together at the final scene. Some readers also expect an epilogue or extra chapter to confirm 'them, together, alive'. We only tag HE when those conditions hold; if one lead dies and is reincarnated, we mark it Bittersweet or note the caveat.", zh: "耽美 HE 要求雙主角在最終場景同時活下來且在一起。部分讀者還要求番外或後記確認「兩人＋一起＋活著」。只有同時滿足這些條件我們才標 HE；若一方死亡再轉世，我們會標 Bittersweet 或在備註中說明。" } },
      { q: { en: "How do I use BL / Danmei warnings without major spoilers?", zh: "怎麼在不踩劇透的情況下使用 BL／耽美避雷？" }, a: { en: "Read three things only: ending tag (HE / BE / Bittersweet), trigger code list with intensities, and the spoiler-soft summary. Skip the spoiler-hard block on first visit — that's where full plot reveals live. This gives you enough to decide read / skip without ruining the discovery experience.", zh: "只看三樣：結局標籤（HE／BE／Bittersweet）、含強度的避雷代碼清單、以及輕劇透摘要。首次造訪請跳過完整劇透區塊——那裡才是劇情大揭露。這樣足以決定讀或略，又不會破壞閱讀體驗。" } },
      { q: { en: "Is BL the same as Yaoi?", zh: "BL 和 Yaoi 一樣嗎？" }, a: { en: "Overlapping. Yaoi historically denoted more explicit content; modern usage often treats them as synonyms.", zh: "高度重疊。Yaoi 早期偏向更露骨；現代用法常視為同義。" } },
      { q: { en: "Why are Danmei books often labelled HE despite heavy content?", zh: "為什麼耽美常被標 HE，但內容很重？" }, a: { en: "Danmei convention strongly prefers couple-survives endings; the heaviness sits in the middle. We tag HE for the ending and high warnings for the journey.", zh: "耽美傳統偏好戀人活下來的結局，重量在中段。所以結局標 HE，過程標高強度避雷。" } },
      { q: { en: "Do you flag ABO / omegaverse separately?", zh: "ABO／omegaverse 你們會另標嗎？" }, a: { en: "Yes — under a distinct tag because consent dynamics in ABO are unusual and worth a content note.", zh: "會，獨立標籤，因為 ABO 的同意權動力學特殊，值得獨立提示。" } },
    ],
  },

  "pet-death-warning": {
    howToUse: {
      en: "Pet death in books is one of the highest-emotion warnings we track because it bypasses the reader's defences faster than most violence — a 'does the dog die' style warning is often more useful than the genre or ending tag. Each card in our books-with-pet-death-warnings list states whether the pet's death is on-page, off-page, or only mentioned, and whether the animal is named / POV. Sort by these subtags first, then read the spoiler-soft note before deciding.",
      zh: "寵物死亡是本站追蹤的避雷中情緒衝擊最高的之一，因為它比大多數暴力描寫更快繞過讀者心防——「does the dog die」式的避雷往往比類型或結局標籤更有用。本頁書單會標明寵物死亡是正面描寫、場外、或僅提及，以及該動物是否有名字／POV。請以這些子標為先，再看輕劇透摘要決定。",
    },
    whatItMeans: {
      en: "What counts as pet death in books, in our system: a companion animal dies in-story, or has died as past backstory that materially shapes a POV character. Off-screen species-level loss (a war kills livestock) does not count. Working-animal death (police dog, war horse, sled dog) is tagged when the text gives it emotional weight. Pet death is distinct from generic animal death (we tag wild-animal hunting / livestock scenes separately) and from major character death (which covers human leads only) — the warning answers a specific question, not a general 'is there any animal harm in this book' check.",
      zh: "我們對「寵物死亡」的定義：故事內有伴侶動物死亡，或主角過去經歷過寵物死亡並實質影響當下劇情。場外、群體性的動物損失（如戰爭中的牲畜）不計。工作犬、戰馬、雪橇犬等工作動物的死亡，若文本賦予情感分量也會標。pet-death 與一般 animal-death（野生動物、狩獵、牲畜場景另標）以及主角死亡（只指人類主角）是分開的——本標籤回答的是「我家狗會被害嗎」這個具體問題，不是「全書有任何動物受傷嗎」的總體查詢。",
    },
    decisionTips: {
      en: [
        "Pet death vs animal death vs major character death are three different tags — open the matrix and read which one the book actually carries before deciding.",
        "If you have a pet currently dying or recently lost, default to skip for at least 6 months — this isn't a 'tough it out' tag.",
        "An off-page mention is very different from a death scene; check the intensity subtag (low / mid / high).",
        "Books with pet-death-as-inciting-incident often spend the rest of the book healing, which can actually help some grieving readers.",
        "How to use spoiler-safe pet death warnings: read only the trigger code and intensity, plus the spoiler-soft summary — that's enough to decide read or skip without learning which animal, when, or how.",
        "When to skip a book because of pet death: skip when the death is on-page + high-intensity + you currently live with an aging or ill pet; skip when intensity is mid+ and you are inside a recent grief window; read with preparation otherwise.",
        "Cross-check with grief and animal-cruelty tags — many pet-death books overlap with one or both.",
      ],
      zh: [
        "pet-death（寵物死亡）、animal-death（動物死亡）、主角死亡是三個不同標籤——做決定前請點開矩陣，確認該書到底掛了哪一個。",
        "若你目前家中寵物正在病重或近期失寵，建議至少 skip 6 個月——這個標籤不是「忍一下就好」。",
        "場外提及和正面死亡場景差別極大，請看強度子標（低／中／高）。",
        "以寵物死亡為起因、後續寫療癒的書，反而對某些哀悼中的讀者有療癒效果。",
        "如何免雷地使用寵物死亡警告：只看避雷代碼＋強度＋輕劇透摘要即可，這已足夠決定讀或略，又不會被劇透是哪隻、什麼時候、怎麼發生。",
        "什麼時候該因為寵物死亡而 skip：正面描寫＋高強度＋家中有年老或重病寵物時，請 skip；中強度以上且你正處於近期失落期，請 skip；其餘情況可預先做心理準備後再讀。",
        "請與 grief、animal-cruelty 標籤交叉看，很多寵物死亡書同時掛這些。",
      ],
    },
    recommended: ["where-the-red-fern-grows", "marley-and-me", "the-art-of-racing-in-the-rain", "old-yeller", "a-dogs-purpose", "lessons-in-chemistry", "the-art-of-racing-in-the-rain", "watership-down", "flowers-for-algernon", "the-curious-incident-of-the-dog-in-the-night-time"],
    faq: [
      { q: { en: "What counts as pet death in books?", zh: "小說中的「寵物死亡」怎麼界定？" }, a: { en: "A companion animal — dog, cat, bird, horse kept as a companion — dying in-story or as backstory that materially shapes a POV character. Brief on-page peril resolved in the same chapter is not tagged as pet death, only as pet-in-danger.", zh: "伴侶動物——狗、貓、鳥、被當作夥伴的馬——在故事內死亡，或作為實質影響 POV 角色的過去回憶。同一章內解除的短暫危險不算寵物死亡，只標 pet-in-danger。" } },
      { q: { en: "What's the difference between pet death, animal death, and major character death?", zh: "pet death、animal death、主角死亡有什麼差別？" }, a: { en: "Pet death = companion animal with a relationship to a POV character. Animal death = generic animals (livestock, hunted wildlife, lab animals). Major character death = human leads only. A book can carry one, two, or all three tags independently.", zh: "pet death＝與 POV 角色有關係的伴侶動物；animal death＝一般動物（牲畜、被獵殺的野生動物、實驗動物）；主角死亡＝只指人類主角。一本書可以同時掛一個、兩個或三個標籤。" } },
      { q: { en: "How do I use spoiler-safe pet death warnings?", zh: "如何使用免雷的寵物死亡警告？" }, a: { en: "Read only the trigger code, intensity (low / mid / high), and the spoiler-soft note. Skip the spoiler-hard block on first visit — that's where the full plot reveal lives. The trigger code + intensity is enough to decide read or skip.", zh: "只看避雷代碼、強度（低／中／高）和輕劇透摘要即可。首次造訪請跳過完整劇透區塊——那裡才是劇情大揭露。避雷代碼＋強度已足夠決定讀或略。" } },
      { q: { en: "When should I skip a book because of pet death?", zh: "什麼時候應該因為寵物死亡而棄書？" }, a: { en: "Skip when: (a) you currently live with an aging or terminally ill pet, (b) you lost a pet in the last 6 months, (c) the intensity is high AND the death is on-page, or (d) the book also carries an animal-cruelty tag. Otherwise it's usually safe to read with preparation.", zh: "符合以下任一項建議棄書：（a）家中有年老或重病寵物；（b）過去 6 個月內失寵；（c）強度高且為正面描寫；（d）同時掛 animal-cruelty 標籤。其餘情況通常可在心理準備後安全閱讀。" } },
      { q: { en: "What are some books with pet death warnings?", zh: "有哪些含寵物死亡的小說？" }, a: { en: "Classic examples: Where the Red Fern Grows, Marley & Me, The Art of Racing in the Rain, Old Yeller, A Dog's Purpose. Literary examples with pet death subplots: Lessons in Chemistry, Watership Down, Flowers for Algernon, The Curious Incident of the Dog in the Night-Time. The full list with intensity ratings is on this page.", zh: "經典代表：《紅羊齒草的故鄉》《馬利與我》《賽車狗的逆襲》《老黃狗》《為了與你相遇》。含寵物死亡子情節的文學作品：《一切都是化學變化》《魔法兔的奇幻旅程》《獻給阿爾吉儂的花束》《深夜小狗神祕習題》。完整清單（含強度評分）見本頁。" } },
      { q: { en: "Do you tag pets-in-danger?", zh: "寵物有危險但沒死也算嗎？" }, a: { en: "Only when the threat is sustained or graphic. Brief peril resolved in the same chapter is not tagged.", zh: "只有持續或具體描寫時才會標。同一章內解除的短暫危險不標。" } },
      { q: { en: "What about pet illness without death?", zh: "寵物生病但沒死？" }, a: { en: "Tagged separately as pet-illness when significant; pet-death is reserved for actual loss.", zh: "若情節重要會另標 pet-illness；pet-death 只用於真正的死亡。" } },
      { q: { en: "Can a book be HE with on-page pet death?", zh: "正面寵物死亡的書還能算 HE 嗎？" }, a: { en: "Yes — ending tone covers human leads; pet death affects warning intensity but not ending classification.", zh: "可以——結局調性看人類主角；寵物死亡影響避雷強度，不影響結局分類。" } },
    ],
  },

  "self-harm-warning": {
    howToUse: {
      en: "This page surfaces books where self-harm appears on-page or as significant backstory. Each card flags whether scenes are descriptive (method shown), referenced (mentioned but not depicted), or recovery-focused. If you are in active recovery, default to recovery-focused or skip entirely; reading method-detail can be re-traumatising.",
      zh: "本頁收錄含正面或關鍵回憶式自傷描寫的書。每張卡片會標明場景是描述性（呈現方式）、提及、或聚焦復原。若你正在積極復原階段，請優先看「聚焦復原」或直接 skip——閱讀方式細節有再次觸發的風險。",
    },
    whatItMeans: {
      en: "We tag self-harm for any non-suicidal self-injury depicted or remembered by a POV character. Suicidal ideation/attempt is a separate tag (suicide). A character who used to self-harm but the text only references it in past tense is still tagged, at lower intensity.",
      zh: "POV 角色出現或回憶非自殺性自傷時，我們會標 self-harm。自殺意念／企圖是獨立標籤（suicide）。曾經自傷但文本僅以過去式提及的，仍會標，但強度降低。",
    },
    decisionTips: {
      en: [
        "Books that show methods without showing recovery are higher-risk reads. Check spoiler-soft for tone.",
        "Some YA novels treat self-harm responsibly with hotline notes; those are usually safer.",
        "If you're supporting someone in recovery, screen the book first rather than reading together blind.",
        "Cross-check with depression and suicide tags — these often co-occur.",
      ],
      zh: [
        "只呈現方式、不呈現復原的書，風險較高，請看輕劇透判斷氛圍。",
        "部分 YA 處理得很負責，附求助專線，相對安全。",
        "若是陪伴正在復原的人，請自己先讀過再決定要不要一起讀，不要盲讀。",
        "請與 depression 和 suicide 標籤交叉看，三者常同時出現。",
      ],
    },
    recommended: [],
    faq: [
      { q: { en: "Does eating-disorder count as self-harm?", zh: "飲食疾患算自傷嗎？" }, a: { en: "We tag eating-disorder separately because the harm dynamic, treatment landscape and reader sensitivities differ.", zh: "我們將飲食疾患獨立標，因為傷害動力、治療地景與讀者敏感度都不同。" } },
      { q: { en: "Why mark recovery-focused books at all?", zh: "為什麼聚焦復原的書還要標？" }, a: { en: "Because even recovery narratives describe past self-harm and can still be triggering during early recovery.", zh: "因為復原敘事仍會描述過去的自傷，對復原初期讀者依然可能誘發。" } },
      { q: { en: "Are method details ever fully removed?", zh: "方式細節有被完全省略過嗎？" }, a: { en: "Yes — some authors intentionally omit them. Those books are tagged at low intensity with a note.", zh: "有，部分作者刻意省略。這類書會標低強度並附註。" } },
      { q: { en: "What's the safest entry book on this list?", zh: "這份清單裡最安全的入門書？" }, a: { en: "Look for low-intensity tag + read decision + ending HE/Bittersweet. Sort by confidence to start.", zh: "請找低強度標籤＋read 決策＋HE/Bittersweet 結局，再依信心排序。" } },
    ],
  },

  "sexual-violence-warning": {
    howToUse: {
      en: "We separate three things this tag often confuses: on-page assault scenes, off-page references, and dub-con/non-con as romance trope. Cards say which applies. If you only avoid the first, you can read more widely than you think; if you avoid all three, filter aggressively and trust low-intensity tags.",
      zh: "本標籤常混淆三件事，本站分開處理：正面性侵場景、場外提及、以及 dub-con／non-con 的浪漫套路。卡片會註明屬於哪一類。若你只避免第一種，可讀範圍其實比想像中廣；若三種都要避，請強力過濾並相信「低強度」標。",
    },
    whatItMeans: {
      en: "Sexual violence here means any non-consensual sexual act depicted or referenced, including coercive consent, incapacitated consent, and sexual harassment that escalates. Romance dub-con as trope is tagged at the same code with a sub-note, because consent reading varies sharply by reader.",
      zh: "本站的性暴力指任何非自願性行為的呈現或提及，包含脅迫、無能力同意、以及升級為性侵的騷擾。言情中作為套路使用的 dub-con 也標同代碼但加註，因為讀者對「同意」的判讀差異極大。",
    },
    decisionTips: {
      en: [
        "Check who the act happens to — POV character vs side character matters for emotional weight.",
        "Aftermath treatment matters more than scene length: a single page with months of recovery is heavier than ten pages without.",
        "If you primarily avoid this trope in romance, filter to romance + this warning + HE to find the most discussed edge cases.",
        "Recently survived assault → default to skip for 6+ months and consult a clinician about reading content.",
      ],
      zh: [
        "看事件發生在誰身上——POV 角色與配角的情緒分量差別很大。",
        "事後處理的篇幅比場景長度更重要：一頁的事件＋數月的復原，比十頁無後續更沉重。",
        "若你主要在言情中避這套路，請以「言情＋本標＋HE」交叉過濾，找最具爭議的邊界書。",
        "近期經歷性暴力倖存者：建議至少 skip 6 個月，並徵詢專業意見再決定閱讀內容。",
      ],
    },
    recommended: [],
    faq: [
      { q: { en: "Do you tag historical normalised assault?", zh: "歷史背景中被視為日常的性侵也標嗎？" }, a: { en: "Yes — historical context doesn't reduce reader impact.", zh: "標。歷史脈絡不會減少讀者實際受影響的程度。" } },
      { q: { en: "Is dub-con always tagged sexual-violence?", zh: "Dub-con 一定標性暴力嗎？" }, a: { en: "Yes, with a sub-note; we trust readers to read the note and decide for themselves.", zh: "是，但會加註。我們相信讀者會讀完註記後自行判斷。" } },
      { q: { en: "Are romance dub-con HE outcomes flagged?", zh: "Dub-con 言情走 HE 的書會被特別標嗎？" }, a: { en: "Confidence is reduced and a content note appears in spoiler-soft.", zh: "信心會被扣，輕劇透裡會放內容註記。" } },
      { q: { en: "What's the difference between this and domestic-abuse tag?", zh: "本標和家暴標籤差別？" }, a: { en: "Overlap exists. We tag both when both apply rather than picking one.", zh: "兩者會重疊，符合就同時標，不擇一。" } },
    ],
  },

  "is-series-finished": {
    howToUse: {
      en: "Sort by 'verified finished' first; that means the author or publisher has confirmed completion. 'Likely finished' means the last book reads as a finale but the author has not retired the series. 'Active' means new entries are still expected. If hiatus duration matters to you (5+ years often = quietly abandoned), open each card for the latest update date.",
      zh: "請先依「已確認完結」排序：作者或出版方確認完結。「應已完結」指最末本讀來是收尾但作者未公告。「連載中」指仍會出新作。若你在意停更年數（5 年以上常等於默默棄坑），請點開每張卡看最後更新日。",
    },
    whatItMeans: {
      en: "'Finished' here is editorial, not legal. We update it when the author publicly states the series is done, when a publisher closes the contract, or when 5+ years have passed with no new entry and no announcements. We don't downgrade just because a sequel was hinted in marketing.",
      zh: "本站的「完結」是編輯判斷，不是法律狀態。作者公開宣告、出版方結案、或停更滿 5 年且無消息，我們才會更新。光是行銷暗示有續集，我們不會降級。",
    },
    decisionTips: {
      en: [
        "If you only read finished series, also filter by ending HE/Bittersweet to skip cliffhanger-by-design finales.",
        "Long-running series with mid-arc finales (e.g. 6/10 published) are not 'finished' for our purpose.",
        "Translated novels: 'finished in original language' and 'finished in English' are tracked separately on the card.",
        "An author's death does not automatically mean a series is finished; check whether the last book functions as closure.",
      ],
      zh: [
        "只讀完結系列的話，請再以 HE/Bittersweet 過濾，避開「故意斷頭」的收尾。",
        "長篇但只到中途收尾的系列（例如 10 本只出 6 本）對本站不算完結。",
        "翻譯作品：「原文完結」與「英文完結」在卡片上分開追蹤。",
        "作者過世不自動視為完結，要看最末本是否具備收束功能。",
      ],
    },
    recommended: [],
    faq: [
      { q: { en: "How often is this list updated?", zh: "這份清單多久更新？" }, a: { en: "Monthly; status changes are noted in the card history.", zh: "每月更新，狀態變動會留歷史紀錄。" } },
      { q: { en: "Why do you list 'likely finished' at all?", zh: "為什麼還要列「應已完結」？" }, a: { en: "Because many readers want to start a series only if it reads complete, even without official closure.", zh: "因為很多讀者只願意在「讀來已完整」時開坑，即使沒有官方宣告。" } },
      { q: { en: "Is a spin-off the same series?", zh: "外傳算同系列嗎？" }, a: { en: "Only if the main arc continues. Companion novellas don't reopen 'finished'.", zh: "除非主線在外傳裡延續，否則伴隨型短篇不影響「完結」狀態。" } },
      { q: { en: "Do you track web novels?", zh: "你們追蹤網路小說嗎？" }, a: { en: "Yes for major platforms (Jinjiang, Syosetsu, Royal Road). Status sources are noted on the card.", zh: "主要平台（晉江、Syosetsu、Royal Road）有追蹤，來源會在卡片註明。" } },
    ],
  },
};

// ---------------------------------------------------------------------------
// Warnings (warning detail page enrichment)
// ---------------------------------------------------------------------------

export const WARNING_ENRICHMENT: Record<string, CollectionEnrichment> = {
  "pet-death": COLLECTION_ENRICHMENT["pet-death-warning"],
  "cheating": COLLECTION_ENRICHMENT["cheating-warning"],
};

// ---------------------------------------------------------------------------
// Books — 10 high-value pages
// ---------------------------------------------------------------------------

export const BOOK_ENRICHMENT: Record<string, BookEnrichment> = {
  "the-song-of-achilles": {
    endingTone: {
      en: "The Song of Achilles does not have a traditional happy ending. It is best treated as a tragic or bittersweet ending — Madeline Miller follows the Iliad's broad arc, so both leads die and the novel closes on grief. Is The Song of Achilles sad? Yes: tender first half, devastating finish. Even readers who already know the Iliad report being unprepared for the emotional weight of the last 80 pages — Miller writes the bond so warmly that the foreordained loss lands like a personal grief. If you came here asking 'does The Song of Achilles have a happy ending' for a friend or a low-mood night, the honest answer is no.",
      zh: "《阿基里斯之歌》並沒有傳統意義上的 HE，整體應視為悲劇或苦甜結局——米勒依循伊利亞德主線，雙主角皆亡，全書收於悲痛。會難過嗎？會。前半溫柔，後段毀滅性。即使知道伊利亞德故事走向，讀者仍常被最後 80 頁的情緒重量擊倒——米勒把兩人的關係寫得太真實，導致命中注定的失去像是親身經歷。若你想替朋友或在情緒低落的夜晚找一本書，《阿基里斯之歌》誠實的答案是：不適合。",
    },
    warningsExplained: {
      en: "The Song of Achilles trigger warnings: three high-intensity tags — major character death (both leads), war violence (named brutalities including Achilles' rampage), and intense grief sustained for the last quarter of the book. No on-page sexual violence despite the war setting; sex scenes between leads are tender and not explicit. Brief off-page references to sexual violence in the wider war context are present but not depicted.",
      zh: "《阿基里斯之歌》主要避雷標籤：三個高強度——主角死亡（雙主角皆亡）、戰爭暴力（含阿基里斯的暴行）、強烈悲痛（最後四分之一持續）。雖為戰爭題材但無正面性暴力描寫；雙主角之間的性場景溫柔且不露骨。戰爭背景下對性暴力的指涉存在但屬場外，未正面描寫。",
    },
    verdict: {
      en: "Should you read The Song of Achilles if you want a happy ending? No — pick something else. Should you read it at all? Yes, if you're emotionally stable and want a beautifully written queer mythology retelling that earns its tragedy. Skip if you're in a low mood, need a HE, or avoid major character death; this book leaves a mark.",
      zh: "如果你想看 HE，要不要讀《阿基里斯之歌》？不要——請挑別本。那到底值不值得讀？值得，如果你情緒穩定、想看寫得極美、悲劇分量擲地有聲的酷兒神話重述。若你正情緒低落、需要 HE、或迴避主角死亡：請略——這本書會留下痕跡。",
    },
    similarByEnding: ["no-longer-human", "anna-karenina", "madame-bovary"],
    similarByWarning: ["anna-karenina", "no-longer-human", "circe"],
    faq: [
      { q: { en: "Does The Song of Achilles have a happy ending?", zh: "《阿基里斯之歌》是 HE 嗎？" }, a: { en: "No. The Song of Achilles ending is firmly tragic — both leads die and the novel closes on grief, not reunion in any conventional happy sense. If you need a HE, skip.", zh: "不是。《阿基里斯之歌》的結局明確悲劇——雙主角皆死，全書收於悲痛，並非任何傳統意義上的團圓。需要 HE 請略。" } },
      { q: { en: "Is The Song of Achilles sad?", zh: "《阿基里斯之歌》會很難過嗎？" }, a: { en: "Yes — readers consistently report crying in the final 80 pages. The first half is tender and warm, which is exactly what makes the ending land so hard.", zh: "會。讀者普遍反映最後 80 頁會哭。前半段越溫柔，結局打擊越強。" } },
      { q: { en: "What are the main The Song of Achilles trigger warnings?", zh: "《阿基里斯之歌》主要避雷標籤有哪些？" }, a: { en: "Major character death (both leads), graphic war violence including Achilles' rampage, sustained intense grief in the final quarter, and brief references to sexual violence in the wider war context (not on-page between leads).", zh: "主角死亡（雙主角皆亡）、具體戰爭暴力含阿基里斯暴行、最後四分之一持續的強烈悲痛，以及戰爭背景下對性暴力的簡短指涉（雙主角之間並無正面性暴力）。" } },
      { q: { en: "The Song of Achilles ending explained — what actually happens?", zh: "《阿基里斯之歌》結局究竟發生了什麼？" }, a: { en: "Full plot spoilers are kept in the collapsed spoiler block above. In short: the novel follows the Iliad's broad arc but reframes it through Patroclus's voice, so the ending feels less like myth and more like personal loss.", zh: "完整劇透請展開上方折疊區。簡言之：本書依循伊利亞德主線，但透過 Patroclus 的視角重述，因此結局讀來不像神話，而像私人失去。" } },
      { q: { en: "Should I read The Song of Achilles?", zh: "我該讀《阿基里斯之歌》嗎？" }, a: { en: "Read if you're emotionally stable, want a queer mythology retelling that earns its tragedy, and enjoy lyrical prose. Skip if you're in a low mood, need a happy ending, or avoid major character death.", zh: "情緒穩定、想看寫得極美的酷兒神話悲劇、喜歡抒情文筆：請讀。情緒低落、需要 HE、或迴避主角死亡：請略。" } },
      { q: { en: "Are there books like The Song of Achilles?", zh: "有沒有像《阿基里斯之歌》的書？" }, a: { en: "For prose and queer tragedy: similar emotional weight in Anna Karenina and No Longer Human (see Similar warning profile below). For the same mythic voice with a lighter ending, try Circe by the same author.", zh: "文筆與酷兒悲劇向：Anna Karenina、No Longer Human 情緒重量相近（見下方相似避雷標籤）。同樣的神話語感但結局較溫和：可讀同作者的 Circe。" } },
    ],
  },

  "gone-girl": {
    endingTone: {
      en: "Cold, controlled, and morally bleak. The finish is technically resolved (no cliffhanger) but emotionally airless — Flynn deliberately denies the reader any catharsis or punishment.",
      zh: "冷靜、克制、道德層面陰沉。結局技術上已收（無斷頭），但情緒上沒有出口——作者刻意拒絕給讀者任何宣洩或懲罰感。",
    },
    warningsExplained: {
      en: "Heavy on psychological abuse, manipulation, and a graphic on-page murder. Cheating is a major plot driver. False-accusation of sexual assault is depicted and central — sensitive readers should weigh carefully. Pregnancy used as coercion.",
      zh: "心理虐待、操控與一場具體描寫的謀殺戲為主。出軌是劇情核心。書中正面描寫並圍繞「假性侵控告」展開，敏感讀者請慎重。懷孕被當作脅迫工具使用。",
    },
    verdict: {
      en: "Read if you want a precisely engineered marriage thriller and can stomach an ending where the worse person wins. Skip if you need narrative justice, or if false-accusation tropes are off-limits for you.",
      zh: "想看精密如鐘錶的婚姻驚悚、能接受「壞的人贏」的結局：請讀。若你需要敘事正義，或不能接受假性侵控告題材：請略。",
    },
    similarByEnding: ["the-paper-palace", "anna-karenina"],
    similarByWarning: ["the-paper-palace", "madame-bovary"],
    faq: [
      { q: { en: "Is the film a faithful adaptation?", zh: "電影忠於原著嗎？" }, a: { en: "Mostly — Flynn wrote the screenplay. The novel goes deeper into both POVs.", zh: "大致是——劇本由作者本人撰寫。小說對雙方 POV 挖得更深。" } },
      { q: { en: "Why is the ending so divisive?", zh: "為什麼結局爭議這麼大？" }, a: { en: "Because the antagonist suffers no consequences and the protagonist chooses to stay. Many readers want a punishment beat the book refuses to deliver.", zh: "因為反派毫無懲罰，主角選擇留下。很多讀者期待懲罰節奏，而本書拒絕提供。" } },
      { q: { en: "Is this safer than the marketing suggests?", zh: "比行銷文宣安全嗎？" }, a: { en: "No. The marketing actually undersells the psychological darkness.", zh: "不。行銷其實低估了心理層面的黑暗程度。" } },
    ],
  },

  "anna-karenina": {
    endingTone: {
      en: "Two parallel arcs, opposite tones. Anna's storyline is unambiguously tragic; Levin's storyline lands on hard-won, faith-tinged hope. The book's overall tag is BE because the title character's fate dominates reader memory.",
      zh: "雙線平行、調性相反。Anna 線徹底悲劇；Levin 線收於得來不易、帶宗教意味的希望。整體標 BE，因為讀者記憶被主角命運主導。",
    },
    warningsExplained: {
      en: "Sustained infidelity (high), suicide on-page (high, the famous train scene), social ostracism, postpartum depression, period-typical class and gender violence. Long, but reading paced — most heavy beats are signposted.",
      zh: "持續出軌（high）、正面自殺場景（high，著名的火車場景）、社會排斥、產後憂鬱、時代下的階級與性別暴力。雖長，但節奏分明，大多重戲都有預兆。",
    },
    verdict: {
      en: "Read if you want one of the most psychologically detailed novels ever written and you have the schedule for a long, dual-track classic. Skip if you're avoiding suicide content or you only want a contained love story.",
      zh: "想讀史上心理刻畫最細的小說之一、且有時間消化雙線長篇古典：請讀。若你正在迴避自殺題材或只想看單純愛情故事：請略。",
    },
    similarByEnding: ["madame-bovary", "the-song-of-achilles", "no-longer-human"],
    similarByWarning: ["madame-bovary", "the-paper-palace", "gone-girl"],
    faq: [
      { q: { en: "Which translation should I read?", zh: "該選哪個譯本？" }, a: { en: "Pevear & Volokhonsky for fidelity, Rosamund Bartlett for readability. Either is fine for a first read.", zh: "Pevear & Volokhonsky 較忠實，Rosamund Bartlett 較易讀。初讀任一皆可。" } },
      { q: { en: "Can I skip the Levin chapters?", zh: "Levin 線可以跳嗎？" }, a: { en: "Mechanically yes, but you'll lose the contrast Tolstoy designed; the book is structured as a diptych on purpose.", zh: "技術上可以，但會失去托爾斯泰設計的對照——本書是有意的雙聯結構。" } },
      { q: { en: "Is the suicide scene graphic?", zh: "自殺場景具體嗎？" }, a: { en: "Yes, and lingered on. If this is a hard tag for you, default to skip.", zh: "具體且停留時間長。若這是你的硬底線，請直接 skip。" } },
    ],
  },

  "madame-bovary": {
    endingTone: {
      en: "Slow-building disillusionment that resolves in a long, clinically detailed death. Flaubert's distance is the point; the cold prose is what makes the tragedy land.",
      zh: "緩慢累積的幻滅，收於一場冗長且臨床式具體的死亡。福樓拜的疏離正是重點，冷感的文字才讓悲劇真正落地。",
    },
    warningsExplained: {
      en: "Sustained infidelity (high), graphic on-page suicide via poisoning (high — extended scene), financial ruin destroying a family, period-typical misogyny. Slow pacing means heavy content lands harder, not softer.",
      zh: "持續出軌（high）、正面服毒自殺（high，篇幅長）、財務崩潰拖垮家庭、時代性別歧視。慢節奏不會稀釋重戲，反而放大。",
    },
    verdict: {
      en: "Read if you want the foundational realist novel and can engage with cold, ironic narration. Skip if you need a likeable protagonist or are avoiding suicide-by-poisoning content.",
      zh: "想讀現實主義奠基之作、能接受冷調反諷敘事：請讀。需要討喜主角，或正在迴避「服毒自殺」題材：請略。",
    },
    similarByEnding: ["anna-karenina", "the-song-of-achilles", "the-great-gatsby"],
    similarByWarning: ["anna-karenina", "the-paper-palace", "gone-girl"],
    faq: [
      { q: { en: "Is Emma sympathetic?", zh: "Emma 討喜嗎？" }, a: { en: "Deliberately not, but recognisable — Flaubert built her to feel familiar even while you judge her.", zh: "刻意不討喜，但極具辨識度——福樓拜要你一邊看不慣她、一邊覺得熟悉。" } },
      { q: { en: "How graphic is the death scene?", zh: "死亡場景多具體？" }, a: { en: "Very — multi-page medical detail.", zh: "非常具體——多頁醫學描寫。" } },
      { q: { en: "What's the best translation?", zh: "推薦譯本？" }, a: { en: "Lydia Davis (English) is widely considered the most accurate modern version.", zh: "英譯本 Lydia Davis 版被普遍認為最精準。" } },
    ],
  },

  "the-great-gatsby": {
    endingTone: {
      en: "Bittersweet leaning tragic — short, lyrical, and deliberately deflating. The famous final paragraph reframes everything that came before as nostalgia rather than triumph.",
      zh: "苦多於甘，篇幅短、抒情、結尾刻意洩氣。著名的最後一段把全書重新定調為「鄉愁」而非「勝利」。",
    },
    warningsExplained: {
      en: "On-page deaths (including a murder and a vehicular fatality), infidelity, alcohol abuse pervasive in the period setting. Sexual content is suggestive rather than explicit.",
      zh: "正面死亡（含一場謀殺與一場車禍致死）、出軌、時代背景下普遍酒精濫用。性內容暗示為主，非露骨。",
    },
    verdict: {
      en: "Read for compact prose mastery and an American canon entry that earns its reputation. Skip only if you want a happy ending or actively dislike unreliable narrators.",
      zh: "想讀精煉文筆、美國文學經典中當之無愧的一本：請讀。若你執意要 HE 或無法接受不可靠敘述者：略。",
    },
    similarByEnding: ["madame-bovary", "anna-karenina", "the-remains-of-the-day"],
    similarByWarning: ["the-paper-palace", "anna-karenina"],
    faq: [
      { q: { en: "Is it a love story?", zh: "這是愛情故事嗎？" }, a: { en: "More accurately a story about the idea of love and self-invention. Treating it as romance leads to disappointment.", zh: "更準確地說，是關於「愛情這個概念」和自我塑造的故事。當作言情看會失望。" } },
      { q: { en: "Can a teenager read this?", zh: "青少年可以讀嗎？" }, a: { en: "Yes — it's a common school text. Themes are adult but content is restrained.", zh: "可以——常見校園必讀。主題成熟但內容克制。" } },
      { q: { en: "Why is Nick the narrator?", zh: "為什麼選 Nick 當敘述者？" }, a: { en: "Because Gatsby's pursuit only works at one remove — through an admirer who is also implicated.", zh: "因為 Gatsby 的追尋只有透過旁觀者敘述才成立——而這個旁觀者本身也涉入其中。" } },
    ],
  },

  "classroom-of-the-elite": {
    endingTone: {
      en: "Series-level open ending; per-volume arcs resolve but the broader political game continues. Most arcs end on a victorious-but-precarious note for the protagonist.",
      zh: "系列層級為開放式；每集小弧線會收，但整體權謀大局延續。多數集數對主角是「贏了但很懸」的收尾。",
    },
    warningsExplained: {
      en: "Bullying, social manipulation, and emotional cruelty are central. Suicidal ideation in side characters appears in specific arcs. Light fanservice; no on-page sexual violence in the main novel line. Light-novel translation lag is a practical warning.",
      zh: "霸凌、社會操控與情緒暴力為主軸。部分弧線有配角自殺意念。輕度福利情節；正篇無正面性暴力。翻譯進度落後是實務上的警示。",
    },
    verdict: {
      en: "Read if you enjoy long-game political school dramas with an unreliable, deliberately cold POV. Skip if school-bullying content is a hard pass, or if you need quick narrative payoff.",
      zh: "喜歡長線權謀校園、能接受冷感且不可靠的主角 POV：請讀。若霸凌題材是硬底線，或你要快節奏回報：略。",
    },
    similarByEnding: ["the-giver"],
    similarByWarning: [],
    faq: [
      { q: { en: "Is the anime enough?", zh: "看動畫就夠嗎？" }, a: { en: "No — adaptations skip Ayanokoji's interior monologue, which is most of the appeal.", zh: "不夠——動畫省略主角內心獨白，而那才是本作核心吸引力。" } },
      { q: { en: "Is the series finished?", zh: "完結了嗎？" }, a: { en: "Year 1 arc is finished; Year 2 ongoing. See the Is series finished collection.", zh: "第 1 學年弧已完結；第 2 學年連載中。詳見「系列是否完結」。" } },
      { q: { en: "Is it problematic to younger readers?", zh: "對更年輕讀者不適合嗎？" }, a: { en: "The bullying and manipulation themes are heavy enough that we'd default to 16+.", zh: "霸凌與操控主題分量大，建議 16 歲以上閱讀。" } },
    ],
  },

  "no-longer-human": {
    endingTone: {
      en: "Unbroken bleakness. There is no redemption arc, no consoling beat — Dazai's narrator collapses, is institutionalised, and the framing device closes coldly.",
      zh: "全程低氣壓，無救贖、無慰藉。敘述者崩潰、被收容，書末框架冷冷收尾。",
    },
    warningsExplained: {
      en: "Persistent suicidal ideation (high), substance addiction (high), severe depression (high), brief sexual content. Semi-autobiographical — Dazai died by suicide shortly after publication, which informs many readers' experience.",
      zh: "持續自殺意念（high）、物質成癮（high）、嚴重憂鬱（high）、少量性內容。半自傳——太宰治於本書出版後不久自殺，這影響許多讀者的閱讀體驗。",
    },
    verdict: {
      en: "Read only if you are emotionally stable and approaching the book as literature or cultural study. Skip if you have suicidal ideation, are in a depressive episode, or want hope of any kind.",
      zh: "情緒穩定、把本書當文學或文化研究來讀的人：可以。有自殺意念、處於憂鬱期、或想要任何希望的人：請略。",
    },
    similarByEnding: ["the-song-of-achilles", "anna-karenina", "madame-bovary"],
    similarByWarning: ["norwegian-wood"],
    faq: [
      { q: { en: "Is it short enough to push through?", zh: "篇幅夠短可以硬讀嗎？" }, a: { en: "Yes (~150 pages) but its density doesn't reward push-through reading.", zh: "夠短（約 150 頁），但密度高，硬讀效果差。" } },
      { q: { en: "Translation recommendation?", zh: "推薦譯本？" }, a: { en: "Donald Keene (English) remains the standard.", zh: "英譯仍以 Donald Keene 為標準。" } },
      { q: { en: "Is it really autobiographical?", zh: "真的是自傳嗎？" }, a: { en: "Semi — Dazai used real events as scaffold but reshaped them.", zh: "半自傳——以真實事件為骨架但有再加工。" } },
    ],
  },

  "beach-read": {
    endingTone: {
      en: "Warm HE with earned grief. The romance lands clearly, but Henry handles parental loss and creative block with more honesty than the cover hints at.",
      zh: "結局溫暖 HE，且悲傷處理紮實。戀情明確收束，但 Henry 對父母離世與創作瓶頸的處理比封面看起來誠實得多。",
    },
    warningsExplained: {
      en: "Parental death (off-page, before the book opens, but actively mourned), parental infidelity discovered post-mortem (key plot driver), one on-page sex scene of moderate intensity. Generally a low-warning rom-com despite the depth.",
      zh: "父母死亡（場外，書前已發生，但持續被悼念）、死後才發現父親出軌（劇情核心驅動力）、一場中等強度性場景。整體是低避雷羅曼史，但深度不輕。",
    },
    verdict: {
      en: "Read for a contemporary HE that doesn't dodge grief. Skip if you specifically don't want grief mixed into your romance, or if discovered-infidelity-of-a-parent is a hard tag.",
      zh: "想看不迴避悲傷的當代 HE：請讀。如果你不想悲傷混進言情，或「父母被發現出軌」是硬底線：請略。",
    },
    similarByEnding: ["pride-and-prejudice", "the-hating-game", "red-white-and-royal-blue"],
    similarByWarning: ["the-paper-palace"],
    faq: [
      { q: { en: "Is it actually beachy?", zh: "真的是「海灘」題材嗎？" }, a: { en: "Setting is a lake town; tone is summer-bright, content is heavier than the title suggests.", zh: "場景是湖邊小鎮；氛圍夏日明亮，內容比書名沉。" } },
      { q: { en: "Spice level?", zh: "肉度？" }, a: { en: "One scene, mid-range. Not closed-door, not erotica.", zh: "單場、中等。不是 closed-door 也不是情色。" } },
      { q: { en: "Standalone or series?", zh: "單行本還是系列？" }, a: { en: "Standalone; Henry has other rom-coms in shared mood but separate stories.", zh: "單行本；作者其他作品氛圍相近但獨立。" } },
    ],
  },

  "me-before-you": {
    endingTone: {
      en: "Bittersweet leaning tragic. Marketed as romance but reads as ethical drama — the ending is structurally inevitable and the book stands by it.",
      zh: "苦多於甘。被當作言情行銷，實則為倫理劇——結局結構上勢在必行，本書也堅持到底。",
    },
    warningsExplained: {
      en: "Assisted dying / euthanasia (central), disability representation that has been criticised by disability advocates, grief, depression, brief sexual content. The ending is the warning — readers should not enter expecting a romance HE.",
      zh: "輔助死亡／安樂死（核心）、被身障倡權者批評過的身障呈現、悲痛、憂鬱、少量性內容。結局本身就是避雷——不要當言情 HE 來讀。",
    },
    verdict: {
      en: "Read if you want a thoughtful, polarising book on assisted dying with a love story attached. Skip if you want romance HE, or if disability-as-tragedy framings frustrate you.",
      zh: "想讀一本立場明確、爭議巨大、關於安樂死又夾帶愛情線的書：請讀。若你要言情 HE，或對「身障即悲劇」的框架反感：請略。",
    },
    similarByEnding: ["the-song-of-achilles", "norwegian-wood", "the-remains-of-the-day"],
    similarByWarning: ["norwegian-wood"],
    faq: [
      { q: { en: "Is the disability rep accurate?", zh: "身障呈現準確嗎？" }, a: { en: "Contested. Many disability advocates object to the framing; read criticism alongside the book.", zh: "有爭議。多位身障倡權者反對其框架，建議搭配批評文章閱讀。" } },
      { q: { en: "Should I read the sequels?", zh: "續集要讀嗎？" }, a: { en: "Optional. The first book stands alone; sequels follow Lou's life after.", zh: "可選。第一本可獨立讀；續集追蹤 Lou 後續人生。" } },
      { q: { en: "Is the film softer than the book?", zh: "電影比書溫和嗎？" }, a: { en: "Slightly, but the ending is identical.", zh: "略溫和，但結局相同。" } },
    ],
  },

  "the-sword-of-kaigen": {
    endingTone: {
      en: "Bittersweet leaning hopeful. Massive losses inside the central family, but the family that remains rebuilds with intention — many readers consider the closing chapters cathartic rather than crushing.",
      zh: "偏向有希望的苦甜。家庭核心損失重大，但倖存者帶著意志重建——許多讀者認為結尾偏療癒而非碾壓。",
    },
    warningsExplained: {
      en: "Major character death (high, including a child), graphic battlefield violence (high), domestic abuse / coercive marriage (mid–high, examined critically), grief (sustained). Despite the trigger profile the book is structured as a healing arc.",
      zh: "主角死亡（high，含一名孩童）、戰場暴力具體（high）、家暴／強迫婚姻（mid–high，文本以批判視角處理）、悲痛（持續）。雖避雷檔案重，但結構是療癒弧線。",
    },
    verdict: {
      en: "Read if you want an emotionally serious standalone fantasy that earns its weight and lands on hope. Skip if child death is an absolute hard line, or if you want light fantasy.",
      zh: "想讀情緒分量真實、收於希望的單行奇幻：請讀。若兒童死亡是絕對硬線、或你想看輕鬆奇幻：請略。",
    },
    similarByEnding: ["the-song-of-achilles"],
    similarByWarning: [],
    faq: [
      { q: { en: "Is it really standalone?", zh: "真的是單行本？" }, a: { en: "Yes — set in a shared universe but readable cold.", zh: "是——與作者其他作品共宇宙但可冷讀。" } },
      { q: { en: "Is the child death gratuitous?", zh: "兒童死亡是 gratuitous 嗎？" }, a: { en: "No — it is plot-load-bearing and grieved with the rest of the book.", zh: "不是——它承擔劇情重量，全書持續為其哀悼。" } },
      { q: { en: "Where to start with the author?", zh: "想接觸作者的入門書？" }, a: { en: "This book; Theonite series is YA-ish and earlier work.", zh: "就從本書開始；Theonite 系列偏 YA 且為早期作品。" } },
    ],
  },

  "the-name-of-the-wind": {
    endingTone: {
      en: "Open ending by design — book one of an unfinished trilogy whose third volume has been absent for over a decade. The frame story closes a chapter but the central mystery (how Kvothe falls from legend to innkeeper) remains unanswered. Treating the published two books as 'the series' is the only honest way to read it today.",
      zh: "本書是刻意的開放結局——三部曲的第一集，第三集已經難產超過十年。框架敘事在當集收尾，但「Kvothe 如何從傳奇墮落為旅店老闆」這個核心謎題完全未解。今天閱讀本書，最誠實的態度是：把已出版的兩本當成「整個系列」。",
    },
    warningsExplained: {
      en: "Mid-intensity violence (school duels, bandit fights, one extended trauma flashback to a caravan massacre that includes child death and parental death). Sex is referenced and lightly on-page, not explicit. The largest practical 'warning' is non-textual: investing in an unfinished epic with no known completion date.",
      zh: "中等強度暴力（校園決鬥、強盜戰、一段較長的童年創傷回憶，含父母與兒童之死）。性描寫僅提及與輕度正面描寫，並不露骨。真正最大的「避雷」其實在文本之外：投入一部完結遙遙無期的長篇史詩。",
    },
    verdict: {
      en: "Read if you love prose-driven fantasy, music in fiction, and slow magic-school worldbuilding — and if you can accept that book three may never arrive. Skip if 'series must be finished' is a hard rule for you.",
      zh: "若你喜歡文筆掛帥的奇幻、書中音樂題材、與慢節奏魔法學院世界觀，且能接受第三集可能永遠不會出版：請讀。若「系列必須完結」是硬性規則：請略。",
    },
    similarByEnding: ["classroom-of-the-elite"],
    similarByWarning: ["the-sword-of-kaigen"],
    faq: [
      { q: { en: "Is book three ever coming out?", zh: "第三集會出嗎？" }, a: { en: "No public timeline. Treat the series as paused indefinitely.", zh: "無任何公開時程。請當作無限期暫停。" } },
      { q: { en: "Can I read book one alone?", zh: "可以只讀第一集嗎？" }, a: { en: "Yes — book one is structurally complete as a standalone arc within the frame story.", zh: "可以——第一集在框架內是結構完整的獨立弧線。" } },
      { q: { en: "Is the prose really that good?", zh: "文筆真的那麼好嗎？" }, a: { en: "Yes; that, plus a magic system tied to language, is the main draw and worth the read even unfinished.", zh: "是；文筆加上以語言為核心的魔法系統，是主要賣點，即使系列未完仍值得一讀。" } },
      { q: { en: "Any content younger readers should know about?", zh: "青少年閱讀有需要注意的內容嗎？" }, a: { en: "The caravan-massacre chapter is genuinely heavy — readers under 14 may struggle.", zh: "車隊屠殺一章分量真實沉重，14 歲以下讀者可能難以負荷。" } },
    ],
  },


  "piranesi": {
    endingTone: {
      en: "Does Piranesi have a happy ending? Not in any conventional sense — the Piranesi ending is ambiguous by design. Piranesi is technically rescued from the labyrinthine House, but Susanna Clarke refuses to frame this as a clean win: he keeps returning to the House, and the final pages leave his identity, his loss, and the meaning of the world deliberately unresolved. It is closer to a quiet acceptance than to HE or BE.",
      zh: "《皮拉內西》結局是什麼？是開放式（Ambiguous），刻意保留留白。技術上他被救出迷宮般的房屋（the House），但 Clarke 拒絕把它寫成乾淨的勝利——他持續回訪 The House，最後幾頁刻意不解決他的身份、失去與這個世界的意義。整體更接近「安靜的接受」，而非 HE 或 BE。",
    },
    warningsExplained: {
      en: "Main Piranesi trigger warnings: mid-intensity captivity (sustained, but the prose is gentle and the narrator himself does not experience the labyrinth as horror for most of the book), gaslighting and identity erasure by an antagonist, and references to off-page abuse and missing persons. No on-page sexual violence and no graphic gore. The hardest content is psychological, not visceral — the book's weight comes from slow recognition, not shock.",
      zh: "《皮拉內西》主要避雷標籤集中在：中等強度的囚禁（持續性，但全書筆觸溫柔，主角大半時間並不視之為恐怖）、被反派操控與身份抹除（gaslighting）、間接提及書外的虐待與失蹤者。無正面性暴力、無血腥場景。真正最重的內容是心理層面，非視覺層面——本書的重量來自「逐步認清真相」，而非衝擊。",
    },
    verdict: {
      en: "Should you read Piranesi? Yes, if you love lyrical, slow-paced literary fantasy and can sit with an open ending that prizes atmosphere and meaning over plot resolution. Skip if you need clear answers, dislike unreliable narrators, or want a fast-moving fantasy with conventional stakes. For atmosphere-driven readers Piranesi is strongly worth it; for plot-driven readers it can frustrate.",
      zh: "《皮拉內西》值得讀嗎？喜歡抒情、慢節奏文學奇幻，能接受重氛圍與意義、輕劇情解答的開放結局，請讀。需要明確答案、不喜歡不可靠敘述者、想看快節奏奇幻：請略。對「氛圍派」讀者極度推薦；對「劇情派」讀者可能會挫折。",
    },
    similarByEnding: ["the-name-of-the-wind", "conversations-with-friends"],
    similarByWarning: ["the-night-circus", "circe"],
    faq: [
      { q: { en: "Does Piranesi have a happy ending?", zh: "《皮拉內西》結局是 HE、BE 還是開放式？" }, a: { en: "No, not in the conventional sense. Piranesi's ending is ambiguous: he is rescued from the House, but chooses to keep returning to it, and the novel deliberately does not resolve whether his original identity is restored or what the labyrinth ultimately means. It is neither HE nor BE — it is closer to a quiet acceptance.", zh: "嚴格說不是 HE。《皮拉內西》結局是開放式：他被救出 The House，但選擇繼續回訪它；他原本的身份是否完整恢復、那個世界對他到底意味著什麼，書中刻意不給答案。它不是 HE，也不是 BE，更接近「安靜的接受」。" } },
      { q: { en: "What are the main Piranesi trigger warnings?", zh: "《皮拉內西》有哪些避雷？" }, a: { en: "Piranesi trigger warnings cover sustained mid-intensity captivity (the labyrinth setting), gaslighting and identity erasure by an antagonist, and brief off-page references to abuse and missing persons. No on-page sexual violence, no graphic gore. The hardest beats are psychological.", zh: "《皮拉內西》主要避雷標籤：中等強度的囚禁（迷宮般的 The House 設定）、被操控與身份抹除（gaslighting）、對書外虐待與失蹤的間接提及。沒有正面性暴力、沒有血腥場景。最重的部份是心理層面。" } },
      { q: { en: "Is Piranesi worth reading?", zh: "《皮拉內西》值得讀嗎？" }, a: { en: "For atmosphere-driven readers: strongly yes — restrained prose, hypnotic imagery, an ending that rewards re-reading. For plot-driven readers it can frustrate; this is its main fault line vs conventional fantasy.", zh: "對氛圍派讀者極度值得——文字節制、意象迷人、結局耐回味。對劇情派讀者：可能會覺得「然後呢？」這就是它與一般奇幻小說的分水嶺。" } },
      { q: { en: "Piranesi spoilers — should I read them first?", zh: "《皮拉內西》有劇透嗎？要先看劇透嗎？" }, a: { en: "The book's experience depends heavily on the slow discovery of what the labyrinth (and the narrator) actually is, so we recommend not reading full Piranesi spoilers before the first read. The full-spoiler block on this page is collapsed by default for that reason.", zh: "本書的閱讀體驗高度依賴「逐步發現 The House 與主角是什麼」這個過程，建議第一次閱讀前不要看完整劇透。本頁完整劇透區塊預設折疊就是這個原因。" } },
      { q: { en: "Who is Piranesi not suitable for?", zh: "《皮拉內西》不適合誰？" }, a: { en: "Not suitable for readers who need clear answers, dislike unreliable narrators, want fast-paced fantasy, or are currently sensitive to themes of being trapped or losing one's sense of self.", zh: "不適合需要明確答案、追求快節奏、不能接受不可靠敘述者，或正處於對「被困住、失去自我」題材敏感期的讀者。" } },
      { q: { en: "What should I read if I liked Piranesi?", zh: "喜歡《皮拉內西》還可以讀什麼？" }, a: { en: "For the same atmospheric fantasy: The Night Circus. For mythology and solitude: Circe. For an open-ended literary fantasy with a similar tone: The Name of the Wind. See the similar-books section on this page for full picks.", zh: "同調性氛圍奇幻：The Night Circus；同樣神話與孤獨主題：Circe；同樣帶開放結局的文學奇幻：The Name of the Wind。詳見頁面下方相似書籍。" } },
      { q: { en: "Why is the labyrinth in Piranesi so important?", zh: "《皮拉內西》中的迷宮（The House）為什麼這麼重要？" }, a: { en: "The labyrinth is not just a setting — it is the book's argument: that a world can be both a prison and a home, both alien and beloved. The narrator's relationship with the labyrinth is the emotional spine, which is why the ending refuses to either condemn or celebrate it.", zh: "迷宮（The House）不只是場景，更是全書的論點：一個世界可以同時是監獄也是家、既陌生又被深愛。主角與迷宮的關係是情緒主軸，這也是結局拒絕對它做出單一評判的原因。" } },
    ],
  },

  // ============================================================ Phase 5B ==
  // Ten hand-authored enrichments recovered for BOOK_ALLOW. Each entry is
  // written independently — no shared template. Sensitive topics (self-harm,
  // suicide, sexual violence, pet death) intentionally avoid methods, tools,
  // locations, and graphic detail.

  "a-little-life": {
    endingTone: {
      en: "A Little Life ends on the most severe BE we tag in our catalog. Hanya Yanagihara does not build toward catharsis; she builds toward attrition. By the final quarter Jude's decades of trauma have accumulated to the point where the ending is not a twist but a weight the novel has been carrying since page one. Readers who have already noticed how narrowly the book keeps him alive in the middle sections should treat the last 100 pages as the arrival of what the prose has been warning about all along. The ending is not gratuitous — it is the logical endpoint of the character study — but it is unrelieved. There is no epilogue softening, no found-family miracle, no time-skip that recovers him. If you have picked this book up because the friendship-across-decades premise sounded warm, please recalibrate now.",
      zh: "《渺小一生》的結局是本站標記中最沉重的 BE。柳原漢雅並不是把讀者引向宣洩，而是引向消耗。當你讀到最後四分之一，Jude 累積數十年的創傷已經到了無法再承接的位置——這個結局不是反轉，而是全書從第一頁就在承受的重量終於落地。如果你在中段就已經注意到作者是多麼勉強才讓他活下來，那麼最後 100 頁請當作前面所有預警的兌現。這個結局並非為了衝擊而衝擊，而是整部人物研究的邏輯終點，但它沒有任何緩衝，沒有後記式的釋懷，沒有「新家人」奇蹟，也沒有任何時間跳躍把他救回來。如果你因為「四位大學好友跨數十年友情」的簡介而拿起這本書，請在這裡先重新校準期待。",
    },
    warningsExplained: {
      en: "The three high-intensity tags on this book — csa, self-harm, and suicide — are not moments but a continuous texture. csa is a background history that shapes every present-day scene; the novel returns to it in progressively less obscured layers, so a reader who was fine at page 200 can be blindsided at page 500. Self-harm is depicted repeatedly on-page over years of story-time; it is not framed as recovery arc, and there is no point at which the tag stops applying. This site does not describe method, instrument, or clinical detail for any of these categories, and neither does this page. If you are currently in a period where any of these tags applies to your own life, the honest recommendation is not to read this novel now; it is not a book to test yourself with. Adjacent milder content (chronic pain, disordered eating, abusive adult relationships) is also present and sustained. Note: csa is tracked separately from sexual-violence in our data model and we do not auto-map one to the other.",
      zh: "本書三個高強度標籤——csa、自傷、自殺——不是單一片段，而是連續的底色。csa 是形塑所有現在時線的背景史，作者以層層剝開的方式反覆回訪，因此在 200 頁時還撐得住的讀者，可能在 500 頁時被擊倒。自傷在故事橫跨數年的時間線裡反覆正面出現，並沒有被框架為「復原歷程」，也沒有任何一刻這個標籤停止適用。本站對這三類主題不描述方法、工具或臨床細節，本頁也一樣。若你目前生活中正處於任何一個標籤的狀態，誠實的建議是現在不要讀這本書——它不是可以拿來自我試煉的作品。相關的較輕內容（慢性疼痛、飲食失調、成年後的受虐關係）也持續存在。註：本站資料模型中 csa 與 sexual-violence 分開追蹤，不會自動視為等價。",
    },
    verdict: {
      en: "Skip for now for most readers, especially first-time readers of Yanagihara. Read only if you are emotionally stable, want an ambitious, deliberately punishing character study, and are already familiar with fiction that refuses to redeem its protagonist. There is no middle setting. This is not a book to read on a whim, on holiday, or during a difficult month.",
      zh: "對絕大多數讀者，尤其是初次接觸柳原漢雅的讀者，建議「暫緩」。只有在情緒穩定、想閱讀一部宏大且刻意殘酷的人物研究、且已經熟悉「拒絕救贖主角」這類小說的讀者，才建議讀。沒有折衷選項。這不是一本可以隨手拿起、假期閱讀、或在辛苦的月份裡挑戰自己的書。",
    },
    similarByEnding: ["no-longer-human", "the-song-of-achilles"],
    similarByWarning: ["no-longer-human"],
    faq: [
      { q: { en: "Does A Little Life have a happy ending?", zh: "《渺小一生》是 HE 嗎？" }, a: { en: "No. It is tagged BE with our highest confidence. The novel resolves toward loss, not recovery.", zh: "不是。本書標為 BE 且信心分數是本站最高等級。全書導向失去，而非復原。" } },
      { q: { en: "Is A Little Life as heavy as people say?", zh: "《渺小一生》真的像大家說的那麼沉重嗎？" }, a: { en: "Yes, and it is heavy in a sustained way rather than in isolated scenes — that is why so many readers report they had to stop mid-book.", zh: "是，而且是持續性的沉重，不是零星幾段——這也是為什麼很多讀者反映他們讀到中途就放下了。" } },
      { q: { en: "Should I read this if I have my own trauma history?", zh: "如果我自己有相關創傷經歷，該讀嗎？" }, a: { en: "We do not recommend it in that case. This is a novel to read when you are stable, not one to read as a mirror.", zh: "在這種情況下我們不建議閱讀。這本書適合在你狀態穩定時閱讀，不適合當作照映自身經歷的鏡子。" } },
      { q: { en: "Are the hardest scenes described in detail?", zh: "最沉重的段落是否具體描寫？" }, a: { en: "Some are on-page and specific; others are handled with distance. The layering is part of why the book lands so hard by the end. This page does not describe those scenes.", zh: "部分場景是正面且具體的，部分以距離呈現。這種分層正是本書後段特別沉重的原因。本頁不描述這些場景。" } },
      { q: { en: "Is this the same tone as her earlier work?", zh: "本書調性和她較早的作品一樣嗎？" }, a: { en: "No — The People in the Trees is dark but structurally colder; A Little Life is dark and emotionally close.", zh: "不一樣——《林中祕族》黑暗但結構上冷距，《渺小一生》黑暗且情感貼近讀者。" } },
      { q: { en: "Can I check the ending without reading the whole book?", zh: "可以在不讀完整本書的情況下先看結局嗎？" }, a: { en: "Yes — use the hard spoiler block on this page. It is folded by default and you have to click to reveal.", zh: "可以——請用本頁的完整劇透區塊，預設折疊，需要主動點擊才會展開。" } },
    ],
  },

  "the-seven-husbands-of-evelyn-hugo": {
    endingTone: {
      en: "Bittersweet, and unusually clean about it. Taylor Jenkins Reid uses the frame narrative — an aging star dictating her memoir to a journalist — to hold two truths in the same hand at once: Evelyn's love story with Celia was real and lasting, and both women die by the end of the novel. Neither fact is used to cancel the other. The ending is not sad in the way a shock-ending is sad; it is sad in the way a completed life is sad, with all the wins still counted. If you go in expecting a HE, you will be disappointed. If you go in expecting a modern take on an old-Hollywood scandal memoir with a genuine queer love story at its center, the ending lands exactly where the book has been aiming.",
      zh: "苦甜，而且對「苦」與「甜」的界線異常清楚。泰勒・珍金斯・里德以「老明星向記者口述回憶錄」的框架，同時把兩個事實放在同一隻手中：Evelyn 與 Celia 的愛情是真實而持久的；兩位女性最終都死去。這兩個事實並不互相取消。這本書的悲不是驚嚇式的悲，而是「一段完整人生走到終點」的那種悲——所有得到的仍然算數。若你期待 HE 會失望；若你期待一本以真實酷兒愛情為核心、帶有復古好萊塢醜聞回憶錄氣質的作品，這個結局正是它一直朝向的地方。",
    },
    warningsExplained: {
      en: "Three tags apply: domestic-abuse (on-page physical and financial abuse within one of Evelyn's marriages, sustained across several chapters), death (a partner dies of illness on-page, and Evelyn herself dies inside the frame story), and outing / closeting pressure (mid-intensity but present throughout — an era-specific structural threat rather than a scene). The domestic abuse is not extended for shock, but it is not offstage either; readers who are sensitive to physical intimate-partner violence should know it is depicted rather than referenced. There is on-page sex but nothing we would tag as sexual-violence. The overall register stays glamorous even when the content is hard, which some readers find soothing and others find dissonant.",
      zh: "三個標籤適用：domestic-abuse（Evelyn 其中一段婚姻裡有正面描寫的肢體與經濟虐待，橫跨數章持續存在）、death（伴侶因病於書中死亡，Evelyn 本人在框架故事中也死去）、outing／closeting pressure（強度中等但貫穿全書——這是那個年代的結構性威脅，不是單一場景）。家暴內容並非為了衝擊而拉長，但也並非場外處理；對親密關係暴力敏感的讀者請注意這是正面描寫、非僅提及。書中有正面性場景，但沒有可標為 sexual-violence 的內容。整體語氣即使在沉重內容時仍維持華麗調性——這對部分讀者是撫慰，對另一部分讀者則感到違和。",
    },
    verdict: {
      en: "Read for most readers, with one caveat: know before you start that this is a bittersweet love story with domestic-abuse content, not a glossy Hollywood romp. Read with caution if either intimate-partner violence or the loss of a queer partner to illness is currently a hard topic for you. Skip only if you actively refuse bittersweet endings.",
      zh: "對絕大多數讀者「推薦閱讀」，但有一項提醒：進場前請理解這是一部含家暴內容的苦甜愛情故事，不是明亮的好萊塢輕鬆讀物。若親密關係暴力或酷兒伴侶因病離世目前是你的難以承受題材，請「謹慎閱讀」。只有堅決拒絕苦甜結局的讀者才建議「跳過」。",
    },
    similarByEnding: ["daisy-jones-and-the-six", "the-remains-of-the-day", "norwegian-wood"],
    similarByWarning: ["daisy-jones-and-the-six"],
    faq: [
      { q: { en: "Is Evelyn Hugo a happy ending?", zh: "《伊芙琳・雨果的七個丈夫》是 HE 嗎？" }, a: { en: "No. It is bittersweet — the central love is fulfilled and honored, but both women die before the book closes.", zh: "不是。是苦甜結局——核心愛情被實現且被鄭重承認，但兩位女性都在結局前死去。" } },
      { q: { en: "Is this a queer love story?", zh: "這是酷兒愛情故事嗎？" }, a: { en: "Yes. Despite the framing around seven husbands, the one great love of Evelyn's life is a woman named Celia St. James.", zh: "是。儘管敘事框架圍繞著七段婚姻，Evelyn 一生真正的愛人是女性 Celia St. James。" } },
      { q: { en: "How graphic is the domestic abuse?", zh: "書中家暴描寫多具體？" }, a: { en: "It is on-page and physical, but not lingered on for shock. Readers who avoid intimate-partner violence should still treat this as a heavy tag.", zh: "屬正面描寫且涉及肢體，但並未為了衝擊而拉長。避免親密關係暴力題材的讀者仍應視為重標籤。" } },
      { q: { en: "Is there on-page sex?", zh: "有正面性場景嗎？" }, a: { en: "Yes but restrained — sensual rather than explicit. No sexual-violence tag applies.", zh: "有，但克制——感官為主，不算露骨。無 sexual-violence 標籤適用。" } },
      { q: { en: "Do I need to read Daisy Jones first?", zh: "需要先讀《黛西・瓊斯》嗎？" }, a: { en: "No. There is a small crossover reference but each novel stands alone.", zh: "不用。兩本之間有輕微交叉提及，但各自可獨立閱讀。" } },
      { q: { en: "Will this book make me cry?", zh: "這本會讓我哭嗎？" }, a: { en: "Many readers do cry in the final chapters. The tone is elegiac rather than punishing.", zh: "很多讀者在最後幾章會哭。整體調性是輓歌式的，而非折磨式的。" } },
    ],
  },

  "lessons-in-chemistry": {
    endingTone: {
      en: "Bittersweet, and structurally split. The novel loses its second protagonist — Calvin — very early, and the rest of the book is Elizabeth Zott rebuilding a life around that absence. By the final chapters she has recovered a scientific identity, a community that supports her, and public recognition, but the loss is never treated as a plot obstacle that gets overcome; it stays a shape she works around. The tone is warm and often funny even while it is grief-processing, which is unusual and part of why the ending works. This is not a HE because the primary romance is permanently over by page 100. It is not a BE because the protagonist ends the book with more agency than she started with. Bittersweet is the accurate label.",
      zh: "苦甜，且結構上一分為二。本書很早就失去第二位主角 Calvin，其餘篇幅是 Elizabeth Zott 圍繞著這個缺席重建人生。最後幾章她已找回科學身分、擁有支持她的社群、獲得公眾肯定，但失去從未被當作可以被克服的劇情障礙，而是被作為她繞行的形狀留下來。整體調性即使在處理悲傷時仍溫暖且時常幽默——這在同類作品中不常見，也是這個結局能成立的關鍵。這不是 HE，因為主要愛情關係在 100 頁前就永遠結束了；也不是 BE，因為主角在書末擁有比開頭更多的自主權。苦甜是最準確的分類。",
    },
    warningsExplained: {
      en: "Three tags: sexual-violence (an on-page assault occurs early in the book and is a formative event for the protagonist; it is depicted rather than merely referenced, though the prose is restrained), death (Calvin dies early — this is not a spoiler, most readers hit it in the first quarter), and grief (sustained across the majority of the novel). The tone often reads as satire, which is not the same as being lightweight; several readers report being caught off-guard by how heavy the underlying content is. Period-typical misogyny is present throughout as texture. There is no on-page pet death despite an important dog character.",
      zh: "三個標籤：sexual-violence（性侵事件於前段正面出現，是主角人生的形塑性事件；屬正面描寫而非僅提及，但筆法克制）、death（Calvin 早逝——這不算劇透，多數讀者在前四分之一就會遇到）、grief（貫穿本書大部分篇幅）。整體調性常常帶有諷刺喜劇感，但這不等於內容輕薄；有不少讀者反映他們被「表層幽默、底層沉重」的落差打了措手不及。時代性別歧視作為底色貫穿全書。書中有一隻重要的狗，但沒有正面寵物死亡描寫。",
    },
    verdict: {
      en: "Read for most readers who go in knowing that a) the primary love story ends early and b) sexual-violence is on-page. Read with caution if you specifically avoid SA content, even when handled with restraint. Skip if you were looking for a light TV-tie-in comfort read; the show softens edges the novel keeps.",
      zh: "對多數讀者「推薦」，前提是理解：一、主要愛情故事很早結束；二、性侵屬正面描寫。若你明確避免 SA 題材，即使筆法克制也建議「謹慎閱讀」。如果你想找的是輕鬆的影集延伸療癒讀物，建議「跳過」——影集淡化了小說保留的鋒利邊角。",
    },
    similarByEnding: ["the-seven-husbands-of-evelyn-hugo", "daisy-jones-and-the-six"],
    similarByWarning: ["the-handmaids-tale"],
    faq: [
      { q: { en: "Is Lessons in Chemistry a happy ending?", zh: "《化學課》是 HE 嗎？" }, a: { en: "No — it is bittersweet. The romance ends early; the protagonist's professional and community arc lands well.", zh: "不是——是苦甜。愛情線很早結束，主角的職業與社群線收得不錯。" } },
      { q: { en: "How graphic is the sexual assault?", zh: "性侵場景多具體？" }, a: { en: "It is on-page and specific enough to warrant the high-intensity tag, but the prose is not lingered or lurid. Readers avoiding SA content should still skip.", zh: "屬正面描寫，具體程度足以標為高強度，但筆法並不停留或渲染。避免 SA 題材的讀者仍應跳過。" } },
      { q: { en: "Is the book the same as the Apple TV show?", zh: "這本書和 Apple TV 影集內容一樣嗎？" }, a: { en: "The plot is similar but the show softens several of the heaviest beats. If you liked the show, expect the book to be more direct.", zh: "劇情相似，但影集淡化了幾個最沉重的段落。若你喜歡影集，請預期書比較直接。" } },
      { q: { en: "Does the dog die?", zh: "狗會死嗎？" }, a: { en: "No pet-death tag applies for this book. The dog is important throughout.", zh: "本書不適用 pet-death 標籤。狗全書都很重要。" } },
      { q: { en: "Is this a romance novel?", zh: "這是言情小說嗎？" }, a: { en: "No. It uses a doomed romance as a springboard for a feminist workplace-and-motherhood novel.", zh: "不是。它以一段注定不圓滿的愛情作為跳板，實際上是女性主義的職場與母職小說。" } },
      { q: { en: "Do I need to know 1960s chemistry?", zh: "需要懂 1960 年代化學嗎？" }, a: { en: "No — the chemistry is used as voice and metaphor, not as puzzle content.", zh: "不用——化學在書中是語調與比喻，不是解謎內容。" } },
    ],
  },

  "daisy-jones-and-the-six": {
    endingTone: {
      en: "Bittersweet in a very specific way: the band does not survive, the tour does not survive, but the marriage at the center of the emotional tension does survive, and the two people whose chemistry drove the crisis both end the book alive and, eventually, well. Taylor Jenkins Reid uses the oral-history format to keep the ending honest — every character narrates their own version, and the version you finish on depends on which voice you trust. If you came for the will-they-won't-they, you get a real answer. If you came for a rock-and-roll ending where the band gets back together, you do not.",
      zh: "本書的苦甜有非常具體的走向：樂團沒有存活，巡演沒有存活，但情感張力核心的那段婚姻存活了，而讓危機發生的兩個人在書末都活著，且最終過得還可以。作者用口述史的形式讓結局保持誠實——每個角色講自己的版本，你讀到最後停在哪個版本，取決於你相信誰的聲音。若你為了那段「會不會在一起」的張力而來，你會得到明確答案；若你想看的是「樂團重組、皆大歡喜」的搖滾式結局，那本書不會給你。",
    },
    warningsExplained: {
      en: "Three tags: cheating and infidelity (treated here as the same relationship line, not two separate events — emotional-affair tension is sustained across the second half; whether it crosses into physical infidelity is deliberately handled with narrative ambiguity that the format supports), and addiction (drug and alcohol dependency in multiple band members, on-page and specific, including one long relapse sequence). The addiction arc includes recovery for one character but is not framed as an easy or complete recovery. No sexual violence. The 1970s music-industry setting includes sexism and objectification as texture.",
      zh: "三個標籤：cheating 與 infidelity（在本書處理上是同一條感情線的兩個標記，不是兩件不同事件——情感外遇張力貫穿後半段，是否跨越到肢體外遇，作者刻意以「口述史格式支持的敘事模糊性」處理），以及 addiction（多位團員的藥物與酒精依賴，屬正面描寫且具體，包含一段較長的復發過程）。成癮線包含一位角色的復原，但作者並未把它寫成容易或完整的復原。無性暴力。1970 年代音樂產業背景中，性別歧視與物化作為底色存在。",
    },
    verdict: {
      en: "Read for readers who enjoy the oral-history format, character-driven ensemble drama, or music-industry period pieces, and who are OK with sustained cheating tension even if you generally dislike the trope. Read with caution if addiction relapse content is currently hard. Skip if you strictly avoid any cheating story or need a HE for both leads.",
      zh: "喜歡口述史敘事、角色驅動的群戲、或音樂產業年代題材，並且能接受持續性的出軌張力（即使你平常不喜歡這個 trope）：推薦。若成癮復發題材目前對你困難，請「謹慎閱讀」。若你嚴格避免任何出軌故事、或需要雙主角 HE：建議跳過。",
    },
    similarByEnding: ["the-seven-husbands-of-evelyn-hugo", "lessons-in-chemistry"],
    similarByWarning: ["conversations-with-friends", "gone-girl"],
    faq: [
      { q: { en: "Do Daisy and Billy end up together?", zh: "Daisy 和 Billy 最後在一起嗎？" }, a: { en: "No. That is the point the whole book is built around. Full spoilers are in the folded block on this page.", zh: "沒有。這正是全書結構圍繞的核心答案。完整劇透在本頁折疊區。" } },
      { q: { en: "Is the cheating on-page?", zh: "出軌是正面描寫嗎？" }, a: { en: "The emotional affair is on-page and sustained. Whether it becomes physical is left deliberately ambiguous — different narrators give different versions.", zh: "情感外遇是正面且持續的描寫。是否演變為肢體外遇則刻意保留模糊，不同敘述者給出不同版本。" } },
      { q: { en: "Is the show the same as the book?", zh: "影集和書一樣嗎？" }, a: { en: "The show resolves the ambiguity in one specific direction and adds scenes. The book is cooler and less definitive.", zh: "影集把模糊部份朝特定方向定調，並增加了場景。書更冷、更不下定論。" } },
      { q: { en: "How heavy is the addiction content?", zh: "成癮內容多沉重？" }, a: { en: "Heavy but not gratuitous. There is a long relapse sequence and an on-page overdose scare. Recovery is shown but not sentimentalized.", zh: "沉重但不濫用。有一段較長的復發過程與一場正面的用藥過量驚險場景。復原有被呈現，但未被過度感傷化。" } },
      { q: { en: "Do I need to read Evelyn Hugo first?", zh: "需要先讀《伊芙琳・雨果》嗎？" }, a: { en: "No — the crossover is a single reference. Either book stands alone.", zh: "不用——交叉只是單一提及。兩本書皆可獨立閱讀。" } },
      { q: { en: "Is the music real?", zh: "書中的音樂是真的嗎？" }, a: { en: "The lyrics are printed in the back matter; the band and songs are fictional but the industry beats are based on documented rock history.", zh: "歌詞印在書末附錄；樂團與歌曲是虛構的，但產業節奏取材自可考證的搖滾史。" } },
    ],
  },

  "marley-and-me": {
    endingTone: {
      en: "Bittersweet — pet-death bittersweet, specifically. This memoir is exactly what the title suggests: John Grogan and his family live with a very difficult dog for the entire dog's natural life. The ending is the ending you already fear when you pick the book up. Marley dies in old age of causes appropriate to his size and breed; the family is with him. The book does not treat the death as a twist or as a punishment for anything; it treats it as the reason the memoir exists. If you have very recently lost a companion animal, this is not the read to pick up; if you are further out from a loss and want to sit with a warm-hearted, funny book that also honors an ending, it is one of the cleanest reads in the pet-memoir category.",
      zh: "苦甜——具體來說是「寵物死亡」意義下的苦甜。這本回憶錄就是書名所暗示的內容：葛羅根一家陪一隻非常難搞的狗走完牠自然的一生。結局就是你拿起這本書時已經預感的結局。Marley 在年老時因合乎品種與體型的原因離世，家人陪伴著。書中並沒有把牠的死亡當作反轉或懲罰，而是把它當作這本回憶錄之所以存在的理由。若你剛失去陪伴動物，請不要現在讀這本書；若你距離失去已有一段時間，願意與一本溫暖、幽默、且鄭重對待結局的書共處，這本是寵物回憶錄類中最清爽的選擇之一。",
    },
    warningsExplained: {
      en: "Two tags: pet-death (high-intensity, on-page in the final chapter — this is the whole reason people search for pet-death warnings on this book) and grief (mid-intensity, present after the death and briefly across earlier moments where illness is anticipated). This page confirms the tag exists but does not describe the death scene or its timing beyond what the marketing already reveals. No animal cruelty tag; Marley's chaotic behavior causes household damage, not harm. No content that would qualify for the sexual-violence, self-harm, or suicide tags.",
      zh: "兩個標籤：pet-death（高強度，正面描寫於最後一章——這正是大家搜尋這本書寵物避雷的原因）、grief（中強度，於死亡之後與早段幾個預示疾病的時刻出現）。本頁只確認標籤存在，不描述死亡場景或其發生時機，除了行銷文宣本身已透露的內容之外。無動物虐待標籤；Marley 的混亂行為造成的是家中器物損壞，不是傷害。無任何內容適用性暴力、自傷或自殺標籤。",
    },
    verdict: {
      en: "Read for readers who love dogs and want a warm, funny memoir that ends the way real dog stories end. Read with caution if a pet in your life is elderly right now — the book is honest about aging. Skip if you have very recently lost a companion animal, or if you strictly avoid pet-death in fiction and memoir.",
      zh: "喜歡狗、想讀一本溫暖幽默、並以真實狗故事的方式收尾的回憶錄：推薦。若你家中目前有一隻年長的寵物，請「謹慎閱讀」——書對衰老的處理很誠實。若你剛失去陪伴動物，或嚴格避免虛構與回憶錄中的寵物死亡：跳過。",
    },
    similarByEnding: ["the-art-of-racing-in-the-rain"],
    similarByWarning: ["the-art-of-racing-in-the-rain"],
    faq: [
      { q: { en: "Does Marley die at the end?", zh: "Marley 最後會死嗎？" }, a: { en: "Yes. The memoir covers his full life, and he dies of age-related causes near the end. It is not framed as a twist.", zh: "會。回憶錄涵蓋牠完整的一生，末段因年老相關原因離世。這並非以反轉方式呈現。" } },
      { q: { en: "Is the death scene detailed?", zh: "死亡場景描寫具體嗎？" }, a: { en: "It is on-page and emotional, but the medical detail is restrained. This page does not describe it further.", zh: "屬正面描寫且情感濃厚，但醫療細節克制。本頁不再進一步描述。" } },
      { q: { en: "Is the book like the film?", zh: "書和電影像嗎？" }, a: { en: "The film is faithful to the shape of the book. The book has more granular detail about the family's life around the dog.", zh: "電影對書的整體形狀是忠實的。書對家庭日常的描寫更細。" } },
      { q: { en: "Is there any other pet in the book?", zh: "書中還有其他寵物嗎？" }, a: { en: "The focus is on Marley. Later dogs are mentioned briefly at the very end and are not the emotional load.", zh: "焦點在 Marley 身上。書末簡短提及後來的狗，但不是情感重量所在。" } },
      { q: { en: "Should I read this after losing a pet?", zh: "剛失去寵物可以讀嗎？" }, a: { en: "We do not recommend it within the first few months of a loss. It is a book for later.", zh: "失去寵物後最初幾個月不建議閱讀。這是一本適合稍晚再讀的書。" } },
      { q: { en: "Is it appropriate for children?", zh: "適合兒童閱讀嗎？" }, a: { en: "Older children can read it, but expect real conversations about pet mortality afterward.", zh: "較大的兒童可以閱讀，但請預期讀後會需要與孩子談論寵物死亡的真實對話。" } },
    ],
  },

  "the-art-of-racing-in-the-rain": {
    endingTone: {
      en: "Bittersweet. Garth Stein tells the story from the dog's point of view, and the dog is dying across the entire novel; the closing chapters are the completion of a life the narrator has known from page one is ending. What lifts this out of straightforward tragedy is the book's central conceit — Enzo believes he will be reborn human — so the ending is written as a departure rather than a finish. Whether that framing helps or hurts is very personal: some readers find it comforting, others find it makes the peaceful death land harder. On our scale it is Bittersweet, not BE, because Denny's own arc resolves and the dog's death is presented as a peaceful crossing rather than as a punishment.",
      zh: "苦甜。加思・斯坦以狗的視角敘述，而這隻狗在整本書中都在走向死亡；最後幾章是敘事者從第一頁就知道即將完成的一段生命的收尾。讓本書不落入純粹悲劇的關鍵，是它的中心設定——Enzo 相信自己會轉世為人——所以結局被寫成一場「離去」，而非「結束」。這種框架對你是撫慰還是加重打擊，非常個人：有些讀者覺得舒緩，有些讀者反而覺得那場平靜的死亡更加重。本站標為 Bittersweet 而非 BE，原因是 Denny 自身的線收得完整，狗的死亡也被呈現為平和的離別而非懲罰。",
    },
    warningsExplained: {
      en: "Two tags: pet-death (high, on-page but written as a peaceful end-of-life rather than an accident or cruelty scene — this is the load-bearing tag for most readers) and domestic-abuse (mid, framed here as family-conflict; a custody dispute involves manipulation and controlling behavior toward Denny by his in-laws, and includes a false accusation subplot). The two tags are distinct concerns and should be weighed separately — a reader who is fine with a peaceful pet death may still be uncomfortable with the manipulative-family subplot, and vice versa. Not every animal-narrated novel gets a pet-death tag by default; we only tag it when the animal death is on-page or centrally referenced.",
      zh: "兩個標籤：pet-death（高強度，正面描寫但被寫成平和的善終，不是意外或虐待場景——對多數讀者這是主要承重標籤）、domestic-abuse（中強度，在本書中呈現為家庭衝突；一場撫養權爭議涉及對 Denny 的操控與控制行為，還有一條假控訴的支線）。這兩個標籤是不同性質的顧慮，應分別衡量——能接受平和寵物離世的讀者，未必能接受操控式家庭支線，反之亦然。並非所有以動物視角敘事的小說都自動獲得 pet-death 標籤，本站只在動物死亡屬正面描寫或核心提及時才標記。",
    },
    verdict: {
      en: "Read for readers who want a dog-narrated novel with philosophical weight and can handle a peaceful on-page pet death. Read with caution if either recent pet loss or a difficult custody / in-law situation applies to you personally. Skip if you cannot sit with pet death in fiction under any framing.",
      zh: "想讀一本以狗視角、帶哲思厚度的小說，且能接受一場平和且正面的寵物死亡：推薦。若你近期失去寵物、或自身正處於困難的撫養權／姻親情境，請「謹慎閱讀」。若無論框架如何都無法接受虛構中的寵物死亡：跳過。",
    },
    similarByEnding: ["marley-and-me"],
    similarByWarning: ["marley-and-me"],
    faq: [
      { q: { en: "Does the dog die?", zh: "狗會死嗎？" }, a: { en: "Yes, at the end and on-page, written as a peaceful crossing. This page does not describe the scene.", zh: "會，於結局處正面描寫，寫成平和的離別。本頁不描述具體場景。" } },
      { q: { en: "Is this the same as the film?", zh: "和電影一樣嗎？" }, a: { en: "The film keeps the shape but softens the custody-conflict subplot. The novel is more critical of the in-laws.", zh: "電影保留整體結構但淡化撫養權支線。小說對姻親角色的批判更明顯。" } },
      { q: { en: "Why is domestic-abuse tagged?", zh: "為什麼標了 domestic-abuse？" }, a: { en: "The custody subplot involves controlling behavior and a false accusation. It is not intimate-partner violence in the usual sense; the tag captures the coercive-family pattern.", zh: "撫養權支線涉及控制行為與假控訴。這不是一般意義上的親密關係暴力，該標籤是為了標記強制性家庭模式。" } },
      { q: { en: "Is the dog's voice cloying?", zh: "狗的敘述會過度煽情嗎？" }, a: { en: "It leans philosophical rather than cutesy. Reader reactions split on whether it works for them.", zh: "偏哲思而非賣萌。讀者反應兩極，取決於個人是否買帳。" } },
      { q: { en: "Is this heavier or lighter than Marley & Me?", zh: "這本比《馬利與我》重還是輕？" }, a: { en: "Structurally lighter around the death itself but heavier around family conflict. Different weight profile, similar final emotion.", zh: "在死亡本身的結構處理上較輕，但在家庭衝突上較重。承重分佈不同，最後情緒相近。" } },
      { q: { en: "Should I read this after losing a pet?", zh: "剛失去寵物可以讀嗎？" }, a: { en: "We suggest waiting. The animal POV amplifies the loss for many recent-bereavement readers.", zh: "建議稍候。動物視角會放大剛失去寵物讀者的悲傷。" } },
    ],
  },

  "the-handmaids-tale": {
    endingTone: {
      en: "Open ending, deliberately. Atwood ends Offred's own narrative with her stepping into a van — she does not know whether her captors or the resistance sent it, and neither do we. The Historical Notes appendix reframes the entire novel as recovered testimony read at an academic conference in a distant future, which strongly implies the regime eventually fell but tells us nothing definitive about Offred herself. This is textbook OE, not Ambiguous: the world's shape is answered, the individual's fate is not. Readers who came from the television series should know that the novel ends where the show's first season ends and does not continue.",
      zh: "刻意的開放結局。愛特伍讓 Offred 的敘述在她走進一輛車時中止——她不知道車是被捕她的一方派來、還是抵抗組織派來，我們也不知道。書末〈歷史記註〉將整部小說重新框架為「遙遠未來一場學術會議上被讀出的、被搶救下來的口述證言」，這強烈暗示極權政體最終瓦解，但對 Offred 本人的命運未提供任何定論。這是教科書級的 OE，而不是 Ambiguous：世界的形狀被回答了，個人的命運沒有。從影集入坑的讀者請注意，小說結束在影集第一季結束的位置，之後沒有續集內容。",
    },
    warningsExplained: {
      en: "Two central tags: sexual-violence (the ritualized 'Ceremony' is central to the world of the book and is depicted on-page; the prose is deliberately clinical rather than explicit, but the tag firmly applies) and control (theocratic authoritarian control saturates every page — restrictions on reading, movement, speech, dress, and reproduction). This page does not describe the Ceremony scene beyond confirming the tag. Adjacent content includes references to punishments (public hangings, off-page torture), forced labor, and forced surrogacy. Offred's inner voice is dry and controlled; the horror of the setting lands through juxtaposition rather than through graphic detail. The novel takes a specific political and religious system as its target — it is fiction, not medical, legal, or personal-safety advice.",
      zh: "兩個核心標籤：sexual-violence（儀式化的「典禮」是這個世界的核心，屬正面描寫；筆法刻意採用臨床冷距而非露骨風格，但該標籤明確適用）、control（神權極權控制滲透每一頁——閱讀、行動、言論、衣著、生育均受限）。本頁不描述「典禮」場景，只確認標籤存在。相關內容包含刑罰（公開絞刑、場外酷刑）、強迫勞動與強迫代孕的提及。Offred 的內在聲音乾燥而克制，恐怖是透過並置而非血腥細節傳達。本書針對特定政治與宗教制度作為批判對象——它是小說，不是醫療、法律或個人安全建議。",
    },
    verdict: {
      en: "Read for readers who want foundational dystopian fiction and can sit with an open ending that refuses closure on the individual. Read with caution if sexual-violence content or authoritarian imagery is currently hard for you — the clinical prose does not soften it. Skip if you strictly need resolved endings, or are looking for the show's continued arcs.",
      zh: "想讀奠基級反烏托邦小說、且能接受「拒絕給個人結局」的開放結局：推薦。若性暴力題材或極權意象目前對你困難，請「謹慎閱讀」——臨床冷距的筆法並不會讓它變得比較容易承受。若你嚴格需要明確收束的結局，或想接續影集後段劇情：跳過。",
    },
    similarByEnding: ["conversations-with-friends", "the-remains-of-the-day"],
    similarByWarning: ["lessons-in-chemistry"],
    faq: [
      { q: { en: "Does The Handmaid's Tale have a happy ending?", zh: "《使女的故事》是 HE 嗎？" }, a: { en: "No — it is an open ending. Offred's fate is deliberately unresolved; the Historical Notes suggest the regime later fell but do not confirm what happened to her.", zh: "不是——是開放結局。Offred 本人的命運刻意未解，〈歷史記註〉暗示政體後來瓦解，但未確認她的下場。" } },
      { q: { en: "How graphic is the Ceremony scene?", zh: "「典禮」場景多具體？" }, a: { en: "It is on-page and unambiguous but written clinically rather than explicitly. Readers who avoid sexual-violence content should still skip.", zh: "屬正面且明確描寫，但筆法臨床而非露骨。避免性暴力題材的讀者仍應跳過。" } },
      { q: { en: "Do I need to read this to watch the show?", zh: "為了看影集需要先讀嗎？" }, a: { en: "No. The novel is denser and colder; the show extends the world well beyond it.", zh: "不需要。小說更密、更冷；影集把世界延伸到小說之外。" } },
      { q: { en: "Is The Testaments a direct sequel?", zh: "《證詞》是直接續集嗎？" }, a: { en: "Yes, published decades later. It gives more resolution than the original but is a distinct book.", zh: "是，數十年後才出版。它比原著提供更多收束，但屬獨立作品。" } },
      { q: { en: "Is the setting realistic?", zh: "書中的世界寫實嗎？" }, a: { en: "Atwood has said every practice in the novel has a real historical antecedent. It is not prophecy, but it is not invented in a vacuum.", zh: "愛特伍表示書中每一項做法都有真實歷史前例。它不是預言，但也不是無中生有。" } },
      { q: { en: "Is this suitable for younger readers?", zh: "適合較年輕的讀者嗎？" }, a: { en: "It is often taught in later high school; content is heavy enough that we would suggest 16+.", zh: "常於高中後段課堂教授；內容分量建議 16 歲以上閱讀。" } },
    ],
  },

  "conversations-with-friends": {
    endingTone: {
      en: "Open ending, and quietly so. Sally Rooney closes on Frances telling Nick 'come and get me' — a decision, but not a resolution. The affair is not concluded, the marriage is not concluded, Frances's relationship with Bobbi is not concluded, and Frances's own self-understanding is not concluded. This is a textbook OE in our system, not Ambiguous — the reader is not being asked to decide what happened; the reader is being handed the shape of a choice that Frances has made without being told what the choice means for anyone else. If you liked the show for its warmth, know that the novel is colder. If you liked Normal People for its intimacy, know that this book keeps more distance.",
      zh: "開放結局，且語氣安靜。莎莉・魯尼把結局停在 Frances 對 Nick 說「come and get me」——這是一個決定，但不是一個結束。外遇未收束、婚姻未收束、Frances 與 Bobbi 的關係未收束、Frances 對自己的理解也未收束。這在本站是教科書式的 OE，而不是 Ambiguous——讀者不是被要求判斷「發生了什麼」，而是被交付一個 Frances 已經做出、但作者未告訴我們對其他人意味著什麼的選擇。若你因為影集的溫度喜歡它，請知道小說更冷；若你因為《正常人》的親密感喜歡魯尼，請知道本書保留更多距離。",
    },
    warningsExplained: {
      en: "Three tags, treated as one relationship line where applicable: cheating and infidelity refer to the same story — Frances's affair with a married man from her own POV — and should not be read as two separate events. Sexual content is on-page and frank but written cool rather than erotic. Self-harm is depicted with literary distance and specificity; this page does not describe method. Adjacent content includes chronic pain (endometriosis is a real thread with medical detail), family dysfunction, and the emotional temperature of a Rooney novel, which some readers find alienating in itself. No pet-death, no on-page violence.",
      zh: "三個標籤，且在適用時視為同一條感情線：cheating 與 infidelity 指的是同一個故事——Frances 從自身 POV 描寫的與已婚男人的外遇——不應被讀作兩件不同事件。性場景屬正面且直接的描寫，但筆法冷感、非情色。自傷以文學距離加上具體性呈現；本頁不描述方法。相關內容包含慢性疼痛（子宮內膜異位症是一條真實且有醫療細節的線）、家庭失能，以及魯尼小說本身的情緒溫度——這對部分讀者本身就是難以承受的疏離感。無寵物死亡、無正面暴力。",
    },
    verdict: {
      en: "Read for readers who want a cool, precise novel about young people making bad decisions without being punished by the text. Read with caution if either protagonist-POV cheating or self-harm content is currently difficult. Skip if you require narrative warmth or a resolved ending.",
      zh: "想讀一本冷靜、精準、描寫年輕人做出糟糕決定但文本不予懲罰的小說：推薦。若「主角視角出軌」或自傷內容目前對你困難，請「謹慎閱讀」。若你需要敘事溫度或明確收束的結局：跳過。",
    },
    similarByEnding: ["the-handmaids-tale", "piranesi"],
    similarByWarning: ["gone-girl", "daisy-jones-and-the-six"],
    faq: [
      { q: { en: "Is Conversations with Friends a happy ending?", zh: "《聊天紀錄》是 HE 嗎？" }, a: { en: "No — it is an open ending. Frances makes a choice on the final page, but nothing around her is resolved.", zh: "不是——是開放結局。Frances 在最後一頁做出一個選擇，但周圍所有關係都未收束。" } },
      { q: { en: "Is the cheating the same as the infidelity tag?", zh: "cheating 和 infidelity 是同一件事嗎？" }, a: { en: "In this book, yes — both tags mark the same relationship line. We do not double-count it as two separate events.", zh: "在這本書裡是的——兩個標籤指同一條感情線。本站不重複計算為兩件事。" } },
      { q: { en: "How graphic is the self-harm?", zh: "自傷描寫多具體？" }, a: { en: "On-page with literary distance and specific enough for the tag. This page does not describe method.", zh: "屬正面描寫且以文學距離處理，具體程度足以標記。本頁不描述方法。" } },
      { q: { en: "Is this Rooney's best book to start with?", zh: "這是入門魯尼的最佳選擇嗎？" }, a: { en: "Normal People is a warmer entry point. Start with Conversations if you want the coldest register first.", zh: "《正常人》是溫度較高的入門選擇。想先體驗最冷語氣，才從《聊天紀錄》開始。" } },
      { q: { en: "Is the show a faithful adaptation?", zh: "影集忠於原著嗎？" }, a: { en: "It follows the plot but adds warmth the novel deliberately withholds.", zh: "劇情上大致照做，但增加了小說刻意不給的溫度。" } },
      { q: { en: "Should I read this if I am currently in a difficult relationship?", zh: "如果我目前正處於困難的關係中，該讀嗎？" }, a: { en: "It is not a comforting mirror. Come back to it when you have distance from your own situation.", zh: "它不是一面能給你安慰的鏡子。等你與自身處境有距離之後再讀較好。" } },
    ],
  },
};
// ---------------------------------------------------------------------------

export const AUTHOR_ENRICHMENT: Record<string, AuthorEnrichment> = {
  "aldous-huxley": {
    bio: {
      en: "Aldous Huxley (1894–1963) was a British writer and philosopher best known for Brave New World (1932), one of the foundational dystopian novels of the twentieth century. Trained in literature at Oxford after near-blindness ruled out medicine, Huxley moved between satirical society novels in the 1920s, the cool speculative fiction of his middle period, and the mystical essays of his California years. His fiction is consistently more interested in ideas than in plot, and his prose carries a clinical, almost essayistic tone. Read him for systemic critique, not catharsis.",
      zh: "阿道斯・赫胥黎（1894–1963）是英國作家與思想者，最為人所知的作品是 1932 年的《美麗新世界》，二十世紀最重要的反烏托邦小說之一。年少時因眼疾無法成為醫生，他轉而在牛津修讀文學。1920 年代他寫諷刺性的社交小說，中期轉向冷靜的思辨小說，晚年定居加州後則寫神秘主義散文。赫胥黎的小說對觀念的興趣高於情節，文筆冷感、近乎散文式。閱讀他是為了讀系統性批判，而非情緒宣洩。",
    },
    endingTendency: {
      en: "Huxley rarely writes a clean HE. His major novels lean toward Bittersweet or BE — characters who try to escape a controlled society usually pay for it. Endings are deliberately deflating: the system wins on its own terms, and the cost of seeing clearly is loneliness or death.",
      zh: "赫胥黎極少寫乾淨的 HE。主要長篇多偏 Bittersweet 或 BE——試圖逃離被控制社會的角色通常為此付出代價。結局刻意洩氣：體系以它自己的邏輯獲勝，看清真相的代價是孤獨或死亡。",
    },
    commonWarnings: {
      en: "Across his work expect: institutional dehumanisation, eugenics and population engineering, drug use as state control, suicide, and pervasive misogyny encoded into the imagined societies. Sexual content is referenced rather than explicit, but consent in his future societies is structurally compromised by design.",
      zh: "整體常見避雷：機構性去人性化、優生學與人口工程、藥物作為國家控制工具、自殺、以及被內建在虛構社會中的性別歧視。性內容多為提及、非露骨，但他筆下未來社會的「同意權」結構性地被削弱。",
    },
    whoFor: {
      en: ["Readers who want ideas-first dystopias", "Fans of cool, essayistic prose", "Anyone studying foundational science fiction"],
      zh: ["想讀觀念先行反烏托邦的讀者", "喜歡冷感、散文式筆法", "想研究科幻奠基之作"],
    },
    whoNot: {
      en: ["Readers needing emotional warmth or HE", "Fans of plot-driven thrillers", "Readers in a low mood"],
      zh: ["需要情緒溫度或 HE", "偏好情節驅動的驚悚", "近期情緒低落"],
    },
    startWith: {
      en: "Start with Brave New World — short, structurally clean, and the clearest distillation of his concerns. Move on to Island only if you want his late, more spiritual answer to the same questions.",
      zh: "從《美麗新世界》開始——篇幅短、結構乾淨，是他關懷的最清晰提煉。若想看他晚期、更靈性的回應，再讀《島》。",
    },
    relatedGenres: ["dystopian", "science-fiction"],
    relatedEndings: ["BE", "Bittersweet"],
    relatedWarnings: ["death", "suicide"],
    faq: [
      { q: { en: "Is Brave New World harder than 1984?", zh: "《美麗新世界》比《1984》難讀嗎？" }, a: { en: "Less narrative drive but shorter and cleaner. Most readers find it faster than Orwell.", zh: "敘事推進較弱，但較短較乾淨。多數讀者覺得比歐威爾快。" } },
      { q: { en: "Where to start with Huxley if not Brave New World?", zh: "不從《美麗新世界》開始的話該選哪本？" }, a: { en: "Try Point Counter Point for his social-novel mode, or The Doors of Perception for the late essayist.", zh: "想看社會小說模式可選《針鋒相對》；想看晚期散文可選《知覺之門》。" } },
      { q: { en: "Are his books safe for high-school readers?", zh: "適合高中生嗎？" }, a: { en: "Brave New World is widely taught at 16+; the sexual-coding is restrained but adult.", zh: "《美麗新世界》在 16 歲以上廣為教學使用；性方面的暗碼克制但屬成人主題。" } },
      { q: { en: "Did he write any HE?", zh: "他有寫過 HE 嗎？" }, a: { en: "Not in the major novels. Hope when it appears is qualified, not affirmed.", zh: "主要長篇沒有。即使出現希望，也是有條件的，不是肯定的。" } },
      { q: { en: "What content warnings should readers expect from Aldous Huxley?", zh: "讀赫胥黎要預期哪些內容警告？" }, a: { en: "Expect institutional dehumanisation, eugenics, drug use as state control, suicide, off-page sexual coercion encoded into the imagined society, and bleak or ambiguous endings. Sexual content is referenced rather than explicit.", zh: "預期會出現機構性去人性化、優生學、藥物作為國家控制工具、自殺、被嵌入虛構社會的場外性脅迫，以及陰鬱或開放式結局。性內容多為提及而非露骨。" } },
      { q: { en: "Does this site provide the full text of Brave New World or other Huxley novels?", zh: "本站會提供《美麗新世界》或其他赫胥黎作品的全文嗎？" }, a: { en: "No. We only publish pre-read decision data — ending tone, trigger warnings, spoiler-safe summaries, and read-or-skip verdicts. We do not host full text and do not link to pirated copies.", zh: "不會。我們只提供讀前決策資料——結局調性、避雷標籤、免雷摘要與讀或略決策。我們不提供全文，也不連結盜版。" } },
      { q: { en: "Can I report missing or incorrect Huxley book data?", zh: "可以回報赫胥黎作品資料錯誤或缺漏嗎？" }, a: { en: "Yes — email report@bookendingcheck.xyz with the book title and the issue. Reader corrections are how we keep this database accurate.", zh: "可以——請寄信至 report@bookendingcheck.xyz 附上書名與問題。讀者回報是本站準確度的主要來源。" } },
    ],
  },

  "talia-hibbert": {
    bio: {
      en: "Talia Hibbert is a British contemporary romance author best known for the Brown Sisters trilogy (Get a Life, Chloe Brown / Take a Hint, Dani Brown / Act Your Age, Eve Brown). Her work is character-led, openly inclusive, and intentionally sex-positive: heroines are Black, plus-size, queer, neurodivergent, or chronically ill, and the romance is structured to take their lives seriously rather than 'fix' them. The voice is funny but the grief, anxiety, and disability content is real — not décor.",
      zh: "塔莉雅・希貝爾（Talia Hibbert）是英國當代言情作家，最為人所知的是「布朗姐妹三部曲」（《Chloe，活出自己的人生》／《Dani，給我一個提示》／《Eve，做你這個年紀的事》）。她的作品以角色為中心，開誠布公地多元，且刻意 sex-positive：女主多為黑人、大尺碼、酷兒、神經多樣或慢性病患者，戀情結構是認真對待她們的人生，而不是「修好」她們。語氣幽默，但悲傷、焦慮、慢性病的內容是真實的——不是裝飾。",
    },
    endingTendency: {
      en: "HEA across the board. Hibbert writes within romance-genre rules: every standalone delivers a clear, earned, on-page happy ending for the central couple, with epilogue beats common.",
      zh: "全面 HEA。希貝爾在言情類型規則內寫作：每本單行本都會給核心戀人明確、應得、正面描寫的 HE 結局，常附後記。",
    },
    commonWarnings: {
      en: "On-page sex (mid–high intensity), references to past trauma (chronic illness, anxiety, an abusive ex in book one), brief grief beats, occasional explicit language. No cheating between leads; no on-page sexual violence in her main romances.",
      zh: "正面性描寫（中高強度）、過去創傷的回顧（慢性病、焦慮、第一集中前任的虐待關係）、少量哀悼情節、偶有露骨用語。男女主之間無出軌；主要言情作品中無正面性暴力。",
    },
    whoFor: {
      en: ["Readers wanting guaranteed HEA", "Fans of inclusive, sex-positive romance", "Readers who like funny narration with serious stakes"],
      zh: ["想要保證 HEA 的讀者", "喜歡多元、sex-positive 言情", "喜歡幽默敘述但情感分量真實"],
    },
    whoNot: {
      en: ["Readers who want closed-door / low-spice romance", "Readers avoiding explicit language", "Readers who dislike contemporary settings"],
      zh: ["要 closed-door／低肉度的讀者", "迴避露骨用語", "不喜歡當代背景"],
    },
    startWith: {
      en: "Start with Get a Life, Chloe Brown — the cleanest entry point and the book most readers cite as the strongest of the trilogy.",
      zh: "從《Get a Life, Chloe Brown》開始——進入點最乾淨，也是多數讀者公認三部曲中最強的一本。",
    },
    relatedGenres: ["romance", "contemporary"],
    relatedEndings: ["HE"],
    relatedWarnings: ["sex"],
    faq: [
      { q: { en: "Are her books standalone or a series?", zh: "單行本還是系列？" }, a: { en: "The Brown Sisters books are interconnected but each is fully standalone — read in any order.", zh: "布朗姐妹三本互有連結但各自獨立——任何順序都可。" } },
      { q: { en: "Spice level?", zh: "肉度？" }, a: { en: "Mid–high. Open-door, several full scenes per book, frank language.", zh: "中高。Open-door，每本數場完整描寫，用語直接。" } },
      { q: { en: "Is it heavy despite being romance?", zh: "雖是言情但會沉嗎？" }, a: { en: "The grief and disability content is real and present, but the structure always lands on safety and care.", zh: "悲傷與身障內容真實存在，但結構最後一定收於安全與照顧。" } },
      { q: { en: "Where after the Brown Sisters?", zh: "看完布朗姐妹之後？" }, a: { en: "Try the Ravenswood series for small-town vibes, or her novellas for short hits.", zh: "想看小鎮氛圍可試 Ravenswood 系列；想看短篇可選她的中篇。" } },
    ],
  },

  "margaret-atwood": {
    bio: {
      en: "Margaret Atwood (b. 1939) is a Canadian novelist, poet, and essayist whose career spans speculative fiction, historical novel, literary criticism, and graphic narrative. Her best-known book, The Handmaid's Tale (1985), reframed dystopia around reproductive control and was followed in 2019 by The Testaments. Atwood resists the label science fiction for her speculative work — she prefers 'speculative fiction' on the grounds that everything in her novels has a real-world precedent. Expect precise prose, dry irony, and a moral seriousness that does not soften its endings.",
      zh: "瑪格麗特・愛特伍（生於 1939）是加拿大小說家、詩人與散文家，創作橫跨推想小說、歷史小說、文學評論與圖像敘事。最為人所知的《使女的故事》（1985）以生育控制重構了反烏托邦，2019 年續作《證詞》延續其框架。愛特伍拒絕把自己的推想作品稱為「科幻」——她偏好「speculative fiction」，理由是書中每一件事都有現實前例。她的作品文筆精準、反諷冷峻、道德分量不為結局打折。",
    },
    endingTendency: {
      en: "Tilts toward Open Ending and Bittersweet. Even her happier resolutions arrive qualified — survival is granted but not safety, and the reader is rarely allowed to forget the cost. Outright HE is rare across her major fiction.",
      zh: "偏向 Open Ending 與 Bittersweet。即使是較好的結局，也都是有條件的——倖存被允許，但安全沒有保證，讀者很少被允許忘記代價。她主要長篇中明確的 HE 罕見。",
    },
    commonWarnings: {
      en: "Reproductive coercion, sexual violence (often institutional), state-level misogyny, on-page death, surveillance, environmental collapse. Even outside the Gilead novels, expect adult themes handled directly. Sexual content is present but non-erotic in framing.",
      zh: "生育脅迫、性暴力（多為機構性）、國家層級的性別歧視、正面死亡、監控、環境崩壞。即使是基列系列以外的作品，成人主題也以直接方式處理。性內容存在但敘述上非情色。",
    },
    whoFor: {
      en: ["Readers of literary speculative fiction", "Fans of cool, ironic prose", "Readers ready for politically serious endings"],
      zh: ["文學性推想小說讀者", "喜歡冷感、反諷筆法", "願意面對政治分量重的結局"],
    },
    whoNot: {
      en: ["Readers needing HEA", "Survivors avoiding reproductive-coercion content right now", "Fans of fast plot-driven thrillers"],
      zh: ["需要 HEA", "目前正在迴避生育脅迫題材的倖存者", "喜歡快節奏情節驅動的驚悚"],
    },
    startWith: {
      en: "Start with The Handmaid's Tale if you want her defining concerns; start with Alias Grace if you want her historical-fiction voice without the dystopia.",
      zh: "想看她最具代表性的關懷：從《使女的故事》開始。想看她的歷史小說、避開反烏托邦：從《雙面葛蕾斯》開始。",
    },
    relatedGenres: ["dystopian", "literary"],
    relatedEndings: ["OE", "Bittersweet"],
    relatedWarnings: ["sexual-violence", "death"],
    faq: [
      { q: { en: "Should I watch the show before reading?", zh: "要先看影集嗎？" }, a: { en: "No. The novel is structurally tighter and the ending is genuinely different in scope.", zh: "不需要。原著結構更緊，結局格局明顯不同。" } },
      { q: { en: "Do I need The Handmaid's Tale before The Testaments?", zh: "看《證詞》前需要先讀《使女的故事》嗎？" }, a: { en: "Strongly recommended — it gives the world model and the emotional baseline.", zh: "強烈建議——它建立了世界模型與情緒基準。" } },
      { q: { en: "Is her work safe for teenagers?", zh: "適合青少年嗎？" }, a: { en: "The Handmaid's Tale is widely taught at 16+; younger readers may find the sexual-coercion content overwhelming.", zh: "《使女的故事》在 16 歲以上廣為教學使用；更年輕的讀者可能無法承受其中的性脅迫內容。" } },
      { q: { en: "Does she write anything light?", zh: "她有輕鬆作品嗎？" }, a: { en: "Her short fiction and essays are wittier in tone, but the novels stay morally serious.", zh: "她的短篇與散文語氣較俏皮，但長篇保持道德嚴肅。" } },
    ],
  },

  "j-d-salinger": {
    bio: {
      en: "J. D. Salinger (1919–2010) was an American writer best known for The Catcher in the Rye (1951) and the Glass family stories (Franny and Zooey, Nine Stories, Raise High the Roof Beam, Carpenters). After the explosive reception of Catcher he withdrew from public life almost entirely; the Glass cycle published in The New Yorker through the 1950s and 1960s is widely considered his real artistic project. His prose is voice-driven, unmistakably American mid-century, and obsessed with how unbearable it is to be intelligent and young in a world that rewards performance over honesty.",
      zh: "J. D. 沙林傑（1919–2010）是美國作家，最為人所知的是 1951 年的《麥田捕手》以及格拉斯家族系列（《法蘭妮與卓依》《九個故事》《抬高屋樑吧，木匠們》）。《麥田捕手》引發的爆炸性反應後，他幾乎完全退出公眾生活；1950–60 年代陸續刊於《紐約客》的格拉斯家族系列被普遍視為他真正的藝術志業。他的文筆以聲音驅動、極具美國二十世紀中葉氣味，執迷於一個主題：在一個獎勵表演而非誠實的世界裡，當一個聰明的年輕人有多難受。",
    },
    endingTendency: {
      en: "Open and Ambiguous. Salinger almost never closes a story — his finishes are deliberately unresolved, often mid-thought, and ask the reader to finish the emotional arc themselves. Catcher's last paragraph is the canonical example.",
      zh: "開放與曖昧結局。沙林傑幾乎從不把故事收死——他的結尾刻意不解決，常停在念頭中段，要求讀者自行完成情緒弧線。《麥田捕手》的最後一段是經典示範。",
    },
    commonWarnings: {
      en: "Suicide and suicidal ideation (a recurring theme — Seymour Glass's death frames much of the cycle), depression, alienation, period-typical sexual coding, mid-century misogyny in some character voices, brief discussion of childhood sexual abuse in 'A Perfect Day for Bananafish'. No graphic violence, no on-page sex.",
      zh: "自殺與自殺意念（反覆出現——Seymour Glass 之死貫穿整個格拉斯系列）、憂鬱、疏離、時代背景下的性編碼、部分角色聲音中的中世紀性別歧視、〈A Perfect Day for Bananafish〉中對童年性侵的簡短提及。無具體暴力、無正面性場景。",
    },
    whoFor: {
      en: ["Readers who love voice-driven prose", "Fans of mid-century American fiction", "Readers comfortable with open endings"],
      zh: ["喜愛聲音驅動的文筆", "中世紀美國小說讀者", "能接受開放結局"],
    },
    whoNot: {
      en: ["Readers avoiding suicide content", "Readers who need plot resolution", "Readers expecting Catcher to be a feel-good coming-of-age"],
      zh: ["正在迴避自殺題材", "需要情節明確收束", "誤把《麥田捕手》當作療癒系成長小說"],
    },
    startWith: {
      en: "Start with Nine Stories if you want his short-form mastery, or The Catcher in the Rye if you want the cultural touchstone. Save the Glass-family novellas for after — they reward familiarity.",
      zh: "想看他的短篇功力：從《九個故事》開始；想接觸文化座標：從《麥田捕手》。格拉斯家族中篇留待之後讀，熟悉之後才能領會。",
    },
    relatedGenres: ["literary", "contemporary"],
    relatedEndings: ["OE", "Ambiguous"],
    relatedWarnings: ["suicide", "depression"],
    faq: [
      { q: { en: "Why are there so few Salinger books?", zh: "為什麼沙林傑作品數量這麼少？" }, a: { en: "He stopped publishing in 1965 and lived as a recluse; the estate has hinted at posthumous manuscripts but nothing has appeared.", zh: "他在 1965 年停止出版並長期隱居；遺產管理方曾暗示有遺稿，但至今未公開。" } },
      { q: { en: "Is Catcher dated now?", zh: "《麥田捕手》現在過時了嗎？" }, a: { en: "The voice is dated by design and that's part of the experience; the alienation theme isn't.", zh: "敘述聲音的時代感是設計的一部分，那本身就是閱讀體驗；疏離主題並未過時。" } },
      { q: { en: "Should I read the Glass stories in order?", zh: "格拉斯系列要照順序讀嗎？" }, a: { en: "Recommended but not required — internal chronology and publication order differ.", zh: "建議但非必要——內部年表與出版順序並不一致。" } },
      { q: { en: "Is there explicit content?", zh: "有露骨內容嗎？" }, a: { en: "No graphic violence or on-page sex; the suicide content is the heaviest element.", zh: "無具體暴力與正面性場景；最沉重的元素是自殺題材。" } },
    ],
  },
};

