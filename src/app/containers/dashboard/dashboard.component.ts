import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  // Total de estadísticas
  totalStats = 48;

  constructor(private readonly router: Router) {}

  navigateToUrl(url: string): void {
    this.router.navigate([url]);
  }
}
