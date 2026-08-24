# Guía para sumar negocios

Este proyecto es un directorio estático en Astro. La fuente de verdad de los negocios es `src/data/emprendimientos.ts`; las imágenes y videos públicos viven bajo `public/`.

## Antes de editar

- Usa fuentes públicas y guarda en el cambio el perfil de Instagram y, cuando aplique, el shortcode del post o reel.
- No inventes precios, horarios, dirección, cobertura ni disponibilidad. Si un dato no está confirmado, omítelo o escribe que se debe confirmar por WhatsApp/Instagram.
- Para un negocio afectado que atiende parcialmente, usa `status: "limitado"`. Para uno que no atiende, usa `status: "cerrado"`.
- No añadas coordenadas aproximadas como si fueran exactas. Si la dirección no permite geocodificación confiable, omite `lat` y `lng`.

## Alta de un negocio

Añade un objeto a `src/data/emprendimientos.ts` con un `slug` estable y estos campos mínimos:

```ts
{
  slug: "nombre-en-minusculas",
  name: "Nombre del negocio",
  tagline: "Qué ofrece, sin prometer datos no verificados",
  category: "comida",
  barrio: "Barrio confirmado",
  address: "Dirección confirmada",
  // false si solo trabaja por domicilios o desde una cocina no abierta al público.
  hasPhysicalLocation: true,
  instagram: "usuario",
  instagramPost: "SHORTCODE_DEL_POST_O_REEL",
  video: "/videos/nombre-en-minusculas.mp4",
  whatsapp: "57XXXXXXXXXX",
  status: "abierto",
  photo: "/places/nombre-en-minusculas.jpg",
  logo: "/logos/nombre-en-minusculas.jpg",
  photoAlt: "Descripción objetiva de la imagen",
  menuNote: "Cómo confirmar la carta o disponibilidad.",
  menu: [
    {
      name: "Producto o servicio confirmado",
      desc: "Descripción breve.",
      // price solo cuando la fuente publica el precio vigente.
    },
  ],
}
```

Si no hay video local, deja `instagramPost` para que la página use el embed de Instagram. Si tampoco hay reel, conserva el fallback de foto. `logo` es opcional: la página usa `photo` si no existe.

## Procedimiento autónomo para una URL de Instagram

Cuando el usuario entregue una URL de perfil, post o reel, ejecuta este flujo sin pedir datos que puedan verificarse públicamente:

1. Abre la URL y confirma el usuario, nombre visible, caption, teléfono, WhatsApp, dirección, horarios, tipo de atención y si el lugar recibe público. La URL entregada es la fuente primaria.
   Ignora datos bancarios, NIT, llaves de pago o llamados a donaciones del caption salvo que el usuario pida explícitamente documentarlos; no son datos de la ficha.
2. Si el enlace es un reel, usa su shortcode como `instagramPost` y conserva el perfil como `instagram`. Si la publicación pertenece a otra cuenta, usa como negocio la cuenta que el caption identifique explícitamente.
3. Convierte el nombre en un `slug` ASCII, minúsculo y estable: espacios y signos pasan a guiones; conserva una sola entrada por negocio.
4. Elige la categoría más cercana de `categories`. No crees categorías nuevas para una sola alta.
5. Decide el estado únicamente con evidencia:
   - `abierto`: anuncia atención normal.
   - `limitado`: domicilios, cocina oculta, horario reducido o atención temporal.
   - `cerrado`: pausa explícita o no atiende.
