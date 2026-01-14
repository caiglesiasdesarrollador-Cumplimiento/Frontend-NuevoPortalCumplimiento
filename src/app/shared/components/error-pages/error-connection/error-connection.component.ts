import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-connection',
  templateUrl: './error-connection.component.html',
  styleUrls: ['./error-connection.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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



