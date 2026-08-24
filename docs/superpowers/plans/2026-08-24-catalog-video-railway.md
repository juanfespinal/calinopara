# Catálogo, videos y Railway Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mantener el catálogo dentro del alcance gastronómico, entregar videos web livianos y dejar el despliegue listo para el repositorio de GitHub en Railway.

**Architecture:** El catálogo seguirá siendo estático en Astro. Los videos locales se servirán como MP4 H.264/AAC con portada y carga diferida del navegador; una validación de medios evitará que un archivo pesado o mal codificado vuelva a entrar al build. Railway continuará construyendo el Dockerfile desde el repositorio conectado.

**Tech Stack:** Astro 7, TypeScript, Node `node:test`, FFmpeg/ffprobe, Docker y Railway.

**Spec:** `AGENTS.md`

## Global Constraints

- No inventar datos de negocios; conservar créditos de Instagram.
- Videos MP4 H.264/AAC, 720×1280, 30 fps, `faststart`, idealmente menores de 20 MB.
- El build debe fallar si un video público incumple la política de medios.
- No afirmar la conexión externa sin evidencia de autenticación y proyecto Railway.

---

### Task 1: Retirar el negocio fuera de alcance

**Files:**
- Modify: `src/data/emprendimientos.ts`
- Delete: `public/places/friz-froz-fruz.jpg`, `public/logos/friz-froz-fruz.jpg`, `public/videos/friz-froz-fruz.mp4`

- [x] Eliminar el objeto `friz-froz-fruz` del arreglo `places`.
- [x] Eliminar los tres archivos públicos que solo pertenecen a ese negocio.
- [x] Ejecutar `rg -n "friz-froz|frizfroz|Friz Froz" src public` y confirmar que no queden referencias.

### Task 2: Validar y servir videos eficientemente

**Files:**
- Create: `scripts/video-policy.mjs`
- Create: `scripts/video-policy.test.mjs`
- Modify: `package.json`
- Modify: `src/components/PlaceVideo.astro`
- Modify: `public/videos/*.mp4` (normalización con FFmpeg)

- [x] Escribir primero pruebas para el límite de tamaño, códecs, dimensiones, fps y audio.
- [x] Ejecutar `node --test scripts/video-policy.test.mjs` y comprobar que fallen por la política aún no implementada.
- [x] Implementar la política y `npm run check:videos` usando `ffprobe` sobre cada MP4 público.
- [x] Configurar `prebuild` para ejecutar `check:videos` antes de `astro build`.
- [x] Cambiar la reproducción a `preload="none"`, conservar `poster`, créditos y controles.
- [x] Normalizar los reels referenciados con FFmpeg y comprobar que cada uno cumpla la política.

### Task 3: Preparar y conectar Railway

**Files:**
- Modify: `railway.toml`
- Modify: `README.md`

- [x] Verificar que Railway use el `Dockerfile`, el puerto `$PORT` y el comando de servidor estático.
- [x] Consultar `railway status` y la autenticación de `gh`.
- [x] Si las credenciales están vigentes, vincular el proyecto Railway al repositorio `juanfespinal/calinopara` y verificar el estado.
- [x] Si la autenticación no está vigente, dejar documentación y configuración local listas sin inventar un proyecto o servicio.

### Task 4: Verificación final

- [x] Ejecutar `npm run check:videos`.
- [x] Ejecutar `npm run build`.
- [x] Revisar `git diff`, rutas de datos y el estado de Railway/GitHub antes de reportar.
