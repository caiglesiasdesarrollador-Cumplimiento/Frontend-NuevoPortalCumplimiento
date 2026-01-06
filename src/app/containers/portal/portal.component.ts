import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import {
  IPortalStatCard,
  IPortalUserInfo,
  PORTAL_STATS_DATA,
  DEFAULT_USER_INFO,
} from './portal.interface';

@Component({
  standalone: false,
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalComponent {
  // ✅ Información del usuario
  userInfo: IPortalUserInfo = DEFAULT_USER_INFO;

  // ✅ Estadísticas
  informacionGeneral: IPortalStatCard[] = PORTAL_STATS_DATA;

  constructor(private readonly router: Router) {}

  navigateToUrl(url: string): void {
    this.router.navigate([url]);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const fallback = img.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  }
}
