import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  channelUrl: string = `${environment.apiEndpoint}#/home;channel=xxx`;

  constructor() { }

  ngOnInit(): void {
  }

}
