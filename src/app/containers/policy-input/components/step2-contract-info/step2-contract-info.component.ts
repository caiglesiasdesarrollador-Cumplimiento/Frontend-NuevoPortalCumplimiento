import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ILibTbDynamicForm, LibTbDynamicFormModule } from 'tech-block-lib';
import { step2ContractInfoForm } from '../../configs/config-step-2/step2-contract-info.config';
import { LoggerService } from '../../../../shared/services/logger.service';
import { CoberturasCumplimientoComponent } from '../coberturas-cumplimiento/coberturas-cumplimiento.component';
import { CoberturasRCComponent } from '../coberturas-rc/coberturas-rc.component';

/**
 * ✅ Step2ContractInfoComponent - Componente para el Paso 2: Información del Contrato
 * 
 * Responsabilidades:
 * - Gestión de datos generales de la póliza
 * - Gestión de datos del contrato (valor, fechas, duración)
 * - Gestión de ubicación del riesgo
 * - Integración con componentes de coberturas (Cumplimiento y RC)
 * 
 * Patrón: Presentational Component con comunicación vía @Input/@Output
 */
@Component({
  selector: 'app-step2-contract-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LibTbDynamicFormModule,
    CoberturasCumplimientoComponent,
    CoberturasRCComponent,
  ],
  templateUrl: './step2-contract-info.component.html',
  styleUrls: ['./step2-contract-info.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Step2ContractInfoComponent implements OnInit, OnChanges {
  @Input() valorContrato: number = 150000000;
  @Input() fechaInicioContrato: string = '';
  @Input() fechaFinContrato: string = '';
  @Input() duracionContrato: number = 0;
  @Input() objetoContrato: string = '';
  @Input() moneda: string = 'COP';
  @Input() departamento: string = '';
  @Input() municipio: string = '';
  @Input() direccionRiesgo: string = '';
  @Input() isFormEnabled: boolean = true;
  @Input() showGrandesBeneficiarios: boolean = false;
  @Input() coberturasCumplimiento: any[] = [];
  @Input() coberturasRC: any[] = [];

  @Output() valorContratoChange = new EventEmitter<number>();
  @Output() fechaInicioContratoChange = new EventEmitter<string>();
  @Output() fechaFinContratoChange = new EventEmitter<string>();
  @Output() duracionContratoChange = new EventEmitter<number>();
  @Output() objetoContratoChange = new EventEmitter<string>();
  @Output() monedaChange = new EventEmitter<string>();
  @Output() departamentoChange = new EventEmitter<string>();
  @Output() municipioChange = new EventEmitter<string>();
  @Output() direccionRiesgoChange = new EventEmitter<string>();
  @Output() coberturasCumplimientoChange = new EventEmitter<any[]>();
  @Output() coberturasRCChange = new EventEmitter<any[]>();
  @Output() totalPrimaCumplimientoChange = new EventEmitter<number>();
  @Output() totalPrimaRCChange = new EventEmitter<number>();
  @Output() formValueChange = new EventEmitter<any>();
  @Output() formValidChange = new EventEmitter<boolean>();

  step2Form: ILibTbDynamicForm = step2ContractInfoForm(undefined, undefined, false);

  constructor(
    private readonly logger: LoggerService,
  ) {}

  ngOnInit(): void {
    // ✅ Inicializar formulario con el valor actual de showGrandesBeneficiarios
    this.step2Form = step2ContractInfoForm(undefined, undefined, this.showGrandesBeneficiarios);
    this.setupFormListeners();
    this.patchFormValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ✅ Recrear formulario si cambia showGrandesBeneficiarios
    if (changes['showGrandesBeneficiarios'] && changes['showGrandesBeneficiarios'].currentValue !== undefined) {
      this.step2Form = step2ContractInfoForm(undefined, undefined, this.showGrandesBeneficiarios);
      this.setupFormListeners();
      this.patchFormValues();
    }
    
    if (this.step2Form?.form) {
      if (changes['valorContrato'] || changes['fechaInicioContrato'] || 
          changes['fechaFinContrato'] || changes['duracionContrato'] ||
          changes['objetoContrato'] || changes['moneda'] ||
          changes['departamento'] || changes['municipio'] ||
          changes['direccionRiesgo']) {
        this.patchFormValues();
      }
    }
  }

  /**
   * ✅ Configurar listeners del formulario
   */
  private setupFormListeners(): void {
    if (this.step2Form?.form) {
      this.step2Form.form.valueChanges.subscribe((values: any) => {
        this.onFormValueChange(values);
      });

      this.step2Form.form.statusChanges.subscribe((status: string) => {
        this.formValidChange.emit(status === 'VALID');
      });
    }
  }

  /**
   * ✅ Actualizar valores del formulario desde inputs
   */
  private patchFormValues(): void {
    if (this.step2Form?.form) {
      this.step2Form.form.patchValue({
        valorContrato: this.valorContrato,
        fechaInicioContrato: this.fechaInicioContrato,
        fechaFinContrato: this.fechaFinContrato,
        duracionContrato: this.duracionContrato,
        objetoContrato: this.objetoContrato,
        moneda: this.moneda,
        departamento: this.departamento,
        municipio: this.municipio,
        direccionRiesgo: this.direccionRiesgo,
      });
    }
  }

  /**
   * ✅ Manejar cambios en el formulario
   */
  private onFormValueChange(values: any): void {
    this.logger.debug('Formulario paso 2 cambió', values);
    // ✅ Emitir cambios individuales
    if (values.valorContrato !== this.valorContrato) {
      this.valorContratoChange.emit(values.valorContrato);
    }
    if (values.fechaInicioContrato !== this.fechaInicioContrato) {
      this.fechaInicioContratoChange.emit(values.fechaInicioContrato);
    }
    if (values.fechaFinContrato !== this.fechaFinContrato) {
      this.fechaFinContratoChange.emit(values.fechaFinContrato);
    }
    if (values.duracionContrato !== this.duracionContrato) {
      this.duracionContratoChange.emit(values.duracionContrato);
    }
    if (values.objetoContrato !== this.objetoContrato) {
      this.objetoContratoChange.emit(values.objetoContrato);
    }
    if (values.moneda !== this.moneda) {
      this.monedaChange.emit(values.moneda);
    }
    if (values.departamento !== this.departamento) {
      this.departamentoChange.emit(values.departamento);
    }
    if (values.municipio !== this.municipio) {
      this.municipioChange.emit(values.municipio);
    }
    if (values.direccionRiesgo !== this.direccionRiesgo) {
      this.direccionRiesgoChange.emit(values.direccionRiesgo);
    }

    // ✅ Emitir cambio completo del formulario
    this.formValueChange.emit(values);
  }

  /**
   * ✅ Validar si el formulario es válido
   */
  isFormValid(): boolean {
    return this.step2Form?.form?.valid || false;
  }

  /**
   * ✅ Obtener valores del formulario
   */
  getFormValues(): any {
    return this.step2Form?.form?.value || {};
  }
}
