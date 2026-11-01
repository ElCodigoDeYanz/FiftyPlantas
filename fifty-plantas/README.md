# Fifty Plantas · pequeño sitio informativo de plantas

Extra breve de **Yanz Studio Systèmes**. Cuatro fichas editoriales: cinta, sansevieria, monstera y pothos. **Fifty Plantas** es un nombre provisional; no se ha comprobado disponibilidad comercial.

## Ejecutar

Node.js 24; entorno verificado 24.22.1. JavaScript compilado incluido, sin dependencias de producción:

```bash
npm start
```

Abre **http://127.0.0.1:8005**. Para editar TypeScript o ejecutar pruebas:

```bash
npm ci
npm run build
npm test
```

## Incluido

- Búsqueda por nombre común, nombre botánico y sinónimos, insensible a acentos y mayúsculas.
- Filtros sencillos de luz y riego, combinables con favoritos.
- Ficha con luz, riego, una observación de cuidado, clasificación para gatos/perros y enlaces a fuentes.
- Favoritos guardados únicamente en `localStorage` de este navegador. Si el almacenamiento falla, el catálogo sigue funcionando y los favoritos de la visita quedan en memoria.
- Ilustraciones SVG originales orientativas, no fotografías ni identificaciones botánicas.
- HTML semántico, controles etiquetados, foco visible, diseño adaptable y `prefers-reduced-motion`.
- Servidor local de archivos con lista cerrada de rutas, cabeceras de protección y sin APIs de escritura.

## Fuentes y límites

`src/catalog.ts` contiene los enlaces concretos de cada ficha: **Royal Horticultural Society (RHS)** para cuidados y **ASPCA** para toxicidad en gatos/perros. Revisados el 29/10/2026. `docs/FUENTES.md` explica la selección.

El contenido botánico es una síntesis informativa, **no datos sintéticos**. Las ilustraciones son interpretaciones visuales. No hay recomendaciones de riego cada cierto número fijo de días, identificación por imagen, diagnóstico, asesoría veterinaria o promesas de purificar el aire. Las categorías de filtros son simplificaciones editoriales; la ficha y la guía completa tienen más contexto. Las condiciones de las fuentes, algunas de interior en Reino Unido, no se han validado para un microclima concreto de Lima.

La especie debe identificarse correctamente antes de interpretar información de riesgo. La clasificación «no tóxica» no convierte una planta en alimento ni garantiza ausencia de malestar. Consulta a un veterinario si sospechas una ingestión.

## Privacidad

Sin cuentas, correo, formularios de contacto, ubicación, analítica, anuncios ni peticiones a APIs. Los favoritos permanecen en el dispositivo y se pueden retirar desde las tarjetas. No se sincronizan entre navegadores. Los enlaces de fuentes salen a páginas externas únicamente cuando la persona los abre; se usa `rel=noopener noreferrer`.

## Verificación y estado

**Implementado y comprobado:** catálogo, normalización de búsqueda, filtros, favoritos ante datos corruptos, fuentes configuradas, compilación estricta y servidor HTTP con rutas limitadas. Resultado de seis pruebas en `evidence/test-output.txt`. `evidence/dependency-audit.json` conserva `npm audit`, que no certifica seguridad completa ni revisa el binario de Node.

**Pendiente:** revisión visual y capturas reales de este extra. La revisión automática del navegador alcanzó el límite de uso durante la construcción de Entre; no se abrió otra ruta de automatización ni se fabricaron capturas. La adaptación móvil está implementada en CSS, pero no comprobada en un dispositivo real.

**Ampliación futura:** más fichas revisadas por especialista, vocabulario local, fotografías con licencia y mayor contraste validado en dispositivos. No se han publicado ni contratado servicios.
