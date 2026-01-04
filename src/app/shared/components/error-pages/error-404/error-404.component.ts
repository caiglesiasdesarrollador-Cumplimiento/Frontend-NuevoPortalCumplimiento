import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.scss'],
  standalone: false
})
export class Error404Component {
  constructor(private router: Router) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }
}

