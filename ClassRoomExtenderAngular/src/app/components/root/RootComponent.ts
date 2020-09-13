import {Component} from '@angular/core';

import {RootService} from 'src/app/services/RootService';

@Component({
  selector: 'root',
  templateUrl: './root.component.html'
})
export class RootComponent {

  public rootBackendMessage: any;

  public constructor(private rootService: RootService) {
    this.rootBackendMessage = rootService.getRootMessage();
  }
}
