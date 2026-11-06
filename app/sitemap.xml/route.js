import { SITE_URL } from '../../lib/site';
import eventos from '../../data/eventos.json';

/**
 * Sitemap del sitio: /sitemap.xml generado en build-time.
 *
 * Implementado como Route Handler 100% estático (`force-static`) porque con
 * `output: 'export'` el route meta-interno que Next genera desde `app/sitemap.js`
 * exige `generateStaticParams` y falla en dev; un handler estático puro
 * funciona igual en dev y en `next build`.
 *
 * Cubre las rutas fijas + una URL por cada evento del JSON, así que añadir
 * eventos al JSON los indexa sin tocar este archivo.
 */
export const dynamic = 'force-static';

export async function GET() {
  const rutasFijas = ['', '/sobre', '/reglas', '/atracciones', '/eventos'];

  const urls = [
    ...rutasFijas.map((ruta) => `${SITE_URL}${ruta}`),
    ...eventos.map((evento) => `${SITE_URL}/eventos/${evento.id}`),
  ];

  const lastmod = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap-0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
