import { Component } from '@angular/core';
import { ElectronService } from './backend/electron/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'template';

  public userHome: string | null;
  constructor(private electronService: ElectronService) {
    this.userHome = this.electronService.getUserName();
  }
}
