import { Component } from '@angular/core';
import { NgsRevealConfig } from 'ngx-scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'masterTemplate';

  constructor(config: NgsRevealConfig) {
    config.origin = 'left';
    config.distance = '100px';
  }
}
