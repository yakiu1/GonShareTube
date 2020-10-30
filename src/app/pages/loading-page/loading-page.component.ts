import { ConnectorService } from './../../core/services/connector.service';
import { Component, OnInit } from '@angular/core';
import { ServerEventName } from 'app/difs/server-event-name.enum';

@Component({
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {

  constructor(public connectorService: ConnectorService) { }

  ngOnInit(): void {

  //  const onReconnectedHandler = this.connectorService.listeningServerEvent(ServerEventName.OnReconnected)();
  }

}
