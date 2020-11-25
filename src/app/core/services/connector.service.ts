import { ServerEventName } from './../../difs/server-event-name.enum';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, IRetryPolicy, RetryContext } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  serveConnection: HubConnection;
  onConnected$ = new Subject<boolean>();
  onReceiveTubeLink$ = new Subject<string>();
  onReconnecting$ = new Subject<boolean>();
  onReconnected$ = new Subject<boolean>();
  onReceiveTubeTime$ = new Subject<{ videoId: string, time: number }>();
  onReceiveStopTube$ = new Subject<boolean>();

  constructor() { }

  connectToServe(): void {
    const connection = new HubConnectionBuilder()
      .withUrl('http://sharetubeservice-env.eba-em77nq23.us-east-1.elasticbeanstalk.com/tubehub')
      .withAutomaticReconnect(new GonRerty(10000))
      .build();
    this.serveConnection = connection;
    this.serveConnection.start();

    this.serveConnection.on('Connected', () => {
      this.onConnected$.next(true);
    });

    this.serveConnection.on('ReceiveTubeLink', (tubeLink) => {
      this.onReceiveTubeLink$.next(tubeLink);
    });

    this.serveConnection.on('ReceiveStopTube', (tubeLink) => {
      this.onReceiveStopTube$.next(tubeLink);
    });

    this.serveConnection.on('ReceiveTubeTime', (videoId: string, time: number) => {
      this.onReceiveTubeTime$.next({ videoId, time });
    })

    this.serveConnection.onreconnecting(() => {
      this.onReconnecting$.next(true);
    })

    this.serveConnection.onreconnected(() => {
      this.onReconnected$.next(true);
    })
  }


  listeningServerEvent(eventName: ServerEventName): any {
    return () => {
      // const listeningInfo: ConnectionListeningInfo = {
      //   listenHandler: this[eventName + '$']
      // }
      return this[eventName + '$']
    }
  }

}


export class GonRerty implements IRetryPolicy {

  _retryMilliseconds: number;

  constructor(milliseconds: number) {
    this._retryMilliseconds = milliseconds;
  }

  nextRetryDelayInMilliseconds(retryContext: RetryContext): number | null {
    if (retryContext.previousRetryCount >= 1000) {
      console.log('離線太久了，已經放棄與伺服器連線');
      return null;
    }
    return this._retryMilliseconds;
  }

}
