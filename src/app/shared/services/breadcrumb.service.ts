import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ILibTbBreadcrumb } from 'tech-block-lib';
import { LoggerService } from './logger.service';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
  queryParams?: any;
  routerLink?: string[];
}

export interface HeaderBreadcrumbItem {
  label: string;
  icon?: string;
  routerLink?: string;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly breadcrumbSubject = new BehaviorSubject<ILibTbBreadcrumb>({});
  public breadcrumb$ = this.breadcrumbSubject.asObservable();

  // ✅ Nuevo: Items para el header breadcrumb
  private readonly breadcrumbItemsSubject = new BehaviorSubject<HeaderBreadcrumbItem[]>([]);
  public breadcrumbItems$ = this.breadcrumbItemsSubject.asObservable();

  constructor(
    private readonly router: Router,
    private readonly logger: LoggerService,
  ) {}

  // ✅ Establecer items del breadcrumb para el header
  setHeaderBreadcrumb(items: HeaderBreadcrumbItem[]): void {
    this.breadcrumbItemsSubject.next(items);
  }

  // ✅ Limpiar breadcrumb del header
  clearHeaderBreadcrumb(): void {
    this.breadcrumbItemsSubject.next([]);
  }

  // ✅ Configurar breadcrumb principal con home
  setBreadcrumb(items: BreadcrumbItem[]): void {
    const breadcrumbConfig: ILibTbBreadcrumb = {
      home: {
        label: 'Dashboard',
        icon: 'fa-solid fa-home',
        command: () => this.navigateToHome(),
      },
      items: items.map(item => ({
        label: item.label,
        icon: item.icon,
        url: item.url,
        command: item.routerLink
          ? () => this.navigateToRoute(item.routerLink!, item.queryParams)
          : undefined,
      })),
      iconRight: 'fa-solid fa-chevron-right',
      libTbOnItemClick: (e: any) => this.handleBreadcrumbClick(e),
    };

    this.breadcrumbSubject.next(breadcrumbConfig);
  }

  // ✅ Limpiar breadcrumb
  clearBreadcrumb(): void {
    this.breadcrumbSubject.next({
      home: {
        label: 'Dashboard',
        icon: 'fa-solid fa-home',
        command: () => this.navigateToHome(),
      },
      iconRight: 'fa-solid fa-chevron-right',
    });
  }

  // ✅ Navegación al home/dashboard
  private navigateToHome(): void {
    this.router.navigate(['/dashboard']);
  }

  // ✅ Navegación a rutas específicas
  private navigateToRoute(routerLink: string[], queryParams?: any): void {
    this.router.navigate(routerLink, { queryParams });
  }

  // ✅ Manejar clicks en breadcrumb
  private handleBreadcrumbClick(event: any): void {
    this.logger.debug('Breadcrumb clicked', event);
  }

  // ✅ Métodos específicos para containers
  setContractReaderBreadcrumb(): void {
    this.setBreadcrumb([
      { label: 'Análisis', icon: 'fa-solid fa-analytics' },
      { label: 'Contratos', icon: 'fa-solid fa-file-contract', routerLink: ['/contract-reader'] },
    ]);
  }

  setThirdPartyValidationBreadcrumb(): void {
    this.setBreadcrumb([
      { label: 'Validaciones', icon: 'fa-solid fa-shield-check' },
      { label: 'Terceros', icon: 'fa-solid fa-users', routerLink: ['/third-party-validation'] },
    ]);
  }

  setFinancialStatementBreadcrumb(): void {
    this.setBreadcrumb([
      { label: 'Análisis', icon: 'fa-solid fa-analytics' },
      {
        label: 'Estados Financieros',
        icon: 'fa-solid fa-chart-line',
        routerLink: ['/financial-statement-reader'],
      },
    ]);
  }

  // ✅ Para steppers - actualizar según paso actual
  setStepperBreadcrumb(containerName: string, currentStep: number, totalSteps: number): void {
    const baseItems = [
      { label: 'Procesos', icon: 'fa-solid fa-tasks' },
      { label: containerName, icon: 'fa-solid fa-list-ol' },
    ];

    if (totalSteps > 1) {
      baseItems.push({
        label: `Paso ${currentStep + 1} de ${totalSteps}`,
        icon: 'fa-solid fa-step-forward',
      });
    }

    this.setBreadcrumb(baseItems);
  }

  // ✅ Para resultados
  setResultsBreadcrumb(containerName: string, resultType: string): void {
    this.setBreadcrumb([
      { label: 'Análisis', icon: 'fa-solid fa-analytics' },
      { label: containerName, icon: 'fa-solid fa-chart-pie' },
      { label: resultType, icon: 'fa-solid fa-check-circle' },
    ]);
  }
}
