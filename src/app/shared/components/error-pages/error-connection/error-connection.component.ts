import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-connection',
  templateUrl: './error-connection.component.html',
  styleUrls: ['./error-connection.component.scss'],
  standalone: false
})
export class ErrorConnectionComponent {
  constructor(private location: Location) {}

  refreshPage(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }
}