6. Usa `hasPhysicalLocation: false` si no hay sede abierta al público. En ese caso no deben aparecer el panel “Dónde” ni “Cómo llegar”. El detalle deja solo acciones con destino real: `Pedir ahora` si existe `orderUrl`, WhatsApp o teléfono, y el bloque de Instagram al final.
7. Si no hay dirección o barrio publicados, no inventes coordenadas. Para no presentar una ubicación falsa, usa `hasPhysicalLocation: false`, `address: "Ubicación no publicada"` y `barrio: "Domicilios"` solo si la interfaz exige esos campos.
8. Crea la carta con productos o servicios mencionados por la fuente. Si no hay menú verificable, usa una entrada general como “Menú del día” con “Consulta por WhatsApp”. Nunca agregues precios por aproximación.
9. Descarga y optimiza el reel siguiendo la sección multimedia. Genera la portada desde un fotograma que represente al negocio, no automáticamente desde un fotograma vacío o de transición.
10. Añade la entrada y los archivos, ejecuta las verificaciones y revisa la página generada. Solo detente para pedir ayuda si la cuenta es privada, aparece CAPTCHA, se requiere iniciar sesión o la identidad del negocio no puede determinarse sin inventar datos.

La salida esperada de una alta es: un objeto de datos, un MP4 local si existe reel, una portada, un logo solo si la imagen pública es clara, y un build exitoso. No hace falta añadir botones manualmente por negocio: el detalle los deriva de `hasPhysicalLocation`, `orderUrl`, `whatsapp`, `phone` e `instagram`.

## Descargar y preparar un reel

`yt-dlp` es el método preferido. No uses cookies ni descargues contenido privado; para un reel público basta la URL del post:

```bash
slug="nombre-en-minusculas"
tmp="/private/tmp/calinopara-$slug"
mkdir -p "$tmp"

yt-dlp --no-playlist --restrict-filenames --merge-output-format mp4 \
  -o "$tmp/original.%(ext)s" \
  "https://www.instagram.com/p/SHORTCODE/"
```

Normaliza el archivo para navegadores y reduce el peso con `ffmpeg`:

```bash
ffmpeg -y -i "$tmp/original.mp4" \
  -vf "scale=720:1280:flags=lanczos,fps=30" \
  -c:v libx264 -preset medium -crf 27 -pix_fmt yuv420p \
  -profile:v main -level 3.1 -c:a aac -b:a 96k \
  -movflags +faststart "public/videos/$slug.mp4"
```

Requisitos recomendados del resultado:

- MP4 con video H.264 (`avc1`) y audio AAC (`mp4a`).
- Vertical 720×1280, 30 fps; no conservar 60 fps salvo que sea necesario.
- `faststart` para que el video empiece antes de terminar la descarga.
- Objetivo de peso: menos de 20 MB para reels de alrededor de dos minutos; si pesa más, sube el `crf` o baja la resolución.
- Mantén el original fuera de `public/` y fuera del repositorio.

## Portada, foto y logo

El video local necesita una portada visible antes de reproducirse. Genera una imagen vertical de 720×960 desde un fotograma representativo —no necesariamente el primer fotograma— y guárdala como `public/places/$slug.jpg`:

```bash
ffmpeg -y -ss 00:01:00 -i "public/videos/$slug.mp4" \
  -vf "crop=720:960:0:160" -frames:v 1 -q:v 3 \
  "public/places/$slug.jpg"
```

Para el logo, descarga la imagen pública de perfil del negocio y guárdala como `public/logos/$slug.jpg`. Si no hay un logo claro o la imagen no tiene permiso de uso, omite `logo`; no fabriques una marca.

## Verificación antes de entregar

```bash
file public/videos/$slug.mp4 public/places/$slug.jpg public/logos/$slug.jpg
ffprobe -v error \
  -show_entries format=duration,size:stream=codec_name,codec_type,width,height,avg_frame_rate \
  -of default=noprint_wrappers=1 "public/videos/$slug.mp4"
npm run build
```

Si se omitió `logo`, quítalo del primer comando o valida ese archivo solo cuando exista.

Comprueba además que:

- El `slug`, los nombres de archivo y las rutas en `emprendimientos.ts` coinciden exactamente.
- La página muestra la historia local y conserva el crédito “Ver en Instagram”.
- El botón principal apunta a WhatsApp cuando no existe un catálogo o sitio de pedidos.
- El precio inicial no aparece si ningún elemento de `menu` tiene `price`.
- El texto de estado describe la situación real; para `limitado`, la etiqueta actual es “Solo domicilios”.
