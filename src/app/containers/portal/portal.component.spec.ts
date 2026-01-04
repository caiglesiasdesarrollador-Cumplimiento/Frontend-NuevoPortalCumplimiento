import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PortalComponent } from './portal.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockBreadcrumbService: jasmine.SpyObj<BreadcrumbService>;

  beforeEach(async () => {
    // ✅ Crear spies para las dependencias
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockBreadcrumbService = jasmine.createSpyObj('BreadcrumbService', ['setBreadcrumb']);

    await TestBed.configureTestingModule({
      declarations: [PortalComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BreadcrumbService, useValue: mockBreadcrumbService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ Para ignorar componentes de tech-block-lib
    }).compileComponents();

    fixture = TestBed.createComponent(PortalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user info correctly', () => {
    expect(component.userInfo.name).toBe('Alejandro');
    expect(component.userInfo.greeting).toBe('Hola Alejandro,');
    expect(component.userInfo.role).toBe('Intermediario');
  });

  it('should have correct informacion general stats', () => {
    expect(component.informacionGeneral).toHaveSize(3);
    expect(component.informacionGeneral[0].title).toBe('Historial de solicitudes');
    expect(component.informacionGeneral[1].title).toBe('Solicitudes que requieren información');
    expect(component.informacionGeneral[2].title).toBe('Solicitudes en curso');
  });

  it('should navigate to dashboard when goToCotizarEmitirOptions is called', () => {
    component.goToCotizarEmitirOptions();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should navigate to specific URL when navigateToUrl is called', () => {
    const testUrl = '/test-url';
    component.navigateToUrl(testUrl);
    expect(mockRouter.navigate).toHaveBeenCalledWith([testUrl]);
  });

  it('should handle stat card click correctly', () => {
    const testStat = component.informacionGeneral[0];
    spyOn(component, 'navigateToUrl');
    
    component.onStatCardClick(testStat);
    
    expect(component.navigateToUrl).toHaveBeenCalledWith(testStat.action);
  });

  it('should calculate total solicitudes correctly', () => {
    const expectedTotal = component.informacionGeneral.reduce((sum, stat) => sum + stat.count, 0);
    expect(component.totalSolicitudes).toBe(expectedTotal);
  });

  it('should setup breadcrumb on init', () => {
    component.ngOnInit();
    expect(mockBreadcrumbService.setBreadcrumb).toHaveBeenCalled();
  });

  it('should have correct button configurations', () => {
    // ✅ Test btnCotizarEmitir button
    expect(component.btnCotizarEmitir.label).toBe('Cotizar o Emitir');
    expect(component.btnCotizarEmitir.styleBtn).toBe('fill');
    expect(component.btnCotizarEmitir.typeBtn).toBe('primary');

    // ✅ Test other buttons
    expect(component.btnCrearConsecutivo.label).toBe('Crear consecutivo');
    expect(component.btnSolicitudCotizacion.label).toBe('Solicitud cotización nuevo negocio');
  });
});