import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  userName: string;
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
};

type Trait = {
  label: string;
  value: number;
  color: string;
};

function levelLabel(value: number): string {
  if (value >= 67) return "Alto";
  if (value >= 34) return "Medio";
  return "Bajo";
}

export const PersonalityVideo = ({
  userName,
  openness,
  conscientiousness,
  extraversion,
  agreeableness,
  neuroticism,
}: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });
  const titleScale = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 14, stiffness: 100 } });

  const traits: Trait[] = [
    { label: "Apertura", value: openness, color: "#B388FF" },
    { label: "Responsabilidad", value: conscientiousness, color: "#4ade80" },
    { label: "Extraversión", value: extraversion, color: "#fb923c" },
    { label: "Amabilidad", value: agreeableness, color: "#38bdf8" },
    { label: "Neuroticismo", value: neuroticism, color: "#f87171" },
  ];

  const displayName = userName ? `${userName}, este eres tú` : "Tu perfil";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(circle at 50% 25%, rgba(179,136,255,0.16), transparent 60%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Plus Jakarta Sans, Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        opacity: entrance,
        padding: "0 90px",
      }}
    >
      <div
        style={{
          fontSize: "3.2rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.6)",
          marginBottom: "0.6rem",
          textAlign: "center",
          transform: `scale(${titleScale})`,
        }}
      >
        Test de personalidad
      </div>

      <div
        style={{
          fontSize: "4rem",
          fontWeight: 800,
          color: "white",
          marginBottom: "4rem",
          textAlign: "center",
          letterSpacing: "-0.02em",
          transform: `scale(${titleScale})`,
          lineHeight: 1.1,
        }}
      >
        {displayName}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2.4rem",
          width: "100%",
        }}
      >
        {traits.map((t, i) => {
          const delay = 14 + i * 6;
          const rowEntrance = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 16, stiffness: 90 },
          });
          const fillProgress = spring({
            frame: Math.max(0, frame - delay - 4),
            fps,
            config: { damping: 20, stiffness: 70 },
          });
          const fillPct = (t.value * fillProgress).toFixed(1);
          const shownValue = Math.round(t.value * fillProgress);

          return (
            <div
              key={t.label}
              style={{
                opacity: rowEntrance,
                transform: `translateX(${interpolate(rowEntrance, [0, 1], [-40, 0])}px)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.8rem",
                }}
              >
                <span style={{ fontSize: "2.4rem", fontWeight: 700, color: "white" }}>
                  {t.label}
                </span>
                <span style={{ fontSize: "2rem", fontWeight: 700, color: t.color }}>
                  {levelLabel(t.value)} · {shownValue}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "1.6rem",
                  borderRadius: "1rem",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${fillPct}%`,
                    height: "100%",
                    borderRadius: "1rem",
                    backgroundColor: t.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
