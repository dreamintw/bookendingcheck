// Phase 5F-1 — five "Piranesi-like" ending-intent books.
// Written against the corrected catalog data in books-extra.ts. EN and ZH are
// written independently; full spoilers render SSR inside a collapsed <details>.
import type { BookEnrichment } from "./enrichment";

export const BOOK_ENRICHMENT_5F: Record<string, BookEnrichment> = {
  // ===================================================== Never Let Me Go ==
  "never-let-me-go": {
    seo: {
      en: {
        title: "Never Let Me Go Ending Explained: Why Is It So Sad? | NovelCheck",
        desc: "Is Never Let Me Go a sad ending? Spoiler-safe answer first, then what the ending means, the major-character-death warning, a Read-or-Skip verdict and folded full spoilers.",
        h1: "Never Let Me Go Ending Explained: Why It Feels So Sad",
        intro: "Short answer: Kazuo Ishiguro's Never Let Me Go does not have a happy ending, and we classify it as BE at 88 confidence. It is a quiet book rather than a shocking one — the sadness comes from what the characters slowly understand about their own lives and how calmly they accept it. This page starts spoiler-free, explains why the ending lands harder than its gentle tone suggests, covers the death warning, and keeps the complete ending folded at the bottom.",
      },
      zh: {
        title: "《別讓我走》結局解析：為什麼這麼悲傷？無雷判斷與避雷 | 讀前決策站",
        desc: "《別讓我走》是悲劇結局嗎？先看無雷答案與結局意義，再看主要角色死亡警示與讀或略建議；完整劇透預設折疊，需要時再展開。",
        h1: "《別讓我走》結局解析：為什麼讀完那麼難受",
        intro: "先說結論：石黑一雄的《別讓我走》不是 HE，本站標為 BE、信心 88 分。它不靠驚嚇取勝，整本書的語氣平靜得近乎克制，真正讓人難過的，是角色們一點一點理解自己的處境，卻選擇安靜地接受。本頁先給你無雷的判斷，再說明結局為何比語氣更重，接著是死亡警示與閱讀建議；完整劇透收在頁面下方，預設不展開。",
      },
    },
    endingMeaning: {
      heading: { en: "Why the ending feels tragic — and why it is more than a sad label", zh: "結局為何讓人心碎，而不只是一個「BE」標籤" },
      body: {
        en: [
          "Most tragic endings hurt because something goes wrong. Never Let Me Go hurts because nothing does. The narrator, Kathy, tells her story looking back, in an even, careful voice, and the reader gradually realises that the outcome was settled long before the first page. There is no late twist that rescues anyone and no dramatic rebellion that fails. The tragedy is structural: a life with a fixed shape, lived with as much warmth as the characters can manage inside it.",
          "That is why many readers finish the book looking for meaning rather than plot recap. The question the ending leaves behind is not what happened but why the people it happened to did not run, protest or demand more. Ishiguro does not answer that with a speech. He answers it with Kathy's memories — of school, of friendship, of small jealousies and small kindnesses — which she clings to precisely because they are what she was allowed to have.",
          "Read this way, the ending is less about a hidden system than about ordinary mortality seen through a narrowed lens. Everyone's time is limited; these characters simply know the limit more precisely. Acceptance here is not presented as wisdom or as weakness. It is presented as what happens when people are raised to expect very little, and the book trusts you to feel how much that costs.",
        ],
        zh: [
          "多數悲劇結局之所以痛，是因為事情出了錯；《別讓我走》之所以痛，是因為從頭到尾沒有任何事「出錯」。敘事者凱西以回憶的口吻說故事，語氣平穩而節制，讀者是一路讀下去才慢慢察覺：結果早在第一頁之前就已經決定了。沒有最後一刻的翻盤，也沒有轟轟烈烈卻失敗的反抗。這本書的悲傷是結構性的——一段形狀早已被定好的人生，角色們只能在裡面盡量活得溫暖。",
          "所以很多人讀完之後想找的不是劇情整理，而是「意義」。結局留下的問題不是發生了什麼，而是：為什麼身在其中的人沒有逃、沒有抗議、沒有要求更多？石黑一雄沒有用一段演說回答，他用凱西的記憶回答——寄宿學校的日子、朋友之間的小嫉妒與小善意。她緊抓著這些回憶，正因為那是她被允許擁有的全部。",
          "這樣讀，結局與其說是在揭露一個隱藏的制度，不如說是在用一個被收窄的鏡頭看待每個人都會面對的有限人生。我們的時間都有盡頭，只是書中人更清楚那個盡頭在哪裡。「接受」在這裡既沒有被寫成智慧，也沒有被寫成軟弱，而是被呈現為一個人從小被教導不要期待太多時會有的樣子——代價有多大，作者留給你自己去感受。",
        ],
      },
    },
    endingTone: {
      en: "We file the ending as BE rather than Bittersweet because the outcome is loss with no restored future: the characters' situation does not change, and the final pages do not offer a way out. What can make it feel gentler is the narration. Kathy is reflective rather than angry, and the closing image is restrained, so some readers come away calling it bittersweet. Our label tracks the outcome, not the softness of the voice. The 88 confidence reflects that the outcome itself is not open to debate.",
      zh: "本站把它歸為 BE 而非 Bittersweet，原因是結局的實際狀態就是失去，而且沒有任何被恢復的未來：角色的處境沒有改變，最後幾頁也沒有給出出路。讓它讀起來比較「柔」的，是敘事方式——凱西的語氣是回望而非憤怒，最後的畫面也相當收斂，因此有些讀者會說它苦甜參半。本站的標籤看的是結果，而不是語氣有多溫和。信心 88 分，代表結局本身沒有太多爭議空間。",
    },
    warningsExplained: {
      en: "The single warning in our data is major character death (high). Deaths happen mostly off-page and are reported in Kathy's calm retrospective voice rather than dramatised, so the intensity is emotional, not graphic. What readers most often find hard is the anticipation: you know where things are heading for a long stretch before they get there. There is no violent set piece. Readers currently grieving, or sensitive to themes of losing friends one by one, should weigh that slow build carefully.",
      zh: "本站資料只標了一項警示：主要角色死亡（高強度）。死亡大多發生在幕後，透過凱西平靜的回憶轉述，沒有被戲劇化，所以強度在情緒而不在畫面。多數讀者覺得難熬的，是「預見」：很長一段篇幅裡，你已經知道事情會往哪裡去，只是還沒到。書中沒有暴力場面。如果你最近正在面對喪失，或對「朋友一個個離開」這類題材特別敏感，請把這種慢慢累積的壓力納入考量。",
    },
    verdict: {
      en: "Caution — but a strong read if you are in a steady place. Choose it if you want a short, quietly devastating literary novel that stays with you for weeks. Hold off if you need hope at the end, or if you are looking for an action-driven dystopia; this one never becomes that.",
      zh: "謹慎閱讀，但若你目前狀態穩定，非常值得一讀。想要一本篇幅不長、安靜卻後勁極強、會在心裡停留好幾週的文學小說，就選它。如果你需要結尾有希望，或期待的是情節推進型的反烏托邦，先暫緩——這本從頭到尾都不會變成那種書。",
    },
    whoFor: {
      en: ["Readers who like restrained, reflective narrators", "People who want meaning over plot twists", "Fans of The Remains of the Day", "Readers ready for a slow, sad ending"],
      zh: ["喜歡節制、回望型敘事者的讀者", "重視意義勝過反轉的人", "喜歡《長日將盡》的讀者", "能接受緩慢累積、結局悲傷的人"],
    },
    whoNot: {
      en: ["Anyone who needs a hopeful ending", "Readers expecting an action dystopia", "People grieving a close friend right now", "Readers who find passive characters frustrating"],
      zh: ["需要充滿希望結局的人", "期待動作型反烏托邦的讀者", "近期正經歷摯友離世的人", "看到角色不反抗會很煩躁的讀者"],
    },
    similarByEnding: ["the-remains-of-the-day", "the-song-of-achilles"],
    similarByWarning: ["the-song-of-achilles", "the-fault-in-our-stars"],
    relatedLinks: [
      { path: "/endings/BE", label: { en: "More BE (sad) endings", zh: "更多 BE 悲劇結局" } },
      { path: "/warnings/death", label: { en: "Books with major character death", zh: "含主要角色死亡的避雷清單" } },
      { path: "/authors/kazuo-ishiguro", label: { en: "Kazuo Ishiguro: endings across his books", zh: "石黑一雄作品的結局傾向" } },
      { path: "/collections/sad-ending-books", label: { en: "Sad-ending books, spoiler-safe", zh: "悲傷結局書單（免雷）" } },
    ],
    fullSpoiler: {
      summary: { en: "Full spoilers — how Never Let Me Go ends (click to expand)", zh: "完整劇透——《別讓我走》的結局（點擊展開）" },
      body: {
        en: [
          "Spoilers from here. Kathy, Ruth and Tommy are clones raised to become organ donors. Ruth and later Tommy die — 'complete', in the book's euphemism — after their donations. Before that, Kathy and Tommy seek out their former guardians to ask about a rumoured deferral for couples in love, and learn it never existed.",
          "At the end Kathy is still alive, working as a carer, and knows she will soon become a donor herself. The last scene has her stopping by a fence in open country, letting herself imagine Tommy for a moment, then driving on to where she is expected. Nothing is overturned; the meaning lies in her choosing to keep her memories rather than any escape.",
        ],
        zh: [
          "以下為劇透。凱西、露絲與湯米是為器官捐贈而培育的複製人。露絲與後來的湯米都在捐贈後離世（書中稱為「完成」）。在那之前，凱西和湯米找上當年的監護人，想確認「真心相愛可以延後捐贈」的傳聞，卻得知那從來不存在。",
          "結尾時凱西仍然活著，以看護身分工作，也知道自己很快將成為捐贈者。最後一幕，她把車停在空曠鄉間的一道籬笆旁，讓自己短暫想像湯米的身影，然後繼續開往她被安排要去的地方。沒有任何翻轉；意義在於她選擇保留回憶，而不是逃離。",
        ],
      },
    },
    faq: [
      { q: { en: "Is Never Let Me Go sad?", zh: "《別讓我走》很悲傷嗎？" }, a: { en: "Yes. It is classified BE at 88 confidence. The sadness is quiet and cumulative rather than shocking.", zh: "是的。本站標為 BE、信心 88 分。它的悲傷是安靜、慢慢累積的，而不是突然的衝擊。" } },
      { q: { en: "Does the narrator die at the end?", zh: "敘事者在結局死了嗎？" }, a: { en: "No. Kathy is still alive when the book ends, though her future is already decided. Her closest friends do die.", zh: "沒有。全書結束時凱西仍然活著，只是她的未來已被決定；她最親近的朋友則先後離世。" } },
      { q: { en: "Why don't the characters try to escape?", zh: "為什麼角色不試著逃走？" }, a: { en: "The novel never gives a single answer. Their upbringing taught them to expect little, and the book treats that conditioning as part of the tragedy.", zh: "小說沒有給出單一答案。他們從小被教導不要期待太多，作者把這種被養成的順從本身，視為悲劇的一部分。" } },
      { q: { en: "Is it more sci-fi or literary fiction?", zh: "它比較像科幻還是純文學？" }, a: { en: "Literary. The speculative premise stays in the background; the focus is memory, friendship and how people live with limits.", zh: "純文學。設定性的元素一直退在背景，重心是記憶、友情，以及人如何與限制共處。" } },
      { q: { en: "Is there graphic content?", zh: "有血腥或露骨內容嗎？" }, a: { en: "No graphic violence. Deaths are mostly reported rather than shown. There is some low-key sexual content between young adults.", zh: "沒有血腥暴力，死亡大多以轉述呈現；書中有少量、低調的年輕成人之間的性相關描寫。" } },
      { q: { en: "Should I read it if I liked The Remains of the Day?", zh: "喜歡《長日將盡》的人適合讀嗎？" }, a: { en: "Very likely. Same author, same restrained narrator looking back on what he or she could not change — but this ending is heavier.", zh: "很可能適合。同一位作者，同樣是節制的敘事者回望自己無法改變的事——只是這本的結局更沉重。" } },
    ],
  },

  // ============================================================== Verity ==
  verity: {
    seo: {
      en: {
        title: "Verity Ending Explained: Manuscript vs. Letter — Who Is Telling the Truth? | NovelCheck",
        desc: "Is the Verity ending ambiguous? Spoiler-free answer first, then both interpretations of the manuscript and the final letter, child-death and sexual-content warnings, and folded full spoilers.",
        h1: "Verity Ending Explained: Which Version Do You Believe?",
        intro: "Colleen Hoover's Verity ends on a deliberately ambiguous note, and we classify it as Ambiguous at 84 confidence. The book gives you two documents that tell incompatible stories and does not settle which one is true — that is why readers argue about it so much. This page starts spoiler-free, then lays out both readings side by side without declaring a winner, explains the child-death and explicit-content warnings, and keeps the full ending folded below.",
      },
      zh: {
        title: "《真相》Verity 結局解析：手稿和信，哪個才是真的？ | 讀前決策站",
        desc: "《真相》結局是開放還是曖昧？先看無雷答案，再比較手稿與最後那封信的兩種解讀；附兒童死亡與性描寫警示，完整劇透預設折疊。",
        h1: "《真相》結局解析：你相信哪一個版本？",
        intro: "柯琳・胡佛的《真相》刻意以曖昧收尾，本站標為 Ambiguous、信心 84 分。書裡有兩份說法互相衝突的文件，作者沒有告訴你哪一份才是真的——這正是讀者吵翻天的原因。本頁先提供無雷判斷，再把兩種解讀並排列出、不替你下結論，並說明兒童死亡與大量性描寫兩項警示；完整結局收在下方折疊區。",
      },
    },
    endingMeaning: {
      heading: { en: "Why the Verity ending is genuinely ambiguous", zh: "為什麼《真相》的結局是真正的曖昧" },
      body: {
        en: [
          "Some thrillers end with a twist that recontextualises everything and then holds still. Verity ends with a twist that refuses to hold still. Across the novel, the narrator, Lowen, reads a hidden manuscript that appears to be a confession. Near the end, a second document surfaces that reframes the manuscript entirely. Both are written by the same person, both are persuasive, and the book stops without independent evidence for either.",
          "That design is the point. Each reading changes who the villain is, whose fear was justified and whether the choices made in the final chapters were protection or something darker. Readers who trust the manuscript see one kind of story; readers who trust the letter see a very different one. A third group argues that the author of both documents is unreliable by definition, so neither can be fully believed.",
          "We do not pick a side, and you will not find a definitive answer here, because the text does not supply one. What we can say is that the ambiguity is not an accident or an unfinished thread — the last pages are built to leave you holding a decision. If you finish a book needing to know what really happened, that is the single most important thing to know before you start this one.",
        ],
        zh: [
          "有些懸疑小說的反轉會把一切重新定義，然後就此定格；《真相》的反轉則拒絕定格。全書中，敘事者羅雯讀到一份藏起來、看似認罪告白的手稿；接近尾聲時，又出現另一份文件，把手稿的意義整個翻過來。兩份都出自同一個人之手，兩份都很有說服力，而小說在沒有任何第三方證據的情況下就結束了。",
          "這種安排就是重點。你相信哪一份，就決定了誰是反派、誰的恐懼合理、最後幾章那些選擇究竟是保護還是更黑暗的東西。相信手稿的人看到一種故事；相信信件的人看到截然不同的另一種。也有讀者主張：兩份文件的作者本身就不可靠，所以哪一份都不能全信。",
          "本站不選邊，這裡也不會給你「標準答案」，因為文本本身沒有提供。可以確定的是：這種曖昧不是作者忘了收線，而是刻意讓你在最後一頁手裡握著一個決定。如果你讀完一本書非得知道「真相到底是什麼」，這是開讀前最需要知道的一件事。",
        ],
      },
    },
    endingTone: {
      en: "Ambiguous, not OE. An open ending leaves the future unwritten; Verity's future is fairly clear, but the past — what actually happened, and who is guilty — is left contested. The mood at the close is unsettled and slightly sick rather than sad or relieved. Confidence is 84 because the ambiguity itself is clear even though its answer is not.",
      zh: "是 Ambiguous，而不是 OE。開放結局是把「未來」留白；《真相》的未來其實相當明確，被留下爭議的是「過去」——到底發生了什麼、誰才有罪。收尾時的氛圍是不安、甚至有點反胃，而不是悲傷或釋然。信心 84 分，是因為「它是曖昧的」這件事很清楚，只是答案不清楚。",
    },
    warningsExplained: {
      en: "Two warnings, both high. Child death: the deaths of children are central to the backstory and are described in the manuscript in disturbing terms; this is the warning most readers say they wish they had known. Sexual content: there are frequent explicit scenes, both in the manuscript and in the present-day storyline, which surprises readers who expect a straight thriller. The book also contains coercive, unsettling relationship dynamics and a prolonged atmosphere of menace.",
      zh: "兩項警示，強度都高。兒童死亡：孩子的死亡是背景故事的核心，手稿中的描述令人不適——這是最多讀者表示「早知道就好了」的一項。性描寫：無論在手稿內或現在進行的故事線裡，都有頻繁而露骨的情節，常讓以為是純懸疑的讀者措手不及。此外書中也有帶控制感、令人不安的關係互動，以及持續的威脅氛圍。",
    },
    verdict: {
      en: "Caution. Read it if you enjoy dark, fast thrillers and like arguing about an ending afterwards. Skip it if child death is a hard limit, if explicit sex in a thriller is a dealbreaker, or if unresolved truth will genuinely bother you.",
      zh: "謹慎閱讀。如果你喜歡節奏快、黑暗的驚悚小說，讀完還想跟人爭論結局，這本很適合。如果兒童死亡是你的底線、無法接受懸疑小說裡有大量露骨性描寫，或是「真相沒定論」會讓你非常難受，建議跳過。",
    },
    whoFor: {
      en: ["Thriller readers who enjoy debating endings", "Fans of unreliable documents and narrators", "Readers who like fast, binge-able pacing", "People comfortable with explicit content"],
      zh: ["喜歡讀完就想討論結局的懸疑讀者", "偏好不可靠文件與敘事者的人", "喜歡一口氣讀完的快節奏", "能接受露骨描寫的讀者"],
    },
    whoNot: {
      en: ["Anyone for whom child death is a hard limit", "Readers who need a definitive answer", "People expecting a clean, non-explicit thriller", "Readers sensitive to coercive relationships"],
      zh: ["兒童死亡是底線的人", "需要明確答案的讀者", "期待乾淨、無露骨描寫懸疑的人", "對控制型關係敏感的讀者"],
    },
    similarByEnding: ["piranesi", "the-remains-of-the-day"],
    similarByWarning: ["gone-girl"],
    relatedLinks: [
      { path: "/endings/Ambiguous", label: { en: "More ambiguous endings", zh: "更多曖昧結局" } },
      { path: "/warnings/death", label: { en: "Books with death warnings", zh: "含死亡情節的避雷清單" } },
      { path: "/book/gone-girl", label: { en: "Gone Girl: ending and warnings", zh: "《控制》的結局與避雷" } },
      { path: "/collections/read-or-skip", label: { en: "Read or skip? Quick verdicts", zh: "讀或略：快速判斷書單" } },
    ],
    fullSpoiler: {
      summary: { en: "Full spoilers — the Verity ending, both readings (click to expand)", zh: "完整劇透——《真相》結局與兩種解讀（點擊展開）" },
      body: {
        en: [
          "Spoilers from here. The manuscript Lowen finds reads as Verity's confession that she harmed her own daughters and wanted her husband's attention to herself. After Jeremy reads it, Verity dies, and her death is passed off as an accident. Lowen and Jeremy move on together.",
          "Later Lowen finds a letter in which Verity claims the manuscript was a writing exercise — her villain's voice, not her own — and that she had been pretending to be incapacitated out of fear. Lowen destroys the letter. The book never confirms which document is true, so whether Verity was a monster or a victim, and whether her death was justice, is left to the reader.",
        ],
        zh: [
          "以下為劇透。羅雯找到的手稿讀起來像是薇樂蒂的自白：她傷害了自己的女兒，只為了獨占丈夫的注意力。傑瑞米讀完後，薇樂蒂死去，死因被包裝成意外，羅雯與傑瑞米隨後一起展開新生活。",
          "之後羅雯發現一封信，薇樂蒂在信中聲稱手稿只是寫作練習——那是反派的口吻，不是她本人——而她一直假裝失能，是出於恐懼。羅雯毀掉了那封信。全書從未證實哪份文件為真，所以薇樂蒂究竟是怪物還是受害者、她的死算不算正義，都交由讀者判斷。",
        ],
      },
    },
    faq: [
      { q: { en: "Is the Verity ending ambiguous?", zh: "《真相》的結局是曖昧的嗎？" }, a: { en: "Yes — deliberately. We classify it Ambiguous at 84 confidence. Two documents contradict each other and the book does not say which is true.", zh: "是，而且是刻意的。本站標為 Ambiguous、信心 84 分。兩份文件互相矛盾，小說沒有說哪份為真。" } },
      { q: { en: "Is there an official answer to who was lying?", zh: "誰在說謊，有官方答案嗎？" }, a: { en: "Not in the novel itself. Any single 'correct' answer you see online is an interpretation, not something the text proves.", zh: "小說本身沒有給。網路上任何「唯一正解」都是詮釋，而不是文本證明的事實。" } },
      { q: { en: "How many documents matter at the end?", zh: "結局關鍵的文件有幾份？" }, a: { en: "Two: the hidden manuscript Lowen reads through the book, and one final letter that reframes it.", zh: "兩份：羅雯整本書都在讀的那份手稿，以及最後出現、把它重新定義的一封信。" } },
      { q: { en: "How explicit is Verity?", zh: "《真相》的性描寫有多露骨？" }, a: { en: "Quite explicit and frequent for a thriller. We tag sexual content as high intensity.", zh: "以懸疑小說而言相當露骨且頻繁，本站標為高強度性描寫。" } },
      { q: { en: "Is the child death described?", zh: "兒童死亡有被描寫出來嗎？" }, a: { en: "Yes, in the manuscript, in a disturbing way. It is the main reason we mark the book Caution rather than Read.", zh: "有，在手稿中，而且令人不適。這是本站將它標為「謹慎閱讀」而非「值得讀」的主因。" } },
      { q: { en: "If I liked Gone Girl, will I like Verity?", zh: "喜歡《控制》的人會喜歡《真相》嗎？" }, a: { en: "Possibly — both play with unreliable accounts. Verity is darker in subject, more explicit, and far less resolved.", zh: "有可能，兩本都玩不可靠的敘述。但《真相》題材更黑暗、更露骨，也更沒有定論。" } },
    ],
  },

  // ======================================================= In Five Years ==
  "in-five-years": {
    seo: {
      en: {
        title: "In Five Years Ending Explained: Is It Sad? What the Dream Means | NovelCheck",
        desc: "Does In Five Years have a happy ending? A cautious, spoiler-safe answer, what the five-years-later premise means, death and cancer warnings, and folded full spoilers.",
        h1: "In Five Years Ending Explained: Is It a Sad Ending?",
        intro: "Rebecca Serle's In Five Years is sold like a romance, but it is not a happy ending: we classify it as BE, with a moderate 78 confidence because the final mood leans bittersweet for some readers. The book's real subject is friendship and loss, and the time-skip premise means something different from what it first seems. This page stays spoiler-free at the top, explains the ending carefully, covers the death, illness and grief warnings, and folds the full ending away.",
      },
      zh: {
        title: "《五年後》結局解析：是悲劇嗎？那個夢代表什麼 | 讀前決策站",
        desc: "《五年後》是 HE 嗎？先看謹慎的無雷判斷與「五年後」設定的意義，再看死亡、癌症與悲痛警示；完整劇透預設折疊。",
        h1: "《五年後》結局解析：這是悲傷的結局嗎？",
        intro: "蕾貝卡・賽爾的《五年後》包裝得像言情小說，但它不是 HE：本站標為 BE，信心只給 78 分，因為對部分讀者而言最後的氛圍偏向苦甜。這本書真正的主題是友情與失去，而「五年後」這個設定的意思，也和你一開始以為的不一樣。本頁上半部保持無雷，再謹慎說明結局，並列出死亡、疾病與悲痛三項警示；完整劇透收在下方折疊區。",
      },
    },
    endingMeaning: {
      heading: { en: "What the five-years premise really means", zh: "「五年後」這個設定真正的意思" },
      body: {
        en: [
          "The hook is simple: on the night she gets engaged, Dannie — a meticulous planner — has a vivid dream of a different apartment, a different man and a different life five years on. The book trains you to read that dream as a romantic prophecy and to wait for her to meet the man. That expectation is the trap. The novel is less interested in whether the vision comes true than in what it was actually showing her.",
          "When the meaning shifts, it shifts away from romance and toward friendship. The person the story is truly about is Dannie's best friend, Bella, and the time limit hidden inside the premise turns out to be about illness rather than love. Many readers say the moment they understood this was when the book stopped being the one they thought they had bought.",
          "Our classification follows the outcome. Because the central loss is not undone, we file it as BE. The source data itself describes the finish as 'BE-leaning bittersweet', and we think that is fair: the last stretch is softer than a pure tragedy and lets Dannie hold onto something. We keep the formal label at BE and the confidence at 78 rather than overstate how dark or how consoling it feels — this is a book where readers genuinely land in different places.",
        ],
        zh: [
          "設定很簡單：習慣把人生排得井井有條的丹妮，在訂婚當晚夢見五年後的自己——不同的公寓、不同的男人、不同的人生。小說一路引導你把這個夢當成愛情預言，等著她遇見夢裡那個人。而這份期待，正是作者設下的陷阱。這本書在意的不是預言會不會成真，而是那個夢真正想讓她看見什麼。",
          "當意義轉向時，它轉離了愛情，轉向友情。這個故事真正的核心人物，是丹妮的摯友貝拉；藏在設定裡的時限，最後指向的是疾病而不是戀愛。不少讀者說，就在明白這一點的瞬間，這本書不再是他們以為自己買下的那本書。",
          "本站的分類看結果。核心的失去沒有被挽回，所以歸為 BE。不過原始資料也把它描述為「偏 BE 的苦甜」，我們認為這說法合理：最後一段比純粹的悲劇柔和，也讓丹妮留住了某些東西。我們維持 BE 的正式標籤與 78 分的信心，不刻意誇大它有多黑暗或多療癒——這是一本讀者感受確實會落在不同位置的書。",
        ],
      },
    },
    endingTone: {
      en: "BE, held at 78 confidence. The defining event of the ending is a loss that is not reversed, which is why we do not call it HE or full Bittersweet. Some readers experience the last pages as gentle and even hopeful for Dannie personally, so the tone sits closer to bittersweet than the label alone suggests. Treat this as a sad book with a soft landing rather than a devastating one.",
      zh: "BE，信心維持 78 分。結局最關鍵的事件是一場無法挽回的失去，因此本站不標 HE，也不標完整的 Bittersweet。有些讀者覺得最後幾頁對丹妮本人而言是溫柔、甚至帶著希望的，所以實際氛圍比標籤本身更接近苦甜。可以把它理解為「悲傷但落地輕柔」的書，而不是讓人崩潰的那種。",
    },
    warningsExplained: {
      en: "Three warnings, all high in our data. Death: a central character dies of illness; it is foreshadowed rather than sudden. Illness: cancer is depicted through diagnosis and treatment over a substantial part of the book, without heavy clinical detail. Grief: the emotional core of the last third is grief and caretaking. There is no violence. Readers with recent experience of cancer in someone close should know the book stays with it for a long time.",
      zh: "本站資料列出三項警示，強度皆為高。死亡：一位核心角色因病離世，有預示而非突然發生。疾病：癌症從診斷到治療佔了相當篇幅，但沒有大量臨床細節。悲痛：後三分之一的情感核心就是哀傷與陪伴照顧。書中沒有暴力。如果你身邊的人近期才經歷癌症，請知道這本書會在這個題材上停留很久。",
    },
    verdict: {
      en: "Caution. Pick it up if you want a short, emotional book about female friendship and you are prepared for illness and loss. Skip it if you came for a light romance, or if cancer is close to home right now.",
      zh: "謹慎閱讀。如果你想讀一本篇幅不長、以女性友情為核心、情緒飽滿的小說，而且已經準備好面對疾病與失去，可以讀。如果你是衝著輕鬆言情來的，或癌症正是你身邊的現實，建議先跳過。",
    },
    whoFor: {
      en: ["Readers who want a friendship-centred story", "People who enjoy a premise that flips expectations", "Readers ready for illness and loss", "Fans of short, emotional book-club reads"],
      zh: ["想讀以友情為核心故事的人", "喜歡設定翻轉預期的讀者", "已準備好面對疾病與失去的人", "喜歡篇幅短、情緒強的讀書會選書"],
    },
    whoNot: {
      en: ["Readers expecting a light rom-com", "Anyone with recent cancer grief", "People who dislike magical-realism premises", "Readers who need a clear HE"],
      zh: ["期待輕鬆浪漫喜劇的讀者", "近期因癌症失去親友的人", "不喜歡魔幻寫實設定的人", "需要明確 HE 的讀者"],
    },
    similarByEnding: ["the-fault-in-our-stars", "me-before-you"],
    similarByWarning: ["the-fault-in-our-stars", "the-time-travelers-wife"],
    relatedLinks: [
      { path: "/endings/BE", label: { en: "More BE (sad) endings", zh: "更多 BE 悲劇結局" } },
      { path: "/warnings/death", label: { en: "Books with death of a loved one", zh: "含親友離世的避雷清單" } },
      { path: "/collections/romance-ending-finder", label: { en: "Romance ending finder", zh: "言情結局查詢" } },
      { path: "/collections/sad-ending-books", label: { en: "Sad-ending books, spoiler-safe", zh: "悲傷結局書單（免雷）" } },
    ],
    fullSpoiler: {
      summary: { en: "Full spoilers — how In Five Years ends (click to expand)", zh: "完整劇透——《五年後》的結局（點擊展開）" },
      body: {
        en: [
          "Spoilers from here. The man from Dannie's dream turns out to be Bella's partner, not a future love of Dannie's own. Bella is diagnosed with cancer, and the reason the dream placed Dannie with him is that Bella will die.",
          "The ending centres on Bella's death and Dannie's grief. The dream's scene does arrive, but its meaning is loss and shared mourning rather than romance. Our source describes the finish as BE-leaning bittersweet, and we keep it at BE with 78 confidence rather than add details beyond what our data supports.",
        ],
        zh: [
          "以下為劇透。丹妮夢中的男人，其實是貝拉的伴侶，並不是丹妮自己未來的戀人。貝拉被診斷出癌症，而夢之所以讓丹妮和他在一起，是因為貝拉將會離世。",
          "結局的重心是貝拉的死與丹妮的哀悼。夢裡的那一幕確實到來了，但它代表的是失去與共同的悲傷，而不是愛情。原始資料將收尾描述為「偏 BE 的苦甜」，本站維持 BE、信心 78 分，不補充資料以外的細節。",
        ],
      },
    },
    faq: [
      { q: { en: "Does In Five Years have a happy ending?", zh: "《五年後》是 HE 嗎？" }, a: { en: "No. We classify it BE at 78 confidence. The tone near the end leans bittersweet for some readers, but the main loss is not reversed.", zh: "不是。本站標為 BE、信心 78 分。部分讀者覺得結尾偏苦甜，但核心的失去並未被挽回。" } },
      { q: { en: "Is In Five Years a romance?", zh: "《五年後》是言情小說嗎？" }, a: { en: "It is marketed close to one, but at heart it is a story about friendship and grief.", zh: "行銷上接近言情，但本質是一個關於友情與悲傷的故事。" } },
      { q: { en: "What does the five-years dream mean?", zh: "五年後的那個夢代表什麼？" }, a: { en: "It is set up as a romantic prophecy, but its real meaning turns out to be about loss, not love. Details are in the folded spoilers.", zh: "它被鋪陳成愛情預言，但真正的意義指向失去而非愛情；細節收在折疊劇透中。" } },
      { q: { en: "Why is it BE and not Bittersweet?", zh: "為什麼標 BE 而不是 Bittersweet？" }, a: { en: "Our label follows the outcome. The central loss stands; the softer feeling of the final pages is why confidence is 78 rather than higher.", zh: "本站標籤看結果：核心的失去成立；最後幾頁較柔和的感受，正是信心只有 78 分而非更高的原因。" } },
      { q: { en: "How heavy is the cancer content?", zh: "癌症的描寫有多沉重？" }, a: { en: "Emotionally heavy and sustained, but not clinically graphic. We tag illness as high intensity.", zh: "情緒上沉重且持續，但沒有血淋淋的臨床描寫。本站將疾病標為高強度。" } },
      { q: { en: "Is it similar to The Fault in Our Stars?", zh: "跟《生命中的美好缺憾》像嗎？" }, a: { en: "In warning profile, yes — illness, death and grief. In-five-years is adult, shorter and centred on two friends rather than a couple.", zh: "就警示類型而言很像——疾病、死亡、悲痛。但《五年後》是成人小說、篇幅更短，主角是兩位好友而非一對戀人。" } },
    ],
  },

  // =============================================================== Circe ==
  circe: {
    seo: {
      en: {
        title: "Circe Ending Explained: Mortality, Choice & Why It's Bittersweet | NovelCheck",
        desc: "Does Circe have a happy ending? Spoiler-safe answer, what Circe's final choice means about mortality and identity, the sexual-violence warning, and folded full spoilers.",
        h1: "Circe Ending Explained: What Her Final Choice Means",
        intro: "Madeline Miller's Circe ends in a way that is neither tragic nor simply happy, and we classify it as Bittersweet at 89 confidence. If you came here from The Song of Achilles, the short answer is that this one is far gentler at the finish. Below you get a spoiler-free read on the ending, what Circe's last decision says about mortality and identity, a careful note on the sexual-violence warning, and full spoilers folded away.",
      },
      zh: {
        title: "《瑟西》結局解析：最後的選擇、凡人與神性，為何是苦甜？ | 讀前決策站",
        desc: "《瑟西》是 HE 嗎？先看無雷判斷，再理解瑟西最後的選擇與「有限生命」的意義；附性暴力警示說明，完整劇透預設折疊。",
        h1: "《瑟西》結局解析：她最後的選擇代表什麼",
        intro: "瑪德琳・米勒的《瑟西》結局既不是悲劇，也不只是單純的圓滿，本站標為 Bittersweet、信心 89 分。如果你是讀完《阿基里斯之歌》才來的，簡單說：這本的收尾溫柔得多。以下依序提供無雷的結局判斷、瑟西最後的決定對「有限生命」與「自我」的意義、性暴力警示的審慎說明，以及預設折疊的完整劇透。",
      },
    },
    endingMeaning: {
      heading: { en: "Mortality, identity and the final choice", zh: "有限的生命、自我，與最後的選擇" },
      body: {
        en: [
          "Circe spends most of the novel being defined by others — a minor goddess her family dismisses, an exile, a figure in other people's legends. The ending is the moment she stops being a character in someone else's story. Its emotional weight comes not from a battle or a reunion but from a decision about what kind of existence she wants.",
          "The central contrast is between endless time and a life that counts. Immortality in this book is not a gift; it is a kind of numbness, watching mortals change and die while gods stay petty and unchanged. Through her years on the island, through motherhood and loss, Circe comes to value what limitation gives people: urgency, tenderness, the ability to grow.",
          "That is why we call the ending Bittersweet rather than HE. What she chooses carries a real cost, and the book does not pretend otherwise; there is grief behind her and an ending ahead of her that she cannot undo. But the choice is hers, made with open eyes, and the final pages read as arrival rather than surrender. Readers usually close the book moved and quietly hopeful rather than crushed.",
        ],
        zh: [
          "這本小說大部分時候，瑟西都是被別人定義的——被家族輕視的小女神、被流放者、別人傳說裡的一個配角。結局，就是她不再當別人故事裡的角色的那一刻。它的情感重量不來自戰役或重逢，而來自一個決定：她想要過什麼樣的存在。",
          "核心的對比，是「無盡的時間」與「有意義的一生」。在這本書裡，永生不是禮物，而是一種麻木——看著凡人改變、老去、死亡，眾神卻一樣小氣、一成不變。在島上的漫長歲月中，經歷成為母親與失去，瑟西逐漸看見「有限」帶給人的東西：急切、溫柔、以及成長的可能。",
          "這也是本站標為 Bittersweet 而不是 HE 的原因。她的選擇有真實的代價，書裡也沒有假裝沒有；她身後有悲傷，前方有一個她無法反悔的終點。但那是她睜著眼睛做出的選擇，最後幾頁讀起來像是「抵達」而不是「投降」。多數讀者闔上書時是被觸動、帶著安靜的希望，而不是被擊垮。",
        ],
      },
    },
    endingTone: {
      en: "Bittersweet at 89 confidence. Loss is real throughout — exile, betrayal, a mother's fear for her child — but the ending gives Circe something she keeps and lives with: a future she chose. That balance is the definition of bittersweet in our taxonomy. Compared with The Song of Achilles (BE), the final pages are warm.",
      zh: "Bittersweet，信心 89 分。全書的失去都是真實的——流放、背叛、一個母親對孩子的恐懼——但結局給了瑟西一樣她能留住、能帶著活下去的東西：一個她自己選擇的未來。這種平衡，正是本站對苦甜結局的定義。和《阿基里斯之歌》（BE）相比，這本最後幾頁是溫暖的。",
    },
    warningsExplained: {
      en: "Sexual violence (high): there is one assault scene in the middle of the book. It is not drawn out or graphic, but it is clear, and its aftermath shapes Circe's choices for a long stretch. Readers who avoid this content entirely should know it is not skippable in meaning, though the scene itself is brief. Grief (mid): losses accumulate over centuries, and there is sustained fear for a child. Mythological violence and monsters appear but are not dwelt on.",
      zh: "性暴力（高強度）：書中段有一場侵害情節。描寫不冗長也不露骨，但意思很明確，而且之後很長一段時間都影響著瑟西的選擇。若你完全迴避此類內容，請知道這段在意義上無法略過，雖然場景本身很短。悲痛（中強度）：數百年間的失去不斷累積，也有長期對孩子安危的恐懼。神話中的暴力與怪物會出現，但不會久留。",
    },
    verdict: {
      en: "Read — with one caution. It is one of the most rewarding mythology retellings for readers who want character over spectacle. Note the sexual-violence scene before you start; if that is a hard limit, skip it.",
      zh: "值得讀——但有一項提醒。對重視人物勝過場面的讀者而言，這是最值得的神話重述之一。開讀前請先留意那段性暴力情節；如果那是你的底線，請跳過。",
    },
    whoFor: {
      en: ["Mythology retelling fans", "Readers who love slow, character-driven growth", "Anyone who wants a gentler follow-up to The Song of Achilles", "People drawn to themes of choice and mortality"],
      zh: ["神話重述愛好者", "喜歡緩慢、以人物成長為主的讀者", "想在《阿基里斯之歌》後讀本溫和一點的人", "對選擇與有限生命主題有共鳴的人"],
    },
    whoNot: {
      en: ["Readers for whom sexual violence is a hard limit", "People who want fast, action-led plotting", "Readers expecting a romance-first story", "Anyone wanting a straight Homer retelling"],
      zh: ["性暴力是底線的讀者", "想要快節奏、以動作推進情節的人", "期待以愛情為主軸的讀者", "想看忠實荷馬史詩改編的人"],
    },
    similarByEnding: ["piranesi", "norwegian-wood"],
    similarByWarning: ["the-song-of-achilles", "lessons-in-chemistry"],
    relatedLinks: [
      { path: "/endings/Bittersweet", label: { en: "More bittersweet endings", zh: "更多苦甜結局" } },
      { path: "/warnings/sexual-violence", label: { en: "Books with sexual violence warnings", zh: "含性暴力的避雷清單" } },
      { path: "/authors/madeline-miller", label: { en: "Madeline Miller: ending guide", zh: "瑪德琳・米勒作品結局導覽" } },
      { path: "/book/the-song-of-achilles", label: { en: "The Song of Achilles: ending and warnings", zh: "《阿基里斯之歌》結局與避雷" } },
    ],
    fullSpoiler: {
      summary: { en: "Full spoilers — Circe's final choice (click to expand)", zh: "完整劇透——瑟西最後的選擇（點擊展開）" },
      body: {
        en: [
          "Spoilers from here. After protecting her son and seeing him leave to find his own life, Circe uses her craft to give up her divinity and become mortal.",
          "She chooses an ordinary, finite life with someone she loves, accepting that she will age and die. The novel ends with her looking forward to that life — the bitterness is what she has lost and will lose; the sweetness is that, for the first time, the story is entirely her own.",
        ],
        zh: [
          "以下為劇透。在保護了兒子、並目送他離開去尋找自己的人生之後，瑟西運用她的巫術放棄神性，成為凡人。",
          "她選擇與所愛之人共度平凡而有限的一生，接受自己會老去、會死亡。小說在她期待那段人生的時刻結束——苦，是她已失去與將失去的；甜，是這個故事第一次完全屬於她自己。",
        ],
      },
    },
    faq: [
      { q: { en: "Does Circe have a happy ending?", zh: "《瑟西》是 HE 嗎？" }, a: { en: "Mostly happy, but we classify it Bittersweet at 89 confidence because her final choice comes with a real, permanent cost.", zh: "大致偏向美好，但本站標為 Bittersweet、信心 89 分，因為她最後的選擇帶有真實而永久的代價。" } },
      { q: { en: "Is Circe sadder than The Song of Achilles?", zh: "《瑟西》比《阿基里斯之歌》更悲傷嗎？" }, a: { en: "No. Achilles is BE; Circe ends on hope and choice. Most readers find Circe's ending far gentler.", zh: "不會。《阿基里斯之歌》是 BE，《瑟西》以希望與選擇收尾，多數讀者覺得溫和得多。" } },
      { q: { en: "What does Circe's ending mean?", zh: "《瑟西》的結局代表什麼？" }, a: { en: "It is about choosing a meaningful, limited life over an endless, empty one — and about finally authoring her own story.", zh: "它關於選擇有意義而有限的人生，而不是無盡卻空洞的存在——也關於她終於成為自己故事的作者。" } },
      { q: { en: "How graphic is the sexual violence?", zh: "性暴力描寫有多露骨？" }, a: { en: "Brief and not graphic, but unambiguous. We tag it high because of its impact on the story, not its explicitness.", zh: "篇幅短也不露骨，但意思明確。本站標為高強度，是因為它對故事的影響，而非描寫程度。" } },
      { q: { en: "Do I need to know Greek mythology first?", zh: "需要先懂希臘神話嗎？" }, a: { en: "No. The book introduces every figure it uses; prior knowledge just adds recognition.", zh: "不需要。書中會介紹每一位出場人物，事先了解只會多一點「認出來」的樂趣。" } },
      { q: { en: "Is Circe slow?", zh: "《瑟西》節奏很慢嗎？" }, a: { en: "It is measured and spans centuries. Readers who want constant action may find the middle long.", zh: "節奏穩定且橫跨數百年，想要持續動作場面的讀者可能會覺得中段偏長。" } },
    ],
  },

  // ================================================== The Silent Patient ==
  "the-silent-patient": {
    seo: {
      en: {
        title: "The Silent Patient Ending Explained: The Twist, Spoiler-Layered | NovelCheck",
        desc: "How does The Silent Patient end, and is it a sad ending? Spoiler-free answer first, why we classify it BE, violence and suicide warnings, then the twist folded away.",
        h1: "The Silent Patient Ending Explained (Twist Folded Below)",
        intro: "Alex Michaelides's The Silent Patient is built around one late twist, so this page protects it carefully. Spoiler-free answer: it does not end happily, and we classify it as BE at 86 confidence. Below you get why the ending is filed as sad rather than satisfying, what readers usually want clarified after finishing, the violence and suicide warnings handled without detail, and the full twist explanation folded at the bottom.",
      },
      zh: {
        title: "《沉默的病人》結局解析：反轉分層說明、無雷判斷與避雷 | 讀前決策站",
        desc: "《沉默的病人》結局是什麼？是悲劇嗎？先看無雷答案與 BE 分類理由，再看暴力與自殺警示；反轉解析預設折疊。",
        h1: "《沉默的病人》結局解析（反轉收在下方）",
        intro: "艾力克斯・麥可利迪斯的《沉默的病人》整本書都押在最後一個反轉上，所以本頁會小心保護它。無雷答案：結局並不圓滿，本站標為 BE、信心 86 分。以下說明為什麼它被歸為悲劇而非「爽快」結局、讀者讀完最常想釐清的問題、以不描述細節的方式處理暴力與自殺警示，最後才是預設折疊的完整反轉解析。",
      },
    },
    endingMeaning: {
      heading: { en: "What readers want clarified after finishing", zh: "讀完之後，讀者最想釐清的事" },
      body: {
        en: [
          "The setup is a locked box: a celebrated painter is found with her husband dead, and she never speaks again. A psychotherapist becomes obsessed with getting her to talk, and the novel alternates between his account and her diary. For most of the book, you think you are reading a mystery about her.",
          "The ending changes what kind of book it was. Without giving it away: the twist depends on time and perspective, and it rewards readers who notice how the two narratives fit together. Many people finish it and immediately flip back to check whether the clues were fair. In our view they mostly are, though some readers feel the structure withholds more than it plants.",
          "We classify it BE rather than a satisfying 'case closed' because the resolution does not restore anything. The truth comes out, but the people at the centre are left broken or worse, and the final note is bleak rather than cathartic. If you like your thrillers to end with justice delivered and a sense of relief, this one deliberately withholds that.",
        ],
        zh: [
          "設定像一個上鎖的盒子：一位知名畫家被發現時丈夫已死，從此她不再開口。一位心理治療師執著地想讓她說話，小說在他的敘述與她的日記之間來回切換。大半本書裡，你都以為自己在讀一個「關於她」的謎。",
          "結局改變了這本書的類型。不劇透地說：反轉取決於時間與視角，會回報那些留意兩條敘事如何拼合的讀者。很多人一讀完就翻回前面，確認線索是不是公平。本站認為大致公平，不過也有讀者覺得這個結構「藏」的比「埋」的多。",
          "本站把它歸為 BE，而不是讓人鬆一口氣的「破案」結局，因為真相揭曉並沒有修復任何東西。真相雖然水落石出，但故事中心的人物不是崩潰就是更糟，最後的基調是蒼涼而非宣洩。如果你喜歡懸疑小說以「正義得到伸張」作結、讀完能鬆一口氣，這本刻意不給你那種感覺。",
        ],
      },
    },
    endingTone: {
      en: "BE at 86 confidence. The twist explains the mystery, but the outcome for the central characters is loss and harm rather than recovery. It is not ambiguous — the book tells you what happened — which is why we do not file it under Ambiguous. The emotional aftertaste is cold and unsettling.",
      zh: "BE，信心 86 分。反轉解開了謎題，但核心人物的結果是失去與傷害，而非復原。它並不曖昧——書中清楚交代了發生什麼事——所以本站不把它歸在 Ambiguous。讀完的餘韻是冰冷而令人不安的。",
    },
    warningsExplained: {
      en: "Violence (mid): a killing sits at the heart of the plot and is revisited from different angles, without lingering gore. Suicide (mid): suicidal thoughts and past attempts are part of characters' histories and the psychiatric setting; they are referenced rather than depicted step by step, and we do not describe them here. The book also includes psychological manipulation, obsession and a secure psychiatric unit setting. If suicide-related content is difficult for you right now, consider waiting — and if you are struggling, please reach out to a local crisis line.",
      zh: "暴力（中強度）：情節核心是一樁命案，會從不同角度反覆回顧，但不停留在血腥畫面。自殺（中強度）：自殺念頭與過去的嘗試是角色背景與精神醫療場景的一部分，書中以提及為主，並未逐步呈現，本站在此也不描述細節。此外書中有心理操控、偏執，以及封閉式精神病院的場景。若自殺相關內容目前對你來說很難承受，可以先暫緩；如果你正處於困難中，請聯繫當地的心理支持或危機專線。",
    },
    verdict: {
      en: "Read, if you enjoy twist-driven psychological thrillers and can tolerate a bleak finish. Go in as unspoiled as possible. Skip it if unreliable narration annoys you or suicide-related themes are hard for you at the moment.",
      zh: "值得讀——前提是你喜歡以反轉為核心的心理驚悚，並能接受蒼涼的收尾。盡量在不被劇透的狀態下開讀。如果你討厭不可靠敘事，或目前對自殺相關主題比較難承受，建議跳過。",
    },
    whoFor: {
      en: ["Readers who love a single big twist", "Fans of fast psychological thrillers", "People who enjoy re-reading for clues", "Readers fine with a bleak resolution"],
      zh: ["喜歡一個大反轉的讀者", "快節奏心理驚悚愛好者", "享受回頭找線索的人", "能接受蒼涼結局的讀者"],
    },
    whoNot: {
      en: ["Readers who dislike unreliable narration", "People who need justice and relief at the end", "Anyone finding suicide themes hard right now", "Readers who have already been spoiled on the twist"],
      zh: ["討厭不可靠敘事的讀者", "需要結局伸張正義、讓人鬆口氣的人", "目前難以承受自殺主題的人", "已經被劇透反轉的讀者"],
    },
    similarByEnding: ["no-longer-human", "the-song-of-achilles"],
    similarByWarning: ["gone-girl"],
    relatedLinks: [
      { path: "/endings/BE", label: { en: "More BE (sad) endings", zh: "更多 BE 悲劇結局" } },
      { path: "/warnings/suicide", label: { en: "Books with suicide warnings (safety-aware guide)", zh: "含自殺情節的避雷指南" } },
      { path: "/book/gone-girl", label: { en: "Gone Girl: ending and warnings", zh: "《控制》的結局與避雷" } },
      { path: "/books", label: { en: "Browse all books", zh: "瀏覽全部作品" } },
    ],
    fullSpoiler: {
      summary: { en: "Full spoilers — The Silent Patient twist explained (click to expand)", zh: "完整劇透——《沉默的病人》反轉解析（點擊展開）" },
      body: {
        en: [
          "Spoilers from here. Theo is the hidden cause of the tragedy; his link to Alicia's past is the twist. His storyline and her diary are not happening at the same time — his account of his own marriage takes place earlier, and it is what led him to Alicia's house before the killing.",
          "By the end Alicia's diary exposes Theo's role, and the police learn the truth. Alicia herself does not recover; she is left in a worse state, and the novel closes on Theo's guilt rather than on any healing — the reason we classify it BE.",
        ],
        zh: [
          "以下為劇透。席歐才是引發悲劇的隱藏源頭，他與艾莉西亞過去的關聯正是全書的反轉。他的故事線與她的日記並不是同時發生的——他講述自己婚姻的那段時間更早，而正是那段經歷，讓他在命案發生前就去過艾莉西亞的家。",
          "結局時，艾莉西亞的日記揭露了席歐的角色，警方得知真相。艾莉西亞本人並沒有康復，而是陷入更糟的狀態，小說以席歐的罪責而非任何療癒作結——這就是本站標為 BE 的原因。",
        ],
      },
    },
    faq: [
      { q: { en: "How does The Silent Patient end, without spoilers?", zh: "不劇透的話，《沉默的病人》怎麼結束？" }, a: { en: "With a twist that reframes the whole book and a bleak outcome for the main characters. The detail is folded on this page.", zh: "以一個翻轉全書的反轉作結，主要角色的結局蒼涼。細節收在本頁折疊區。" } },
      { q: { en: "Is The Silent Patient a sad ending?", zh: "《沉默的病人》是悲劇結局嗎？" }, a: { en: "Yes — BE at 86 confidence. The truth comes out, but nothing is repaired.", zh: "是，本站標為 BE、信心 86 分。真相雖然揭曉，但沒有任何事被修復。" } },
      { q: { en: "Is the ending ambiguous?", zh: "結局是曖昧的嗎？" }, a: { en: "No. Unlike Verity, the book tells you what happened. The debate is about whether the twist was fairly clued, not what it means.", zh: "不是。不同於《真相》，這本書清楚告訴你發生了什麼；讀者爭論的是線索是否公平，而不是結局的意義。" } },
      { q: { en: "Was Alicia framed?", zh: "艾莉西亞是被陷害的嗎？" }, a: { en: "That is not how we would describe it. The twist concerns Theo's hidden role and connection to her past; see the folded spoilers.", zh: "本站不會這樣描述。反轉關乎席歐隱藏的角色與他和她過去的關聯，詳見折疊劇透。" } },
      { q: { en: "How is suicide handled?", zh: "自殺題材是怎麼處理的？" }, a: { en: "As part of characters' histories and the psychiatric setting, referenced rather than depicted in detail. We tag it mid intensity.", zh: "作為角色背景與精神醫療場景的一部分，以提及為主，沒有細節呈現。本站標為中強度。" } },
      { q: { en: "Should I avoid spoilers before reading?", zh: "開讀前應該避開劇透嗎？" }, a: { en: "Strongly yes. The book's main pleasure is the reveal; reading the full spoiler first removes most of it.", zh: "非常建議。這本書最大的樂趣就是揭曉那一刻，先看完整劇透會失去大半樂趣。" } },
    ],
  },
};
