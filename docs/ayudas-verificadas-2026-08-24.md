# Ayudas verificadas para negocios afectados

Última revisión: 2026-08-27

Esta página documenta las fuentes y criterios usados en `/ayudas/`. La información cambia rápidamente después del terremoto del 10 de agosto de 2026; antes de modificar una tarjeta se debe volver a consultar la fuente responsable.

## Criterios editoriales

- `Disponible ahora`: existe un canal oficial que el negocio puede usar hoy.
- `Disponible según entidad`: la medida fue anunciada, pero cada entidad evalúa y define condiciones.
- `Convocatoria pendiente`: existe un anuncio verificable, pero no hay formulario, requisitos o fecha de apertura publicados.
- `En reglamentación`: la medida depende de normas o actos administrativos todavía no publicados.
- No se usa “Solicitar” o “Aplicar” sin un mecanismo oficial verificable.
- Cada tarjeta muestra la fecha de última verificación y enlaza a la entidad responsable cuando existe una fuente primaria.
- Cali No Para informa y conecta; no administra recursos ni garantiza beneficios.

## Cámara de Comercio de Cali

La Cámara de Comercio de Cali no anunció un subsidio directo. Su papel verificable es:

1. Desarrollar la plataforma tecnológica de la **Línea de Afectación Empresarial**.
2. Recibir reportes sobre infraestructura, establecimientos, maquinaria, equipos, inventarios, operación y empleo.
3. Consolidar necesidades para orientar estrategias institucionales y de cooperación.
4. Poner la solución a disposición de Confecámaras, otras cámaras y el Gobierno nacional para el **Censo Único de Emergencia**.
5. Participar en la articulación regional para que el diagnóstico sirva para focalizar las futuras medidas de recuperación.

El registro no constituye una adjudicación ni garantiza el acceso a una ayuda.

Fuentes oficiales:

- [Línea de Afectación Empresarial de la Cámara de Comercio de Cali](https://www.ccc.org.co/linea-afectacion-empresarial-impacto-terremoto-valle-del-cauca/)
- [Resultados iniciales del Censo Único de Emergencia](https://www.ccc.org.co/empresas-afectadas-terremoto-censo-unico-emergencia/)
- [Reporte de recuperación y articulación regional](https://www.ccc.org.co/empresas-afectadas-sismo-valle-del-cauca-recuperacion/)

Canales publicados para empresarios:

- Teléfono: `(602) 886 1300`
- Línea móvil y WhatsApp: `300 913 1811`

Los formularios en línea y fuera de línea mencionados por la Cámara están dirigidos también a equipos de cámaras, entidades y aliados que levantan información en territorio. Por ello, Cali No Para dirige al empresario a teléfono o WhatsApp y no presenta esos formularios como una postulación abierta a un subsidio.

## Alcaldía de Cali

Fuente oficial:

- [Plan de alivios y Fondo Solidario anunciado por la Alcaldía](https://www.cali.gov.co/boletines/publicaciones/193819/alcaldia-de-cali-prioriza-reactivacion-del-tejido-empresarial-con-plan-de-alivios-y-fondo-solidario-de-5000-millones/)

El mismo comunicado oficial publica `reactivacali@cali.gov.co` como canal de correo para recibir información y registrar afectaciones empresariales.

A partir de esta fuente se clasifican como pendientes o en reglamentación:

- Fondo de Recuperación de Unidades Productivas por `$5.000 millones`, anunciado en especie y sin convocatoria publicada.
- Microcréditos con tasas diferenciales, sin operador, tasas, montos ni requisitos publicados.
- Posibles alivios de ICA, predial y servicios públicos, sujetos a habilitación jurídica.
- Medidas nacionales esperadas relacionadas con empleo, Fondo Emprender, impuestos, arrendamientos y turismo.

## Alivios bancarios

Fuente de contraste:

- [Resumen publicado sobre alivios de entidades financieras](https://www.infobae.com/colombia/2026/08/22/terremoto-en-colombia-empresarios-suman-donaciones-y-alivios-financieros-para-la-reconstruccion/)

No se identificó una solicitud centralizada. Cali No Para indica que el negocio debe consultar directamente a su entidad financiera y deja claro que condiciones y aprobación dependen de cada banco y crédito.

## Crédito de Emergencia Comfandi

Fuentes oficiales:

- [Crédito de Emergencia de Comfandi](https://www.comfandi.com.co/personas/credito-y-seguros/credito-de-emergencia)
- [Paquete de subsidios y alivios de emergencia de Comfandi](https://www.comfandi.com.co/personas/subsidios/subsidios-de-emergencia)
- [Preguntas frecuentes del Crédito de Emergencia](https://back-api-prd.comfandi.com.co/sites/default/files/2026-08/Preguntas%20frecuentes%20cr%C3%A9dito%20de%20emergencia.pdf)

Comfandi publica un crédito de libre destinación entre `$1.000.000` y `$20.000.000`, con plazo de hasta 60 meses y posibilidad de pagar la primera cuota hasta 60 días después del desembolso. La solicitud es digital mediante la App Mi Comfandi o la Sucursal Virtual Personas.

La oferta está dirigida exclusivamente a trabajadores dependientes afiliados en categorías A, B o C, con mínimo tres meses de afiliación y tres meses de antigüedad laboral. No aplica para trabajadores independientes ni pensionados. La aprobación y los tiempos de respuesta están sujetos a evaluación y a las políticas de crédito de Comfandi.

Cali No Para lo clasifica como `Disponible según entidad` porque existe un canal oficial activo, pero la aprobación es individual. La tarjeta aclara que se trata de deuda y no de un subsidio; tampoco publica una tasa concreta que no esté visible en la información oficial consultada.

## Checklist para actualizaciones

1. Abrir la fuente original y comprobar que responde.
2. Confirmar entidad, estado, fecha, beneficiarios y canal.
3. Verificar si ya existe formulario, requisitos y plazo.
4. Cambiar el estado solamente con evidencia primaria.
5. No copiar montos individuales, condiciones o fechas que no estén publicados.
6. Actualizar `lastVerified` en `src/data/ayudas.mjs`.
7. Ejecutar `npm test`, `npm run build` y revisar `dist/ayudas/index.html`.
