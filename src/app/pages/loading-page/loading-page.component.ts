import { ConnectorService } from './../../core/services/connector.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './loading-page.component.html',
})
export class LoadingPageComponent implements OnInit {

  constructor(public connectorService: ConnectorService) { }

  ngOnInit(): void {

  //  const onReconnectedHandler = this.connectorService.listeningServerEvent(ServerEventName.OnReconnected)();
  }

}
