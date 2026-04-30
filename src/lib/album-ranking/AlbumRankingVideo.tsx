import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";

type Props = {
  artistName: string;
  albumName: string;
  albumCover: string;
  songs: string[];
  previewUrl?: string;
  // Fondo ya difuminado (blur "horneado" en pixeles). Safari/WebKit no aplica
  // filter: blur() en el render client-side de Remotion.
  blurredBackground?: string;
};

const TOTAL_FRAMES = 360;
const INTRO_FRAMES = 60;
const AUDIO_START = 48;

const EqualizerBars = ({ frame }: { frame: number }) => {
  const bars = [0, 1, 2, 3];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "34px" }}>
      {bars.map((b) => {
        const h = 12 + (Math.sin((frame + b * 7) * 0.45) * 0.5 + 0.5) * 22;
        return (
          <div
            key={b}
            style={{
              width: "7px",
              height: `${h}px`,
              borderRadius: "3px",
              backgroundColor: "#1DB954",
              boxShadow: "0 0 8px rgba(29,185,84,0.5)",
            }}
          />
        );
      })}
    </div>
  );
};

const IntroCard = ({ albumName }: { albumName: string }) => {
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 72px",
      }}
    >
      <div style={{ opacity, transform: `scale(${scale})`, textAlign: "center" }}>
        <div
          style={{
            fontSize: "3.4rem",
            fontWeight: 800,
            color: "#1DB954",
            letterSpacing: "0.02em",
            marginBottom: "20px",
            textShadow: "0 2px 16px rgba(0,0,0,0.7)",
          }}
        >
          Top 5 de
        </div>
        <div
          style={{
            fontSize: "5rem",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "100%",
            textShadow: "0 4px 24px rgba(0,0,0,0.8)",
          }}
        >
          {albumName}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const RankingReveal = ({
  artistName,
  albumName,
  albumCover,
  songs,
  hasAudio,
}: {
  artistName: string;
  albumName: string;
  albumCover: string;
  songs: string[];
  hasAudio: boolean;
}) => {
  const frame = useCurrentFrame();

  const headerEntrance = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const coverScale = interpolate(frame, [0, 18], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nowPlaying = interpolate(frame, [78, 96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px 64px",
      }}
    >
      <Img
        src={albumCover}
        style={{
          width: "260px",
          height: "260px",
          borderRadius: "12px",
          objectFit: "cover",
          boxShadow: "0 24px 80px rgba(0,0,0,0.75)",
          marginBottom: "24px",
          opacity: headerEntrance,
          transform: `scale(${coverScale})`,
        }}
      />
      <div
        style={{
          fontSize: "3.6rem",
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          lineHeight: 1.15,
          maxWidth: "92%",
          marginBottom: "6px",
          textShadow: "0 2px 18px rgba(0,0,0,0.8)",
          opacity: headerEntrance,
        }}
      >
        {albumName}
      </div>
      <div
        style={{
          fontSize: "2.8rem",
          fontWeight: 500,
          color: "rgba(255,255,255,0.75)",
          marginBottom: "48px",
          textAlign: "center",
          textShadow: "0 2px 14px rgba(0,0,0,0.8)",
          opacity: headerEntrance,
        }}
      >
        {artistName}
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
        {songs.map((song, i) => {
          const delay = 20 + i * 9;
          const songEntrance = interpolate(frame, [delay, delay + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const slideX = interpolate(frame, [delay, delay + 14], [-40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const isTop = i === 0;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                opacity: songEntrance,
                transform: `translateX(${slideX}px)`,
              }}
            >
              <span
                style={{
                  fontSize: "3.7rem",
                  fontWeight: 800,
                  color: isTop ? "#1DB954" : "rgba(255,255,255,0.7)",
                  minWidth: "64px",
                  textAlign: "right",
                  textShadow: "0 2px 14px rgba(0,0,0,0.85)",
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontSize: "3.7rem",
                  color: isTop ? "white" : "rgba(255,255,255,0.95)",
                  fontWeight: isTop ? 700 : 500,
                  lineHeight: 1.2,
                  textShadow: "0 2px 14px rgba(0,0,0,0.85)",
                }}
              >
                {song}
              </span>
              {isTop && hasAudio ? (
                <span style={{ marginLeft: "auto", opacity: nowPlaying }}>
                  <EqualizerBars frame={frame} />
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const AlbumRankingVideo = ({
  artistName,
  albumName,
  albumCover,
  songs,
  previewUrl,
  blurredBackground,
}: Props) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#121212",
        fontFamily: "Plus Jakarta Sans, Inter, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {previewUrl ? (
        <Sequence from={AUDIO_START}>
          <Audio
            src={previewUrl}
            trimAfter={TOTAL_FRAMES - AUDIO_START}
            volume={(f: number) =>
              interpolate(
                f,
                [0, 16, TOTAL_FRAMES - AUDIO_START - 18, TOTAL_FRAMES - AUDIO_START],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            }
          />
        </Sequence>
      ) : null}

      <Img
        src={blurredBackground ?? albumCover}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: blurredBackground ? undefined : "blur(80px) brightness(0.28) saturate(1.6)",
          transform: blurredBackground ? undefined : "scale(1.25)",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      <Sequence durationInFrames={INTRO_FRAMES}>
        <IntroCard albumName={albumName} />
      </Sequence>

      <Sequence from={INTRO_FRAMES}>
        <RankingReveal
          artistName={artistName}
          albumName={albumName}
          albumCover={albumCover}
          songs={songs}
          hasAudio={Boolean(previewUrl)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
