# Prompts: Construir animaciones específicas con LLMs

Prompts listos para copiar y pedir animaciones concretas. Úsalos junto con el system prompt de `02-remotion-system-prompt.md` para mejores resultados.

---

## 1. Video vertical para TikTok / Reels (9:16)

```
Crea un componente Remotion para un video vertical 1080x1920 (TikTok/Reels) que muestre:

- Fondo: degradado oscuro de arriba a abajo (#0a0a0a a #1a0a2e)
- Texto grande centrado que entra con spring animation desde abajo
- Subtítulo que aparece con fade-in 20 frames después del título
- Un gradiente circular de color (#7c3aed al 20% de opacidad) que pulsa suavemente
- Duración: 120 frames (4 segundos) a 30fps

El texto del título debe ser: "Tu texto aquí"
El subtítulo: "@tuusuario"

Sigue las reglas de Remotion: sin useState, siempre clampea los interpolate.
```

---

## 2. Intro con logo

```
Crea un componente Remotion "LogoIntro" con:

- Fondo negro (#000000)
- Logo centrado (imagen en public/logo.svg) que:
  - Entra con scale desde 0.3 a 1.0 usando spring (damping: 60, stiffness: 150) — efecto rebote
  - Simultáneamente hace fade-in de 0 a 1
- Debajo del logo, un texto "Nombre de Marca" que aparece con slide desde abajo 20 frames después
- Al final (frames 70–90), todo hace fade-out suavemente
- Dimensiones: 1920x1080, duración: 90 frames, 30fps

Usa staticFile("logo.svg") para referenciar el logo.
```

---

## 3. Ranking / top lista con stagger

```
Crea un componente Remotion "TopLista" con:

Props:
  titulo: string
  items: string[]  // array de 5 items

Animación:
- Fondo: #121212
- El título entra con fade + slide desde arriba en los primeros 20 frames
- Cada item de la lista aparece con slide desde la izquierda y fade-in
  - Stagger de 10 frames entre cada item
  - El primer item tiene delay de 25 frames
- El item #1 (index 0) tiene texto verde (#22c55e) y es más grande
- Los demás items tienen opacidad 0.85 y tamaño normal
- Al lado izquierdo de cada item va el número (1, 2, 3, 4, 5)
- Dimensiones: 1080x1920, 30fps, 150 frames

Sigue las reglas: sin useState, clampea todos los interpolate.
```

---

## 4. Contador de estadísticas animado

```
Crea un componente Remotion "StatCounter" con:

Props:
  stats: Array<{ label: string; value: number; suffix?: string }>

Ejemplo de uso:
  stats={[
    { label: "Usuarios activos", value: 12500, suffix: "+" },
    { label: "Videos creados", value: 87000 },
    { label: "Países", value: 42 },
  ]}

Animación:
- Cada stat anima su número de 0 al valor final usando interpolate
  - Los stats aparecen en stagger, 30 frames entre cada uno
  - El número usa Math.round() para no mostrar decimales
- Fondo oscuro, layout en columna centrada
- El label aparece debajo del número con fade-in
- Dimensiones: 1280x720, 30fps, 120 frames por stat (total dinámico)

Calcula durationInFrames automáticamente según cuántos stats hay.
```

---

## 5. Transición entre escenas con Sequence

```
Crea un video Remotion que tenga 3 escenas usando <Sequence>:

Escena 1 (frames 0–60): Pantalla de intro
  - Fondo: #0f172a
  - Texto "Capítulo 1" centrado con spring entry

Escena 2 (frames 60–120): Contenido
  - Fondo: #1e293b
  - 3 puntos de texto con stagger animation
  - Entre escena 1 y 2: cross-fade de 10 frames (overlapping Sequences)

Escena 3 (frames 120–180): Outro
  - Fondo negro
  - Logo + texto centrado con fade-in
  - Fade-out completo al final

Muéstrame cómo usar <Sequence from={x} durationInFrames={y}> para cada escena.
Dimensiones: 1920x1080, 30fps, 180 frames total.
```

---

## 6. Texto con efecto glitch

```
Crea un componente Remotion "GlitchText" con:

- Un texto grande centrado ("GLITCH") sobre fondo negro
- Efecto glitch: cada 5–8 frames, el texto se desplaza levemente en X y Y
  de forma aleatoria PERO determinista (usa Math.sin con el frame como seed, no Math.random)
- Capas de color: texto principal blanco, más 2 copias del texto en rojo (#ff0040) y cian (#00ffff)
  que se desplazan en direcciones opuestas con la misma lógica
- La intensidad del glitch aumenta y disminuye en ciclos de 30 frames

IMPORTANTE: no uses Math.random(). Usa funciones matemáticas con `frame` para
que sea reproducible frame por frame (Math.sin, Math.cos, etc.)

Dimensiones: 1280x720, 30fps, 90 frames.
```

