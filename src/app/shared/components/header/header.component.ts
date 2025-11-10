import { Component } from '@angular/core';
import { fadeAnimation } from '@app/shared/utils/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeAnimation],
})
export class HeaderComponent {}
