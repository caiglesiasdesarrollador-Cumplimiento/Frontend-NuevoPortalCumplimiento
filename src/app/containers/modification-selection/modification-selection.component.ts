import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ILibTbBreadcrumb, ILibTbButton } from 'tech-block-lib';

import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';
import {
  IModificationSelectionData,
  defaultModificationSelectionData,
} from './modification-selection.interface';

@Component({
  standalone: false,
  selector: 'app-modification-selection',
  templateUrl: './modification-selection.component.html',
  styleUrls: ['./modification-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModificationSelectionComponent implements OnInit {
  // ✅ Configuración de breadcrumb usando tech-block-lib
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  // ✅ Datos de modificaciones
  modificationData: IModificationSelectionData = defaultModificationSelectionData;

  // ✅ Botones para cada producto usando tech-block-lib
  btnProteccionFamiliar: ILibTbButton = {
    label: 'Modificar póliza',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    class: 'w-full',
    libTbClick: () => this.navigateToModification('proteccion-familiar-mod'),
  };

  btnPymesDigital: ILibTbButton = {
    label: 'Modificar póliza',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    class: 'w-full',
    libTbClick: () => this.navigateToModification('pymes-digital-mod'),
  };

  btnProteccionCreditos: ILibTbButton = {
    label: 'Modificar póliza',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    class: 'w-full',
    libTbClick: () => this.navigateToModification('proteccion-creditos-mod'),
  };

  btnProductoCumplimiento: ILibTbButton = {
    label: 'Ir a cumplimiento',
    icon: 'fal fa-arrow-right',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    class: 'w-full',
    libTbClick: () => this.navigateToModification('producto-cumplimiento-mod'),
  };

  constructor(
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
    this.cdr.detectChanges();
  }

  // ✅ Configuración del breadcrumb
  private setupBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Portal',
        icon: 'fal fa-home',
        routerLink: ['/portal'],
      },
      {
        label: 'Modificaciones',
        icon: 'fal fa-edit',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  // ✅ Navegación a diferentes tipos de modificación
  navigateToModification(productId: string): void {
    if (productId === 'producto-cumplimiento-mod') {
      this.router.navigate(['/policy-modification']);
    } else {
      // Por ahora todas las opciones llevan al mismo lugar
      // En el futuro se pueden crear rutas específicas para cada tipo de póliza
      console.log(`Navegando a modificación: ${productId}`);
      this.router.navigate(['/policy-modification']);
    }
  }
}
