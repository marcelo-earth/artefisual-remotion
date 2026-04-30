import { renderMediaOnWeb } from "@remotion/web-renderer";
import { AlbumRankingVideo } from "./AlbumRankingVideo";

export async function renderAlbumRankingVideoClientSide(inputProps: {
  artistName: string;
  albumName: string;
  albumCover: string;
  songs: string[];
  previewUrl?: string;
  blurredBackground?: string;
}): Promise<Blob> {
  const { getBlob } = await renderMediaOnWeb({
    composition: {
      id: "AlbumRankingVideo",
      component: AlbumRankingVideo,
      durationInFrames: 360,
      fps: 30,
      width: 1080,
      height: 1920,
    },
    inputProps,
    licenseKey: "free-license",
  } as Parameters<typeof renderMediaOnWeb>[0]);

  return getBlob();
}
