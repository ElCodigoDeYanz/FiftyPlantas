export type Plant = {
  id: string;
  name: string;
  scientific: string;
  aliases: string[];
  light: "adaptable" | "indirecta";
  water: "espaciado" | "moderado";
  summary: string;
  lightText: string;
  waterText: string;
  tip: string;
  petRisk: "toxic" | "non-toxic";
  petText: string;
  careSource: string;
  petSource: string;
  reviewedAt: string;
  art: string;
};
export const plants: readonly Plant[] = [
  {
    id: "cinta",
    name: "Cinta",
    scientific: "Chlorophytum comosum",
    aliases: ["malamadre", "planta araña", "spider plant"],
    light: "adaptable",
    water: "moderado",
    summary:
      "Hojas que caen en forma de fuente y pequeñas plantas que aparecen en sus tallos.",
    lightText:
      "Se adapta a distintas condiciones de luz interior; evita una exposición que queme las hojas.",
    waterText:
      "Riega observando el sustrato y permite que drene. Evita mantener la maceta en tierra encharcada.",
    tip: "Los hijuelos permiten obtener nuevas plantas. Consulta la guía antes de separarlos.",
    petRisk: "non-toxic",
    petText:
      "La ASPCA la clasifica como no tóxica para gatos y perros. Esa clasificación no convierte la planta en alimento ni sustituye una consulta veterinaria.",
    careSource: "https://www.rhs.org.uk/plants/spider-plants/growing-guide",
    petSource:
      "https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/spider-plant",
    reviewedAt: "2026-10-29",
    art: "cinta",
  },
  {
    id: "sansevieria",
    name: "Sansevieria",
    scientific: "Sansevieria trifasciata",
    aliases: ["lengua de suegra", "snake plant"],
    light: "adaptable",
    water: "espaciado",
    summary:
      "Hojas verticales y resistentes para dar una estructura tranquila a un rincón interior.",
    lightText:
      "Tolera distintos niveles de luz y suele crecer mejor en lugares más luminosos.",
    waterText:
      "Deja secar el sustrato entre riegos. Su tolerancia a la sequía no la protege del exceso de agua.",
    tip: "Usa una maceta con drenaje y evita humedad permanente en las raíces. Nombre botánico según las fuentes enlazadas.",
    petRisk: "toxic",
    petText:
      "La ASPCA la clasifica como tóxica para gatos y perros. Mantén la planta fuera de su alcance.",
    careSource: "https://www.rhs.org.uk/plants/sansevieria",
    petSource:
      "https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/snake-plant",
    reviewedAt: "2026-10-29",
    art: "sansevieria",
  },
  {
    id: "monstera",
    name: "Monstera",
    scientific: "Monstera deliciosa",
    aliases: ["costilla de adán", "swiss cheese plant"],
    light: "indirecta",
    water: "moderado",
    summary:
      "Hojas amplias con aberturas características que cambian a medida que la planta crece.",
    lightText:
      "Prefiere luz brillante e indirecta. El sol directo intenso puede dañar las hojas.",
    waterText:
      "Deja que el sustrato se acerque a seco antes de regar a fondo y retirar el agua sobrante.",
    tip: "Necesita espacio al crecer. La guía considera condiciones de interior cálidas y una humedad ambiental adecuada.",
    petRisk: "toxic",
    petText:
      "La ASPCA la clasifica como tóxica para gatos y perros. Evita que muerdan sus hojas o tallos.",
    careSource: "https://www.rhs.org.uk/plants/swiss-cheese-plants",
    petSource:
      "https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/swiss-cheese-plant",
    reviewedAt: "2026-10-29",
    art: "monstera",
  },
  {
    id: "pothos",
    name: "Pothos",
    scientific: "Epipremnum aureum",
    aliases: ["poto", "potus", "golden pothos", "hiedra del diablo"],
    light: "indirecta",
    water: "moderado",
    summary:
      "Tallos que cuelgan o trepan y hojas acorazonadas, a menudo con matices claros.",
    lightText:
      "Prefiere luz brillante sin sol directo y tolera algo de sombra. Evita la oscuridad profunda.",
    waterText:
      "Riega de forma moderada, con buen drenaje, evitando que el sustrato permanezca saturado.",
    tip: "Puede colgar o apoyarse en un tutor. Usa guantes al manipularla y consulta las precauciones de la fuente.",
    petRisk: "toxic",
    petText:
      "La ASPCA la clasifica como tóxica para gatos y perros. No permitas que ingieran hojas ni tallos.",
    careSource: "https://www.rhs.org.uk/plants/epipremnum/growing-guide",
    petSource:
      "https://www.aspca.org/pet-care/aspca-poison-control/toxic-and-non-toxic-plants/golden-pothos",
    reviewedAt: "2026-10-29",
    art: "pothos",
  },
];
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();
}
export type Filters = {
  query: string;
  light: string;
  water: string;
  onlyFavorites: boolean;
  favorites: ReadonlySet<string>;
};
export function filterPlants(filters: Filters): Plant[] {
  const query = normalize(filters.query.slice(0, 100));
  return plants.filter(
    (p) =>
      (!query ||
        normalize([p.name, p.scientific, ...p.aliases].join(" ")).includes(
          query,
        )) &&
      (!filters.light || p.light === filters.light) &&
      (!filters.water || p.water === filters.water) &&
      (!filters.onlyFavorites || filters.favorites.has(p.id)),
  );
}
