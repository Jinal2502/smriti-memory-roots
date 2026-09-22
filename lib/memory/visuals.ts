/** Local demonstration imagery. Wikimedia Commons photographs of Assam / Northeast India. */
export const visuals = {
  anima: "/images/people/anima.jpg",
  motherSon: "/images/assam/mother-son.jpg",
  teaGarden: "/images/assam/tea-garden.jpg",
  brahmaputra: "/images/assam/brahmaputra.jpg",
  bihu: "/images/assam/bihu.jpg",
  couple: "/images/assam/couple.jpg",
  gamosa: "/images/assam/gamosa.jpg",
  pitha: "/images/assam/pitha.jpg",
  elderMan: "/images/people/elder-man.jpg",
} as const;

export const themeVisuals: Record<string, string> = {
  family: visuals.motherSon,
  place: visuals.brahmaputra,
  food: visuals.pitha,
  music: visuals.bihu,
  festival: visuals.bihu,
  routine: visuals.gamosa,
  drink: visuals.teaGarden,
  object: visuals.gamosa,
  stories: visuals.motherSon,
  everyday: visuals.teaGarden,
};

export function visualForCategory(category: string, title = "") {
  const haystack = `${category} ${title}`.toLowerCase();
  if (haystack.includes("brahmaputra") || haystack.includes("river")) return visuals.brahmaputra;
  if (haystack.includes("tea garden") || haystack.includes("tea")) return visuals.teaGarden;
  if (haystack.includes("bihu") || haystack.includes("festival") || haystack.includes("music")) return visuals.bihu;
  if (haystack.includes("gamosa") || haystack.includes("object")) return visuals.gamosa;
  if (haystack.includes("pitha") || haystack.includes("food") || haystack.includes("khar") || haystack.includes("tenga")) {
    return visuals.pitha;
  }
  if (haystack.includes("family") || haystack.includes("rohan") || haystack.includes("arun") || haystack.includes("mitali")) {
    return visuals.motherSon;
  }
  if (haystack.includes("place") || haystack.includes("home")) return visuals.brahmaputra;
  return themeVisuals[category] || visuals.teaGarden;
}
