export const categories = [
  { id: "postres", label: "Postres" },
  { id: "cafe", label: "Café" },
  { id: "panaderia", label: "Panadería" },
  { id: "comida", label: "Comida" },
  { id: "bebidas", label: "Bebidas" },
  { id: "juegos", label: "Juegos" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type Status = "abierto" | "limitado" | "cerrado";

export interface MenuItem {
  name: string;
  desc: string;
  price?: number;
}

export interface Place {
  slug: string;
  name: string;
  tagline: string;
  category: CategoryId;
  barrio: string;
  address: string;
  lat?: number;
  lng?: number;
  coordsApproximate?: boolean;
  instagram?: string;
  whatsapp?: string;
  phone?: string;
  website?: string;
  status: Status;
  photo: string;
  photoAlt: string;
  menu: MenuItem[];
  menuNote?: string;
}

export const places: Place[] = [
  {
    slug: "diletto-pasticceria",
    name: "Diletto Pasticceria",
    tagline: "Alfajores artesanales",
    category: "postres",
    barrio: "Ciudad Jardín",
    address: "Cra. 105 #13a-14, Ciudad Jardín. También en Chipichape.",
    lat: 3.3502,
    lng: -76.5314,
    coordsApproximate: true,
    instagram: "dilettopasticceria",
    whatsapp: "573189042474",
    status: "abierto",
    photo: "/places/diletto-pasticceria.jpg",
    photoAlt: "Alfajores de cacao bañados en chocolate con dulce de leche",
    menuNote: "Precios de Rappi, sede Ciudad Jardín.",
    menu: [
      {
        name: "Cuchareable Leche Klim",
        desc: "200 g: crema de vainilla, pastelera y topping de Klim.",
        price: 16000,
      },
      {
        name: "Cuchareable cheesecake de maracuyá",
        desc: "Crema ácida de maracuyá, galleta de cacao y mermelada.",
        price: 16000,
      },
      {
        name: "Cuchareable cheesecake de Oreo",
        desc: "Crema de Oreo sobre galleta de alfajor.",
        price: 16000,
      },
      {
        name: "Cuchareable Milo",
        desc: "Capas de Milo, galleta Diletto y pastelera.",
        price: 16000,
      },
      {
        name: "Cuchareable cheesecake de limón",
        desc: "Crema de limón y galleta de alfajor.",
        price: 16000,
      },
      {
        name: "Cuchareable lulada",
        desc: "Lulo, leche condensada y galleta de cacao.",
        price: 16000,
      },
      {
        name: "Cajita Volumen",
        desc: "Colección intermedia de alfajores para regalar o tardear.",
        price: 55000,
      },
      {
        name: "Sixtina · 16 clásicos de 35 g",
        desc: "Dos galletas de cacao, el relleno que elijas, baño de chocolate.",
        price: 90000,
      },
    ],
  },
  {
    slug: "cafe-obraje",
    name: "Café Obraje",
    tagline: "Café de Nariño en Ciudad Jardín",
    category: "cafe",
    barrio: "Ciudad Jardín",
    address: "La Leyenda Mall, Cl. 14 #104-30, local 20B",
    lat: 3.3505,
    lng: -76.5316,
    instagram: "cafeobrajecali",
    website: "https://www.cafeobrajecali.com",
    status: "abierto",
    photo: "/places/cafe-obraje.jpg",
    photoAlt: "Latte con arte en taza de cerámica",
    menuNote: "Carta de especialidad; pide el precio del día en el local.",
    menu: [
      { name: "Espresso", desc: "Shot corto de café de Nariño." },
      { name: "Latte", desc: "Espresso con leche texturizada." },
      { name: "Americano", desc: "Espresso alargado." },
      { name: "Filtrado", desc: "Método del día, grano de origen." },
      { name: "Torta de la casa", desc: "Porción para acompañar el café." },
    ],
  },
  {
    slug: "quintapan",
    name: "Quintapán",
    tagline: "Panadería de San Fernando, 32 años",
    category: "panaderia",
    barrio: "San Fernando",
    address: "Calle 5 con carrera 42, San Fernando / Tequendama",
    lat: 3.4296,
    lng: -76.5422,
    coordsApproximate: true,
    status: "cerrado",
    photo: "/places/quintapan.jpg",
    photoAlt: "Pandebonos calientes con mantequilla",
    menuNote: "Hoy no están atendiendo. Esto es lo que horneaban.",
    menu: [
      { name: "Pandebono", desc: "Recién salido, con queso." },
      { name: "Pan de yuca", desc: "Dorado, para el tinto de la mañana." },
      { name: "Pan tajado", desc: "El de siempre, para la casa." },
      { name: "Galletas de la casa", desc: "Las que se llevaban los vecinos." },
    ],
  },
  {
    slug: "friz-froz-fruz",
    name: "Friz Froz Fruz",
    tagline: "Ludoteca y juegos de mesa",
    category: "juegos",
    barrio: "Santa Anita",
    address: "Calle 12A #56-04, local 103",
    lat: 3.4114,
    lng: -76.5448,
    instagram: "frizfrozfruz",
    phone: "3136558854",
    website: "https://frizfrozfruz.com",
    status: "abierto",
    photo: "/places/friz-froz-fruz.jpg",
    photoAlt: "Mesa armada con un juego de mesa",
    menuNote: "Pide tarifas de renta y stock por WhatsApp o en la web.",
    menu: [
      { name: "Renta de juegos", desc: "Prueba mecánicas antes de comprar." },
      { name: "Ludoteca", desc: "Mesa, fichas y la tarde completa." },
      { name: "Tienda", desc: "Cajas nuevas, envíos en Colombia." },
      { name: "Plan en grupo", desc: "Cumpleaños o tarde de mesa." },
    ],
  },
  {
    slug: "fabrica-emilitas",
    name: "Fábrica Emilitas Postres",
    tagline: "Merengones y postres de comuna 19",
    category: "postres",
    barrio: "Camino Real",
    address: "Carrera 50 con calle 9, Camino Real",
    lat: 3.4108,
    lng: -76.541,
    instagram: "fabricaemilitaspostres",
    phone: "3058150947",
    status: "abierto",
    photo: "/places/fabrica-emilitas.jpg",
    photoAlt: "Merengón con crema, fresa y maracuyá",
    menuNote: "Clásicos de la casa; confirma porción y precio al pedir.",
    menu: [
      { name: "Merengón", desc: "El de siempre, con fruta y crema." },
      { name: "Obleas", desc: "Arequipe, queso y salsa." },
      { name: "Postre de Milo", desc: "Frío, de cuchara." },
      { name: "Carlota de arequipe", desc: "Capas de galleta y manjar." },
      { name: "Genovesa", desc: "Bizcocho y crema, porción." },
      { name: "Torta del día", desc: "Pregunta el sabor que salió hoy." },
    ],
  },
  {
    slug: "asados-al-carbon",
    name: "Asados al Carbón",
    tagline: "Almuerzo en el centro",
    category: "comida",
    barrio: "Centro",
    address: "Carrera 4 #10-01, esquina calle 10",
    lat: 3.4509,
    lng: -76.5334,
    instagram: "asadosalcarbonoficial",
    whatsapp: "573013519337",
    phone: "6028808853",
    status: "abierto",
    photo: "/places/asados-al-carbon.jpg",
    photoAlt: "Carne y chorizo a la parrilla con chimichurri",
    menuNote: "Almuerzo de centro. Pide el ejecutivo del día por WhatsApp.",
    menu: [
      { name: "Almuerzo ejecutivo", desc: "El del día: sopa, seco, jugo." },
      { name: "Punta de anca", desc: "A la parrilla, con papa y ensalada." },
      { name: "Churrasco", desc: "Corte a la brasa con chimichurri." },
      { name: "Especial 4 carnes", desc: "Para compartir." },
      { name: "Lengua a la parrilla", desc: "La que piden los de siempre." },
    ],
  },
  {
    slug: "ac-to-go",
    name: "AC To Go",
    tagline: "Almuerzo rápido en el centro",
    category: "comida",
    barrio: "Centro",
    address: "Carrera 4 #9-55",
    lat: 3.4513,
    lng: -76.5335,
    instagram: "actogofood",
    status: "abierto",
    photo: "/places/ac-to-go.jpg",
    photoAlt: "Bandeja de almuerzo con pollo, arroz, ensalada y maduro",
    menuNote: "Precio del buffet publicado por el local.",
    menu: [
      {
        name: "Arma tu plato",
        desc: "Ensalada, dos proteínas, un carbohidrato y bebida. Comes ahí o lo empacas.",
        price: 23900,
      },
      { name: "Menú del día", desc: "Cambia todos los días. Pregunta al llegar." },
    ],
  },
  {
    slug: "arepas-de-la-abuela",
    name: "Arepas de la Abuela",
    tagline: "Ajiaco, frijolada y arepa",
    category: "comida",
    barrio: "Santa Anita",
    address: "Calle 12A #56-04, local 106, edificio La Verdy",
    lat: 3.4115,
    lng: -76.5449,
    instagram: "arepasdelaabuela.cali",
    phone: "3154043310",
    status: "abierto",
    photo: "/places/arepas-de-la-abuela.jpg",
    photoAlt: "Arepa de queso y ajiaco en cazuela",
    menuNote: "Cocina casera. Confirma el plato del día al llamar.",
    menu: [
      { name: "Ajiaco", desc: "Papa, mazorca, pollo y crema." },
      { name: "Frijolada", desc: "La de olla, para almorzar sin apuro." },
      { name: "Bandeja paisa", desc: "Completa, porción generosa." },
      { name: "Mondongo", desc: "El de los viernes, si sale." },
      { name: "Arepa con queso", desc: "Para picar o llevar." },
    ],
  },
  {
    slug: "mangos",
    name: "Mangos",
    tagline: "Frappés de maracumango",
    category: "bebidas",
    barrio: "Ciudad Pacífica",
    address: "Ciudad Pacífica, sur de Cali. Jueves a domingo y festivos, 3–9 p.m.",
    lat: 3.3235,
    lng: -76.5365,
    coordsApproximate: true,
    instagram: "mangoscol",
    whatsapp: "573176520661",
    status: "abierto",
    photo: "/places/mangos.jpg",
    photoAlt: "Frappé de mango y maracuyá con leche condensada",
    menuNote: "Jueves a domingo, 3 a 9 p.m. Pide domicilio al 317 652 0661.",
    menu: [
      { name: "Maracumango", desc: "Mango y maracuyá, el de la casa." },
      { name: "Maracululo", desc: "Maracuyá, lulo y un chorro de lechera." },
      { name: "Mango solo", desc: "Fruta, hielo, nada más." },
      { name: "Ñapa de lechera", desc: "Si te mojan la boca, pides otra." },
    ],
  },
  {
    slug: "caracola-repostera",
    name: "Caracola Repostera",
    tagline: "Repostería en Palmetto",
    category: "postres",
    barrio: "Palmetto",
    address: "Centro Comercial Palmetto Plaza, Calle 9 #48-51",
    lat: 3.4116,
    lng: -76.5402,
    coordsApproximate: true,
    instagram: "caracolarepostera",
    status: "abierto",
    photo: "/places/caracola-repostera.jpg",
    photoAlt: "Torta y tartaleta de frutas en vitrina",
    menuNote: "Vitrina del día en Palmetto. Pregunta porciones por Instagram.",
    menu: [
      { name: "Torta de la vitrina", desc: "Porción del sabor que salió hoy." },
      { name: "Tartaleta de frutas", desc: "Crema y fruta brillante." },
      { name: "Cupcakes", desc: "Para llevar de a uno o de a seis." },
      { name: "Pedidos especiales", desc: "Torta para fecha. Escríbeles con tiempo." },
    ],
  },
  {
    slug: "el-porteno",
    name: "El Porteño",
    tagline: "Cocina argentina",
    category: "comida",
    barrio: "Menga",
    address: "Calle 64 Norte #5BN-183, frente a PriceSmart",
    lat: 3.4912,
    lng: -76.5274,
    coordsApproximate: true,
    status: "abierto",
    photo: "/places/el-porteno.jpg",
    photoAlt: "Empanadas argentinas abiertas con chimichurri",
    menuNote: "Confirma carta y horarios antes de ir.",
    menu: [
      { name: "Empanada de carne", desc: "Jugo, huevo, aceituna." },
      { name: "Empanada de pollo", desc: "La otra que se acaba primero." },
      { name: "Empanada de queso", desc: "Simple, caliente." },
      { name: "Docena mixta", desc: "Para la casa o la oficina." },
    ],
  },
];

export function getPlace(slug: string) {
  return places.find((p) => p.slug === slug);
}

export const statusLabel: Record<Status, string> = {
  abierto: "Abierto",
  limitado: "Abierto",
  cerrado: "Hoy no atienden",
};

export const categoryColor: Record<CategoryId, string> = {
  postres: "#c41e3a",
  cafe: "#1f6b6e",
  panaderia: "#b45309",
  comida: "#0f3d2e",
  bebidas: "#d4a017",
  juegos: "#4338ca",
};

export function formatCop(price?: number) {
  if (price == null) return null;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function startingPrice(place: Place) {
  const prices = place.menu.map((item) => item.price).filter((n): n is number => n != null);
  if (!prices.length) return null;
  return Math.min(...prices);
}
