import { renderMediaOnWeb } from "@remotion/web-renderer";
import { PolaroidPhotoVideo } from "./PolaroidPhotoVideo";

export async function renderPolaroidVideoClientSide(inputProps: {
  photoDataUrl: string;
  caption: string;
}): Promise<Blob> {
  const { getBlob } = await renderMediaOnWeb({
    composition: {
      id: "PolaroidPhotoVideo",
      component: PolaroidPhotoVideo,
      durationInFrames: 120,
      fps: 30,
      width: 1080,
      height: 1920,
    },
    inputProps,
    licenseKey: "free-license",
  } as Parameters<typeof renderMediaOnWeb>[0]);

  return getBlob();
}
