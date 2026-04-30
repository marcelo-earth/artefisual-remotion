import { renderMediaOnWeb } from "@remotion/web-renderer";
import { ArtistRankingVideo } from "./ArtistRankingVideo";

export async function renderArtistRankingVideoClientSide(inputProps: {
  artistName: string;
  songs: string[];
  previewUrl?: string;
  blurredBackground?: string;
}): Promise<Blob> {
  const { getBlob } = await renderMediaOnWeb({
    composition: {
      id: "ArtistRankingVideo",
      component: ArtistRankingVideo,
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
