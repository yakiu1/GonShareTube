import { VideoModle } from './video.modle';
export interface PlaylistModle {
  id: number,
  displayName: string,
  videos: VideoModle[],
}
