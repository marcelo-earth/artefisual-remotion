import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  score: number;
  correct: number;
  total: number;
  testTitle: string;
  userName?: string;
};

export const ScoreVideo = ({ score, correct, total, testTitle, userName }: Props) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(
    frame,
    [0, durationInFrames - 12],
    [0, score],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const entrance = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const pulse = 1 + Math.sin(frame / 10) * 0.02;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(179,136,255,0.18), transparent 60%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "Plus Jakarta Sans, Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        opacity: entrance,
      }}
    >
      {userName && (
        <div
          style={{
            fontSize: "2.8rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            marginBottom: "1rem",
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          {userName}
        </div>
      )}

      <div
        style={{
          fontSize: "3.36rem",
          fontWeight: 700,
          color: "white",
          marginBottom: "3rem",
          textAlign: "center",
          maxWidth: "85%",
          lineHeight: 1.2,
        }}
      >
        {testTitle}
      </div>

      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          transform: `scale(${pulse})`,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="12"
          />
        </svg>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#B388FF" />
              <stop offset="100%" stopColor="#FF80AB" />
            </linearGradient>
          </defs>
        </svg>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "4.2rem",
            fontWeight: 700,
            color: "white",
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>

      <div
        style={{
          fontSize: "2.45rem",
          color: "rgba(255,255,255,0.7)",
          marginTop: "2rem",
        }}
      >
        {correct}/{total} correctas
      </div>
    </AbsoluteFill>
  );
};
