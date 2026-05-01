import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  photoDataUrl: string;
  caption: string;
};

const SPARKLE_COUNT = 10;
const SPARKLE_ANGLES = Array.from({ length: SPARKLE_COUNT }, (_, i) => (i / SPARKLE_COUNT) * Math.PI * 2);

export const PolaroidPhotoVideo = ({ photoDataUrl, caption }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashOpacity = interpolate(frame, [0, 2, 12], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dropIn = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  const translateY = interpolate(dropIn, [0, 1], [-500, 0]);
  const rotation = interpolate(dropIn, [0, 1], [14, -3]);
  const polaroidOpacity = interpolate(dropIn, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

  const swayFrame = Math.max(0, frame - 30);
  const swayDecay = interpolate(swayFrame, [0, 40], [1, 0], { extrapolateRight: "clamp" });
  const sway = Math.sin(swayFrame / 6) * 2.5 * swayDecay;

  const sparkleStart = 32;

  const bgOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1035",
        backgroundImage:
          "radial-gradient(ellipse at 50% 20%, rgba(180,100,255,0.25) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(255,100,150,0.12) 0%, transparent 45%)",
        fontFamily: "Georgia, 'Times New Roman', serif",
        overflow: "hidden",
        opacity: bgOpacity,
      }}
    >
      {SPARKLE_ANGLES.map((angle, i) => {
        const sparkleFrame = Math.max(0, frame - sparkleStart - i * 1.5);
        const dist = interpolate(sparkleFrame, [0, 25], [0, 200 + (i % 3) * 60], {
          extrapolateRight: "clamp",
        });
        const sparkleOpacity = interpolate(sparkleFrame, [0, 5, 25], [0, 1, 0], {
          extrapolateRight: "clamp",
        });
        const size = 6 + (i % 4) * 4;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? "#f9c74f" : i % 3 === 1 ? "#ff70a6" : "#a0c4ff",
              opacity: sparkleOpacity,
              transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px))`,
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "24px 24px 96px 24px",
            borderRadius: "4px",
            transform: `translateY(${translateY}px) rotate(${rotation + sway}deg)`,
            opacity: polaroidOpacity,
            boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
            width: "520px",
          }}
        >
          <Img
            src={photoDataUrl}
            style={{
              width: "472px",
              height: "472px",
              objectFit: "cover",
              display: "block",
              borderRadius: "2px",
            }}
          />
          <p
            style={{
              textAlign: "center",
              color: "#374151",
              fontSize: "2.4rem",
              fontWeight: 500,
              margin: 0,
              marginTop: "24px",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              lineHeight: 1.2,
            }}
          >
            {caption}
          </p>
        </div>
      </AbsoluteFill>

      {flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "white",
            opacity: flashOpacity,
            zIndex: 20,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          bottom: "56px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: "1.8rem",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.06em",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontStyle: "normal",
        }}
      >
        artefisual.com
      </div>
    </AbsoluteFill>
  );
};
