// Long-form, per-warning content for /$lang/warnings/$code.
// Each of the six enriched warnings has independently written EN + ZH copy —
// not a shared template with the warning name swapped. Kept separate from
// enrichment.ts so structural collection data stays untouched.

export type FAQ = { q: string; a: string };

export interface WarningContentSide {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string[];              // 2-3 opening paragraphs
  whatCounts: { yes: string[]; no: string[]; note?: string };
  spoilerLevels: { free: string; mild: string; full: string };
  severity: string;             // paragraph about severity + confidence
  readerGuidance: string[];
  related: { label: string; href: string }[];
  picksIntro: string;
  picksEmpty: string;
  faq: FAQ[];
  policyNote: string;
}

export interface WarningContent {
  en: WarningContentSide;
  zh: WarningContentSide;
}

// Curated slugs must remain a subset of BOOK_ALLOW (index-allowlist.ts) AND
// the book's triggers must actually include the warning code. The route
// double-checks this at render time.
export const CURATED_BY_WARNING: Record<string, string[]> = {
  "pet-death": [],
  "self-harm": [],
  "sexual-violence": [],
  suicide: ["no-longer-human", "norwegian-wood"],
  cheating: [],
  death: [
    "the-song-of-achilles",
    "me-before-you",
    "the-fault-in-our-stars",
    "the-time-travelers-wife",
  ],
};

