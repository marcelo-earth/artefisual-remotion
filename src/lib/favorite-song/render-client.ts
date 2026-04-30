import { renderMediaOnWeb } from "@remotion/web-renderer";
import { FavoriteSongVideo } from "./FavoriteSongVideo";

export async function renderFavoriteSongVideoClientSide(inputProps: {
  songTitle: string;
  artistName: string;
  albumCover: string;
  previewUrl?: string;
  blurredBackground?: string;
}): Promise<Blob> {
  const { getBlob } = await renderMediaOnWeb({
    composition: {
      id: "FavoriteSongVideo",
      component: FavoriteSongVideo,
      durationInFrames: 300,
      fps: 30,
      width: 1080,
      height: 1920,
    },
    inputProps,
    licenseKey: "free-license",
  } as Parameters<typeof renderMediaOnWeb>[0]);

  return getBlob();
}
