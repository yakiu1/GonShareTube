import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  constructor() { }

  connectToServe(): HubConnection {

    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:44386/tubehub')
      .build();

    return connection;
  }
}
