export type OceanTrait = "O" | "C" | "E" | "A" | "N";

export interface FunTestQuestion {
  question: string;
  options: string[];
  correctIndex?: number;
  trait?: OceanTrait;
  reverse?: boolean;
}

export interface FunTest {
  slug: string;
  title: string;
  emoji: string;
  icon: string;
  shortDescription: string;
  disclaimer?: string;
  kind?: "trivia" | "personality";
  questions: FunTestQuestion[];
}

export const PERSONALITY_LIKERT = [
  "Muy de acuerdo",
  "De acuerdo",
  "Neutral",
  "En desacuerdo",
  "Muy en desacuerdo",
];

export const funTests: FunTest[] = [
  {
    slug: "remotion",
    title: "¿Qué tan Remotion eres?",
    emoji: "🎬",
    icon: "tabler:video",
    shortDescription: "Pon a prueba lo que sabes sobre crear videos con código.",
    questions: [
      {
        question: "¿Qué es Remotion?",
        options: [
          "Un framework de React para crear videos con código",
          "Una extensión de Photoshop para animaciones",
          "Un plugin de After Effects",
          "Un motor de videojuegos",
        ],
        correctIndex: 0,
      },
      {
        question: "¿En qué framework está basado Remotion?",
        options: ["Vue", "React", "Svelte", "Angular"],
        correctIndex: 1,
      },
      {
        question: "¿Qué hook de Remotion te dice en qué frame estás?",
        options: ["useFrame()", "useCurrentFrame()", "useTime()", "useTick()"],
        correctIndex: 1,
      },
      {
        question: "¿Cómo se llama el componente que define el contenido de un video en Remotion?",
        options: ["<Composition />", "<Video />", "<Scene />", "<Clip />"],
        correctIndex: 0,
      },
      {
        question: "¿Qué función se usa para animar valores entre frames de forma lineal?",
        options: ["animate()", "interpolate()", "tween()", "lerp()"],
        correctIndex: 1,
      },
      {
        question: "¿Cuál es la unidad de tiempo fundamental en Remotion?",
        options: ["Segundos", "Frames", "Milisegundos", "Beats"],
        correctIndex: 1,
      },
      {
        question: "¿Qué comando renderiza un video desde la terminal?",
        options: ["npx remotion render", "npx remotion export", "npx remotion build", "npx remotion compile"],
        correctIndex: 0,
      },
      {
        question: "¿Qué es Remotion Studio?",
        options: [
          "Un editor de audio",
          "Una interfaz visual para previsualizar composiciones",
          "Una IA que genera videos solo con texto",
          "Un servicio de hosting",
        ],
        correctIndex: 1,
      },
      {
        question: "¿Qué necesita Remotion para renderizar internamente?",
        options: ["Un navegador headless (Chromium)", "Photoshop", "Blender", "Solo FFmpeg, sin navegador"],
        correctIndex: 0,
      },
      {
        question: "¿Cómo se llama el hook que da info como fps, ancho y alto del video?",
        options: ["useComposition()", "useVideoConfig()", "useSettings()", "useCanvas()"],
        correctIndex: 1,
      },
      {
        question: "¿Qué tipo de proyecto es ideal para Remotion?",
        options: [
          "Videos generados dinámicamente con datos (reportes, certificados, etc.)",
          "Edición de video manual cuadro por cuadro",
          "Streaming en vivo",
          "Edición de audio",
        ],
        correctIndex: 0,
      },
      {
        question: "¿Quién creó Remotion?",
        options: ["Jonny Burger", "Evan You", "Guillermo Rauch", "Dan Abramov"],
        correctIndex: 0,
      },
    ],
  },
  {
    slug: "vibecoding",
    title: "¿Qué tan VibeCoder eres?",
    emoji: "✨",
    icon: "tabler:sparkles",
    shortDescription: "Descubre si programas con buen criterio o a ciegas.",
    questions: [
      {
        question: '¿Quién popularizó el término "vibe coding"?',
        options: ["Elon Musk", "Sam Altman", "Andrej Karpathy", "Linus Torvalds"],
        correctIndex: 2,
      },
      {
        question: '"Vibe coding" se refiere a...',
        options: [
          "Programar exclusivamente en assembly",
          "Programar guiándote por lo que la IA genera, sin revisar cada línea a fondo",
          "Una metodología ágil tradicional",
          "Un lenguaje de programación nuevo",
        ],
        correctIndex: 1,
      },
      {
        question: "¿Qué herramienta es más asociada al vibe coding?",
        options: ["Notepad", "Excel", "Photoshop", "Claude Code / Cursor / GitHub Copilot"],
        correctIndex: 3,
      },
      {
        question: "Un riesgo típico del vibe coding es:",
        options: [
          "Que el código compile más lento",
          "Aceptar código que no entiendes y que puede tener bugs o vulnerabilidades",
          "Que no puedas usar Git",
          "Que el editor se ponga de color rosa",
        ],
        correctIndex: 1,
      },
      {
        question: "¿Qué sí deberías hacer aunque hagas vibe coding?",
        options: [
          "Aceptar todo sin mirar para ir más rápido",
          "Desactivar las pruebas",
          "Revisar el diff y entender qué cambió antes de aceptarlo",
          "Eliminar el control de versiones",
        ],
        correctIndex: 2,
      },
      {
        question: "El vibe coding funciona mejor cuando...",
        options: [
          "Tienes buen criterio para evaluar si el resultado es correcto, aunque no escribas cada línea",
          "No sabes nada de programación",
          "Trabajas sin ningún contexto del proyecto",
          "Nunca revisas el resultado",
        ],
        correctIndex: 0,
      },
      {
        question: 'Una buena práctica para "vibe codear" con seguridad es:',
        options: [
          "Eliminar el linter",
          "No usar control de versiones",
          "Programar sin documentación del proyecto",
          "Tener tests automatizados que detecten si algo se rompió",
        ],
        correctIndex: 3,
      },
      {
        question: "El vibe coding es más una forma de...",
        options: [
          "Programar sin usar IA en absoluto",
          "Programar usando solo el mouse",
          "Trabajar con la IA, no de programar sin ella",
          "Reemplazar completamente a los programadores",
        ],
        correctIndex: 2,
      },
      {
        question: 'Si "vibe codeas" sin ningún conocimiento técnico previo...',
        options: [
          "Puedes construir cosas funcionales, pero te cuesta más detectar errores sutiles",
          "Nada, siempre funciona perfecto",
          "Es ilegal",
          "Tu código nunca compila",
        ],
        correctIndex: 0,
      },
      {
        question: "Una de las claves del vibe coding productivo es:",
        options: [
          "Dar instrucciones vagas y esperar lo mejor",
          "Nunca iterar sobre el primer resultado",
          "Evitar mencionar el objetivo final",
          "Dar contexto claro y específico a la IA sobre lo que quieres",
        ],
        correctIndex: 3,
      },
      {
        question: "¿Qué reemplaza el vibe coding en el flujo de trabajo tradicional?",
        options: [
          "Todo el proceso de diseño de producto",
          "Parte de la escritura manual de código línea por línea",
          "El control de versiones",
          "El testing manual",
        ],
        correctIndex: 1,
      },
      {
        question: "El vibe coding es popular sobre todo para:",
        options: [
          "Sistemas críticos de aviación",
          "Software médico certificado",
          "Prototipos rápidos y herramientas internas",
          "Cualquier sistema sin importar el riesgo",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    slug: "test-de-personalidad",
    title: "Test de personalidad",
    emoji: "🧬",
    icon: "tabler:brain",
    kind: "personality",
    shortDescription: "Descubre tu perfil de personalidad según el modelo Big Five (OCEAN).",
    disclaimer:
      "Este test es solo informativo y de curiosidad. No es una evaluación psicológica validada ni sustituye el criterio de un profesional.",
    questions: [
      {
        question: "Me gusta probar cosas nuevas y explorar ideas poco convencionales.",
        options: PERSONALITY_LIKERT,
        trait: "O",
      },
      {
        question: "Prefiero la rutina y lo familiar antes que la novedad.",
        options: PERSONALITY_LIKERT,
        trait: "O",
        reverse: true,
      },
      {
        question: "Soy organizado y me gusta planificar las cosas con anticipación.",
        options: PERSONALITY_LIKERT,
        trait: "C",
      },
      {
        question: "Suelo dejar las tareas para el último momento.",
        options: PERSONALITY_LIKERT,
        trait: "C",
        reverse: true,
      },
      {
        question: "Me energiza estar rodeado de gente y conocer personas nuevas.",
        options: PERSONALITY_LIKERT,
        trait: "E",
      },
      {
        question: "Después de socializar mucho necesito tiempo a solas para recargar.",
        options: PERSONALITY_LIKERT,
        trait: "E",
        reverse: true,
      },
      {
        question: "Me importa el bienestar de los demás y trato de ayudar cuando puedo.",
        options: PERSONALITY_LIKERT,
        trait: "A",
      },
      {
        question: "Suelo poner mis propios intereses por encima de los de otras personas.",
        options: PERSONALITY_LIKERT,
        trait: "A",
        reverse: true,
      },
      {
        question: "Me preocupo con frecuencia y me cuesta relajarme.",
        options: PERSONALITY_LIKERT,
        trait: "N",
      },
      {
        question: "Mantengo la calma incluso bajo presión.",
        options: PERSONALITY_LIKERT,
        trait: "N",
        reverse: true,
      },
    ],
  },
  {
    slug: "red-green-flags",
    title: "Red Flags vs Green Flags",
    emoji: "🚩",
    icon: "tabler:flag",
    shortDescription: "Descubre tu estilo de amor: ¿eres más red flag o green flag?",
    questions: [
      {
        question: "Tu pareja quiere salir con sus amigos sin ti. ¿Qué haces?",
        options: [
          "Le digo que disfrute, confío en la relación",
          "Le hago sentir culpable para que se quede",
          "Reviso su teléfono cuando vuelve",
          "Invento un plan para que no vaya",
        ],
        correctIndex: 0,
      },
      {
        question: "Tienen una discusión fuerte. ¿Cómo reaccionas?",
        options: [
          "Le aplico la ley del hielo por días",
          "Le saco en cara todos sus errores pasados",
          "Busco hablar con calma cuando ambos estemos tranquilos",
          "Amenazo con terminar para ganar la discusión",
        ],
        correctIndex: 2,
      },
      {
        question: "Tu pareja te comparte algo que la hace sentir vulnerable. ¿Qué haces?",
        options: [
          "Lo guardo para usarlo en su contra después",
          "La escucho sin juzgar y la apoyo",
          "Minimizo lo que siente",
          "Cambio de tema porque me incomoda",
        ],
        correctIndex: 1,
      },
      {
        question: "Sientes celos de alguien cercano a tu pareja. ¿Qué haces?",
        options: [
          "Le prohíbo hablar con esa persona",
          "Reviso sus redes a escondidas",
          "Le hago una escena para que se sienta mal",
          "Le cuento cómo me siento sin acusar",
        ],
        correctIndex: 3,
      },
      {
        question: "Tu pareja necesita una noche a solas. ¿Cómo lo tomas?",
        options: [
          "Respeto su espacio, todos lo necesitamos",
          "Le insisto hasta que cambie de planes",
          "Asumo que algo anda mal y la presiono",
          "Me enojo y la castigo con indiferencia",
        ],
        correctIndex: 0,
      },
      {
        question: "Cometiste un error que lastimó a tu pareja. ¿Qué haces?",
        options: [
          "Niego todo aunque sé que fue mi culpa",
          "Le doy la vuelta para que parezca culpa suya",
          "Reconozco mi error y me disculpo de verdad",
          "Me disculpo solo para que deje de reclamar",
        ],
        correctIndex: 2,
      },
      {
        question: "Tu pareja logra algo importante. ¿Cómo reaccionas?",
        options: [
          "Siento que me opaca y lo minimizo",
          "Celebro su logro genuinamente",
          "Le recuerdo que yo lo hice primero",
          "Llevo la conversación hacia mis propias cosas",
        ],
        correctIndex: 1,
      },
      {
        question: "No están de acuerdo en algo importante. ¿Qué haces?",
        options: [
          "Impongo lo que yo quiero",
          "Cedo siempre y luego se lo reclamo",
          "Lo dejo pasar pero guardo rencor",
          "Busco un punto medio escuchando su lado",
        ],
        correctIndex: 3,
      },
      {
        question: "Tu pareja te dice que algo tuyo le molesta. ¿Cómo respondes?",
        options: [
          "La escucho con apertura, aunque sea incómodo",
          "Me pongo a la defensiva de inmediato",
          "Le respondo con otro reclamo",
          "Me hago la víctima para evitar el tema",
        ],
        correctIndex: 0,
      },
      {
        question: "Tu pareja está pasando por un mal momento. ¿Qué haces?",
        options: [
          "Le digo que está exagerando",
          "Me alejo porque me agobia",
          "Estoy presente y le pregunto cómo ayudar",
          "Aprovecho para que sienta que me necesita",
        ],
        correctIndex: 2,
      },
      {
        question: "Descubres que quieren cosas distintas a futuro. ¿Cómo lo manejas?",
        options: [
          "Le oculto lo que realmente quiero",
          "Lo hablamos con honestidad y sin presión",
          "La presiono para que cambie de opinión",
          "Le prometo cosas que no pienso cumplir",
        ],
        correctIndex: 1,
      },
      {
        question: "Tu pareja te pone un límite claro. ¿Qué haces?",
        options: [
          "Insisto hasta que lo rompa",
          "Le hago sentir que no me quiere por eso",
          "Lo ignoro y hago lo que quiero",
          "Respeto su límite aunque no me guste",
        ],
        correctIndex: 3,
      },
    ],
  },
];

export function getFunTest(slug: string): FunTest | undefined {
  return funTests.find((t) => t.slug === slug);
}
