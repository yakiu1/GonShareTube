import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YtPlayerService {
  reframed: boolean;
  current_ytPlayer: YT.Player;
  $isYoutubeAPIReady: Subject<boolean> =  new Subject<boolean>();


  constructor() {
  }


  downloadYoutubeAPI() {
    const tag = document.createElement('script');

    if (document.getElementsByTagName('script')[1].src !== 'https://www.youtube.com/iframe_api') {
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window['onYouTubeIframeAPIReady'] = () => {
        this.$isYoutubeAPIReady.next(false);
      }
    }
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
