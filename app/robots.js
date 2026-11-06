import { SITE_URL } from '../lib/site';

/**
 * robots.txt estático: indexa todo y anuncia el sitemap.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
