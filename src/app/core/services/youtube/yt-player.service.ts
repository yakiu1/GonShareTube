import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YtPlayerService {
  reframed: boolean;
  current_ytPlayer: YT.Player;

  constructor() {
  }

  startVideo(videoId: string): any {
    this.reframed = false;
    return this.current_ytPlayer = new window['YT'].Player('player', {
      videoId: videoId,
      events: {
        'onReady': this.videoReady.bind(this),
        // 'onError'
        // 'onStateChange': this
      }
    });
  }

  videoReady(): void {
    this.current_ytPlayer.playVideo();
  }

  playVideo(player: YT.Player, id: string): void {
    player.loadVideoById(id);
    player.playVideo();
  }
}
