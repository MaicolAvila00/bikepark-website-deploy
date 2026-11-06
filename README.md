# Nacho Bike Park — Sitio web comunitario

Sitio estático de la comunidad de MTB **Nacho Bike Park** (Bogotá, Colombia): información del parque, reglas, atracciones y agenda de eventos.

🌐 **Live:** https://bikepark-website.vercel.app

---

## Stack

- **Next.js 14** (App Router, `output: 'export'`)
- **React 18**
- **CSS modular** (tokens, base, components, layout, globals)
- **ESLint** + **Node test runner** (sin dependencias extra)
- Deploy automático en **Vercel** (static export)

---

## Estructura del proyecto

```
├── app/                    # Páginas Next.js (App Router)
│   ├── page.js             # Home
│   ├── atracciones/        # Atracciones del parque
│   ├── eventos/            # Agenda de eventos (lista + detalle [id])
│   ├── reglas/             # Reglas y categorías de seguridad
│   ├── sobre/              # Acerca del parque / comunidad
│   ├── layout.js           # Layout raíz + metadata
│   ├── not-found.js        # 404
│   ├── robots.js           # robots.txt
│   └── sitemap.xml/route.js# sitemap.xml
├── components/
│   ├── ui/                 # Botón, Card, Logo, PageHeader
│   ├── layout/             # Header, Footer
│   ├── sections/           # Secciones reutilizables (grids, cards, info)
│   └── hooks/              # useImageFallback
├── data/                   # JSON estáticos (atracciones, eventos, navegación, etc.)
├── lib/                    # Utilidades (fechas, reglas, site config, data access)
├── public/
│   ├── images/             # Fotos del parque, hero, zonas
│   ├── events/             # Imágenes de eventos
│   └── fonts/              # Fuentes locales (Anton, Archivo, Public Sans)
├── scripts/
│   ├── validar-datos.cjs   # Validación de JSON (schema, required fields)
│   └── generar-og-placeholder.js # Genera OG image placeholder
├── styles/
│   ├── tokens.css          # Design tokens (colores, spacing, tipografía)
│   ├── base.css            # Reset, tipografía base
│   ├── components.css      # Estilos de componentes UI
│   ├── layout.css          # Grid, header, footer, containers
│   └── globals.css         # Importa todo + utilidades
├── tests/                  # Tests unitarios (Node --test)
└── .github/workflows/ci.yml# CI: validate, test, lint, build
```

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (`next dev`) |
| `npm run build` | Build de producción estático (`next build` → `out/`) |
| `npm run lint` | ESLint |
| `npm run validate:data` | Valida JSON de `data/` contra esquemas |
| `npm run test` | Ejecuta tests (`node --test tests/*.test.js`) |
| `npm run serve` | Sirve `out/` con `serve` para prueba local |

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev        # http://localhost:3000

# Validar datos antes de commit
npm run validate:data

# Tests
npm run test

# Lint
npm run lint

# Build + preview local
npm run build
npm run serve      # http://localhost:3000 (sirve out/)
```

---

## Validación de datos

`scripts/validar-datos.cjs` verifica:
- `data/atracciones.json` — campos requeridos, tipos, rangos
- `data/eventos.json` — fechas ISO, slugs únicos, imágenes existentes
- `data/navegacion.json` — estructura de menú
- `data/informativa.json` — contenido informativo
- `data/novedades.json` — noticias/actualizaciones

Ejecútalo antes de commitear cambios en `data/`.

---

## CI/CD

**GitHub Actions** (`.github/workflows/ci.yml`) en cada push/PR a `main`:
1. `validate:data`
2. `test` (36 tests)
3. `lint`
4. `build` (export estático)

Deploy automático en **Vercel** conectado a rama `main`.

---

## Convenciones

- **CSS**: Tokens en `styles/tokens.css` (colores, spacing, tipografía, breakpoints). Usar variables CSS (`--color-*`, `--space-*`, `--font-*`).
- **Componentes**: Un archivo por componente en `components/`. Props tipadas con JSDoc.
- **Datos**: JSON en `data/`. Cambios → `npm run validate:data`.
- **Tests**: `tests/*.test.js` con `node --test`. Cobertura: reglas de negocio + data access.
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, `style:`, `docs:`).

---

## Despliegue

### Vercel (recomendado)
1. Conectar repo en vercel.com → Import Project
2. Vercel detecta Next.js + `output: 'export'` → configura solo
3. Cada push a `main` = deploy automático

### Otros (Netlify, Cloudflare Pages, GitHub Pages)
- Build command: `npm run build`
- Output directory: `out/`
- `npm run serve` para test local del build

---

## Licencia

Uso interno de la comunidad Nacho Bike Park. Sin licencia pública.