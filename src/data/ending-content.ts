// Long-form, per-ending content for /$lang/endings/$ending.
// Each ending has independently written EN + ZH copy — not a shared template
// with the ending name swapped. See src/routes/$lang.endings.$ending.tsx.

import type { Ending } from "@/data/books";

export type FAQ = { q: string; a: string };

export interface EndingContentSide {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string[];              // opening paragraphs
  qualifies: { yes: string[]; no: string[]; note?: string };
  comparison: { heading: string; body: string };
  feels: string[];
  goodFor: string[];
  notFor: string[];
  spoilerNote: string;
  picksIntro: string;
  picksEmpty: string;           // shown when fewer than 3 curated books
  related: { label: string; href: string }[];
  faq: FAQ[];
  policyNote: string;
}

export interface EndingContent {
  en: EndingContentSide;
  zh: EndingContentSide;
}

// Curated slugs must remain a subset of BOOK_ALLOW (index-allowlist.ts).
// We render them via BookCard, which links to the enriched book pages.
export const CURATED_BY_ENDING: Record<Exclude<Ending, "Unknown">, string[]> = {
  HE: ["pride-and-prejudice", "beach-read", "red-white-and-royal-blue"],
  BE: [
    "the-song-of-achilles",
    "no-longer-human",
    "me-before-you",
    "the-fault-in-our-stars",
  ],
  OE: ["the-giver"],
  Bittersweet: ["norwegian-wood", "it-ends-with-us", "the-time-travelers-wife"],
  Ambiguous: ["the-remains-of-the-day", "piranesi"],
};

