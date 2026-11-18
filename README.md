# VIBO STUDIO / THE DIGITAL ISSUE

Landing editorial oficial de **VIBO STUDIO**.

Experiencia digital pensada como una publicación: ISSUE 001 / 2026.
Identidad visual tomada del brochure (paper, ink, acid, tipografía condensada).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Motion (`motion/react`)
- Lucide (iconos funcionales)

## Arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Estructura

```
src/
  app/                 # layout, page, tokens CSS, favicon
  components/          # capítulos editoriales + UI
  data/                # proyectos, precios, servicios, contacto
public/
  brand/               # QR de WhatsApp
  work/                # capturas reales del portafolio
scripts/
  audit.mjs            # validación visual por viewport
```

## Contacto

El formulario usa `NEXT_PUBLIC_CONTACT_ENDPOINT` si está definido
(Formspree, Basin, Route Handler, etc.).

Si no hay endpoint, el envío abre WhatsApp con el mensaje preescrito.
Número verificado: `+57 300 593 2450`.

## Auditoría visual

Con el servidor en marcha:

```bash
node scripts/audit.mjs http://localhost:3000
```

Genera capturas en `screenshots/` y un informe en `screenshots/audit.json`
para desktop 1440, laptop 1024, tablet 768, mobile 390 y 360.
