// ─────────────────────────────────────────────────────────────
//  GAMES DATA — edit this file to change game titles / details
// ─────────────────────────────────────────────────────────────
//
//  type: "quiz"   → shows ONE question at a time with options (tap an option to highlight it)
//  type: "steps"  → shows one item per click (Parcel game). `seconds` adds a countdown.
//  type: "title"  → shows only the title (and optional `note`)
//
window.GAMES = [
  {
    id: 1,
    title: "Who knows May Thu the best?",
    subtitle: "မေသူကို အသိဆုံး ဘယ်သူလဲ",
    emoji: "🧠",
    type: "quiz",
    questions: [
      {
        q: "မေသူ အကြိုက်ဆုံး အရောင်",
        options: ["အဖြူ", "အမဲ", "အပြာ"],
      },
      {
        q: "မေသူအကြိုက်ဆုံး မြန်မာအစားအစာ",
        options: ["မုန့်ဟင်းခါး", "လက်ဖက်သုပ်", "နန်းကြီးသုပ်"],
      },
      {
        q: "အကြိုက်ဆုံး ကိုရီးယားမင်းသား",
        options: ["ဝမ်ဘင်း", "လီမင်ဟို", "လီဒေါင်ဝတ်"],
      },
      {
        q: "အကြိုက်ဆုံး ရာသီဥတု",
        options: ["နွေ", "မိုး", "ဆောင်း"],
      },
      {
        q: "အကြိုက်ဆုံး သောက်စရာ",
        options: ["ကော်ဖီ", "ရေနွေးကြမ်း", "လက်ဖက်ရည်"],
      },
    ],
  },
  {
    id: 2,
    title: "Parcel Game",
    subtitle: "ပါဆယ်ဂိမ်း",
    emoji: "🎁",
    type: "steps",
    steps: [
      { text: "အိုပါ ဂန်းနမ်းစတိုင် ကပြပါ", seconds: 15 },
      { text: "ကိုယ့်ပါတနာကို ကိုယ်ချီပြပါ", seconds: 15, note: "(ခိုင်ဇာဆို မမေသူကို ချီ)" },
      { text: "Jumping jack ၁၀ ခါ လုပ်ပါ", note: "၃ မှတ်" },
    ],
  },
  {
    id: 3,
    title: "သီချင်းနာမည်ခန့်မှန်းပါ",
    subtitle: "Guess the song",
    emoji: "🎵",
    type: "title",
  },
  {
    id: 4,
    title: "Guess who has the worst drawing",
    subtitle: "ပုံဆွဲ အညံ့ဆုံးဘယ်သူလည်း",
    emoji: "🎨",
    type: "title",
  },
  {
    id: 5,
    title: "အဖွဲ့နဲ့ ပတ်သတ်တဲ့ အမှတ်တရ",
    subtitle: "Memories with the group",
    emoji: "💛",
    type: "title",
  },
];
