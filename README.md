# Cali No Para

Directorio mobile-first de emprendimientos caleños afectados por el terremoto del 10 de agosto de 2026.

Datos curados a mano desde publicaciones de [@dilettopasticceria](https://www.instagram.com/p/DcMetBJlMza/), [@lacasonavegetariana](https://www.instagram.com/p/DcMMvPYIDsU/), [@ostinatorest](https://www.instagram.com/p/DcO9fDLM-i7/), [@fabricaemilitaspostres](https://www.instagram.com/p/DcCNXcuB7gU/), [@alimentosyen](https://www.instagram.com/p/DcTqf3ARleZ/), comentarios y notas de prensa. No es un censo oficial.

## Stack

Astro 7 + Leaflet + OpenStreetMap. Sin backend: la fuente es `src/data/emprendimientos.ts`.

## Correr

```bash
cd emprendimientos-cali
npm install
npm run dev
```

Build estático: `npm run build` → `dist/`.

Videos locales: `npm run check:videos` valida que cada MP4 sea H.264/AAC, vertical 720×1280, 30 fps, con `faststart` y menor de 20 MB. El build ejecuta esta validación automáticamente y las páginas usan `preload="none"` para no descargar videos hasta que la persona los abra.

## Despliegue

El proyecto Railway `calinopara.co` está vinculado al servicio `la-vitrina`, que toma la rama `main` del repositorio `juanfespinal/calinopara`. Railway construye el [Dockerfile](Dockerfile) y sirve `dist/` en el puerto `$PORT`.

Antes de publicar cambios:

```bash
npm test
npm run check:videos
npm run build
```

## Sumar un negocio

Agrega un objeto en `src/data/emprendimientos.ts` y vuelve a generar. Si no hay dirección precisa, omite `lat`/`lng` o marca `coordsApproximate: true`. Consulta [AGENTS.md](AGENTS.md) para descargar y comprimir reels, preparar portadas y validar los archivos.
