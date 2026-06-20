# Prompt: Arrancar un proyecto Remotion con Hello World

Copia y pega este prompt en tu agente de IA para que te genere un proyecto Remotion completo con una animación de "Hello World".

---

## Prompt (cópialo tal cual)

```
Crea un proyecto Remotion desde cero con una animación "Hello World" que demuestre los conceptos clave del framework.

Pasos:
1. Inicializa el proyecto con bun (o npm si no está disponible):
   bun create video@latest my-remotion-project
   cd my-remotion-project

2. Reemplaza src/Composition.tsx con un componente HelloWorldComposition que:
   - Fondo oscuro (#0f0f0f) de 1920x1080
   - Texto "Hello World" que entra con spring animation (rebota desde abajo)
   - Subtítulo "Made with Remotion" que aparece con fade-in 15 frames después
   - Un círculo de fondo que pulsa suavemente usando interpolate en sin()
   - Duración: 90 frames a 30fps (3 segundos)

3. Actualiza src/Root.tsx para registrar la composición con:
   - id: "HelloWorld"
   - durationInFrames: 90
   - fps: 30
   - width: 1920, height: 1080

4. Escribe los imports correctos de remotion:
   - useCurrentFrame, useVideoConfig, spring, interpolate de "remotion"
   - AbsoluteFill para el contenedor principal

5. Reglas que DEBES seguir en Remotion:
   - NUNCA uses useState para animar, todo se calcula desde `frame`
   - SIEMPRE usa extrapolateLeft: "clamp" y extrapolateRight: "clamp" en interpolate
   - Los estilos van inline (style={{...}}), no className de Tailwind a menos que esté configurado
   - Para assets usa staticFile("nombre.png") importado de "remotion"

Muéstrame el código completo de cada archivo. Después de crearlo, corro `bun run dev` y abro el Remotion Studio en localhost:3000.
```

---

## Código de referencia: Hello World completo

Si tu agente prefiere código directo en vez del prompt, pega esto:

### `src/HelloWorld.tsx`

```tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HelloWorldComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideUp = spring({
    frame,
    fps,
    from: 120,
    to: 0,
    config: { damping: 80, stiffness: 200, mass: 0.8 },
  });

  const subtitleOpacity = spring({
    frame: frame - 15,
    fps,
    from: 0,
    to: 1,
    config: { damping: 100 },
  });

  const pulseScale = 1 + Math.sin(frame * 0.08) * 0.04;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f0f", fontFamily: "Inter, sans-serif" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          height: 600,
          transform: `translate(-50%, -50%) scale(${pulseScale})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.03em",
            transform: `translateY(${slideUp}px)`,
          }}
        >
          Hello World
        </h1>
        <p
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            margin: 0,
            opacity: subtitleOpacity,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Made with Remotion
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

### `src/Root.tsx`

```tsx
import { Composition } from "remotion";
import { HelloWorldComposition } from "./HelloWorld";

export const RemotionRoot = () => {
  return (
    <Composition
      id="HelloWorld"
      component={HelloWorldComposition}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

---

## Comandos para correr

```bash
# Instalar y abrir el studio visual
bun install
bun run dev

# Renderizar a MP4
bun run build --composition HelloWorld --output out/hello-world.mp4
```

---

## Próximo paso

Una vez que funciona el Hello World, pasa al prompt `03-build-animations.md` para construir animaciones más complejas.
