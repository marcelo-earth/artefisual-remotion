# Remotion Prompts

Prompts listos para copiar y pegar en tu agente de IA favorito (Claude, ChatGPT, Cursor, Copilot) y construir videos con código usando Remotion.

## ¿Qué es esto?

Remotion convierte React en video. En vez de editar en Premiere o After Effects, escribes componentes de React que se renderizan frame por frame y producen un `.mp4`. Con LLMs puedes generar animaciones complejas en minutos.

## Prompts disponibles

| Archivo | Para qué sirve |
|---|---|
| [`01-setup-remotion-studio.md`](./01-setup-remotion-studio.md) | Arranca un proyecto Remotion desde cero con un "Hello World" animado |
| [`02-remotion-system-prompt.md`](./02-remotion-system-prompt.md) | System prompt para darle contexto completo de Remotion a tu LLM |
| [`03-build-animations.md`](./03-build-animations.md) | Prompts para pedir animaciones específicas (texto, gráficas, transiciones, video vertical) |

## Flujo recomendado

1. Pega `02-remotion-system-prompt.md` como system prompt o contexto inicial.
2. Usa `01-setup-remotion-studio.md` para arrancar tu proyecto.
3. Usa los prompts de `03-build-animations.md` para pedir componentes nuevos.

## Stack de estos repos

- [`arte-remotion`](https://github.com/artefisual/arte-remotion): Remotion Studio con 75+ templates de animación listos para usar.
- [`artefisual-remotion`](https://github.com/artefisual/artefisual-remotion): Web en Astro que renderiza videos de Remotion en el navegador (client-side con `@remotion/web-renderer`).
