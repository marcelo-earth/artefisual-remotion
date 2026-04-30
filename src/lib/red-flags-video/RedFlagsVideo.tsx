import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import greenFlagImg from "./assets/green.webp?url";
import redFlagImg from "./assets/red.webp?url";

type Props = {
  userName: string;
  redFlags: number;
  greenFlags: number;
  total: number;
};

function getMessage(redFlags: number): string {
  if (redFlags === 0) return "Eres todo un green flag";
  if (redFlags <= 2) return "Casi puro green flag";
  if (redFlags <= 4) return "Tienes alguna que otra red flag";
  if (redFlags <= 6) return "Mitad green, mitad red flag";
  if (redFlags <= 8) return "Cuidado, tienes varias red flags";
  if (redFlags <= 10) return "Tienes bastantes red flags";
  return "Red flag de manual";
}

export const RedFlagsVideo = ({ userName, redFlags, greenFlags, total }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });
  const nameScale = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 14, stiffness: 100 } });
  const countScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 90 } });
  const flagsEntrance = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 16, stiffness: 80 } });
  const messageEntrance = spring({ frame: Math.max(0, frame - 26), fps, config: { damping: 18, stiffness: 70 } });

  const message = getMessage(redFlags);

  const redFlagEmojis = Array.from({ length: Math.min(redFlags, total) }, (_, i) => {
    const delay = i * 2;
    const emojiSpring = spring({
      frame: Math.max(0, frame - 22 - delay),
      fps,
      config: { damping: 10, stiffness: 160 },
    });
    return emojiSpring;
  });

  const greenFlagEmojis = Array.from({ length: Math.min(greenFlags, total) }, (_, i) => {
    const delay = i * 2;
    const emojiSpring = spring({
      frame: Math.max(0, frame - 22 - delay),
      fps,
      config: { damping: 10, stiffness: 160 },
    });
    return emojiSpring;
  });

  const bgColor = redFlags <= 3 ? "#0a1a0f" : redFlags <= 7 ? "#1a0f0a" : "#1a0a0a";
  const accentColor = redFlags <= 3 ? "#4ade80" : redFlags <= 7 ? "#fb923c" : "#f87171";
  const glowColor =
    redFlags <= 3
      ? "rgba(74, 222, 128, 0.18)"
      : redFlags <= 7
        ? "rgba(251, 146, 60, 0.18)"
        : "rgba(248, 113, 113, 0.18)";

  const displayName = userName ? `${userName},` : "";
  const pulse = 1 + Math.sin(frame / 12) * 0.015;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        backgroundImage: `radial-gradient(circle at 50% 35%, ${glowColor}, transparent 60%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Plus Jakarta Sans, Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        opacity: entrance,
        gap: 0,
        padding: "0 60px",
      }}
    >
      <div
        style={{
          fontSize: "5.2rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.7)",
          marginBottom: "1rem",
          textAlign: "center",
          transform: `scale(${nameScale})`,
          letterSpacing: "-0.02em",
        }}
      >
        {displayName || "Tus resultados"}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "0.5rem",
          transform: `scale(${countScale * pulse})`,
        }}
      >
        <Img src={redFlagImg} style={{ width: "12rem", height: "12rem", objectFit: "contain" }} />
        <span
          style={{
            fontSize: "13rem",
            fontWeight: 900,
            color: accentColor,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {redFlags}
        </span>
      </div>

      <div
        style={{
          fontSize: "4.8rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.6)",
          marginBottom: "3rem",
          textAlign: "center",
          transform: `scale(${countScale})`,
        }}
      >
        red flags
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          marginBottom: "3rem",
          width: "100%",
          opacity: flagsEntrance,
        }}
      >
        {redFlags > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              justifyContent: "center",
            }}
          >
            {redFlagEmojis.map((s, i) => (
              <Img
                key={i}
                src={redFlagImg}
                style={{
                  width: "3.8rem",
                  height: "3.8rem",
                  objectFit: "contain",
                  transform: `scale(${s})`,
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        )}
        {greenFlags > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              justifyContent: "center",
            }}
          >
            {greenFlagEmojis.map((s, i) => (
              <Img
                key={i}
                src={greenFlagImg}
                style={{
                  width: "3.8rem",
                  height: "3.8rem",
                  objectFit: "contain",
                  transform: `scale(${s})`,
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: "4.2rem",
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          lineHeight: 1.25,
          transform: `translateY(${interpolate(messageEntrance, [0, 1], [20, 0])}px) scale(${messageEntrance})`,
          opacity: messageEntrance,
        }}
      >
        {message}
      </div>
    </AbsoluteFill>
  );
};
