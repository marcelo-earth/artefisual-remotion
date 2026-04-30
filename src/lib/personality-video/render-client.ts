import { renderMediaOnWeb } from "@remotion/web-renderer";
import { PersonalityVideo } from "./PersonalityVideo";

const COMP_ID = "PersonalityVideo";
const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 1920;
const VIDEO_FPS = 30;
const DURATION_IN_FRAMES = 120;

export async function renderPersonalityVideoClientSide(inputProps: {
  userName: string;
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}): Promise<Blob> {
  const { getBlob } = await renderMediaOnWeb({
    composition: {
      id: COMP_ID,
      component: PersonalityVideo,
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