export const ENDING_CONTENT: Record<Exclude<Ending, "Unknown">, EndingContent> = {
  // ---------------------------------------------------------------- HE ----
  HE: {
    en: {
      title: "Happy Ending Books Explained — HE Meaning & Reader Guide | NovelCheck",
      metaDescription:
        "What HE (Happy Ending) really means in novels, how it differs from bittersweet, and how to pick a comforting read without walking into hidden heavy content.",
      h1: "Happy Ending (HE) — What It Means and How to Pick One",
      intro: [
        "A Happy Ending, usually shortened to HE, is the label readers look for when they want to close a book and exhale. It signals that the main storyline lands in a stable, hopeful place: the central relationship holds, the protagonist reaches something they were reaching for, and the last chapters point forward instead of down.",
        "Most people search for HE for a very human reason. They had a rough week, they are between heavier books, or they simply do not want to be gutted tonight. This page is written for that decision — not to convince you a book is good, but to help you tell whether its ending will actually leave you feeling okay.",
      ],
      qualifies: {
        yes: [
          "The central arc resolves in the protagonist's favour, with the key relationship or goal intact.",
          "The final chapters point forward — a future is set up, even if not every detail is spelled out.",
          "Any loss along the way is folded into a broader recovery, not left as the last emotional note.",
        ],
        no: [
          "Everyone the reader cared about survives untouched. A side character can die, an old world can end, a friendship can fray, and the book can still be HE.",
          "There is no grief in the story. HE is about where the book lands, not how heavy the middle is.",
          "There are no trigger warnings. HE novels can still contain grief, illness, abuse, or violence on the page.",
        ],
        note: "Think of HE as a direction of travel, not a promise of a painless journey.",
      },
      comparison: {
        heading: "HE vs Bittersweet",
        body:
          "The most common confusion is HE vs Bittersweet. A bittersweet ending also gives the protagonist something they wanted, but the cost is loud and stays with you at the end. HE keeps the cost quieter — it exists, but the final beat is stability and hope. If you finish a book and your first feeling is relief, that's usually HE. If your first feeling is a soft ache, that's usually bittersweet.",
      },
      feels: [
        "A sense of closure and safety in the final chapters.",
        "Room to breathe — HE books tend to slow down before the last page.",
        "Comfort re-read value: many readers return to HE titles for the ending alone.",
        "Emotional warmth without the pressure to process a loss afterwards.",
      ],
      goodFor: [
        "Readers coming off a heavy or bleak book who need to reset.",
        "Anyone reading before bed who doesn't want to lie awake thinking about it.",
        "Readers new to a genre who want to see it at its most inviting.",
        "Gift picks where you don't yet know the recipient's tolerance for grief.",
        "Long trips or slumps when a satisfying finish matters more than novelty.",
      ],
      notFor: [
        "Readers actively looking for a cathartic cry — HE rarely delivers that.",
        "Book clubs that want an ending open to hard debate.",
        "Readers who feel HE resolutions are unearned when a story sets up serious stakes.",
        "Anyone who specifically enjoys grief-processing fiction.",
      ],
      spoilerNote:
        "This page only classifies the ending tone. Full plot spoilers for individual titles stay behind an explicit click on each book's own page, so you can see whether an ending is HE without reading how it happens.",
      picksIntro:
        "Curated HE picks currently on the site — each is a fully reviewed book page rather than a stub:",
      picksEmpty:
        "This section currently includes only books whose ending classification and editorial notes have been fully reviewed.",
      related: [
        { label: "All indexed books", href: "/en/books" },
        { label: "Compare all ending types", href: "/en/endings" },
        { label: "Happy ending collection", href: "/en/collections/happy-ending-books" },
        { label: "Romance ending finder", href: "/en/collections/romance-ending-finder" },
        { label: "Read or Skip guide", href: "/en/collections/read-or-skip" },
        { label: "Trigger warnings hub", href: "/en/warnings" },
        { label: "How we classify endings", href: "/en/editorial-policy" },
      ],
      faq: [
        {
          q: "Can a book still be HE if a supporting character dies?",
          a: "Yes. HE describes where the main arc lands. If the protagonist's core storyline still resolves hopefully, the death of a side character does not flip the label — although it may be worth checking the trigger warnings.",
        },
        {
          q: "Is a romantic HE the same as a happy ending for the whole story?",
          a: "Not always. In romance, HE (or HEA — happily ever after) is a genre promise about the couple. In non-romance fiction, HE describes the overall arc. A romance can be HE for the couple while a background subplot ends in loss.",
        },
        {
          q: "Does HE mean the book has no trigger warnings?",
          a: "No. HE only describes the ending. A story can travel through grief, abuse, or violence and still finish in a stable, hopeful place. Always check the trigger warnings on the individual book page.",
        },
        {
          q: "Can an HE still feel bittersweet in places?",
          a: "It can. Many HE novels end with a soft, reflective scene rather than pure celebration. The distinction from a Bittersweet ending is whether the last emotional note is stability (HE) or ache (Bittersweet).",
        },
        {
          q: "Where can I see the full ending, not just the label?",
          a: "Each book page keeps two layers — a spoiler-free overview and a fully spoilered ending explanation that stays hidden until you click to expand it.",
        },
      ],
      policyNote:
        "We don't reproduce full novels, don't link to pirated copies, and don't paraphrase entire plots. Ending classifications are editorial calls based on the actual ending plus reader feedback.",
    },
    zh: {
      title: "HE 圓滿結局是什麼？小說結局分類與閱讀指南｜讀前決策站",
      metaDescription:
        "什麼是 HE（Happy Ending）？和苦甜結局差在哪？怎麼挑一本真的能讓你放鬆的書？這頁只講結局類型，不劇透主要情節。",
      h1: "HE 圓滿結局：定義、判斷與閱讀建議",
      intro: [
        "HE 是「Happy Ending」的縮寫，也是讀者在需要安心閱讀時最常搜尋的一種結局類型。它代表主線最後落在穩定、有希望的位置：主要關係沒有崩壞、主角追求的東西有著落、最後幾章的方向是往前而不是往下。",
        "會找 HE 的人，通常理由很生活化——這週太累、剛讀完一本沉重的書、今晚不想被虐。這頁不是要說服你某本書好不好看，而是幫你判斷這本書的結局讀完以後，你會不會覺得沒事、安心、可以睡。",
      ],
      qualifies: {
        yes: [
          "主線走向正向收束，主角追求的關係或目標大致保住。",
          "最後幾章給出未來的方向，就算細節沒有全部交代。",
          "過程中的失去被納入更大的復原裡，不會停在悲傷那一拍。",
        ],
        no: [
          "所有讀者在意的角色都必須毫髮無傷。配角過世、舊世界結束、友情變淡，這本書仍然可能是 HE。",
          "故事完全沒有悲傷或艱難。HE 說的是結尾的落點，不是過程有多重。",
          "書裡完全沒有雷點。HE 作品仍可能包含喪親、疾病、暴力等內容。",
        ],
        note: "HE 更像是一個「往哪走」的方向，不是「一路上不會痛」的承諾。",
      },
      comparison: {
        heading: "HE 和苦甜結局的差別",
        body:
          "最常見的混淆是 HE 和苦甜（Bittersweet）。苦甜結局也讓主角得到一部分想要的東西，但代價的重量會停在讀者心裡；HE 讓那份代價存在，但最後一拍的重量是安穩與希望。讀完第一個感覺是「鬆一口氣」，通常是 HE；讀完第一個感覺是「有點酸酸的」，通常是苦甜。",
      },
      feels: [
        "最後幾章有明顯的收束感與安全感。",
        "有喘息空間——HE 作品常常在最後刻意放慢節奏。",
        "重讀價值高，很多讀者會回頭只重讀結局。",
        "情感是溫暖的，讀完不用花力氣去消化一個失去。",
      ],
      goodFor: [
        "剛讀完沉重或陰暗作品，需要收心的時候。",
        "睡前閱讀，不希望躺著還在腦補結局。",
        "第一次接觸某個類型，想看它最舒服的樣子。",
        "送禮或推薦給不確定對方對虐心接受度的人。",
        "旅行或閱讀低潮期，比起新鮮感更需要一個滿足的收尾。",
      ],
      notFor: [
        "刻意想要哭一場、需要情緒宣洩的時候。",
        "讀書會想要一個可以吵起來的結局。",
        "已經接受了故事鋪很重的代價，覺得 HE 收得太快會不服氣。",
        "喜歡透過小說處理喪失感的讀者。",
      ],
      spoilerNote:
        "這頁只整理結局的落點與閱讀感受，不會直接寫出各本書怎麼收尾。每本書的完整結局都放在該書頁的可折疊區，你需要主動點開才會看到。",
      picksIntro:
        "以下是目前已完成編輯整理、確認結局為 HE 的作品：",
      picksEmpty:
        "目前只列出結局分類與編輯註記都已完成確認的作品，之後會陸續補上。",
      related: [
        { label: "作品庫", href: "/zh/books" },
        { label: "所有結局類型總覽", href: "/zh/endings" },
        { label: "HE 圓滿結局主題清單", href: "/zh/collections/happy-ending-books" },
        { label: "戀愛結局挑選清單", href: "/zh/collections/romance-ending-finder" },
        { label: "讀 or 略指南", href: "/zh/collections/read-or-skip" },
        { label: "避雷標籤總覽", href: "/zh/warnings" },
        { label: "編輯政策", href: "/zh/editorial-policy" },
      ],
      faq: [
        {
          q: "配角過世的書還算 HE 嗎？",
          a: "算。HE 判斷的是主線的收尾。只要主角的核心故事仍然走向希望的方向，配角的死亡不會直接改變分類，只是建議你先看一下避雷標籤。",
        },
        {
          q: "戀愛的 HE 等於整本書的 HE 嗎？",
          a: "不一定。在戀愛類型裡，HE（HEA）是關於這對主角的類型承諾；在其他類型裡，HE 說的是整體故事的走向。一本戀愛小說對主角是 HE，背景支線仍然可能收在失去。",
        },
        {
          q: "HE 就代表沒有雷點嗎？",
          a: "不是。HE 只描述結局。一本書的過程仍然可能經過喪親、家暴或暴力，最後才落在安穩的位置。避雷資訊要看該書頁的完整標籤。",
        },
        {
          q: "HE 有可能讀起來還是有點苦甜嗎？",
          a: "有可能。很多 HE 作品的最後一場戲是安靜的反思，而不是慶祝。和苦甜結局的界線在於：最後一拍是「安穩」還是「隱隱的酸」。",
        },
        {
          q: "想看完整結局怎麼辦？",
          a: "每本書頁都有兩層：無雷摘要與完整劇透結局。完整結局預設收起，需要點開才會展開。",
        },
      ],
      policyNote:
        "我們不提供小說全文、不提供盜版下載，也不會大段複述原作情節。結局分類是依實際結局內容和讀者回報所做的編輯判斷。",
    },
  },
  // ---------------------------------------------------------------- BE ----
  BE: {
    en: {
      title: "Sad or Bad Endings Explained — BE Meaning & Reader Guide | NovelCheck",
      metaDescription:
        "BE (Bad Ending) means the book closes on real loss — death, defeat, permanent separation. Here's how to tell if a BE novel is right for you tonight.",
      h1: "Bad / Sad Ending (BE) — What It Means and When to Read One",
      intro: [
        "BE stands for Bad Ending, but the label is misleading if you read it as a value judgement. A BE isn't a badly written book — it's a book that ends in loss. Someone dies. A relationship ends and stays ended. A world doesn't recover. The final beat is heavy on purpose.",
        "Most readers who search for BE are actually protecting themselves. They want to know whether this is a night when they can carry that weight, or whether they should save the book for a different mood. That's what this page is for.",
      ],
      qualifies: {
        yes: [
          "The ending centres on a real, lasting loss — death, permanent separation, defeat, or the collapse of the central goal.",
          "The final chapters commit to the loss instead of softening it. There is no last-minute reversal.",
          "Any small moments of hope at the end read as a coda to the loss, not a counterweight.",
        ],
        no: [
          "A BE label says the book is bad. It doesn't. Some of the most acclaimed literary and romance novels are BE.",
          "A BE means every scene is sad. The middle can be joyful, funny, or tender; only the destination is heavy.",
          "Any story with a major death is automatically BE. If the death is folded into a wider recovery, the book may still be HE or Bittersweet.",
        ],
      },
      comparison: {
        heading: "BE vs Bittersweet",
        body:
          "The clearest line between BE and Bittersweet is what the final chapters do with the loss. Bittersweet holds gain and loss together — the reader gets both, at the same time. BE lets the loss dominate. If the last scene is grief with a quiet acknowledgement of what mattered, that's still BE. If the last scene is a hard-won gain paid for in loss, that's usually Bittersweet.",
      },
      feels: [
        "A heavier, longer emotional aftermath than most other ending types.",
        "A sense of catharsis — many readers seek out BE precisely to feel something.",
        "Discussion value: BE books often stay with book clubs longest.",
        "For some readers, a paradoxical calm — the worst has happened and the story has held it.",
      ],
      goodFor: [
        "Readers who want to process grief through fiction rather than avoid it.",
        "Anyone who finds catharsis in a cry and has the emotional room for it.",
        "Book clubs looking for a story that will actually generate debate.",
        "Readers who feel HE resolutions in a heavy premise are unearned.",
        "Long-form readers who value emotional honesty over comfort.",
      ],
      notFor: [
        "Readers already at low emotional capacity this week.",
        "Anyone reading right before sleep who needs to switch off afterwards.",
        "First-time visitors to a genre who want to see it at its warmest.",
        "Gift picks where you don't know the recipient's tolerance for grief.",
      ],
      spoilerNote:
        "Marking a book BE tells you the direction of the ending without naming who is lost or how. The full spoiler explanation stays folded on each book's own page.",
      picksIntro:
        "Curated BE picks currently on the site — each has a fully written ending discussion, so you can decide before you commit:",
      picksEmpty:
        "This section currently includes only books whose ending classification and editorial notes have been fully reviewed.",
      related: [
        { label: "All indexed books", href: "/en/books" },
        { label: "Compare all ending types", href: "/en/endings" },
        { label: "Sad ending collection", href: "/en/collections/sad-ending-books" },
        { label: "Bittersweet ending collection", href: "/en/collections/bittersweet-ending-books" },
        { label: "Pet death warning list", href: "/en/collections/pet-death-warning" },
        { label: "Trigger warnings hub", href: "/en/warnings" },
        { label: "How we classify endings", href: "/en/editorial-policy" },
      ],
      faq: [
        {
          q: "Does BE mean the book is badly written?",
          a: "No. BE describes only the ending's direction. Many BE novels are considered classics or bestsellers — the label is about what the ending asks of you, not the quality of the writing.",
        },
        {
          q: "What separates BE from a Bittersweet ending?",
          a: "In BE, loss dominates the final beat. In Bittersweet, gain and loss sit side by side. If the ending leaves you mostly grieving, it's BE. If it leaves you holding both something gained and something lost, it's Bittersweet.",
        },
        {
          q: "Can a romance novel be BE?",
          a: "Yes, though genre romance readers usually expect HEA. Romance-adjacent fiction (literary love stories, tragic romances) can absolutely end in loss and be labelled BE here.",
        },
        {
          q: "Is every book with a major death automatically BE?",
          a: "No. A death can appear in an HE or Bittersweet story if the surrounding arc reframes it. BE requires the final chapters to sit with the loss rather than move past it.",
        },
        {
          q: "How can I gauge how heavy a BE is without reading the full spoiler?",
          a: "Each book page includes a spoiler-free overview and a decision card (Read / Skip / Caution). You can check both without ever opening the full ending explanation.",
        },
      ],
      policyNote:
        "We don't reproduce full novels, don't link to pirated copies, and don't paraphrase entire plots. Content warnings on individual pages are there so a BE choice can be an informed one.",
    },
    zh: {
      title: "BE 悲劇結局是什麼？適合誰閱讀與避雷說明｜讀前決策站",
      metaDescription:
        "BE（Bad Ending）代表故事以真正的失去收束，不是說作品差。這頁幫你判斷今晚適不適合讀 BE，並區分 BE 和苦甜結局的差別。",
      h1: "BE 悲劇結局：定義、閱讀時機與避雷指南",
      intro: [
        "BE 是「Bad Ending」的縮寫，但把它讀成價值判斷會誤會這個標籤。BE 不代表這本書寫得差，而是這本書「結束於失去」——有人死去、關係永遠斷開、目標沒有達成、世界沒有復原。最後一拍是刻意重的。",
        "會搜尋 BE 的人，大多其實是在保護自己：想知道今晚有沒有能量承接這個重量，還是應該把這本書留到別的心情再讀。這頁就是為了這個判斷。",
      ],
      qualifies: {
        yes: [
          "結局的重心是一個真實、持續的失去——死亡、永久分離、失敗、主要目標的崩解。",
          "最後幾章讓那個失去留下來，不會有臨門一腳的翻盤。",
          "如果結尾有任何小小的希望，它讀起來比較像失去的餘韻，而不是抵銷。",
        ],
        no: [
          "BE 代表這本書寫不好。並不是。很多口碑最好、最經典的小說是 BE。",
          "整本 BE 都是傷心場景。中段可以很歡樂、很好笑、很溫柔，只有結局是重的。",
          "有主要角色死亡就是 BE。如果那個死亡被更大的復原包起來，這本書仍然可能是 HE 或苦甜。",
        ],
      },
      comparison: {
        heading: "BE 和苦甜結局的差別",
        body:
          "BE 與苦甜（Bittersweet）最清楚的分界，是最後幾章怎麼對待那個失去。苦甜是「得與失同時存在」，讀者兩邊都拿到；BE 則讓失去佔上風。最後一場戲是悲傷、加上對重要事物的靜靜致意，那還是 BE；最後一場戲是「換來一個真正的得到，但代價很重」，通常就是苦甜。",
      },
      feels: [
        "情緒後座力比其他結局類型久，通常需要一段時間消化。",
        "有宣洩感——不少讀者專門找 BE 是為了「痛快地哭一場」。",
        "討論價值高，讀書會裡 BE 常常留最久。",
        "有時反而會有一種弔詭的平靜——最壞的事情發生了，故事把它接住了。",
      ],
      goodFor: [
        "想透過小說面對、消化失去的讀者。",
        "能量足夠、允許自己哭一場的時候。",
        "讀書會想要一本真的能吵起來的書。",
        "覺得沉重前提被 HE 收得太輕巧的讀者。",
        "重視情感真實勝過閱讀舒適的讀者。",
      ],
      notFor: [
        "本週情緒能量已經很低的時候。",
        "睡前閱讀、需要放下書就能休息的時候。",
        "第一次接觸某個類型、想看它最溫暖的樣子。",
        "送禮給你還不確定虐心接受度的對象。",
      ],
      spoilerNote:
        "把一本書標成 BE，只告訴你結局的方向，不會直接說是誰失去了、怎麼失去。完整結局仍然折疊在該書頁上。",
      picksIntro:
        "目前站上結局為 BE、且已完成完整編輯整理的作品：",
      picksEmpty:
        "目前只列出結局分類與編輯註記都已完成確認的作品，之後會陸續補上。",
      related: [
        { label: "作品庫", href: "/zh/books" },
        { label: "所有結局類型總覽", href: "/zh/endings" },
        { label: "BE 悲傷結局主題清單", href: "/zh/collections/sad-ending-books" },
        { label: "苦甜結局主題清單", href: "/zh/collections/bittersweet-ending-books" },
        { label: "寵物死亡避雷清單", href: "/zh/collections/pet-death-warning" },
        { label: "避雷標籤總覽", href: "/zh/warnings" },
        { label: "編輯政策", href: "/zh/editorial-policy" },
      ],
      faq: [
        {
          q: "BE 代表這本書寫得不好嗎？",
          a: "不代表。BE 只描述結局的方向，很多 BE 作品是公認的經典或暢銷書。這個標籤講的是結局對讀者的要求，不是作品品質。",
        },
        {
          q: "BE 和苦甜結局怎麼分？",
          a: "BE 讓「失去」在最後一拍佔上風；苦甜讓得與失同時存在。讀完主要是難過，通常是 BE；讀完同時抓著一個得到與一個失去，通常是苦甜。",
        },
        {
          q: "戀愛小說也可能是 BE 嗎？",
          a: "會。純戀愛類型的讀者通常預期 HEA，但廣義的戀愛小說（文學向愛情、悲劇愛情）完全可能收在失去，並被歸為 BE。",
        },
        {
          q: "有主要角色死亡就一定是 BE 嗎？",
          a: "不是。如果那個死亡在故事後段被更大的復原包起來，這本書仍然可能是 HE 或苦甜。BE 需要結局本身停在失去，而不是走過去。",
        },
        {
          q: "不想看完整劇透，怎麼知道 BE 的強度？",
          a: "每本書頁都有無雷摘要和「讀 or 略」判斷（Read / Skip / Caution），不需要展開完整結局就能判斷。",
        },
      ],
      policyNote:
        "我們不提供小說全文、不提供盜版下載，也不會大段複述原作情節。避雷資訊放在各書頁，是為了讓你在選 BE 之前有足夠的知情空間。",
    },
  },
  // ---------------------------------------------------------------- OE ----
  OE: {
    en: {
      title: "Open Endings Explained — OE Meaning & Reader Guide | NovelCheck",
      metaDescription:
        "OE (Open Ending) means the author deliberately doesn't resolve the outcome. Here's how OE differs from ambiguous endings and when to read one.",
      h1: "Open Ending (OE) — What It Means and When It Works",
      intro: [
        "An Open Ending — OE — is a book that closes without committing to a clear outcome. The last chapter isn't missing and it isn't a mistake. The author is deliberately handing you the final call: what happens after this page is your interpretation to hold.",
        "That is a very different reading experience from HE or BE, and readers usually pick OE on purpose. This page walks through what OE actually is, how it differs from Ambiguous endings, and the kinds of moods and needs it suits well.",
      ],
      qualifies: {
        yes: [
          "The core question of the book has a small, deliberate set of possible outcomes and the author refuses to commit to one.",
          "The final chapter closes the scene but not the arc — you understand where everyone stands, you just don't know what they choose or what happens next.",
          "The ambiguity is craft, not omission — the earlier chapters point to the openness on purpose.",
        ],
        no: [
          "The book is unfinished, or the author ran out of pages. OE requires deliberate framing.",
          "You can't tell what happened in the final scene. That drifts toward Ambiguous, which is a different label.",
          "The story has a sequel that resolves it. If the outcome is decided in a next volume, the individual book still reads as OE on its own.",
        ],
      },
      comparison: {
        heading: "OE vs Ambiguous",
        body:
          "OE and Ambiguous look similar and mean different things. In OE, you know what happened in the last scene — you don't know what happens next. In Ambiguous, even the events of the last scene are debatable. If you finish the book and know what the character just did but not what they will do, that's OE. If you finish and readers argue about what just happened at all, that's Ambiguous.",
      },
      feels: [
        "A lingering quality — OE books tend to keep working on you for days.",
        "High discussion and re-read value; different readers land in different places.",
        "A specific frustration if you were hoping for closure tonight.",
        "For readers who enjoy it, a sense of collaboration with the author.",
      ],
      goodFor: [
        "Readers who enjoy stories that stay with them and evolve on reflection.",
        "Book clubs looking for material that generates genuine disagreement.",
        "Anyone reading for craft — OE is often used precisely for tonal reasons.",
        "Readers who prefer questions to answers.",
        "People rereading a favourite author and open to a different shape.",
      ],
      notFor: [
        "Readers who need a clean resolution before they can move on.",
        "Bedtime reading where an unresolved ending will keep you awake.",
        "Readers on a tight recommendation — OE can feel like being cheated if you weren't warned.",
        "Anyone whose main reason to read is to know what happens.",
      ],
      spoilerNote:
        "This page describes OE as a category. Individual book pages keep their spoiler-safe overview and the full ending discussion separated, so you can find out an ending is OE without discovering exactly what is left open.",
      picksIntro:
        "Curated OE picks currently on the site — each is a fully written book page rather than a stub:",
      picksEmpty:
        "This section currently includes only books whose ending classification and editorial notes have been fully reviewed. Fewer OE titles have finished review than HE or BE, so this list is short by design.",
      related: [
        { label: "All indexed books", href: "/en/books" },
        { label: "Compare all ending types", href: "/en/endings" },
        { label: "Open ending collection", href: "/en/collections/open-ending-books" },
        { label: "Read or Skip guide", href: "/en/collections/read-or-skip" },
        { label: "Trigger warnings hub", href: "/en/warnings" },
        { label: "How we classify endings", href: "/en/editorial-policy" },
      ],
      faq: [
        {
          q: "Is an open ending the same as an unfinished story?",
          a: "No. An unfinished story is missing chapters. An open ending is a finished book that deliberately refuses to close the central question — the last chapter is exactly where the author meant to stop.",
        },
        {
          q: "What separates OE from Ambiguous?",
          a: "OE leaves the future open; Ambiguous leaves the present open. In OE you know what just happened but not what happens next. In Ambiguous, readers still argue about what happened at all.",
        },
        {
          q: "Can an OE still feel hopeful?",
          a: "Absolutely. An open ending can lean warm, neutral, or bleak. The label is only about resolution, not tone.",
        },
        {
          q: "Do authors ever confirm what really happens after an OE?",
          a: "Sometimes, in interviews or later work. We note editorial interpretations on individual book pages, but the book itself remains OE — the text hands the choice to the reader.",
        },
        {
          q: "Where can I see what the ambiguity is, without full spoilers?",
          a: "The spoiler-safe overview on each book page describes the shape of the ending. The full spoiler discussion stays folded until you decide to open it.",
        },
      ],
      policyNote:
        "We don't reproduce full novels, don't link to pirated copies, and don't paraphrase entire plots. OE classifications are editorial calls; where interpretation is genuinely split, we flag it as low confidence rather than assert a single reading.",
    },
    zh: {
      title: "OE 開放式結局是什麼？與曖昧結局的差異｜讀前決策站",
      metaDescription:
        "OE（Open Ending）是作者刻意不給出明確結果，讓讀者決定。這頁說明 OE 和曖昧結局怎麼分、什麼心情適合讀 OE。",
      h1: "OE 開放式結局：定義、與曖昧結局的差異、適合的讀者",
      intro: [
        "OE 是「Open Ending」，代表這本書刻意不給出明確結果就結束。最後一章不是缺頁，也不是失手，而是作者主動把最後的判斷交到你手上——這頁翻完之後是誰做了什麼，由你決定。",
        "這是和 HE、BE 都很不一樣的閱讀體驗，通常讀者是刻意選 OE。這頁會說明什麼算 OE、和曖昧結局（Ambiguous）差在哪，以及什麼樣的心情適合讀。",
      ],
      qualifies: {
        yes: [
          "故事的核心問題有幾個很清楚的可能走向，作者拒絕替讀者選其中之一。",
          "最後一章把場景收好，但把主線的走向留白——你知道每個人站在哪裡，只是不知道他們會選什麼、之後會發生什麼。",
          "這個「留白」是刻意的手法，前面就有鋪陳，不是資料不足。",
        ],
        no: [
          "作品沒寫完，或作者中斷。這不是 OE，OE 需要「刻意留白」的設計。",
          "連最後一場戲發生了什麼都看不出來。這比較靠近曖昧結局（Ambiguous），是另一個標籤。",
          "有續集會回答結局。就算續集有答案，單獨這本書仍然作為 OE 讀。",
        ],
      },
      comparison: {
        heading: "OE 和曖昧結局的差別",
        body:
          "OE 和曖昧結局看起來很像，其實不同。OE 是「已經發生的事你都知道，接下來要發生什麼你不知道」；曖昧結局是「連最後那場戲到底發生了什麼」都有爭議。看完知道角色剛剛做了什麼、卻不知道他之後會怎麼做，就是 OE；看完連「剛剛發生了什麼」讀者都會吵，就是曖昧結局。",
      },
      feels: [
        "餘韻很長，通常會在你腦中運作好幾天。",
        "討論與重讀價值高，不同讀者會停在不同位置。",
        "如果你今晚需要完整收束，OE 會讓你有點想翻桌。",
        "願意接受的讀者會有一種和作者共同完成故事的感覺。",
      ],
      goodFor: [
        "喜歡讀完之後還能在心裡繼續發酵的作品的讀者。",
        "讀書會想要真的能吵起來的題材。",
        "為了寫作手法而讀——OE 常常是為了語氣而選擇的。",
        "偏好問題勝過答案的讀者。",
        "重讀已經熟悉的作者、願意接受不同形狀的作品。",
      ],
      notFor: [
        "需要一個明確結束才能放下這本書的讀者。",
        "睡前閱讀，怕結局沒收好會睡不著。",
        "沒被事先告知就拿到 OE，會覺得被騙的讀者。",
        "讀小說主要就是為了「知道最後怎樣」的讀者。",
      ],
      spoilerNote:
        "這頁只描述 OE 這個類型。單本書的無雷摘要與完整結局是分開的，你可以先知道這本書是 OE，再自己決定是否展開完整劇透。",
      picksIntro:
        "目前站上結局為 OE、且已完成完整編輯整理的作品：",
      picksEmpty:
        "OE 目前完成編輯整理的作品比 HE 或 BE 少，這裡只列出結局分類與編輯註記都已確認的書。",
      related: [
        { label: "作品庫", href: "/zh/books" },
        { label: "所有結局類型總覽", href: "/zh/endings" },
        { label: "OE 開放式結局主題清單", href: "/zh/collections/open-ending-books" },
        { label: "讀 or 略指南", href: "/zh/collections/read-or-skip" },
        { label: "避雷標籤總覽", href: "/zh/warnings" },
        { label: "編輯政策", href: "/zh/editorial-policy" },
      ],
      faq: [
        {
          q: "開放式結局和「沒寫完」一樣嗎？",
          a: "不一樣。沒寫完是章節缺失，開放式結局是作者刻意選在那個地方停筆，讓核心問題不收束。",
        },
        {
          q: "OE 和曖昧結局怎麼分？",
          a: "OE 是「接下來會怎樣」不明確；曖昧結局是「剛剛到底發生了什麼」都不明確。前者留下未來，後者留下當下。",
        },
        {
          q: "OE 有可能讀起來偏向希望嗎？",
          a: "可以。OE 的語氣可以偏暖、偏中性、也可以偏冷。這個標籤只描述「有沒有收束」，不描述語氣。",
        },
        {
          q: "作者事後會確認 OE 的真正結局嗎？",
          a: "有時候會（在訪談或續作裡）。我們會在該書頁記錄編輯的解讀，但作品本身仍然算 OE，因為文本把選擇留給讀者。",
        },
        {
          q: "怎麼知道留白在哪但不劇透？",
          a: "每本書頁的無雷摘要會描述結局的形狀，完整劇透版折疊在下方，需要你主動點開。",
        },
      ],
      policyNote:
        "我們不提供小說全文、不提供盜版下載，也不會大段複述原作情節。當一部作品的解讀本身分歧很大，我們會標記為 low confidence，而不是硬塞一個唯一答案。",
    },
  },
  // ---------------------------------------------------------- Bittersweet ----
  Bittersweet: {
    en: {
      title: "Bittersweet Endings Explained — Reader Guide | NovelCheck",
      metaDescription:
        "A bittersweet ending is a clear outcome that holds gain and loss at once. Here's how it differs from HE, BE, and ambiguous endings, and when to pick one.",
      h1: "Bittersweet Endings — Gain and Loss, Together",
      intro: [
        "A bittersweet ending is the shape most literary novels reach for. It gives you a clear outcome — you know what happened, and you know how the characters are standing at the end — but the outcome carries both gain and loss, and neither cancels the other out.",
        "This page is for readers trying to tell bittersweet apart from HE (which lands warmer) and BE (which lands heavier). It also covers when a bittersweet ending is worth choosing on purpose, and when it isn't.",
      ],
      qualifies: {
        yes: [
          "The ending states a real outcome. The reader isn't left guessing what happened.",
          "That outcome contains gain and loss at the same time — a relationship earned but a home given up, a survival paid for by grief, and so on.",
          "Neither the gain nor the loss is downplayed. The final beat asks you to hold both.",
        ],
        no: [
          "There is a small sad moment inside an otherwise happy resolution. That's usually HE, not bittersweet.",
          "The outcome is unclear. Bittersweet requires clarity about what happened, only complexity about how to feel.",
          "The book is heavier than most romances you read. Emotional heaviness isn't the same as bittersweet — it's the specific mix of gain plus loss that defines the label.",
        ],
      },
      comparison: {
        heading: "Bittersweet vs HE, BE, and Ambiguous",
        body:
          "Bittersweet sits in the middle of the ending map. Against HE, the gap is emotional weight: HE leans stable and warm, bittersweet leans reflective and a little aching. Against BE, the gap is what the reader carries — BE mostly leaves loss, bittersweet leaves loss and gain in the same hand. Against Ambiguous, the gap is clarity: bittersweet is a clear outcome that mixes feelings; ambiguous is when even the outcome itself is up for debate.",
      },
      feels: [
        "A quiet ache in the final chapter rather than either euphoria or grief.",
        "A sense that the book has been honest with you — costs are real, gains are real.",
        "Long re-read value: bittersweet endings often reveal more with distance.",
        "For some readers, the sense of the most satisfying kind of ending fiction can offer.",
      ],
      goodFor: [
        "Readers who feel HE resolutions can be too neat for the story they just read.",
        "Anyone who wants to feel something without being wrecked.",
        "Book clubs looking for endings that reward slow discussion.",
        "Long-form literary readers who value emotional balance.",
        "Readers who like to think about a book for a week after finishing it.",
      ],
      notFor: [
        "Readers who need a fully warm exit tonight.",
        "Readers who want to be fully devastated tonight — bittersweet holds back from full BE weight.",
        "Anyone reading purely for escapism, where any ache is unwelcome.",
        "Readers who bounce off endings that mix feelings and want a clear win or loss.",
      ],
      spoilerNote:
        "This page classifies bittersweet as a tone. Individual book pages keep the spoiler-safe overview and the full ending discussion separated, so you can find out that a book is bittersweet without discovering what specifically is gained or lost.",
      picksIntro:
        "Curated bittersweet picks currently on the site — each is a fully written book page rather than a stub:",
      picksEmpty:
        "This section currently includes only books whose ending classification and editorial notes have been fully reviewed.",
      related: [
        { label: "All indexed books", href: "/en/books" },
        { label: "Compare all ending types", href: "/en/endings" },
        { label: "Bittersweet ending collection", href: "/en/collections/bittersweet-ending-books" },
        { label: "Happy ending collection", href: "/en/collections/happy-ending-books" },
        { label: "Sad ending collection", href: "/en/collections/sad-ending-books" },
        { label: "Read or Skip guide", href: "/en/collections/read-or-skip" },
        { label: "How we classify endings", href: "/en/editorial-policy" },
      ],
      faq: [
        {
          q: "Is bittersweet closer to HE or BE?",
          a: "Neither, though it can lean either way depending on the story. Bittersweet is defined by holding gain and loss together, not by which side is heavier.",
        },
        {
          q: "Can a romance novel have a bittersweet ending?",
          a: "Yes. Romance-adjacent literary fiction often ends bittersweet — the relationship reaches something meaningful even if the couple doesn't get a traditional HEA.",
        },
        {
          q: "Is the outcome always clear in a bittersweet ending?",
          a: "Yes. Clarity of outcome is what separates bittersweet from ambiguous. In bittersweet, you know what happened; the complexity is in how it feels.",
        },
        {
          q: "Why do literary novels use bittersweet endings so often?",
          a: "Because they can carry emotional honesty — cost and reward both — without either escapism or full tragedy. That balance suits the kind of arcs literary fiction tends to build.",
        },
        {
          q: "Can I see how a specific ending is bittersweet without opening the full spoiler?",
          a: "Yes. The spoiler-safe overview on each book page describes the shape of the ending, and the full spoiler discussion stays folded until you click.",
        },
      ],
      policyNote:
        "We don't reproduce full novels, don't link to pirated copies, and don't paraphrase entire plots. Bittersweet is an editorial call about tone — where readers genuinely split, the book page notes it.",
    },
    zh: {
      title: "苦甜結局是什麼？得失並存的小說結局指南｜讀前決策站",
      metaDescription:
        "苦甜結局（Bittersweet）是結局明確、但同時包含得與失。這頁說明它和 HE、BE、曖昧結局的差別，以及什麼心情適合讀。",
      h1: "苦甜結局（Bittersweet）：得與失同時存在的收尾",
      intro: [
        "苦甜結局是很多文學向作品最常走到的形狀。它會給你一個明確的結果——你知道發生了什麼，也知道角色最後站在哪裡——但這個結果同時包含得與失，兩邊都不被抵銷。",
        "這頁適合想要把「苦甜」和 HE（偏暖）、BE（偏重）分開的讀者，也會說明什麼時候刻意選一個苦甜結局是合理的，什麼時候不是。",
      ],
      qualifies: {
        yes: [
          "結局有明確的結果，讀者不會猜不出來發生了什麼。",
          "這個結果同時包含得與失——關係有了、家卻放下了；活下來、卻背了一份悲傷等等。",
          "得與失都沒有被輕輕帶過，最後一拍要你同時抓住兩邊。",
        ],
        no: [
          "整本偏 HE，只是最後有一點小小的難過。這通常還是 HE。",
          "結局本身不清楚。苦甜要「結果清楚」，只有情感複雜。",
          "「比一般戀愛小說重」就是苦甜。重量不等於苦甜，苦甜是「得＋失同時存在」這個特定形狀。",
        ],
      },
      comparison: {
        heading: "苦甜結局和 HE、BE、曖昧結局的差別",
        body:
          "苦甜結局位在結局分類的中間。跟 HE 相比，差在情緒重量——HE 偏穩偏暖，苦甜偏反思、偏微酸。跟 BE 相比，差在讀者留下什麼——BE 主要留下失去，苦甜同時留下得與失。跟曖昧結局相比，差在明確度——苦甜是明確的結果、只是感覺很複雜；曖昧結局是連結果本身都有爭議。",
      },
      feels: [
        "最後一章通常是一種安靜的酸，不是狂喜，也不是崩潰。",
        "有一種「這本書對我很誠實」的感受——代價是真的，得到也是真的。",
        "重讀價值長，苦甜結局常常在間隔一段時間後再讀更有感。",
        "對一些讀者來說，是小說能給出的最令人滿足的結尾形狀。",
      ],
      goodFor: [
        "覺得某些故事被 HE 收得太乾淨的讀者。",
        "想要有感覺，但不想被整個打壞的讀者。",
        "讀書會想要能慢慢討論、越聊越有東西的作品。",
        "重視情感平衡的長篇文學讀者。",
        "喜歡讀完後在心裡放一週再回想的讀者。",
      ],
      notFor: [
        "今晚只想要純粹溫暖的收尾。",
        "今晚就是想被完全摧毀——苦甜其實比 BE 保留了力氣。",
        "純粹為了逃避而讀，只要有一點酸就會出戲。",
        "看不下「得失同時」的結局，只想要明確的贏或輸的讀者。",
      ],
      spoilerNote:
        "這頁只把苦甜當作一種語氣分類。每本書的無雷摘要與完整劇透是分開的，你可以先知道這本書是苦甜，再決定要不要展開得失的具體內容。",
      picksIntro:
        "目前站上結局為苦甜、且已完成完整編輯整理的作品：",
      picksEmpty:
        "目前只列出結局分類與編輯註記都已完成確認的作品，之後會陸續補上。",
      related: [
        { label: "作品庫", href: "/zh/books" },
        { label: "所有結局類型總覽", href: "/zh/endings" },
        { label: "苦甜結局主題清單", href: "/zh/collections/bittersweet-ending-books" },
        { label: "HE 圓滿結局主題清單", href: "/zh/collections/happy-ending-books" },
        { label: "BE 悲傷結局主題清單", href: "/zh/collections/sad-ending-books" },
        { label: "讀 or 略指南", href: "/zh/collections/read-or-skip" },
        { label: "編輯政策", href: "/zh/editorial-policy" },
      ],
      faq: [
        {
          q: "苦甜比較接近 HE 還是 BE？",
          a: "都不是，也可以看作品偏向哪一邊。苦甜的定義是「同時抓住得與失」，不是看哪一邊比較重。",
        },
        {
          q: "戀愛小說也可能是苦甜嗎？",
          a: "會。文學向的戀愛作品常常是苦甜——關係走到某個真實的位置，但不一定給到傳統的 HEA。",
        },
        {
          q: "苦甜的結果一定是明確的嗎？",
          a: "是。「結果明確」是苦甜和曖昧結局最重要的分界。苦甜是知道發生了什麼，只是感覺複雜。",
        },
        {
          q: "為什麼文學小說很常用苦甜結局？",
          a: "因為它可以同時放下代價與收穫，不用走到純粹逃避，也不用走到完全的悲劇。這個平衡很適合文學小說常見的角色弧線。",
        },
        {
          q: "不展開完整劇透，能看出這本書怎麼「苦」怎麼「甜」嗎？",
          a: "可以。每本書頁的無雷摘要會描述結局的形狀，完整劇透版折疊起來，需要你主動點開。",
        },
      ],
      policyNote:
        "我們不提供小說全文、不提供盜版下載，也不會大段複述原作情節。苦甜屬於語氣判斷，若讀者解讀真的分歧，我們會在該書頁註記。",
    },
  },
  // ---------------------------------------------------------- Ambiguous ----
  Ambiguous: {
    en: {
      title: "Ambiguous Endings Explained — Meaning & Reader Guide | NovelCheck",
      metaDescription:
        "An ambiguous ending is a book where even what happened is up for debate. Here's how it differs from an open ending, and when to read one.",
      h1: "Ambiguous Endings — When Even the Facts Are Up for Debate",
      intro: [
        "Ambiguous is the ending label for books where readers can't fully agree on what happened. Not what comes next — what actually took place in the last scene. The text is written to hold more than one reading at once, and neither reading gets confirmed.",
        "That is a very specific reading experience, and it can be either the best or the most frustrating thing a book can do. This page is for readers who want to know what they're walking into, and how ambiguous differs from an open ending (OE).",
      ],
      qualifies: {
        yes: [
          "The events of the final scene support more than one coherent reading, on purpose.",
          "The author refuses to confirm one reading over another, both inside and outside the text.",
          "The ambiguity is central — remove it and the book loses its point, not just a detail.",
        ],
        no: [
          "The book is confusing on a first read. Confusion isn't the same as ambiguity — many ambiguous endings are perfectly clear scene by scene; what they hold open is meaning.",
          "There's a fan theory that contradicts the obvious reading. If the text points to one answer, that's not ambiguity, that's interpretation.",
          "There simply isn't enough information. That drifts into stub territory. Ambiguous endings withhold interpretation on purpose, with plenty of texture to work with.",
        ],
      },
      comparison: {
        heading: "Ambiguous vs Open Ending (OE)",
        body:
          "The distinction that trips readers up most is Ambiguous vs OE. OE is about what happens next — the last scene is clear, but the future isn't. Ambiguous is about the last scene itself — you don't fully agree with other readers on what just happened. If you close the book and can't answer what did they just do?, that's Ambiguous. If you can answer that but not what will they do next?, that's OE.",
      },
      feels: [
        "A lingering pull to reread, sometimes immediately, sometimes years later.",
        "Very high discussion value — few endings generate the kind of arguments an ambiguous ending does.",
        "For some readers, a genuine sense of frustration or being cheated.",
        "For others, the specific joy of a book that stays alive after you close it.",
      ],
      goodFor: [
        "Readers who like to think about a book long after the last page.",
        "Book clubs willing to sit in real disagreement.",
        "Readers who reread on purpose to test a new interpretation.",
        "Anyone who enjoys unreliable narrators or reality-shifting fiction.",
        "Readers whose favourite question about a book is what did I just read?",
      ],
      notFor: [
        "Readers who need to know what happened before they can move on.",
        "Bedtime reads where an unresolved final scene will keep looping.",
        "Readers who dislike unreliable narrators or shifting perspectives.",
        "First-time visitors to an author, if you want to see the author at their most direct.",
      ],
      spoilerNote:
        "This page describes the category. Individual book pages hold the actual competing readings behind an explicit spoiler expander, so you can find out a book is ambiguous without seeing which interpretations the ambiguity supports.",
      picksIntro:
        "Curated ambiguous picks currently on the site — each is a fully written book page rather than a stub:",
      picksEmpty:
        "Ambiguous endings are harder to review than HE or BE, so fewer titles have finished editorial review. Only books with fully confirmed classifications appear here.",
      related: [
        { label: "All indexed books", href: "/en/books" },
        { label: "Compare all ending types", href: "/en/endings" },
        { label: "Open ending collection", href: "/en/collections/open-ending-books" },
        { label: "Bittersweet ending collection", href: "/en/collections/bittersweet-ending-books" },
        { label: "Read or Skip guide", href: "/en/collections/read-or-skip" },
        { label: "How we classify endings", href: "/en/editorial-policy" },
      ],
      faq: [
        {
          q: "What makes an ending ambiguous rather than just unclear?",
          a: "The ambiguity has to be deliberate and load-bearing. The text supports more than one reading on purpose, and the author refuses to confirm one over the other.",
        },
        {
          q: "Is Ambiguous the same as Open Ending?",
          a: "No. Open Ending leaves the future undecided while the final scene is clear. Ambiguous leaves the final scene itself open to more than one interpretation.",
        },
        {
          q: "Does ambiguity mean the author didn't know how to finish?",
          a: "Almost never. In the books this site labels ambiguous, the ambiguity is craft — the story is built to hold more than one reading, and losing that would collapse the point of the book.",
        },
        {
          q: "Are ambiguous endings always frustrating?",
          a: "Not for readers who go in expecting them. The frustration usually comes from being surprised by ambiguity, which is exactly what a label like this is meant to prevent.",
        },
        {
          q: "Where can I read the possible interpretations?",
          a: "The competing readings live inside the spoiler section on each book page, folded until you click. That way you can learn a book is ambiguous without immediately spoiling the surface events.",
        },
      ],
      policyNote:
        "We don't reproduce full novels, don't link to pirated copies, and don't paraphrase entire plots. For books where interpretation is genuinely split, we label the classification as low confidence rather than pick a single reading.",
    },
    zh: {
      title: "曖昧結局是什麼？與開放式結局的差異｜讀前決策站",
      metaDescription:
        "曖昧結局（Ambiguous）代表連「發生了什麼」都有多種解讀。這頁說明它和開放式結局（OE）的差別，以及什麼讀者適合。",
      h1: "曖昧結局：連事實本身都可以被讀成兩種",
      intro: [
        "曖昧結局是「連讀者之間對『發生了什麼』都無法達成共識」的作品分類。不是下一步會怎樣，而是最後一場戲到底發生了什麼——文本被寫成同時支持多種解讀，而作者不會告訴你哪一個是對的。",
        "這是一種很特別的閱讀體驗，可能是這本書最迷人的地方，也可能是最讓人抓狂的地方。這頁幫助你判斷這是不是你要的體驗，並說明它和開放式結局（OE）的差別。",
      ],
      qualifies: {
        yes: [
          "最後一場戲同時支持不只一種一致的解讀，這是刻意的。",
          "作者在文本內外都拒絕確認哪一種解讀才是對的。",
          "這份曖昧是核心，抽掉了整本書就沒意義，而不是可有可無的細節。",
        ],
        no: [
          "第一次讀覺得亂就是曖昧。混亂 ≠ 曖昧，很多曖昧結局的每一場戲其實都很清楚，被留白的是意義。",
          "有粉絲理論和明顯解讀不同就叫曖昧。文本本身指向某個答案，那只是解讀差異，不算曖昧。",
          "資料太少所以看不出來。這其實比較像未整理的頁面。曖昧結局是「刻意留白」而且有豐富的解讀空間。",
        ],
      },
      comparison: {
        heading: "曖昧結局和 OE 的差別",
        body:
          "最容易搞混的就是曖昧結局和 OE。OE 是關於「接下來會發生什麼」——最後一場戲很清楚，但未來留白；曖昧是關於「剛剛到底發生了什麼」——你和其他讀者無法完全同意最後那場戲的事實。讀完不能回答「他們剛剛做了什麼？」，就是曖昧結局；能回答，但不能回答「他們接下來會做什麼？」，就是 OE。",
      },
      feels: [
        "強烈的重讀衝動，有時是當下，有時是幾年後。",
        "討論價值極高，很少有其他結局類型能引起這種爭論。",
        "對一部分讀者來說是真心的挫折感或被騙感。",
        "對另一部分讀者來說，是書「合上之後還在活著」的獨特樂趣。",
      ],
      goodFor: [
        "喜歡在讀完之後仍然反覆想這本書的讀者。",
        "願意接受讀書會意見完全不合的成員。",
        "會為了驗證新解讀而重讀的讀者。",
        "喜歡不可靠敘事者、現實會偏移的作品。",
        "最喜歡的閱讀問題是「我到底剛剛讀了什麼？」的讀者。",
      ],
      notFor: [
        "必須知道「到底發生了什麼」才能放下這本書的讀者。",
        "睡前閱讀，怕最後一場戲會在腦中不停跑。",
        "不喜歡不可靠敘事或觀點會晃的讀者。",
        "第一次接觸某位作者，想看他/她最直接的樣子。",
      ],
      spoilerNote:
        "這頁只描述分類，真正的多種解讀放在每本書頁的可折疊劇透區。你可以先知道這本書是曖昧結局，再決定要不要展開細節。",
      picksIntro:
        "目前站上結局為曖昧、且已完成完整編輯整理的作品：",
      picksEmpty:
        "曖昧結局比 HE 或 BE 更難整理，完成編輯整理的作品較少。這裡只列出結局分類已確認的書。",
      related: [
        { label: "作品庫", href: "/zh/books" },
        { label: "所有結局類型總覽", href: "/zh/endings" },
        { label: "OE 開放式結局主題清單", href: "/zh/collections/open-ending-books" },
        { label: "苦甜結局主題清單", href: "/zh/collections/bittersweet-ending-books" },
        { label: "讀 or 略指南", href: "/zh/collections/read-or-skip" },
        { label: "編輯政策", href: "/zh/editorial-policy" },
      ],
      faq: [
        {
          q: "什麼樣的結局才算曖昧，不只是看不懂？",
          a: "曖昧必須是刻意設計、而且承重的。文本本身同時支持不只一種解讀，作者也拒絕替讀者確認其中一種。",
        },
        {
          q: "曖昧結局和 OE 一樣嗎？",
          a: "不一樣。OE 是「未來」留白，最後一場戲很清楚；曖昧是最後一場戲本身就有多種解讀。",
        },
        {
          q: "曖昧代表作者不知道怎麼收尾嗎？",
          a: "幾乎不會。本站標為曖昧的作品，曖昧本身是手法，抽掉就沒有這本書了。",
        },
        {
          q: "曖昧結局一定會讓人不爽嗎？",
          a: "對「事先知道會曖昧」的讀者不一定，很多不爽感其實來自沒被事先告知——這就是這個標籤存在的意義。",
        },
        {
          q: "多種解讀在哪裡看？",
          a: "各種解讀放在每本書頁的完整劇透區，預設折疊。你可以先知道這本書是曖昧結局，不會被馬上劇透到具體事件。",
        },
      ],
      policyNote:
        "我們不提供小說全文、不提供盜版下載，也不會大段複述原作情節。對於解讀本身分歧的作品，我們會把分類標為 low confidence，而不是替讀者選定唯一答案。",
    },
  },
};
