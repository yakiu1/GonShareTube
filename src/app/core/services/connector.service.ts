import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  serveConnection: HubConnection;

  constructor() { }

  connectToServe(): void {

    const connection = new HubConnectionBuilder()
      .withUrl('http://sharetubeservice-env.eba-em77nq23.us-east-1.elasticbeanstalk.com/tubehub')
      .build();
    this.serveConnection = connection;
    this.serveConnection.start();
  }

}
