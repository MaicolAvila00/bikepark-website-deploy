import { useState } from 'react';

/**
 * useImageFallback - Estado compartido del fallback visual de imágenes.
 *
 * Encapsula el patrón `onError` (excepción vigente de `useState` documentada
 * en AGENTS.md): se asume la imagen disponible; si el <img> dispara onError,
 * el estado pasa a false y el componente consumidor muestra su placeholder
 * CSS (.placeholder-imagen en InfoSection / .placeholder-evento en EventCard).
 *
 * Elimina la duplicación del patrón que existía en ambos componentes.
 *
 * @returns {{ imagenDisponible: boolean, marcarIndisponible: () => void }}
 */
export default function useImageFallback() {
  const [imagenDisponible, setImagenDisponible] = useState(true);

  const marcarIndisponible = () => setImagenDisponible(false);

  return { imagenDisponible, marcarIndisponible };
}
