import { Component } from '@angular/core';
import { ToasterService, ToasterContainerComponent, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  template: `   
      <toaster-container></toaster-container>      
      <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  providers: [
    ToasterService
  ]
})
export class AppComponent {
  title = 'app works!';
  public toasterconfig: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: true,
    timeout: 10000,
    limit: 1
  });
  constructor(
    private toaster: ToasterService
  ) { }

}
