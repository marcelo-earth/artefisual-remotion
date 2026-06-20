# artefisual-remotion

Web en Astro que renderiza videos de Remotion directamente en el navegador usando `@remotion/web-renderer` y WebCodecs. Nada se sube a un servidor: el video se genera completamente en el dispositivo del usuario.

## Qué hace

Una colección de tests interactivos que producen un video vertical (9:16, `.mp4`) listo para compartir en historias y reels:

| Test | Descripción |
|---|---|
| 📸 Mi polaroid | Toma o sube una foto y genera un video polaroid animado |
| 🎧 Mi canción favorita | Busca una canción y arma un video con su portada y 30 s del tema |
| 🎤 Mi top 5 de artista | Elige 5 canciones de un artista y las ordena en un ranking con comparaciones |
| 🎵 Rankea tu álbum favorito | Igual que el anterior pero dentro de un álbum, con su portada como fondo |
| 🧠 Tests de personalidad y trivia | Mini quizzes (red flags, personalidad OCEAN, etc.) que terminan en un video con tu resultado |

La música y las portadas vienen de la API pública de búsqueda de iTunes de Apple.

## Stack

- [Astro](https://astro.build) con adaptador Vercel (SSR)
- [Remotion](https://www.remotion.dev) + `@remotion/web-renderer` para render client-side
- React para los componentes de video
- Tailwind CSS + Plus Jakarta Sans
- TypeScript

## Estructura

```
src/
  lib/          # Componentes Remotion (.tsx) + render clients por tipo de video
  pages/
    remotion/   # Rutas de cada test
    api/        # Proxy de imagen e iTunes
  data/         # Tipos y definiciones de los fun tests
  components/   # Componentes Astro reutilizables
prompts/        # Prompts para construir videos con LLMs
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run preview
```

## Prompts

La carpeta `prompts/` tiene prompts listos para copiar y pegar en cualquier LLM (Claude, ChatGPT, Cursor) y construir animaciones con Remotion. Ver [`prompts/README.md`](./prompts/README.md).

## Repos relacionados

- [`arte-remotion`](https://github.com/artefisual/arte-remotion): Remotion Studio con 75+ templates de animación.
