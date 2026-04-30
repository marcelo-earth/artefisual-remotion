import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";

type Props = {
  songTitle: string;
  artistName: string;
  albumCover: string;
  previewUrl?: string;
  // Fondo ya difuminado (blur "horneado" en pixeles) para que funcione en
  // cualquier navegador. Safari/WebKit no aplica filter: blur() en el render.
  blurredBackground?: string;
};

const INTRO_FRAMES = 60;

const IntroCard = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 14, INTRO_FRAMES - 12, INTRO_FRAMES],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const scale = interpolate(frame, [0, 18], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "88px 72px",
      }}
    >
      <div
        style={{
          fontSize: "5rem",
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          textShadow: "0 4px 24px rgba(0,0,0,0.8)",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        ¿Mi canción <span style={{ color: "#1DB954" }}>favorita</span>?
      </div>
    </AbsoluteFill>
  );
};

const SongReveal = ({
  songTitle,
  artistName,
  albumCover,
}: {
  songTitle: string;
  artistName: string;
  albumCover: string;
}) => {
  const frame = useCurrentFrame();

  const coverEntrance = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const coverScale = interpolate(frame, [0, 18], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textEntrance = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textSlide = interpolate(frame, [10, 26], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "88px 72px",
      }}
    >
      <Img
        src={albumCover}
        style={{
          width: "360px",
          height: "360px",
          borderRadius: "16px",
          objectFit: "cover",
          boxShadow: "0 32px 100px rgba(0,0,0,0.7)",
          marginBottom: "56px",
          opacity: coverEntrance,
          transform: `scale(${coverScale})`,
        }}
      />

      <div
        style={{
          fontSize: "4.6rem",
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          lineHeight: 1.15,
          marginBottom: "18px",
          maxWidth: "92%",
          textShadow: "0 2px 18px rgba(0,0,0,0.8)",
          opacity: textEntrance,
          transform: `translateY(${textSlide}px)`,
        }}
      >
        {songTitle}
      </div>

      <div
        style={{
          fontSize: "3.1rem",
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          textShadow: "0 2px 14px rgba(0,0,0,0.8)",
          opacity: textEntrance,
        }}
      >
        {artistName}
      </div>
    </AbsoluteFill>
  );
};

export const FavoriteSongVideo = ({
  songTitle,
  artistName,
  albumCover,
  previewUrl,
  blurredBackground,
}: Props) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        fontFamily: "Plus Jakarta Sans, Inter, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {previewUrl ? (
        <Audio
          src={previewUrl}
          trimAfter={300}
          volume={(f: number) =>
            interpolate(f, [0, 12, 282, 300], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      ) : null}

      <Img
        src={blurredBackground ?? albumCover}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: blurredBackground ? undefined : "blur(75px) brightness(0.3) saturate(1.4)",
          transform: blurredBackground ? undefined : "scale(1.25)",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <Sequence durationInFrames={INTRO_FRAMES}>
        <IntroCard />
      </Sequence>

      <Sequence from={INTRO_FRAMES}>
        <SongReveal songTitle={songTitle} artistName={artistName} albumCover={albumCover} />
      </Sequence>
    </AbsoluteFill>
  );
};
