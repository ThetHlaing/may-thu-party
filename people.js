// ─────────────────────────────────────────────────────────────
//  PEOPLE — the participants. Edit names and photos here.
// ─────────────────────────────────────────────────────────────
//
//  name  : shown under the photo and in the score table
//  photo : path to an image in the photos/ folder
//          leave as "" to show a coloured circle with initials instead
//
window.PEOPLE = [
  { name: "Khine Zar",        photo: "photos/p1.jpg"  },
  { name: "Su Su",            photo: "photos/p2.jpg"  },
  { name: "Phway Phway",      photo: "photos/p3.jpg"  },
  { name: "Myint Myat",       photo: "photos/p4.jpg"  },
  { name: "Htet Myat Hlaing", photo: "photos/p5.jpg"  },
  { name: "Aung Kaung",       photo: "photos/p7.jpg"  },
  { name: "Pyo Marn Thit",    photo: "photos/p8.jpg"  },
  { name: "Thel Thel",        photo: "photos/p9.jpg"  },
  { name: "Su Wai",           photo: "photos/p10.jpg" },
];

// ─────────────────────────────────────────────────────────────
//  TEAMS — prizes are given per couple. Marks are still given to
//  each player; a team's score is the sum of its members' marks
//  multiplied by `multiplier` (default 1). Khine Zar plays solo,
//  so her mark is doubled.
// ─────────────────────────────────────────────────────────────
window.TEAMS = [
  { members: ["Su Su", "Pyo Marn Thit"] },
  { members: ["Phway Phway", "Aung Kaung"] },
  { members: ["Thel Thel", "Htet Myat Hlaing"] },
  { members: ["Su Wai", "Myint Myat"] },
  { members: ["Khine Zar"], multiplier: 2 },
];

// Cover image shown on the intro screen
window.COVER_IMAGE = "photos/cover.jpg";
