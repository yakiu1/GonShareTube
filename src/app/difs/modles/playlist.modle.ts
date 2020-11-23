import { VideoModle } from './video.modle';
export interface PlaylistModle {
  id: number,
  displayNmae: string,
  videos: VideoModle[],
}