---

## 7. Video con música y portada de álbum (tipo Spotify)

```
Crea un componente Remotion "AlbumCard" con las siguientes props:

Props:
  albumCover: string  // URL de la portada
  albumName: string
  artistName: string
  previewUrl?: string // URL del audio (30 segundos)

Animación:
- Fondo: la portada del álbum escalada al 125%, con filter: "blur(60px) brightness(0.3) saturate(1.5)"
- Un overlay de gradiente encima: rgba(0,0,0,0.5) arriba, rgba(0,0,0,0.2) centro, rgba(0,0,0,0.6) abajo
- La portada del álbum centrada en 280x280px con border-radius 12px y box-shadow
  - Entra con scale spring (from: 0.85, to: 1) y fade-in
- Nombre del álbum y artista debajo, aparecen con fade 10 frames después de la portada
- Si hay previewUrl, renderiza <Audio> empezando en frame 30, con fade-in de volumen 0→1 en 16 frames
- Dimensiones: 1080x1920, 30fps, 300 frames

Usa <Sequence from={30}><Audio src={previewUrl} /></Sequence> para el audio.
Usa Img de "remotion", no <img>.
```

---

## 8. Polaroid animado desde una foto

```
Crea un componente Remotion "PolaroidFrame" con:

Props:
  photoUrl: string
  caption: string

Animación:
- Fondo: papel texturizado (usa un fondo crema #faf7f2)
- Un marco polaroid centrado:
  - Borde blanco uniforme (40px arriba, izquierda y derecha, 100px abajo)
  - La foto adentro usando Img
  - Caption en la parte blanca inferior, con fuente tipo manuscrita si hay disponible
- El polaroid aparece con:
  - Drop-in: empieza desde -200px en Y y cae con spring (damping: 70, stiffness: 130)
  - Ligera rotación aleatoria determinista: Math.sin(caption.length) * 6 grados
- Una vez que llega, oscila suavemente (Math.sin(frame * 0.05) * 1.5 grados de rotación)
- Dimensiones: 1080x1920, 30fps, 120 frames

No uses Math.random(). La rotación inicial se deriva del caption para que sea consistente.
```

---

## 9. Generación masiva: múltiples variantes de un video

```
Tengo un componente Remotion "AnuncioVideo" que acepta estas props:
  { titulo: string; subtitulo: string; color: string; logoUrl: string }

Quiero renderizar 5 variantes diferentes en batch desde la línea de comandos.

Muéstrame:
1. Cómo usar la CLI de Remotion con --props para pasar props en JSON
2. Un script en bash o Node que renderice las 5 variantes en paralelo
3. Cómo nombrar los archivos de salida de forma automática (ej: variante-1.mp4, variante-2.mp4)

Variantes a renderizar:
  - { titulo: "Oferta Especial", color: "#ff4444", subtitulo: "Solo hoy" }
  - { titulo: "Nuevo Producto", color: "#4444ff", subtitulo: "Ya disponible" }
  - { titulo: "Temporada Baja", color: "#44aa44", subtitulo: "Hasta 60% off" }
  - { titulo: "Lanzamiento", color: "#ff8800", subtitulo: "Regístrate ahora" }
  - { titulo: "Black Friday", color: "#000000", subtitulo: "Las mejores ofertas" }
```

---

## 10. Renderizado en el navegador con @remotion/web-renderer

```
Quiero renderizar un video de Remotion directamente en el navegador (sin servidor) usando @remotion/web-renderer.

El video se llama "MiVideo" y sus props son: { nombre: string; color: string }

Muéstrame:
1. Cómo instalar y configurar @remotion/web-renderer en un proyecto React o Astro
2. La función completa para renderizar el video en el navegador y descargar el .mp4 resultante
3. Cómo mostrar el progreso del render (porcentaje) en la UI mientras se procesa
4. Qué limitaciones tiene este approach vs renderizar en servidor

El output debe ser un .mp4 vertical 1080x1920 a 30fps.
Importante: el render es client-side, los datos del usuario NUNCA salen del navegador.
```

---

## Tips para mejores resultados

- Siempre menciona la duración en frames Y en segundos (ej: "120 frames / 4 segundos a 30fps")
- Si el LLM no pone `extrapolateRight: "clamp"` en los `interpolate`, pídeselo explícitamente
- Para animaciones complejas, pide primero el esqueleto (estructura de Sequences) y luego el detalle de cada escena
- Si usas Tailwind en el proyecto, dile al LLM que puede usar `className` en vez de `style={{...}}`
- Para fuentes personalizadas, pídele que use `@remotion/google-fonts` y `delayRender`/`continueRender`
