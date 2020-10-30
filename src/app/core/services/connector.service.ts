import { ServerEventName } from './../../difs/server-event-name.enum';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

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
      .withAutomaticReconnect()
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
