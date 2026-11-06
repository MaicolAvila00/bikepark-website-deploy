/** @type {import('next').NextConfig} */
const nextConfig = {
  // Modo estático puro: genera la carpeta out/ lista para servir en任何 hosting
  output: 'export',
  reactStrictMode: true,
  // Las imágenes se sirven sin optimización del servidor (requerido para export estático)
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
