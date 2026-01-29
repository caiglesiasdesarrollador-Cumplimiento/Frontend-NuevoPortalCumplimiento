import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step1PolicyInfoComponent } from './step1-policy-info.component';
import { LoggerService } from '../../../../shared/services/logger.service';
import { RecuperarAgenteService } from '../../../../shared/services/recuperar-agente.service';
import { SessionMulticlavesService } from '../../../../shared/services/session-multiclaves.service';
import { of } from 'rxjs';

describe('Step1PolicyInfoComponent', () => {
  let component: Step1PolicyInfoComponent;
  let fixture: ComponentFixture<Step1PolicyInfoComponent>;
  let mockLoggerService: jest.Mocked<LoggerService>;
  let mockRecuperarAgenteService: jest.Mocked<RecuperarAgenteService>;
  let mockSessionMulticlavesService: jest.Mocked<SessionMulticlavesService>;

  beforeEach(async () => {
    mockLoggerService = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    } as any;

    mockRecuperarAgenteService = {
      existeAgente: jest.fn().mockReturnValue(of(true)),
      recuperarAgente: jest.fn().mockReturnValue(of({ nombreRazonSocial: 'Test Agent' })),
    } as any;

    mockSessionMulticlavesService = {
      getMulticlaves: jest.fn().mockReturnValue({ claves: [] }),
      getClavesActivas: jest.fn().mockReturnValue([]),
      getClaveDisplay: jest.fn().mockReturnValue('Test Clave'),
    } as any;

    await TestBed.configureTestingModule({
      imports: [Step1PolicyInfoComponent],
      providers: [
        { provide: LoggerService, useValue: mockLoggerService },
        { provide: RecuperarAgenteService, useValue: mockRecuperarAgenteService },
        { provide: SessionMulticlavesService, useValue: mockSessionMulticlavesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Step1PolicyInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.tipoDocumentoTomador).toBe('');
    expect(component.numeroDocumentoTomador).toBe('');
    expect(component.tipoProducto).toBe('');
    expect(component.claveIntermediario).toBe('');
    expect(component.isFormEnabled).toBe(true);
  });

  it('should emit tipoDocumentoTomadorChange when tipoDocumentoTomador changes', () => {
    const spy = jest.spyOn(component.tipoDocumentoTomadorChange, 'emit');
    component.tipoDocumentoTomador = 'CC';
    component.ngOnChanges({
      tipoDocumentoTomador: { currentValue: 'CC', previousValue: '', firstChange: true, isFirstChange: () => true },
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should validate clave intermediario', (done) => {
    component.claveIntermediario = 'TEST123';
    component.clavesIntermediario = [{ codigo: 'TEST123', nombre: 'Test Agent' }];
    component.onClaveIntermediarioChange('TEST123');
    setTimeout(() => {
      expect(mockRecuperarAgenteService.existeAgente).toHaveBeenCalledWith('TEST123');
      done();
    }, 100);
  });

  it('should load claves from session storage on init', () => {
    component.ngOnInit();
    expect(mockSessionMulticlavesService.getMulticlaves).toHaveBeenCalled();
    expect(mockSessionMulticlavesService.getClavesActivas).toHaveBeenCalled();
  });

  it('should return form validity', () => {
    const isValid = component.isFormValid();
    expect(typeof isValid).toBe('boolean');
  });

  it('should return form values', () => {
    const values = component.getFormValues();
    expect(values).toBeDefined();
  });
});
