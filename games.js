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
    // Each option can be a plain string, or an object with:
    //   text  : the label
    //   img   : a photo in photos/options/   (shown large above the label)
    //   emoji : an icon instead of a photo
    //   color : a CSS colour swatch instead of a photo
    questions: [
      {
        q: "မေသူ အကြိုက်ဆုံး အရောင်",
        options: [
          { text: "အဖြူ", color: "#ffffff" },
          { text: "အမဲ",  color: "#111111" },
          { text: "အပြာ", color: "#2b6cff" },
        ],
      },
      {
        q: "မေသူအကြိုက်ဆုံး မြန်မာအစားအစာ",
        options: [
          { text: "မုန့်ဟင်းခါး", img: "photos/options/mohinga.jpg" },
          { text: "လက်ဖက်သုပ်",  img: "photos/options/laphet.jpg" },
          { text: "နန်းကြီးသုပ်", img: "photos/options/nangyi.jpg" },
        ],
      },
      {
        q: "အကြိုက်ဆုံး ကိုရီးယားမင်းသား",
        options: [
          { text: "ဝမ်ဘင်း",    img: "photos/options/wonbin.jpg" },
          { text: "လီမင်ဟို",   img: "photos/options/leeminho.jpg" },
          { text: "လီဒေါင်ဝတ်", img: "photos/options/leedongwook.jpg" },
        ],
      },
      {
        q: "အကြိုက်ဆုံး ရာသီဥတု",
        options: [
          { text: "နွေ",    emoji: "☀️" },
          { text: "မိုး",   emoji: "🌧️" },
          { text: "ဆောင်း", emoji: "❄️" },
        ],
      },
      {
        q: "အကြိုက်ဆုံး သောက်စရာ",
        options: [
          { text: "ကော်ဖီ",      emoji: "☕" },
          { text: "ရေနွေးကြမ်း", emoji: "🍵" },
          { text: "လက်ဖက်ရည်",  emoji: "🧋" },
        ],
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
