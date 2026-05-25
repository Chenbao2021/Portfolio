export interface Card {
  key: string;
  icon: string;
  colorKey: "yellow" | "blue" | "green" | "pink";
}

export const cards: Card[] = [
  { key: "whatIDo",   icon: "🔨", colorKey: "yellow" },
  { key: "learning",  icon: "📚", colorKey: "blue"   },
  { key: "care",      icon: "❤️",  colorKey: "green"  },
  { key: "think",     icon: "🧠", colorKey: "pink"   },
];
