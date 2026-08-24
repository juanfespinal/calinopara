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
  photo?: string;
}

export interface Place {
  slug: string;
  name: string;
  tagline: string;
  category: CategoryId;
  barrio: string;
  address: string;
  /** Set false when the business is operating only from a hidden kitchen or by delivery. */
  hasPhysicalLocation?: boolean;
  lat?: number;
  lng?: number;
  coordsApproximate?: boolean;
  instagram?: string;
  /** Instagram post/reel shortcode. Used for credits and as embed fallback when `video` is missing. */
  instagramPost?: string;
  /** Local file under /videos, e.g. `/videos/nanitos-burger.mp4`. Preferred over the Instagram embed. */
  video?: string;
  whatsapp?: string;
  phone?: string;
  website?: string;
  /** Catalog or checkout URL. Used by "Pedir ahora" when set. */
  orderUrl?: string;
  status: Status;
  photo: string;
  logo?: string;
  photoAlt: string;
  menu: MenuItem[];
  menuNote?: string;
}

export const places: Place[] = [
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
    logo: "/logos/cafe-obraje.jpg",
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
    slug: "fabrica-emilitas",
    name: "Fábrica Emilitas Postres",
    tagline: "Merengones y postres de comuna 19",
    category: "postres",
    barrio: "Camino Real",
    address: "Carrera 50 con calle 9, Camino Real",
    lat: 3.4108,
    lng: -76.541,
    instagram: "fabricaemilitaspostres",
    instagramPost: "DcCNXcuB7gU",
    video: "/videos/fabrica-emilitas.mp4",
    phone: "3058150947",
    status: "abierto",
    photo: "/places/fabrica-emilitas.jpg",
    logo: "/logos/fabrica-emilitas.jpg",
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
    logo: "/logos/asados-al-carbon.jpg",
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
    logo: "/logos/ac-to-go.jpg",
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
    hasPhysicalLocation: false,
    lat: 3.4115,
    lng: -76.5449,
    instagram: "arepasdelaabuela.cali",
    instagramPost: "DcZMGe1vtVX",
    video: "/videos/reactivacion-cali.mp4",
    phone: "3147711600",
    status: "limitado",
    photo: "/places/arepas-de-la-abuela.jpg",
    logo: "/logos/arepas-de-la-abuela.jpg",
    photoAlt: "Arepa de queso y ajiaco en cazuela",
    menuNote: "Actualmente reciben domicilios. Confirma menú y cobertura al 3147711600.",
    menu: [
      { name: "Ajiaco", desc: "Papa, mazorca, pollo y crema." },
      { name: "Frijolada", desc: "La de olla, para almorzar sin apuro." },
      { name: "Bandeja paisa", desc: "Completa, porción generosa." },
      { name: "Mondongo", desc: "El de los viernes, si sale." },
      { name: "Arepa con queso", desc: "Para picar o llevar." },
    ],
  },
  {
    slug: "cocina-mia",
    name: "Cocina Mía",
    tagline: "Comida típica caleña y restaurante familiar",
    category: "comida",
    barrio: "San Fernando",
    address: "Cra. 36 #5B2-10, Cali",
    hasPhysicalLocation: false,
    instagram: "cocinamiacali",
    instagramPost: "DcRCw02tgwn",
    video: "/videos/cocina-mia.mp4",
    phone: "3148902243",
    status: "limitado",
    photo: "/places/cocina-mia.jpg",
    logo: "/logos/cocina-mia.jpg",
    photoAlt: "Integrantes de Cocina Mía frente a su local afectado",
    menuNote: "Actualmente reciben domicilios. Confirma menú, horario y cobertura por teléfono.",
    menu: [
      {
        name: "Comida típica caleña",
        desc: "Consulta las opciones disponibles y el plato del día.",
      },
      {
        name: "Domicilios",
        desc: "Pide directamente al 3148902243 y confirma cobertura.",
      },
    ],
  },
  {
    slug: "la-fonda-tradicional",
    name: "La Fonda Tradicional",
    tagline: "Sabor típico colombiano",
    category: "comida",
    barrio: "Sur de Cali",
    address: "Cra. 46 #9-05, Cali",
    hasPhysicalLocation: false,
    instagram: "lafondatradicional",
    instagramPost: "DcZMGe1vtVX",
    video: "/videos/reactivacion-cali.mp4",
    phone: "3122466202",
    status: "limitado",
    photo: "/places/fonda-tradicional.jpg",
    logo: "/logos/fonda-tradicional.jpg",
    photoAlt: "La Fonda Tradicional frente a la fachada del restaurante",
    menuNote: "Domicilios disponibles. Confirma menú, horario y cobertura al 3122466202.",
    menu: [
      {
        name: "Sabor típico colombiano",
        desc: "Consulta los platos disponibles y el menú del día.",
      },
      {
        name: "Domicilios",
        desc: "Pide directamente al 3122466202 y confirma cobertura.",
      },
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
    instagramPost: "DcCJ2tEJxnE",
    video: "/videos/mangos.mp4",
    whatsapp: "573176520661",
    status: "abierto",
    photo: "/places/mangos.jpg",
    logo: "/logos/mangos.jpg",
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
    logo: "/logos/caracola-repostera.jpg",
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
  {
    slug: "nanitos-burger",
    name: "Ñañitos Burger",
    tagline: "Hamburguesas ahumadas al barril",
    category: "comida",
    barrio: "San Vicente",
    address: "Av. 6 Norte #26-40, San Vicente",
    lat: 3.458,
    lng: -76.531,
    coordsApproximate: true,
    instagram: "nanitos.burger",
    instagramPost: "DcNUv9XOo-M",
    video: "/videos/nanitos-burger.mp4",
    status: "abierto",
    photo: "/places/nanitos-burger.jpg",
    logo: "/logos/nanitos-burger.jpg",
    photoAlt: "Local de Ñañitos Burger tras el sismo",
    menuNote: "Afectados por el sismo. Confirma carta y horarios por Instagram.",
    menu: [
      { name: "Hamburguesa ahumada", desc: "Al barril, el de la casa." },
      { name: "Ahumados al barril", desc: "Donde el humo se vuelve sabor." },
    ],
  },
  {
    slug: "sobremesa-postres",
    name: "Sobremesa Postres",
    tagline: "Despertar felicidad es nuestro secreto",
    category: "postres",
    barrio: "Guadalupe",
    address: "Cra. 69 #1oeste-09, Guadalupe. Domicilios en Cali.",
    lat: 3.3936,
    lng: -76.5571,
    instagram: "sobremesapostres",
    instagramPost: "DcTt8aTOjVf",
    video: "/videos/sobremesa-postres.mp4",
    whatsapp: "573053436255",
    website: "https://menupp.co/sobremesapasteleria/",
    orderUrl: "https://menupp.co/sobremesapasteleria/",
    status: "abierto",
    photo: "/places/sobremesa-postres.jpg",
    logo: "/logos/sobremesa-postres.jpg",
    photoAlt: "Postre de alfajor de Sobremesa con crema de vainilla y arequipe",
    menuNote: "Pide en menupp.co/sobremesapasteleria. Despachan de 8:30 a.m. a 6:30 p.m.; entrega 60 a 90 min.",
    menu: [
      {
        name: "Combo uno",
        desc: "Postre personal, galleta, postal y globo. No incluye domicilio.",
        price: 29900,
        photo: "/places/sobremesa-postres/combo-uno.jpg",
      },
      {
        name: "Combo dos",
        desc: "Alfajor para compartir, caja de 2 galletas, postal y globo. No incluye domicilio.",
        price: 56900,
        photo: "/places/sobremesa-postres/combo-dos.jpg",
      },
      {
        name: "Combo tres",
        desc: "Dos postres personales, dos galletas, mini alfajores x7, postal y globo. No incluye domicilio.",
        price: 74900,
        photo: "/places/sobremesa-postres/combo-tres.jpg",
      },
      {
        name: "Sobremesa Alfajor",
        desc: "El clásico: bizcocho, crema de vainilla y alfajores de arequipe. Caja 18×12 cm, 4 a 6 porciones.",
        price: 46900,
        photo: "/places/sobremesa-postres/sobremesa-alfajor.jpg",
      },
      {
        name: "Sobremesa Milo y Arequipe",
        desc: "Bizcocho, crema de vainilla con salsa Milo, arequipe y viruta de chocolate. Caja 18×12 cm.",
        price: 45900,
        photo: "/places/sobremesa-postres/sobremesa-milo-y-arequipe.jpg",
      },
      {
        name: "Sobremesa Frutos del Bosque",
        desc: "Bizcocho y crema de vainilla con mermelada de fresa, mora y arándano. Caja 18×12 cm.",
        price: 42900,
        photo: "/places/sobremesa-postres/sobremesa-frutos-del-bosque.jpg",
      },
      {
        name: "Sobremesa Frutos Amarillos",
        desc: "Bizcocho y crema de vainilla con uchuva, mango, maracuyá, naranja, mandarina y durazno. Caja 18×12 cm.",
        price: 45900,
        photo: "/places/sobremesa-postres/sobremesa-frutos-amarillos.jpg",
      },
      {
        name: "Sobremesa Limón y crumble",
        desc: "Bizcocho, crema de vainilla, curd de limón y crumble. Caja 18×12 cm.",
        price: 43900,
        photo: "/places/sobremesa-postres/sobremesa-limon-crumble.jpg",
      },
      {
        name: "Sobremesa Limón y merengue",
        desc: "Bizcocho, crema de vainilla, curd de limón y merengue suizo. Caja 18×12 cm.",
        price: 45900,
        photo: "/places/sobremesa-postres/sobremesa-limon-y-merengue.jpg",
      },
      {
        name: "Sobremesa Red Velvet",
        desc: "Bizcocho rojo de cocoa, crema de vainilla con queso Philadelphia y chocolate blanco. Caja 18×12 cm.",
        price: 45900,
        photo: "/places/sobremesa-postres/sobremesa-red-velvet.jpg",
      },
      {
        name: "Sobremesa Tiramisú",
        desc: "Bizcocho con café y licor, crema de queso Philadelphia y viruta de chocolate. Postre de la semana. Caja 18×12 cm.",
        price: 43100,
        photo: "/places/sobremesa-postres/sobremesa-tiramisu.jpg",
      },
      {
        name: "Merengón",
        desc: "Merengue, chantillí, fresa, durazno, mora y viruta de chocolate. Caja 18×12 cm. Consumir pronto.",
        price: 42900,
        photo: "/places/sobremesa-postres/merengon.jpg",
      },
      {
        name: "Sobremesa Alfajor personal",
        desc: "La versión chica del clásico. Caja 13×7 cm.",
        price: 23900,
        photo: "/places/sobremesa-postres/sobremesa-alfajor-pequeno.jpg",
      },
      {
        name: "Sobremesa Limón y crumble personal",
        desc: "Curd de limón y crumble. Caja 13×7 cm.",
        price: 23900,
        photo: "/places/sobremesa-postres/sobremesa-limon-crumble-pequeno.jpg",
      },
      {
        name: "Merengón personal",
        desc: "Merengue, fruta y chantillí. Caja 13×7 cm. Consumir pronto.",
        price: 23900,
        photo: "/places/sobremesa-postres/merengon-pequeno.jpg",
      },
      {
        name: "Sobremesa Milo y arequipe personal",
        desc: "Milo, arequipe y viruta de chocolate. Caja 13×7 cm.",
        price: 23900,
        photo: "/places/sobremesa-postres/sobremesa-milo-y-arequipe-pequeno.jpg",
      },
      {
        name: "Sobremesa Frutos del Bosque personal",
        desc: "Mermelada de fresa, mora y arándano. Caja 13×7 cm.",
        price: 23900,
        photo: "/places/sobremesa-postres/sobremesa-frutos-del-bosque-pequeno.jpg",
      },
      {
        name: "Sobremesa Frutos Amarillos personal",
        desc: "Uchuva, mango, maracuyá y durazno. Caja 13×7 cm.",
        price: 23900,
        photo: "/places/sobremesa-postres/sobremesa-frutos-amarillos-pequeno.jpg",
      },
      {
        name: "Sobremesa Red Velvet personal",
        desc: "Bizcocho rojo, Philadelphia y chocolate blanco. Caja 13×7 cm.",
        price: 23900,
        photo: "/places/sobremesa-postres/sobremesa-red-velvet-pequeno.jpg",
      },
      {
        name: "Sobremesa Tiramisú personal",
        desc: "Café Juan Valdez, licor y crema de Philadelphia. Caja 13×7 cm.",
        price: 23900,
        photo: "/places/sobremesa-postres/sobremesa-tiramisu-pequeno.jpg",
      },
      {
        name: "Alfajor en vaso",
        desc: "Crema de vainilla y trozos de alfajor de mantequilla con arequipe. Vaso individual.",
        price: 15900,
        photo: "/places/sobremesa-postres/alfajor.jpg",
      },
      {
        name: "Tres leches de Milo",
        desc: "Bizcochuelo en tres leches, canela, Milo, crema y viruta de chocolate.",
        price: 14900,
        photo: "/places/sobremesa-postres/tres-leches-de-milo.jpg",
      },
      {
        name: "Pie de limón cremoso",
        desc: "Crumble de mantequilla, crema de limón y un toque de leche condensada.",
        price: 14900,
        photo: "/places/sobremesa-postres/pie-de-limon-cremoso.jpg",
      },
      {
        name: "Nube de arequipe",
        desc: "Crema de tres leches, arequipe, bizcocho y mini alfajor encima.",
        price: 14900,
        photo: "/places/sobremesa-postres/nube-de-arequipe.jpg",
      },
      {
        name: "Rojo cremoso",
        desc: "Bizcochuelo, crema de vainilla y mermelada de frutos del bosque.",
        price: 14900,
        photo: "/places/sobremesa-postres/rojo-cremoso.jpg",
      },
      {
        name: "Amarillo cremoso",
        desc: "Bizcochuelo, crema de vainilla y frutos amarillos.",
        price: 14900,
        photo: "/places/sobremesa-postres/amarillo-cremoso.jpg",
      },
      {
        name: "Chocomilo",
        desc: "Bizcochuelo, crema de vainilla con Milo, miga de alfajor y viruta de chocolate.",
        price: 14900,
        photo: "/places/sobremesa-postres/chocomilo.jpg",
      },
      {
        name: "Torta fría de alfajor y caramelo",
        desc: "Bizcocho, crema pastelera, alfajor y salsa de caramelo. Desde 4 a 6 porciones.",
        price: 52900,
        photo: "/places/sobremesa-postres/alfajor-y-salsa-de-caramelo.jpg",
      },
      {
        name: "Torta fría Red Velvet",
        desc: "Bizcocho de cocoa, crema pastelera con Philadelphia y chocolate blanco. Desde 4 a 6 porciones.",
        price: 52900,
        photo: "/places/sobremesa-postres/torta-red-velvet.jpg",
      },
      {
        name: "Torta fría de frutos amarillos",
        desc: "Bizcocho, crema pastelera y mermelada de mango, maracuyá, naranja, uchuva y durazno. Desde 4 a 6 porciones.",
        price: 52900,
        photo: "/places/sobremesa-postres/torta-de-frutos-amarillo.jpg",
      },
      {
        name: "Torta fría de frutos del bosque",
        desc: "Bizcocho, crema pastelera y mermelada de fresa, mora y arándano. Desde 4 a 6 porciones.",
        price: 52900,
        photo: "/places/sobremesa-postres/torta-de-frutos-del-bosque.jpg",
      },
      {
        name: "Torta fría de Milo",
        desc: "Bizcocho, crema pastelera con Milo, miga de alfajor y viruta de chocolate. Desde 4 a 6 porciones.",
        price: 52900,
        photo: "/places/sobremesa-postres/torta-de-milo.jpg",
      },
      {
        name: "Torta de zanahoria",
        desc: "Bizcocho de zanahoria, canela, nuez moscada, glaseado de Philadelphia y nueces caramelizadas. Desde 8 a 10 porciones.",
        price: 125000,
        photo: "/places/sobremesa-postres/torta-de-zanahoria.jpg",
      },
      {
        name: "Torta de chocolate",
        desc: "Bizcocho de chocolate con mousse al 65%. Desde 4 a 6 porciones.",
        price: 62900,
        photo: "/places/sobremesa-postres/chocolate.jpg",
      },
      {
        name: "Torta de limón y arándanos",
        desc: "Bizcocho de limón con arándanos y glaseado. Desde 10 porciones.",
        price: 95000,
        photo: "/places/sobremesa-postres/limon-y-arandanos.jpg",
      },
      {
        name: "Torta de naranja y amapola",
        desc: "Bizcocho de naranja con semillas de amapola y glaseado. Desde 10 porciones.",
        price: 95000,
        photo: "/places/sobremesa-postres/naranja-y-amapola.jpg",
      },
      {
        name: "Caja de torta choco vainilla",
        desc: "Caja 18×12 cm, 4 a 6 porciones.",
        price: 39900,
        photo: "/places/sobremesa-postres/caja-de-torta-choco-vainilla.jpg",
      },
      {
        name: "Caja de torta limón y arándanos",
        desc: "Bizcocho de limón con arándanos. Caja 18×12 cm, 4 a 6 porciones.",
        price: 50900,
        photo: "/places/sobremesa-postres/caja-de-torta-limon-y-arandanos.jpg",
      },
      {
        name: "Caja de torta naranja y amapola",
        desc: "Bizcocho de naranja con amapola. Caja 18×12 cm, 4 a 6 porciones.",
        price: 50900,
        photo: "/places/sobremesa-postres/caja-de-torta-naranja-y-amapola.jpg",
      },
      {
        name: "Caja de mini alfajores",
        desc: "Alfajores de 3.5 cm con arequipe. Desde 7 unidades.",
        price: 18900,
        photo: "/places/sobremesa-postres/caja-de-mini-alfajores-3-5cm.jpg",
      },
      {
        name: "Caja de alfajores",
        desc: "Alfajores de 5 cm con arequipe. Desde 1 unidad.",
        price: 6000,
        photo: "/places/sobremesa-postres/caja-de-alfajores-5cm.jpg",
      },
    ],
  },
  {
    slug: "la-casona-vegetariana",
    name: "La Casona Vegetariana",
    tagline: "34 años de cocina vegetariana en Cali",
    category: "comida",
    barrio: "Centro",
    address: "Cra. 6 #6-56, Centro, Cali",
    hasPhysicalLocation: false,
    instagram: "lacasonavegetariana",
    instagramPost: "DcMMvPYIDsU",
    video: "/videos/lacasona-vegetariana.mp4",
    whatsapp: "573164955537",
    phone: "3164955537",
    status: "limitado",
    photo: "/places/lacasona-vegetariana.jpg",
    logo: "/logos/lacasona-vegetariana.jpg",
    photoAlt: "Representante de La Casona Vegetariana frente al restaurante afectado por el sismo",
    menuNote: "Temporalmente trabajan solo con domicilios desde una cocina oculta. Confirma menú, cobertura y horario por WhatsApp.",
    menu: [
      {
        name: "Almuerzo vegetariano del día",
        desc: "Consulta las opciones disponibles y el precio del día por WhatsApp.",
      },
      {
        name: "Domicilios en Cali",
        desc: "Pide comida vegetariana mientras se recuperan y vuelven a abrir sus puertas.",
      },
    ],
  },
  {
    slug: "ostinato",
    name: "Ostinato",
    tagline: "Pasta y ensaladas a tu manera",
    category: "comida",
    barrio: "Norte",
    address: "Calle 58N #5BN-75, Cali. Antes de PriceSmart del Norte",
    hasPhysicalLocation: false,
    instagram: "ostinatorest",
    instagramPost: "DcO9fDLM-i7",
    video: "/videos/ostinato.mp4",
    status: "cerrado",
    photo: "/places/ostinato.jpg",
    logo: "/logos/ostinato.jpg",
    photoAlt: "Los dos hermanos de Ostinato en la terraza del restaurante",
    menuNote: "El local está temporalmente cerrado por daños estructurales. Sigue a @ostinatorest para conocer cómo apoyar su regreso.",
    menu: [
      {
        name: "Pasta a tu manera",
        desc: "Arma tu pasta con el tipo de pasta e ingredientes que prefieras.",
      },
      {
        name: "Ensaladas a tu manera",
        desc: "Opciones personalizables según la propuesta del restaurante.",
      },
    ],
  },
  {
    slug: "cheesecake-cali",
    name: "Cheesecake Cali",
    tagline: "Cheesecake de una familia caleña",
    category: "postres",
    barrio: "Domicilios",
    address: "Ubicación no publicada",
    hasPhysicalLocation: false,
    instagram: "cheesecakecali",
    instagramPost: "DcT7QBgR0iR",
    video: "/videos/cheesecake-cali.mp4",
    status: "cerrado",
    photo: "/places/cheesecake-cali.jpg",
    photoAlt: "Equipos de cocina de Cheesecake Cali en una cocina afectada",
    menuNote: "La familia fue afectada por el terremoto y el post indica que lo perdió todo. No hay atención confirmada; sigue a @cheesecakecali para conocer cómo apoyar su regreso.",
    menu: [
      {
        name: "Cheesecake",
        desc: "Consulta sabores, presentaciones y disponibilidad directamente por Instagram.",
      },
    ],
  },
  {
    slug: "la-fugitiva-pizzeria-dapa",
    name: "La Fugitiva Pizzeria Bar",
    tagline: "Pizza artesanal en Dapa",
    category: "comida",
    barrio: "Dapa",
    address: "Vía a Dapa #7, Dapa, Yumbo",
    hasPhysicalLocation: true,
    instagram: "lafugitiva.co",
    instagramPost: "DcY3KyMukJl",
    video: "/videos/la-fugitiva-pizzeria-dapa.mp4",
    phone: "3174543682",
    status: "abierto",
    photo: "/places/la-fugitiva-pizzeria-dapa.jpg",
    photoAlt: "Persona del equipo de La Fugitiva hablando frente a las ventanas del restaurante",
    menuNote: "La publicación indica atención de lunes a viernes desde las 5:00 p. m. y fines de semana desde las 12:30 p. m.; confirma carta, reservas y disponibilidad antes de ir.",
    menu: [
      { name: "Pizza", desc: "Pizza artesanal de la casa." },
      { name: "Pastas", desc: "Opciones de pasta del restaurante." },
      { name: "Vinos y sangría", desc: "Bebidas para acompañar la comida." },
    ],
  },
  {
    slug: "yen-alimentos",
    name: "Yen | Alimentos saludables",
    tagline: "Yogur griego, arepas y snacks saludables",
    category: "comida",
    barrio: "Domicilios",
    address: "Ubicación no publicada",
    hasPhysicalLocation: false,
    instagram: "alimentosyen",
    instagramPost: "DcTqf3ARleZ",
    video: "/videos/yen-alimentos.mp4",
    phone: "3103616338",
    website: "https://alimentosyen.com/",
    orderUrl: "https://alimentosyen.com/tienda/",
    status: "abierto",
    photo: "/places/yen-alimentos.jpg",
    logo: "/logos/yen-alimentos.jpg",
    photoAlt: "Persona ordeñando una vaca, imagen del reel de Yen Alimentos",
    menuNote: "Consulta disponibilidad, cobertura y costos de envío en la tienda oficial de Yen Alimentos.",
    menu: [
      {
        name: "Arepas de arroz integral extradelgadas",
        desc: "Arepas de arroz integral de la tienda oficial.",
        price: 19500,
      },
      {
        name: "Arepabono de pandebono",
        desc: "Arepas de pandebono.",
        price: 18500,
      },
      {
        name: "Arepas de plátano maduro",
        desc: "Arepas de plátano maduro.",
        price: 20000,
      },
      {
        name: "Arepas de yuca rellenas con queso",
        desc: "Arepas de yuca rellenas con queso.",
        price: 23200,
      },
      {
        name: "Parfait griego Berry & Crunch Bliss",
        desc: "Parfait de yogur griego con frutos y crocante.",
        price: 19500,
      },
      {
        name: "Granola clásica",
        desc: "Granola clásica de Yen Alimentos.",
        price: 36900,
      },
      {
        name: "Yogur griego sabor neutro",
        desc: "Presentación de un litro.",
        price: 44900,
      },
    ],
  },
  {
    slug: "ringlete",
    name: "Restaurante Ringlete",
    tagline: "Cocina tradicional valluna",
    category: "comida",
    barrio: "Norte",
    address: "Calle 15B Norte #9A-27, Cali",
    hasPhysicalLocation: false,
    instagram: "rringlete",
    instagramPost: "DcY_4tqR-eu",
    video: "/videos/ringlete.mp4",
    status: "cerrado",
    photo: "/places/ringlete.jpg",
    logo: "/logos/ringlete.jpg",
    photoAlt: "Representante de Ringlete frente a su nueva sede",
    menuNote: "Regresan pronto con un nuevo formato de mesas largas. Sigue a @rringlete para conocer la reapertura.",
    menu: [
      {
        name: "Cocina valluna",
        desc: "La cocina de casas vallunas que Ringlete prepara como legado y tradición.",
      },
    ],
  },
];

export function getPlace(slug: string) {
  return places.find((p) => p.slug === slug);
}

export function instagramShortcode(input: string) {
  return input
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\//i, "")
    .replace(/[/?#].*$/, "");
}

export function instagramPostUrl(shortcode: string) {
  return `https://www.instagram.com/p/${instagramShortcode(shortcode)}/`;
}

export function instagramEmbedSrc(shortcode: string) {
  return `https://www.instagram.com/p/${instagramShortcode(shortcode)}/embed/`;
}

export const statusLabel: Record<Status, string> = {
  abierto: "Abierto",
  limitado: "Solo domicilios",
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