export const WARNING_CONTENT: Record<string, WarningContent> = {
  // ============================================================ pet-death ==
  "pet-death": {
    en: {
      title: "Pet Death in Books — Spoiler-Safe Warning Guide | NovelCheck",
      metaDescription:
        "Check whether a novel includes pet death before you read. Learn what counts, how we grade severity, and how to use the warning without full spoilers.",
      h1: "Pet Death in Books",
      intro: [
        "The death of a companion animal is one of the most common reasons a reader closes a book mid-chapter. If you have ever put down a novel because a dog on page 40 felt a little too loved, this page is for you. It is not a book review and it is not a plot summary. It is a filter you can use before you start reading.",
        "We treat pet death as a specific, narrow warning. It answers one question: does a companion animal die inside this story, or does the protagonist carry the loss of one from before the book begins? Anything broader — general animal cruelty, hunting scenes, farm animals as backdrop — is tracked under other tags so the pet-death label stays useful for the readers who actually need it.",
        "The rest of this page explains what we do and do not count, how to read the severity marks, and how to use the tag without walking into the exact scene you were trying to avoid.",
      ],
      whatCounts: {
        yes: [
          "A named companion animal (dog, cat, rabbit, bird, horse kept as a companion, etc.) dies on the page.",
          "The animal dies off the page but the death is confirmed and the surviving characters grieve.",
          "The protagonist has already lost a pet before the book opens and the loss shapes their arc in a material way.",
          "A working animal (guide dog, service animal, war horse treated as a companion) dies and the text gives the loss real weight.",
        ],
        no: [
          "Non-companion animals used as food, transport, or scenery — those live under other animal tags.",
          "A pet is briefly ill or injured but recovers by the end of the book.",
          "A pet is present in the story world but the narrative ends without confirming its fate.",
          "Wildlife death in a nature scene, unless a bond with a named POV character is established first.",
        ],
        note: "Injury without death is tracked separately. If it matters to you, cross-check the animal-cruelty tag as well.",
      },
      spoilerLevels: {
        free:
          "The tag alone tells you a pet death happens — nothing about which animal, when in the book, or how.",
        mild:
          "The mild-spoiler note on each book card tells you whether it happens on page or off, and roughly where in the arc, so you can brace for it.",
        full:
          "Full spoiler details — who, when, and how — live only inside the collapsed 'Full spoiler' block on the individual book page. This warning hub never opens that block for you.",
      },
      severity:
        "Severity here means emotional weight, not the length of the scene. A quiet off-page paragraph with a hundred pages of grief afterwards is graded high; a long but distanced retrospective can be low. Confidence is a separate axis — Confirmed means we or a trusted second source have verified the scene exists; Likely means the trigger is strongly implied but we are relying on one source; Limited data means we have flagged it from reader reports but have not confirmed it ourselves.",
      readerGuidance: [
        "If you are grieving a real pet right now, default to skipping any book with a Confirmed high-severity mark, regardless of the ending.",
        "If you can read pet loss when it is redemptive, look for books where the death happens early and the arc is about healing.",
        "Never rely on the ending tag alone. A Happy Ending book can still include a devastating pet loss in the middle.",
        "If a book is only marked Likely or Limited data, treat it as a maybe and read the reviewer notes on the book page.",
      ],
      related: [
        { label: "Pet death collection", href: "/en/collections/pet-death-warning" },
        { label: "All trigger warnings", href: "/en/warnings" },
        { label: "Sad ending books", href: "/en/collections/sad-ending-books" },
      ],
      picksIntro:
        "Books currently confirmed as carrying this warning with full editorial notes:",
      picksEmpty:
        "We have not yet confirmed a book in the fully-enriched set as carrying this warning. New titles are being added; use the broader collection link above in the meantime.",
      faq: [
        {
          q: "Does this include off-page pet death?",
          a: "Yes. If the death is confirmed by the text and the characters react to it, it counts, even if the scene itself is not shown.",
        },
        {
          q: "Is animal injury included in this warning?",
          a: "No. Injury without death is tracked under a separate animal-injury note. This tag is reserved for actual loss.",
        },
        {
          q: "Do wild animals count as pets?",
          a: "Only if the story frames a specific, named animal as a bonded companion to a POV character. Wildlife encountered briefly in a nature scene does not qualify.",
        },
        {
          q: "Can I check without seeing which pet dies?",
          a: "Yes. The warning tag alone confirms a pet death exists. Which animal, when, and how are kept inside the collapsed spoiler block on each book page.",
        },
        {
          q: "How do I report a missing pet-death warning?",
          a: "Use the contact page. Include the book title, the edition, and roughly where the scene appears. We verify before updating.",
        },
      ],
      policyNote:
        "We do not host the text of any novel and we do not link to unofficial downloads. Full plot spoilers stay collapsed on book pages. If information here is out of date, please tell us.",
    },
    zh: {
      title: "小說中的寵物死亡：免雷避雷指南 | NovelCheck",
      metaDescription:
        "在開讀前確認小說是否含寵物死亡情節。本頁說明什麼算、什麼不算、嚴重程度分級，以及如何避開完整劇透使用這個標籤。",
      h1: "小說中的寵物死亡",
      intro: [
        "伴侶動物的死亡，是讀者中途闔上小說最常見的原因之一。如果你曾經因為第 40 頁那隻狗看起來被寫得太深情就把書放下，這一頁是給你的。它不是書評，也不會複述劇情，而是你開讀前可以用的一層過濾。",
        "我們把「寵物死亡」定義得很窄，只回答一個問題：這本小說裡是否有伴侶動物死去，或主角是否帶著這樣的失去進入故事。更廣義的動物受傷、狩獵場景、背景中的家畜等，都放在其他標籤，避免這個標稀釋掉，變得對真正需要的人沒有意義。",
        "以下說明我們如何界定範圍、嚴重程度怎麼看，以及怎麼在不踩到那一幕的前提下使用這個避雷標。",
      ],
      whatCounts: {
        yes: [
          "有名字的伴侶動物（狗、貓、兔、鳥、被當家人看待的馬等）在頁面上死亡。",
          "動物死亡發生在場外，但文本明確確認，且角色因此哀悼。",
          "故事開始前主角就已經失去寵物，且這份失去實質影響其角色線。",
          "工作犬、導盲犬、被賦予情感分量的戰馬等工作動物死亡，且文本正面處理這份失去。",
        ],
        no: [
          "被當作食物、交通工具或背景的一般動物——這類另有標籤。",
          "寵物短暫生病或受傷，但在結尾前康復。",
          "寵物出現在故事世界中，但整本書結束時牠的下落未被交代。",
          "自然場景中的野生動物死亡，除非文本先建立牠與有名字的角色之間的連結。",
        ],
        note: "只受傷、沒死亡另有標籤。若你在意，請同時對照動物受傷相關的註記。",
      },
      spoilerLevels: {
        free: "光看避雷標，你只知道書中有寵物死亡，不會知道是哪一隻、哪一段、怎麼發生。",
        mild: "每張書卡的輕度劇透註記，會告訴你是場內或場外、大約發生在故事的哪一段，讓你可以做心理準備。",
        full: "誰、什麼時候、怎麼死，只在該書詳細頁的「完整劇透」摺疊區展開。本避雷頁永遠不會替你打開它。",
      },
      severity:
        "這裡的嚴重程度指的是情緒重量，不是場景長度。一段安靜的場外死亡加上百頁的哀悼，可能被標為 high；長但保持距離的回顧，反而可能是 low。可信度是另一個軸——Confirmed 表示我們或可信的第二來源已確認場景存在；Likely 表示強烈暗示、但只靠單一來源；Limited data 表示是由讀者回報標出，尚未由我們親自核對。",
      readerGuidance: [
        "如果你此刻正在經歷寵物離世的哀傷，即使結局是圓滿的，也建議直接跳過任何被標為 Confirmed 高強度的書。",
        "如果你能承受帶有療癒感的寵物離別，可以優先找那些「早段發生、後半處理」的書。",
        "不要只看結局分類。HE 的書中段仍可能出現極重的寵物失去。",
        "若一本書只有 Likely 或 Limited data 的標記，請當成「待確認」，並閱讀該書頁的讀者註記後再決定。",
      ],
      related: [
        { label: "寵物死亡主題清單", href: "/zh/collections/pet-death-warning" },
        { label: "全部避雷標籤", href: "/zh/warnings" },
        { label: "悲劇結局小說", href: "/zh/collections/sad-ending-books" },
      ],
      picksIntro: "目前已完成資料確認、確實包含此避雷標籤的作品：",
      picksEmpty:
        "在已完成完整編輯註記的作品中，暫時還沒有確認符合這個標籤的書。新書仍持續加入，中間可以先看上方的主題清單。",
      faq: [
        {
          q: "場外的寵物死亡也算嗎？",
          a: "算。只要文本明確確認、且角色有反應，即使沒有正面描寫，也會標。",
        },
        {
          q: "只是受傷，沒有死亡也算嗎？",
          a: "不算。受傷是另一個獨立註記。這個標籤只用於真正的死亡。",
        },
        {
          q: "野生動物算寵物嗎？",
          a: "只有當故事把牠寫成有名字、與角色建立連結的伴侶時才算。純粹在自然場景中出現的野生動物不算。",
        },
        {
          q: "可以不看是哪隻寵物死掉的情況下先查嗎？",
          a: "可以。避雷標本身只告訴你「有」寵物死亡；是哪一隻、哪一段、怎麼發生，都收在該書頁的完整劇透摺疊區。",
        },
        {
          q: "發現漏標寵物死亡要怎麼回報？",
          a: "請透過聯絡頁，附上書名、版本、以及大約出現的段落。我們會先核對再更新。",
        },
      ],
      policyNote:
        "本站不提供任何小說全文，也不提供盜版下載連結。完整劇透只保留在書頁的摺疊區。如果本頁資訊已過時，請告訴我們。",
    },
  },

  // ============================================================ self-harm ==
  "self-harm": {
    en: {
      title: "Self-Harm in Books — Content Warning & Reader Guide | NovelCheck",
      metaDescription:
        "How we mark self-harm in novels, what counts as a reference vs an on-page scene, and how to check before reading without seeing methods or graphic detail.",
      h1: "Self-Harm in Books",
      intro: [
        "This warning is here so you can decide whether to open a book, not so you can be pulled through content you would rather avoid. The page itself does not describe methods, tools, or how any scene unfolds. It only tells you what is inside the tag and how to use it.",
        "Self-harm shows up in fiction in very different forms. Some books reference it briefly, in a single paragraph about a character's past. Others put it in the present tense, treated with distance. A small number of literary and YA novels build entire recovery arcs around it. Each of those requires a different level of preparation from the reader, so we mark them differently.",
        "If you are in early recovery, or you have never read fiction that touches this before, the safe default is to start from the mild-spoiler note on each book page rather than reading a book blind because the ending sounds gentle.",
      ],
      whatCounts: {
        yes: [
          "Non-suicidal self-injury depicted in a scene from a POV character's perspective.",
          "A character's past self-harm that the narrative returns to explicitly, even without a present-tense scene.",
          "Recovery-arc storylines where earlier self-harm is discussed by name.",
          "Metaphorical language that the text itself treats as self-harm rather than as symbolism.",
        ],
        no: [
          "Suicidal ideation or attempts on their own — those are tracked under the separate suicide tag.",
          "Eating disorders — separate warning, because the dynamic and reader sensitivities differ.",
          "General physical injury from accidents, fights, or medical procedures.",
          "Ambiguous, single-line imagery that neither the character nor the narrative frames as self-harm.",
        ],
        note: "If a book overlaps this tag with suicide or eating-disorder tags, all applicable tags are shown; we do not force a choice between them.",
      },
      spoilerLevels: {
        free:
          "The tag alone confirms self-harm content exists inside the book — nothing about who, when, or how.",
        mild:
          "The mild-spoiler note tells you whether it is on-page or referenced, whether the character is in active behaviour or recovery, and how central it is to the arc.",
        full:
          "Any specific description of what happens in a scene is limited to the individual book page's collapsed spoiler block and is intentionally short.",
      },
      severity:
        "Severity here reflects two things: how present the content is (referenced vs on-page vs recurring) and how emotionally exposed the reader is expected to be. It does not describe intensity of the act itself, and we do not rank or compare acts. Confidence marks whether the tag has been Confirmed by direct check of the text, Likely from a trusted secondary source, or noted with Limited data based on reader reports.",
      readerGuidance: [
        "In active recovery: default to skip. If you need to read for study or work, choose only books tagged as recovery-focused and read with a support plan.",
        "If you are supporting someone who self-harms, avoid books that use the behaviour as plot shock rather than character truth — the mild-spoiler note usually flags this.",
        "The warning is not a moral judgement on the book. Some literary and YA titles handle self-harm with real care; that is what the recovery-focused sub-note is for.",
        "This page is not medical or crisis guidance. If you are in crisis, please contact a local support line rather than making the decision from a book warning.",
      ],
      related: [
        { label: "Self-harm collection", href: "/en/collections/self-harm-warning" },
        { label: "Suicide warning", href: "/en/warnings/suicide" },
        { label: "All trigger warnings", href: "/en/warnings" },
      ],
      picksIntro:
        "Books currently confirmed as carrying this warning with full editorial notes:",
      picksEmpty:
        "None of the currently fully-enriched books carries this tag with the confidence we require to feature it here. The broader collection page lists additional titles awaiting review.",
      faq: [
        {
          q: "Does a brief reference count?",
          a: "Yes, if the narrative names it. A single ambiguous image that could be read as something else does not.",
        },
        {
          q: "Are past incidents included?",
          a: "Yes. Past self-harm that the story returns to explicitly is tagged, usually at a lower severity than on-page scenes.",
        },
        {
          q: "Will this page describe the method used in any book?",
          a: "No. Methods, tools, and step-by-step scene detail are not included here or on the book pages. The tag confirms presence and rough form only.",
        },
        {
          q: "Is self-harm the same as suicidal ideation?",
          a: "No. They are tracked as separate tags because readers often need to filter them independently.",
        },
        {
          q: "How is severity decided?",
          a: "By how present the content is and how directly the reader is exposed to it, not by intensity of the act. Confidence is tracked as a separate axis.",
        },
      ],
      policyNote:
        "We do not describe methods, provide medical advice, or attempt to serve as a support resource. If you are in distress, please contact a professional or a crisis line in your region.",
    },
    zh: {
      title: "小說中的自傷情節：內容提醒與閱讀指南 | NovelCheck",
      metaDescription:
        "這個避雷標籤如何界定？只是回憶算嗎？本頁說明分級方式，並不描述任何具體方法或步驟，協助你在開讀前做決定。",
      h1: "小說中的自傷情節",
      intro: [
        "這個避雷標籤的存在，是為了讓你在打開一本書之前先做決定，而不是把你帶進你原本想避開的內容。這一頁不會描述任何方法、工具或場景細節，只說明標籤裡包含什麼、以及該怎麼使用。",
        "自傷在小說裡呈現的方式差異很大。有些書只在單一段落中提到角色過去的一段經歷；有些以現在進行式書寫，但用相對抽離的語氣處理；也有少數文學或 YA 作品，把復原歷程當作整條主線。這幾種情況需要的讀前準備完全不同，因此我們會分開標。",
        "如果你正在復原初期，或從未讀過相關題材的小說，較安全的作法是：先看每一本書頁面上的輕度劇透註記，再決定要不要讀，而不是因為結局聽起來溫柔就直接翻開。",
      ],
      whatCounts: {
        yes: [
          "POV 角色視角下所描寫的非自殺性自我傷害場景。",
          "角色過去的自傷經歷，被敘事明確回顧，即使沒有現在時態的場景。",
          "以復原為主線、明確以名相稱討論過去自傷的故事。",
          "被文本本身視為自傷、而非象徵性隱喻的語言。",
        ],
        no: [
          "只有自殺意念或企圖，屬於另一個獨立的 suicide 標籤。",
          "飲食疾患另有標籤，因為互動方式與讀者敏感點不同。",
          "意外、打鬥或醫療程序造成的一般身體傷害。",
          "曖昧、單句、角色與敘事都未將其定位為自傷的意象。",
        ],
        note: "若一本書同時符合自傷與自殺、飲食疾患等多個標籤，我們會全部標出，不會強迫擇一。",
      },
      spoilerLevels: {
        free: "光看避雷標，你只知道書中有自傷相關內容，不會知道是誰、何時、如何。",
        mild: "輕度劇透註記會告訴你是場內或回憶、角色目前處於進行還是復原階段、以及在整條主線中的分量。",
        full: "任何具體場景的描述都僅收在該書頁的完整劇透摺疊區，且刻意保持簡短。",
      },
      severity:
        "這裡的嚴重程度指的是兩件事：內容在文本中的存在程度（提及／場內／反覆出現），以及讀者被要求正面承受的程度。它不描述行為本身的激烈程度，我們也不對行為做排序。可信度是另一個軸：Confirmed 表示我們親自核對過原文；Likely 表示來自可信的二手來源；Limited data 表示是由讀者回報標出、尚未核對。",
      readerGuidance: [
        "若你正在復原初期：預設跳過。若因學術或工作需要必須閱讀，請只選標為「以復原為主線」的作品，並與支持系統一同進行。",
        "若你正在陪伴自傷經驗者，請避開將此行為當作情節震撼工具的書。輕度劇透註記通常會標出這一點。",
        "這個避雷標不代表對書的道德評價。有些文學與 YA 作品處理得非常有分寸，這正是「復原主線」子註記的意義。",
        "本頁不提供醫療或危機處理建議。若你正處於危機中，請與所在地區的支援專線聯繫，不要以一則書籍避雷做決定。",
      ],
      related: [
        { label: "自傷主題清單", href: "/zh/collections/self-harm-warning" },
        { label: "自殺避雷", href: "/zh/warnings/suicide" },
        { label: "全部避雷標籤", href: "/zh/warnings" },
      ],
      picksIntro: "目前已完成資料確認、確實包含此避雷標籤的作品：",
      picksEmpty:
        "在已完成完整編輯註記的作品裡，暫時沒有以我們要求的可信度符合此標籤的書。主題清單頁列有更多尚待核對的候選作品。",
      faq: [
        {
          q: "只是提一句也算嗎？",
          a: "只要敘事明確以名相稱，就算。單一、曖昧、可解讀為其他意義的意象不算。",
        },
        {
          q: "過去的經歷算嗎？",
          a: "算。故事明確回顧的過去自傷會被標，但嚴重程度通常低於現場場景。",
        },
        {
          q: "這一頁會描述具體方法嗎？",
          a: "不會。本站不描述方法、工具或分步驟的場景細節。標籤只確認「存在」與大致形式。",
        },
        {
          q: "自傷與自殺意念是同一件事嗎？",
          a: "不是。兩者是獨立標籤，因為讀者常常需要分開過濾。",
        },
        {
          q: "嚴重程度是怎麼判定的？",
          a: "以內容在文本中的存在程度與讀者需承受的直接程度來判斷，不是以行為激烈程度。可信度另有獨立分軸。",
        },
      ],
      policyNote:
        "本站不描述方法，也不提供醫療建議，並無法替代任何支持資源。若你目前情緒不穩，請與所在地區的專業或危機專線聯繫。",
    },
  },

  // ===================================================== sexual-violence ==
  "sexual-violence": {
    en: {
      title: "Sexual Violence in Books — Spoiler-Safe Content Warning | NovelCheck",
      metaDescription:
        "How we mark sexual violence in fiction, what falls inside the tag, and how to check a book before reading without graphic detail or full plot spoilers.",
      h1: "Sexual Violence in Books",
      intro: [
        "This is one of the warnings readers most often want to check quietly, before anyone else sees them looking. The page is written for that use. Nothing on it is graphic, and no scene is described. It only tells you what the tag covers and how to use it as a filter.",
        "Fiction handles sexual violence in very different ways. Some books portray it directly and stay in the aftermath for a long time. Some reference a past event as background for a character and never depict a scene. A few use non-consent or dubious-consent as a romance trope, which needs its own note because reader responses vary sharply. We keep the top-level tag the same, but flag the form on each book page so the difference is visible.",
        "The rest of this page explains what counts, how severity and confidence work, and how to read the mild-spoiler note without opening full plot details.",
      ],
      whatCounts: {
        yes: [
          "Non-consensual sexual acts depicted or clearly referenced in the text.",
          "Attempted assault, whether or not it is completed on the page.",
          "Coercion or incapacitated consent framed by the text as non-consensual, even if a character debates it.",
          "Escalating sexual harassment that the narrative treats as violence, not comedy.",
          "Past assault used as material backstory for a POV character.",
        ],
        no: [
          "Consensual explicit content — that lives under the separate sexual-content tag.",
          "General violence without a sexual element.",
          "Suggestive language or discomfort with no non-consensual act named or implied.",
          "Historical setting alone. Setting does not add or remove the tag; only the events do.",
        ],
        note: "Dub-con / non-con as romance trope shares this top-level code with an added sub-note so you can filter by form on the book pages.",
      },
      spoilerLevels: {
        free:
          "The tag alone tells you the content exists in the book. It does not say who, when, on the page, or in what form.",
        mild:
          "The mild-spoiler note on each book card tells you whether it is on-page or referenced, whether the affected character is a POV, and roughly how central it is.",
        full:
          "Any scene-level or outcome-level description is kept inside the collapsed spoiler block on the individual book page. This warning hub does not open it for you.",
      },
      severity:
        "Severity reflects how present the content is and how much of the book sits inside its aftermath, not the graphic intensity of any single line. A single-page reference with no aftermath is graded low; brief on-page events followed by months of the story processing them are graded high. Confidence marks whether we have Confirmed the tag ourselves, whether it is Likely from a trusted source, or whether we have Limited data.",
      readerGuidance: [
        "Recently survived assault: consider skipping this whole category for at least several months. A book warning is not a substitute for talking to a clinician about reading content.",
        "If you can read past-tense references but not on-page scenes, filter to books where the mild-spoiler note says 'referenced only'.",
        "For romance readers who avoid dub-con as trope, use the sub-note; genre alone will not tell you whether a book uses it.",
        "The presence of a HE ending does not neutralise this warning. Some books pair both.",
      ],
      related: [
        { label: "Sexual violence collection", href: "/en/collections/sexual-violence-warning" },
        { label: "All trigger warnings", href: "/en/warnings" },
        { label: "Editorial policy", href: "/en/editorial-policy" },
      ],
      picksIntro:
        "Books currently confirmed as carrying this warning with full editorial notes:",
      picksEmpty:
        "No fully-enriched book currently carries this tag at the confidence level we require to feature. Additional titles are listed on the collection page while we complete review.",
      faq: [
        {
          q: "Are attempted assaults included?",
          a: "Yes. The tag covers attempts as well as completed acts, at severity based on how present the content is in the book.",
        },
        {
          q: "Do past-event references count?",
          a: "Yes, when the text names them. A vague implication that could be read another way is not tagged.",
        },
        {
          q: "Will the warning page include graphic detail?",
          a: "No. This hub never quotes scenes. The book pages also keep any specific description inside a collapsed block and intentionally short.",
        },
        {
          q: "Is coercion included?",
          a: "Yes, when the narrative frames the encounter as non-consensual, even if a character debates it internally.",
        },
        {
          q: "How can I see the warning without full plot spoilers?",
          a: "Use the mild-spoiler note on each book card. It tells you form and centrality but not who or exact outcome. Full spoilers stay collapsed.",
        },
      ],
      policyNote:
        "We do not host book text, provide unofficial downloads, or use sensational language. If you feel unsafe, please contact a support line rather than making the decision from a book warning.",
    },
    zh: {
      title: "小說中的性暴力情節：免雷內容提醒 | NovelCheck",
      metaDescription:
        "本頁說明性暴力避雷標籤如何界定、如何分級，並不描述任何場景細節，讓你可以在開讀前先做決定。",
      h1: "小說中的性暴力情節",
      intro: [
        "這是讀者最常想「安靜地自己查一下」的避雷標籤之一。這一頁就是為此而寫。本頁不含任何露骨敘述，也不會描述任何場景，只說明標籤涵蓋範圍、以及如何當作一層過濾使用。",
        "小說對性暴力的處理差異很大。有些正面描寫、並在事後停留很久；有些只作為角色背景輕輕帶過，全書不出現場景；也有少數作品把非自願或曖昧同意當作言情套路使用，這需要獨立註記，因為讀者反應差異很大。我們仍統一使用同一個上層標籤，但會在該書頁面上註明形式，讓差異可見。",
        "後段說明什麼算、什麼不算，嚴重程度與可信度怎麼看，以及如何在不打開完整劇透的情況下讀輕度劇透註記。",
      ],
      whatCounts: {
        yes: [
          "文本中被描寫或明確提及的非自願性行為。",
          "未遂的性侵，無論頁面上是否完成。",
          "被文本呈現為非自願的脅迫或無能力同意情境，即使角色內心有辯證。",
          "被敘事定位為暴力、而非喜劇的升級型性騷擾。",
          "作為 POV 角色實質背景的過去性侵經歷。",
        ],
        no: [
          "雙方合意的性描寫另有 sexual-content 標籤。",
          "無性別要素的一般暴力。",
          "沒有任何非自願行為被指名或暗示的曖昧或不適感。",
          "單靠歷史背景本身不會加減標。標的是事件，不是設定。",
        ],
        note: "Dub-con／non-con 作為言情套路使用時，共用同一上層標籤但加註副註記，你可以在書頁上按形式篩選。",
      },
      spoilerLevels: {
        free: "光看標籤，你只知道書中有這類內容，不會知道是誰、何時、是否場內、以何種形式呈現。",
        mild: "每張書卡的輕度劇透註記會告訴你是場內或提及、受影響角色是否為 POV、以及在整條主線中的分量。",
        full: "任何場景或結局層次的描述都收在該書頁的摺疊劇透區，本避雷頁不會替你打開。",
      },
      severity:
        "嚴重程度反映內容存在的程度與後續佔全書的比重，不是任何單一段落的激烈程度。單頁提及、無後續，屬 low；短篇幅場景後跟隨數月的內在處理，屬 high。可信度是另一個軸：Confirmed 表示我們親自核對；Likely 表示可信二手來源；Limited data 表示尚待核對。",
      readerGuidance: [
        "近期經歷性暴力的倖存者：建議至少數月完全跳過此類。避雷標無法取代與專業人士就閱讀內容進行的對話。",
        "若你可以承受過去式提及但無法承受場內場景，請優先選輕度劇透註記為「僅提及」的作品。",
        "避免 dub-con 套路的言情讀者，請使用副註記；光看類型無法判斷書中是否使用。",
        "HE 結局不會抵銷這個避雷標。有些書兩者兼具。",
      ],
      related: [
        { label: "性暴力主題清單", href: "/zh/collections/sexual-violence-warning" },
        { label: "全部避雷標籤", href: "/zh/warnings" },
        { label: "編輯與內容說明", href: "/zh/editorial-policy" },
      ],
      picksIntro: "目前已完成資料確認、確實包含此避雷標籤的作品：",
      picksEmpty:
        "在已完成完整編輯註記的作品中，暫時沒有以我們要求的可信度符合此標籤的書。主題清單頁列有更多待核作品。",
      faq: [
        {
          q: "未遂的性侵也算嗎？",
          a: "算。標籤涵蓋未遂與既遂，嚴重程度依內容在書中的存在程度而定。",
        },
        {
          q: "過去事件的提及算嗎？",
          a: "當文本明確指名時算。曖昧、可解讀為其他事件的暗示不標。",
        },
        {
          q: "本頁會有露骨細節嗎？",
          a: "不會。本頁不引用任何場景。書頁上的具體描述也都收在摺疊區，且刻意保持簡短。",
        },
        {
          q: "脅迫算在內嗎？",
          a: "算。當敘事把事件定位為非自願時，即使角色內心有辯證，也會標。",
        },
        {
          q: "怎麼在不看完整劇透的情況下查詢？",
          a: "看每張書卡的輕度劇透註記。它會告訴你形式與分量，不會告訴你角色與結果。完整劇透維持摺疊。",
        },
      ],
      policyNote:
        "本站不提供全文、不提供盜版下載，也不使用煽動性語言。若你感到不安全，請聯繫支援專線，而非從一則書籍避雷做判斷。",
    },
  },

  // ============================================================== suicide ==
  suicide: {
    en: {
      title: "Suicide in Books — Content Warning & Spoiler Guide | NovelCheck",
      metaDescription:
        "Check whether a novel includes suicide, ideation, or an attempt before reading. This page explains the tag with no methods, no detail, and no full spoilers.",
      h1: "Suicide in Books",
      intro: [
        "This warning is written to help you decide whether to open a book, not to describe what happens inside one. Nothing on this page depicts suicide, describes a method, or names a means. The tag only tells you that suicide, ideation, or an attempt appears somewhere in the story, and roughly how present it is.",
        "Suicide appears in fiction in very different registers. Some books treat it as a completed event that shapes the arc of everyone left behind. Some depict ideation without action. Some depict an attempt without a completed death. Others frame the entire story as a slow move away from that edge. These read very differently, so we separate them on each book page rather than lumping them.",
        "If you are having a hard time right now, please close this page and talk to a person or a crisis line in your region. A book warning is not the right tool for that decision.",
      ],
      whatCounts: {
        yes: [
          "A character death by suicide, whether depicted on the page, referenced clearly, or set before the story begins and named by the text.",
          "An attempt, whether or not it is completed within the story.",
          "Suicidal ideation held by a POV character over more than a passing moment.",
          "A survivor's grief arc following a suicide loss that shapes plot or character.",
        ],
        no: [
          "General grief or mourning without a suicide-specific cause.",
          "Non-suicidal self-injury, which is tracked under the separate self-harm tag.",
          "Off-hand phrases (e.g. hyperbole) that neither character nor narrative treats as literal.",
          "Suicide as a distant historical footnote with no bearing on any character in the book.",
        ],
        note: "When a book contains more than one form, all applicable sub-notes appear on the book page.",
      },
      spoilerLevels: {
        free:
          "The tag confirms the content exists. It does not say who, when, or in what form.",
        mild:
          "The mild-spoiler note on each book card tells you the form (ideation, attempt, or completed death), whether it is on-page or referenced, and how central it is.",
        full:
          "Details about which character, when in the arc, and any surrounding scene beats are collapsed on the individual book page and intentionally brief. Methods are never given.",
      },
      severity:
        "Severity reflects how present the content is and how directly the reader is exposed to it, not the intensity of any single moment. A book that opens with a completed suicide and spends the rest of the arc in grief may be higher severity than a book with a single on-page attempt that is not returned to. Confidence marks Confirmed, Likely, or Limited data based on how we sourced the tag.",
      readerGuidance: [
        "In crisis: close the page and contact a crisis line. This site is not a support resource.",
        "In active recovery from ideation: default to skip books tagged Confirmed high. Ask a support person before reading anything tagged with an on-page attempt.",
        "If you can read a completed death but not an on-page attempt, use the form sub-note to filter.",
        "An HE-tagged book can still contain suicide content earlier in the arc. Ending tag alone is not enough.",
      ],
      related: [
        { label: "Self-harm warning", href: "/en/warnings/self-harm" },
        { label: "Grief / loss (death)", href: "/en/warnings/death" },
        { label: "All trigger warnings", href: "/en/warnings" },
      ],
      picksIntro:
        "Books currently confirmed as carrying this warning with full editorial notes:",
      picksEmpty:
        "Fewer than three fully-enriched books currently carry this tag with the confidence required to be featured here.",
      faq: [
        {
          q: "Does suicidal ideation count?",
          a: "Yes, when it is held by a POV character for more than a passing moment. Short, non-literal phrases do not.",
        },
        {
          q: "Are attempts and completed deaths marked separately?",
          a: "The top-level tag is shared, but the form (ideation, attempt, completed death) appears on the book page so you can filter.",
        },
        {
          q: "Will methods be described on this site?",
          a: "No. Neither this page nor the book pages name methods or means. This is a firm policy, not a stylistic choice.",
        },
        {
          q: "Do past references count?",
          a: "Yes, when the text returns to them explicitly. Off-hand hyperbole does not qualify.",
        },
        {
          q: "How do spoiler levels work?",
          a: "The tag itself is spoiler-free. The mild-spoiler note adds form and centrality. Character-specific detail stays collapsed on the book page.",
        },
      ],
      policyNote:
        "We do not describe methods, do not provide crisis counselling, and do not host book text. If you are struggling, please reach out to a professional or a crisis line in your region.",
    },
    zh: {
      title: "小說中的自殺情節：避雷與劇透分層說明 | NovelCheck",
      metaDescription:
        "確認小說是否含自殺、自殺意念或未遂情節。本頁不描述任何方法或細節，只協助你做讀前決定。",
      h1: "小說中的自殺情節",
      intro: [
        "這個避雷標的存在，是為了幫你在打開一本書之前做決定，而不是描述書裡發生什麼。本頁不描寫任何自殺情節，也不會提到方法或工具。標籤只告訴你書中某處有自殺、自殺意念或未遂，並大致標出佔比。",
        "自殺在小說中呈現的層次差異很大。有些書以既遂為起點，之後長篇處理留下來的人；有些寫意念但無行動；有些寫未遂但沒有完成的死亡；也有整本書就是慢慢遠離那個邊緣的故事。這些的閱讀體驗完全不同，因此我們在書頁上分開標，不合併成單一形式。",
        "如果你此刻正處於艱難時刻，請先關掉這一頁，並與所在地區的專線或身邊的人聯繫。書籍避雷不是做這個決定的工具。",
      ],
      whatCounts: {
        yes: [
          "角色因自殺而死亡，無論是在頁面上、明確提及，或設定在故事開始前並被文本指名。",
          "未遂的自殺行為，無論在故事中是否完成。",
          "POV 角色持續超過短暫瞬間的自殺意念。",
          "自殺失去後倖存者的哀悼線，實質影響劇情或角色。",
        ],
        no: [
          "與自殺無關的一般哀悼與失去。",
          "非自殺性自傷屬於另一個 self-harm 標籤。",
          "口語誇飾、角色與敘事都不當真的說法。",
          "與書中任何角色無關的遠古歷史註腳。",
        ],
        note: "若一本書同時含多種形式，我們會在該書頁列出所有適用的子註記。",
      },
      spoilerLevels: {
        free: "標籤本身只確認內容存在，不會告訴你是誰、何時或以何種形式。",
        mild: "每張書卡的輕度劇透註記會標出形式（意念、未遂、既遂）、是場內或提及、以及在主線中的分量。",
        full: "與角色與時機相關的細節，只在該書頁的摺疊區展開，且刻意簡短。方法從不描述。",
      },
      severity:
        "嚴重程度反映內容在文本中的存在程度與讀者需承受的直接程度，而非任何單一瞬間的激烈程度。以既遂開場、後段長篇哀悼的書，嚴重程度可能高於單一場內未遂但後續未回望的書。可信度依 Confirmed／Likely／Limited data 標示來源可靠度。",
      readerGuidance: [
        "危機中：請關閉此頁並聯繫危機專線。本站不是支援資源。",
        "自殺意念復原中：建議跳過標為 Confirmed 高強度的書。若必須閱讀含場內未遂的作品，請先與支持系統討論。",
        "若你可以承受既遂但無法承受場內未遂，請以形式副註記過濾。",
        "HE 標籤不代表全書無自殺內容。單看結局分類不足夠。",
      ],
      related: [
        { label: "自傷避雷", href: "/zh/warnings/self-harm" },
        { label: "摯愛死亡", href: "/zh/warnings/death" },
        { label: "全部避雷標籤", href: "/zh/warnings" },
      ],
      picksIntro: "目前已完成資料確認、確實包含此避雷標籤的作品：",
      picksEmpty:
        "目前完整編輯註記的作品中，能達到我們要求可信度並符合此標籤的少於三本，因此未在此頁展開列表。",
      faq: [
        {
          q: "自殺意念也算嗎？",
          a: "當它由 POV 角色持續超過短暫瞬間時算。口語誇飾與非字面說法不算。",
        },
        {
          q: "未遂與既遂會分開標嗎？",
          a: "上層標籤共用，但形式（意念、未遂、既遂）會在書頁上分別註記，可分開篩選。",
        },
        {
          q: "本站會描述方法嗎？",
          a: "不會。本頁與書頁都不提方法或工具。這是本站的明確政策，不是風格選擇。",
        },
        {
          q: "過去的提及算嗎？",
          a: "當文本明確回顧時算。口語誇飾不算。",
        },
        {
          q: "劇透層級是怎麼運作的？",
          a: "標籤本身免雷；輕度劇透註記加上形式與分量；角色相關細節收在書頁的摺疊區。",
        },
      ],
      policyNote:
        "本站不描述方法，不提供危機輔導，也不提供全文。若你正在掙扎，請聯繫所在地區的專業或危機專線。",
    },
  },

  // ============================================================= cheating ==
  cheating: {
    en: {
      title: "Cheating in Books — Infidelity Warning & Reader Guide | NovelCheck",
      metaDescription:
        "Check whether a novel involves cheating before reading. We separate emotional and physical infidelity, POV, and whether the ending resolves the betrayal.",
      h1: "Cheating in Books",
      intro: [
        "Cheating means very different things to different readers. For some readers a single kiss outside a relationship is a hard no; for others, the question is whether the POV character is the one betrayed or the one who strays; for a third group, only physical infidelity that is unresolved by the ending counts as a hard stop. Because these are genuinely different reader profiles, this tag is broader than most and needs the sub-notes to be useful.",
        "The tag covers infidelity — emotional or physical — inside a relationship the story frames as committed. It does not cover open or negotiated non-monogamy where partners have agreed on the terms. Misunderstandings that a book resolves as not-a-betrayal are not tagged as cheating even if a character briefly believes they were cheated on.",
        "The rest of this page explains what falls inside the tag, how the sub-notes work, and how to check a book without opening full plot spoilers.",
      ],
      whatCounts: {
        yes: [
          "Physical infidelity by a POV or major character inside a relationship the story treats as committed.",
          "Emotional infidelity that the text itself frames as a betrayal (not simply a friendship the reader might side-eye).",
          "Serial or backstory infidelity that materially shapes a POV character's present arc.",
          "Micro-cheating (secret messages, hidden meetings) when the narrative frames it as a betrayal.",
        ],
        no: [
          "Openly negotiated non-monogamy, polyamory, or open relationships operating within the agreed terms.",
          "A misunderstanding that the book resolves as not-a-betrayal.",
          "Attraction to someone outside a relationship that never becomes action or emotional secrecy.",
          "Pre-relationship dating history.",
        ],
        note: "The book page notes tell you whether it involves the main couple, whether it is on-page or referenced, and whether the ending resolves it.",
      },
      spoilerLevels: {
        free:
          "The tag confirms infidelity appears somewhere in the book. Who, when, and whether the couple stays together are not revealed at this level.",
        mild:
          "The mild-spoiler note tells you the form (emotional vs physical), whether it involves the main couple, and whether the arc resolves the betrayal — without naming characters.",
        full:
          "Character-level and outcome-level details live inside the collapsed spoiler block on each book page.",
      },
      severity:
        "Severity reflects how central the cheating storyline is to the book and how sustained it is, not how morally serious the act is judged to be. A single incident that reshapes the whole arc can be high; a chronic backdrop that never becomes the point can be mid. Confidence is separate: Confirmed, Likely, or Limited data.",
      readerGuidance: [
        "If you avoid cheating in romance specifically, use the sub-note that flags whether the main couple is affected — most romance readers care about that above all.",
        "If you can read cheating in literary fiction but not in romance, cross-check the genre tag against this warning.",
        "Reconciliation and forgiveness arcs are the most polarising sub-form. If they bother you, filter to books where the note says 'unresolved' or 'break-up'.",
        "The cheating tag is not a moral judgement of the book; it is a filter for readers with a specific sensitivity.",
      ],
      related: [
        { label: "Cheating collection", href: "/en/collections/cheating-warning" },
        { label: "Romance ending finder", href: "/en/collections/romance-ending-finder" },
        { label: "All trigger warnings", href: "/en/warnings" },
      ],
      picksIntro:
        "Books currently confirmed as carrying this warning with full editorial notes:",
      picksEmpty:
        "No fully-enriched book currently carries this tag with the confidence we require to feature it here. See the collection page above for additional titles under review.",
      faq: [
        {
          q: "Does emotional cheating count?",
          a: "Yes, when the text itself frames it as a betrayal. A friendship the reader personally finds suspicious, but the book does not, is not tagged.",
        },
        {
          q: "Are misunderstandings marked as cheating?",
          a: "No. If the book resolves an apparent betrayal as a misunderstanding, the tag does not apply.",
        },
        {
          q: "Does the cheating always involve the main couple?",
          a: "No. The book-page note tells you whether the main couple, a secondary couple, or backstory is affected.",
        },
        {
          q: "Can I check whether reconciliation happens without full spoilers?",
          a: "Yes. The mild-spoiler note tells you 'resolved', 'unresolved', or 'break-up' without naming characters. Full detail stays collapsed.",
        },
        {
          q: "How is confidence recorded?",
          a: "As a separate axis from severity. Confirmed, Likely, or Limited data, so a strongly-worded tag does not always mean high confidence.",
        },
      ],
      policyNote:
        "We do not host book text or unofficial downloads. Plot resolutions stay collapsed. If you spot a missing or over-broad tag, please contact us.",
    },
    zh: {
      title: "小說中的出軌情節：感情線避雷指南 | NovelCheck",
      metaDescription:
        "確認小說是否含出軌情節。本站分開標示精神與肉體出軌、是否涉及主線 CP、以及結局是否修復。",
      h1: "小說中的出軌情節",
      intro: [
        "「出軌」對不同讀者代表的意義差異很大。有讀者無法接受任何一次越界的親吻；有讀者在意的是 POV 角色是被背叛的一方、還是選擇背叛的一方；也有讀者只在意結局是否修復了肉體出軌。因為這三種讀者面貌真的不同，這個標籤本身較廣，副註記才是它有用的地方。",
        "標籤涵蓋一段被故事定位為承諾關係中的出軌，包含精神與肉體。開放式關係、雙方談妥的非單偶，只要在協議範圍內，不算出軌。書中角色一度以為被背叛、後段揭曉是誤會的情節，我們不標。",
        "後段說明什麼算、什麼不算，副註記如何運作，以及如何在不看完整劇透的前提下確認。",
      ],
      whatCounts: {
        yes: [
          "POV 或主要角色在被故事視為承諾關係的情況下發生的肉體出軌。",
          "被文本本身定位為「背叛」的精神出軌（不是讀者看了覺得可疑但文本沒這麼寫的友誼）。",
          "累積或背景的出軌經歷，實質影響 POV 角色現在的角色線。",
          "被敘事定位為背叛的微出軌（隱藏訊息、私下會面等）。",
        ],
        no: [
          "明確協議下的非單偶、多元關係或開放式關係，只要在協議範圍內。",
          "被書中揭曉為誤會、非背叛的情節。",
          "只有心動但從未化為行動或情感隱瞞的吸引。",
          "在建立關係之前的交往歷史。",
        ],
        note: "書頁註記會告訴你是否涉及主線 CP、是場內或提及、以及結局是否修復。",
      },
      spoilerLevels: {
        free: "標籤確認書中存在出軌情節。是誰、何時、CP 是否走到最後，本層級不透露。",
        mild: "輕度劇透註記說明形式（精神／肉體）、是否涉及主線 CP、以及主線是否修復背叛——不透露角色名。",
        full: "角色與結果的細節收在書頁的摺疊劇透區。",
      },
      severity:
        "嚴重程度反映出軌線在整本書的中心程度與持續程度，而非道德層面的評斷。一次事件若重塑整條主線，屬 high；長期背景但不成為重點，屬 mid。可信度是另一個獨立軸：Confirmed／Likely／Limited data。",
      readerGuidance: [
        "若你避的是「言情裡的出軌」，請用「是否涉及主線 CP」這一項副註記——這是多數言情讀者最在意的點。",
        "若你能接受文學小說中的出軌、但不能接受言情中的，請把類型標與這個避雷標交叉看。",
        "修復線是最兩極化的子形式。若你不喜歡，請優先選註記為「未修復」或「分手」的作品。",
        "這個標籤不是對書的道德評價，只是給有特定敏感點的讀者用的過濾。",
      ],
      related: [
        { label: "出軌主題清單", href: "/zh/collections/cheating-warning" },
        { label: "言情結局篩選", href: "/zh/collections/romance-ending-finder" },
        { label: "全部避雷標籤", href: "/zh/warnings" },
      ],
      picksIntro: "目前已完成資料確認、確實包含此避雷標籤的作品：",
      picksEmpty:
        "在已完成完整編輯註記的作品中，暫時沒有以我們要求的可信度符合此標籤的書。主題清單頁列有更多待核作品。",
      faq: [
        {
          q: "精神出軌算嗎？",
          a: "當文本本身把它定位為背叛時算。你自己看了覺得可疑但書中沒這樣寫的友誼，不標。",
        },
        {
          q: "誤會會被標為出軌嗎？",
          a: "不會。若書中最後把疑似背叛解為誤會，此標不適用。",
        },
        {
          q: "出軌一定發生在主線 CP 嗎？",
          a: "不一定。書頁註記會告訴你發生在主線 CP、次要 CP，或只是背景。",
        },
        {
          q: "可以在不看完整劇透下確認是否有修復嗎？",
          a: "可以。輕度劇透註記會標「已修復」「未修復」或「分手」，不會透露角色名。細節留在摺疊區。",
        },
        {
          q: "可信度怎麼記錄？",
          a: "與嚴重程度分開。Confirmed／Likely／Limited data 各自標示，用詞強烈不代表可信度一定高。",
        },
      ],
      policyNote:
        "本站不提供全文與盜版下載。劇情走向保持摺疊。如果你發現漏標或過度標籤，請告知我們。",
    },
  },

  // ================================================================ death ==
  // "Death of a loved one" maps to the existing catalog code `death`
  // (Major character death). We do not create a new code; this page treats
  // the loss of a partner, family member, or close friend within that scope.
  death: {
    en: {
      title: "Death of a Loved One in Books — Content Warning Guide | NovelCheck",
      metaDescription:
        "Check whether a novel involves the death of a partner, family member, or close friend before reading. Spoiler-safe warning guide with no full plot detail.",
      h1: "Death of a Loved One in Books",
      intro: [
        "This warning is for readers who want to know, before opening a book, whether it will ask them to sit with the loss of a partner, a family member, or a close friend. In our catalog this content lives under a single code alongside major character death, because in fiction the two categories overlap almost completely — a beloved figure lost by a POV character is what makes a death feel like a personal loss to the reader.",
        "The tag does not tell you who dies, when in the arc it happens, or whether the death is shown on the page. It only tells you the loss is there. Everything more specific lives in the mild-spoiler note or in the collapsed full-spoiler block on the individual book page.",
        "Grief without a specific death is tracked separately — a book can be tagged as heavy on grief without qualifying for this tag, and vice versa. If both matter to you, check both.",
      ],
      whatCounts: {
        yes: [
          "A partner, spouse, or committed romantic figure dies within the story or is confirmed dead by the text before it starts.",
          "A parent, sibling, child, or family member close to a POV character dies, on-page or off.",
          "A close friend whose bond with the protagonist is established as central dies within the story.",
          "A pre-book loss that the narrative continues to process and treat as material to the arc.",
        ],
        no: [
          "General mortality in the world of the story (background deaths, distant historical events).",
          "Grief without a specific named loss inside the book — that is tracked under the grief tag.",
          "Ambiguous or off-screen disappearances that the text does not confirm as death.",
          "Pet death, which lives under its own tag.",
        ],
        note: "If a book contains both a major character death and additional loved-one losses, both will be reflected in the book-page notes.",
      },
      spoilerLevels: {
        free:
          "The tag alone confirms a loved one dies inside or shortly before the book. It does not name who, when, or how.",
        mild:
          "The mild-spoiler note tells you the relationship type (partner, family, friend), whether the death is on-page or off, and where in the arc it lands.",
        full:
          "Who dies and any surrounding scene detail sit inside the collapsed spoiler block on the individual book page.",
      },
      severity:
        "Severity reflects how much of the book takes place inside the loss — the more of the story is spent grieving, the higher the mark. An early death that shapes the entire arc is graded higher than a late death that closes the book neatly. Confidence is separate and marks Confirmed, Likely, or Limited data.",
      readerGuidance: [
        "Recent bereavement: default to skip anything tagged Confirmed high; consider grief-focused nonfiction or gentler bittersweet reads instead.",
        "If you can read past-tense loss but not on-page death, use the mild-spoiler note that marks 'off-page' or 'referenced only'.",
        "An HE tag does not neutralise this warning. Books can pair a loving central relationship with a devastating loss elsewhere.",
        "If the loss is what draws you to a book (many literary readers seek this), sort by severity high and confidence Confirmed.",
      ],
      related: [
        { label: "Sad ending books", href: "/en/collections/sad-ending-books" },
        { label: "Bittersweet ending books", href: "/en/collections/bittersweet-ending-books" },
        { label: "All trigger warnings", href: "/en/warnings" },
      ],
      picksIntro:
        "Books currently confirmed as carrying this warning with full editorial notes:",
      picksEmpty:
        "We do not yet have three or more fully-enriched books at the required confidence level to feature. New titles are added as review completes.",
      faq: [
        {
          q: "Does a death that happens before the story begins count?",
          a: "Yes, when the text continues to process the loss and it materially shapes a POV character.",
        },
        {
          q: "Are close friends included?",
          a: "Yes, when the bond with the protagonist is established as central. Casual acquaintances are not enough.",
        },
        {
          q: "Is this the same as 'major character death'?",
          a: "Very close. In this catalog they share a single code because the emotional impact on the reader is what the tag is trying to measure.",
        },
        {
          q: "Can I check whether the death happens on page?",
          a: "Yes. The mild-spoiler note marks on-page, off-page, or referenced-only, without naming the character.",
        },
        {
          q: "Does grief alone trigger this warning?",
          a: "No. Grief without a named death inside the book is tracked under the separate grief tag.",
        },
      ],
      policyNote:
        "We do not host book text or unofficial downloads, and we do not reveal who dies on this hub. Full spoilers stay collapsed on the book pages.",
    },
    zh: {
      title: "小說中的摯愛死亡：失去親友情節避雷指南 | NovelCheck",
      metaDescription:
        "確認小說是否含伴侶、家人或摯友的死亡情節。本頁採用免雷分層，不透露角色與細節。",
      h1: "小說中的摯愛死亡",
      intro: [
        "這個避雷標是給想在開讀前先確認「這本書會不會要求我陪一段伴侶、家人或摯友的失去」的讀者。在本站分類中，這類內容與「主角死亡」共用同一個代碼，因為在小說裡兩者幾乎完全重疊——讓一場死亡對讀者變成「摯愛的失去」的，往往正是 POV 角色與這個人的關係。",
        "標籤本身不會告訴你是誰死、何時死、是否場內。它只告訴你這份失去存在。更具體的資訊會出現在該書頁的輕度劇透註記，或收在完整劇透摺疊區。",
        "「哀痛」本身有獨立標籤——一本書可能因哀痛沉重被標，但不符合這個標；反之亦然。若兩者你都在意，請同時查。",
      ],
      whatCounts: {
        yes: [
          "伴侶、配偶或明確的承諾對象在故事中死亡，或在故事開始前已被文本確認死亡。",
          "與 POV 角色親近的父母、手足、子女或家人死亡，場內或場外皆算。",
          "被故事建立為主線核心的摯友在故事中死亡。",
          "在書開始前已發生、但敘事持續回望並實質推動角色線的失去。",
        ],
        no: [
          "故事世界中的一般死亡（背景死亡、遠距歷史事件等）。",
          "沒有具體對象的哀痛，屬於獨立的 grief 標籤。",
          "文本未確認為死亡的曖昧失蹤或離場。",
          "寵物死亡另有獨立標籤。",
        ],
        note: "若書中同時有主角死亡與其他摯愛的失去，書頁註記會同時呈現。",
      },
      spoilerLevels: {
        free: "標籤本身只確認書中或書前有摯愛死亡，不透露角色、時機或方式。",
        mild: "輕度劇透註記會標關係類型（伴侶／家人／摯友）、是場內或場外、以及發生在主線的哪一段。",
        full: "是誰死、周邊場景細節收在該書頁的摺疊劇透區。",
      },
      severity:
        "嚴重程度反映書中「處於失去中」的比重——後續哀悼佔比越大，等級越高。以早段死亡為軸心貫穿全書，等級高於在末段收束的死亡。可信度另有獨立分軸：Confirmed／Likely／Limited data。",
      readerGuidance: [
        "近期喪親：預設跳過任何 Confirmed 高強度的書；可考慮以哀悼為主的非虛構或較溫和的苦甜作品。",
        "若你可以承受過去式失去但無法承受場內死亡，請優先選標為「場外」或「僅提及」的書。",
        "HE 標不會抵銷這個避雷標。書中可以同時有恩愛主線與沉重的失去。",
        "若「失去」正是你想讀的核心（許多文學讀者會主動選這類），請以嚴重程度 high、可信度 Confirmed 排序。",
      ],
      related: [
        { label: "悲劇結局小說", href: "/zh/collections/sad-ending-books" },
        { label: "苦甜結局小說", href: "/zh/collections/bittersweet-ending-books" },
        { label: "全部避雷標籤", href: "/zh/warnings" },
      ],
      picksIntro: "目前已完成資料確認、確實包含此避雷標籤的作品：",
      picksEmpty:
        "目前完整編輯註記且符合可信度的書仍不足以展開列表。新書會隨核對完成陸續加入。",
      faq: [
        {
          q: "故事開始前就發生的死亡也算嗎？",
          a: "算，只要敘事持續處理這份失去、且它實質形塑 POV 角色。",
        },
        {
          q: "摯友算在內嗎？",
          a: "算，只要文本建立這段情誼為主線核心。點頭之交不算。",
        },
        {
          q: "這個標和「主角死亡」是同一件事嗎？",
          a: "非常接近。本站分類共用同一代碼，因為這個標真正衡量的是讀者感受到的情感衝擊。",
        },
        {
          q: "可以確認死亡是否發生在頁面上嗎？",
          a: "可以。輕度劇透註記會標「場內」「場外」或「僅提及」，不會透露角色名。",
        },
        {
          q: "只有哀痛沒有死亡也會觸發這個標嗎？",
          a: "不會。沒有具體對象的哀痛屬於 grief 獨立標籤。",
        },
      ],
      policyNote:
        "本站不提供全文與盜版下載，本頁也不透露是誰死。完整劇透維持在書頁的摺疊區。",
    },
  },
};

export const ENRICHED_WARNINGS = Object.keys(WARNING_CONTENT);
