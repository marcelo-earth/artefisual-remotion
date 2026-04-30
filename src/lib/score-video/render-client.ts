import { renderMediaOnWeb } from "@remotion/web-renderer";
import { ScoreVideo } from "./ScoreVideo";

const COMP_ID = "ScoreVideo";
const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 1920;
const VIDEO_FPS = 30;
const DURATION_IN_FRAMES = 90;

export async function renderScoreVideoClientSide(inputProps: {
  score: number;
  correct: number;
  total: number;
  testTitle: string;
  userName?: string;
}): Promise<Blob> {
  const { getBlob } = await renderMediaOnWeb({
    composition: {
      id: COMP_ID,
      component: ScoreVideo,
      durationInFrames: DURATION_IN_FRAMES,
      fps: VIDEO_FPS,
      width: VIDEO_WIDTH,
      height: VIDEO_HEIGHT,
    },
    inputProps,
    licenseKey: "free-license",
  } as Parameters<typeof renderMediaOnWeb>[0]);

  return getBlob();
}
