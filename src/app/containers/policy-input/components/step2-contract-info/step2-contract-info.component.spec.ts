import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Step2ContractInfoComponent } from './step2-contract-info.component';
import { LoggerService } from '../../../../shared/services/logger.service';

describe('Step2ContractInfoComponent', () => {
  let component: Step2ContractInfoComponent;
  let fixture: ComponentFixture<Step2ContractInfoComponent>;
  let mockLoggerService: jest.Mocked<LoggerService>;

  beforeEach(async () => {
    mockLoggerService = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [Step2ContractInfoComponent],
      providers: [{ provide: LoggerService, useValue: mockLoggerService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Step2ContractInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.valorContrato).toBe(150000000);
    expect(component.moneda).toBe('COP');
    expect(component.isFormEnabled).toBe(true);
    expect(component.showGrandesBeneficiarios).toBe(false);
    expect(component.coberturasCumplimiento).toEqual([]);
    expect(component.coberturasRC).toEqual([]);
  });

  it('should emit valorContratoChange when valorContrato changes', () => {
    const spy = jest.spyOn(component.valorContratoChange, 'emit');
    component.valorContrato = 200000000;
    component.ngOnChanges({
      valorContrato: { currentValue: 200000000, previousValue: 150000000, firstChange: true, isFirstChange: () => true },
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should update coberturasCumplimiento when it changes', () => {
    const coberturas = [{ id: 1, nombre: 'Test' }];
    component.coberturasCumplimiento = coberturas;
    component.ngOnChanges({
      coberturasCumplimiento: { currentValue: coberturas, previousValue: [], firstChange: true, isFirstChange: () => true },
    });
    fixture.detectChanges();
    expect(component.coberturasCumplimiento).toEqual(coberturas);
  });

  it('should return form validity', () => {
    const isValid = component.isFormValid();
    expect(typeof isValid).toBe('boolean');
  });

  it('should return form values', () => {
    const values = component.getFormValues();
    expect(values).toBeDefined();
  });

  it('should recreate form when showGrandesBeneficiarios changes', () => {
    component.showGrandesBeneficiarios = true;
    component.ngOnChanges({
      showGrandesBeneficiarios: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false },
    });
    fixture.detectChanges();
    expect(component.step2Form).toBeDefined();
  });
});
