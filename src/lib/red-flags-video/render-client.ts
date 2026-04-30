import { renderMediaOnWeb } from "@remotion/web-renderer";
import { RedFlagsVideo } from "./RedFlagsVideo";

const COMP_ID = "RedFlagsVideo";
const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 1920;
const VIDEO_FPS = 30;
const DURATION_IN_FRAMES = 180;

export async function renderRedFlagsVideoClientSide(inputProps: {
  userName: string;
  redFlags: number;
  greenFlags: number;
  total: number;
}): Promise<Blob> {
  const { getBlob } = await renderMediaOnWeb({
    composition: {
      id: COMP_ID,
      component: RedFlagsVideo,
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
