# La Vitrina

Directorio mobile-first de emprendimientos caleños afectados por el terremoto del 10 de agosto de 2026.

Datos curados a mano desde el post de [@dilettopasticceria](https://www.instagram.com/p/DcMetBJlMza/), comentarios y notas de prensa. No es un censo oficial.

## Stack

Astro 7 + Leaflet + OpenStreetMap. Sin backend: la fuente es `src/data/emprendimientos.ts`.

## Correr

```bash
cd emprendimientos-cali
npm install
npm run dev
```

Build estático: `npm run build` → `dist/`.

## Sumar un negocio

Agrega un objeto en `src/data/emprendimientos.ts` y vuelve a generar. Si no hay dirección precisa, omite `lat`/`lng` o marca `coordsApproximate: true`.
