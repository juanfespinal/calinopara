# Cali No Para: directorio audiovisual mobile-first

## Estado

Diseño aprobado para pasar a planificación de implementación. Esta especificación no modifica todavía la interfaz ni los datos.

## Objetivo

Convertir el directorio público de Cali No Para en una experiencia mobile-first donde el grid facilite descubrir negocios y el video/reel sea la primera capa narrativa. La interfaz debe ayudar a comprar, visitar o contactar negocios afectados sin introducir cuentas, perfiles sociales internos ni funciones que no existen en el producto.

## Límites del producto

- Sin login, perfil, favoritos, donaciones ni funciones sociales internas.
- Se conserva `src/data/emprendimientos.ts` como fuente de verdad.
- Se conserva el grid de negocios existente y la información real de cada ficha.
- Las acciones se derivan de los datos disponibles: pedir/contactar, teléfono, Instagram y cómo llegar cuando hay sede física.
- La navegación pública se reduce a `Directorio`, `Mapa` y `Súmate`.

## Arquitectura de navegación

### Directorio

Es la vista inicial en móvil. Usa un grid de dos columnas con tarjetas verticales. Cada tarjeta muestra poster o foto, botón de play cuando hay video/reel, nombre, barrio y estado. El tap en la tarjeta abre el detalle; el video no se reproduce automáticamente.

### Mapa

Es una vista hermana del directorio, accesible desde el menú inferior y desde el toggle existente. Ocupa la pantalla disponible, con búsqueda/filtros arriba y un bottom sheet para el negocio seleccionado. El sheet muestra poster, nombre, estado y `Ver detalle`. No se muestra una lista simultánea en móvil.

### Detalle

Es una ruta pública por negocio. El orden de contenido es:

1. Video/reel grande como primer bloque, con poster y crédito a Instagram.
2. Ficha blanca con logo/foto, nombre, categoría, barrio y estado.
3. Acción principal real: pedir/contactar o cómo llegar según los datos disponibles.
4. Carta y nota de confirmación.
5. Bloque de ubicación únicamente cuando hay sede física.
6. Instagram como fuente y continuidad de la historia, no como feed social interno.

## Sistema visual

El canvas principal es blanco puro. La identidad se apoya en color funcional, contraste y fotografía/video, no en fondos saturados.

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#FFFFFF` | Fondo principal |
| `--ink` | `#13233A` | Texto principal y títulos |
| `--accent` | `#2F8F3B` | CTA, selección activa y estados positivos |
| `--accent-soft` | `#EAF4E8` | Chips y superficies suaves verdes |
| `--accent-blue` | `#1F65A6` | Mapa, ubicación y acciones geográficas |
| `--accent-red` | `#E43E3E` | Acentos narrativos puntuales |
| `--accent-yellow` | `#F5B51B` | Destacados puntuales |
| `--line` | `#E4E7E3` | Bordes y separadores |
| `--mute` | `#66706C` | Texto secundario |

El verde domina las acciones. Azul organiza ubicación. Rojo y amarillo se reservan para indicadores pequeños, sin estética de emergencia.

## Movimiento

Las animaciones deben sentirse casi imperceptibles y apoyar orientación o feedback.

- Usar principalmente `opacity` y desplazamientos de 6–8 px.
- Duración objetivo: 150–220 ms, con easing suave.
- Grid: entrada breve y discreta; sin escaladas exageradas ni cascadas largas.
- Play: feedback de presión y un pulso único al tocar; no animación infinita.
- Tarjetas: feedback de presión corto, sin zoom agresivo.
- Menú inferior: transición de color e indicador activo.
- Mapa: marcador seleccionado con escala leve y bottom sheet que sube suavemente.
- Detalle: transición corta entre poster y video; la ficha aparece después con un desfase mínimo.
- Respetar `prefers-reduced-motion` desactivando o reduciendo transiciones.
- No usar parallax, rebotes, loaders decorativos ni animaciones permanentes.

## Criterios de éxito

- En móvil, el usuario ve negocios reales en grid antes de cualquier otra vista.
- El poster y el play comunican que existe una historia audiovisual.
- Un tap lleva al video y al detalle sin pasar por login ni pantallas intermedias.
- El mapa permite seleccionar un negocio y llegar al detalle desde el bottom sheet.
- Las acciones nunca aparecen si no existe un destino real en los datos.
- La interfaz deja de sentirse plana sin sacrificar legibilidad, rendimiento o accesibilidad.
