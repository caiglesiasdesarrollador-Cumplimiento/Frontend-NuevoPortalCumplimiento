import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from '../../../../shared/services/logger.service';
import { RecuperarAgenteService } from '../../../../shared/services/recuperar-agente.service';
import { SessionMulticlavesService } from '../../../../shared/services/session-multiclaves.service';
import { IMulticlavesResponse } from '../../../../shared/interfaces/comunes.interface';

/**
 * ✅ Step1PolicyInfoComponent - Componente para el Paso 1: Información de Póliza
 * 
 * Responsabilidades:
 * - Gestión de datos del tomador (tipo y número de documento)
 * - Gestión de datos del asegurado (tipo y número de documento)
 * - Selección de producto de seguro
 * - Selección y validación de clave de intermediario
 * - Carga de claves desde session storage (Multiclaves)
 * 
 * Patrón: Presentational Component con comunicación vía @Input/@Output
 */
@Component({
  selector: 'app-step1-policy-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step1-policy-info.component.html',
  styleUrls: ['./step1-policy-info.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Step1PolicyInfoComponent implements OnInit, OnChanges {
  @Input() tipoDocumentoTomador: string = '';
  @Input() numeroDocumentoTomador: string = '';
  @Input() tipoDocumentoAsegurado: string = '';
  @Input() numeroDocumentoAsegurado: string = '';
  @Input() tipoProducto: string = '';
  @Input() claveIntermediario: string = '';
  @Input() isFormEnabled: boolean = true;

  @Output() tipoDocumentoTomadorChange = new EventEmitter<string>();
  @Output() numeroDocumentoTomadorChange = new EventEmitter<string>();
  @Output() tipoDocumentoAseguradoChange = new EventEmitter<string>();
  @Output() numeroDocumentoAseguradoChange = new EventEmitter<string>();
  @Output() tipoProductoChange = new EventEmitter<string>();
  @Output() claveIntermediarioChange = new EventEmitter<string>();
  @Output() formValueChange = new EventEmitter<any>();
  @Output() formValidChange = new EventEmitter<boolean>();

  step1Form: FormGroup; // ✅ Formulario Angular nativo
  
  // ✅ Claves de intermediario
  clavesIntermediario: { codigo: string; nombre: string }[] = [];
  nombreIntermediario = '';
  claveIntermediarioError = false;
  claveIntermediarioValidationMessage = '';
  permiteEntradaManual = false; // ✅ Permitir entrada manual cuando no hay claves

  constructor(
    private readonly logger: LoggerService,
    private readonly recuperarAgenteService: RecuperarAgenteService,
    private readonly sessionMulticlavesService: SessionMulticlavesService,
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder,
  ) {
    // ✅ Crear formulario Angular nativo
    this.step1Form = this.fb.group({
      tipoDocumentoTomador: [''],
      numeroDocumentoTomador: [''],
      tipoDocumentoAsegurado: [''],
      numeroDocumentoAsegurado: [''],
      insuranceProduct: [''],
      claveIntermediario: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    // ✅ Configurar listeners del formulario
    this.setupFormListeners();
    // ✅ Cargar claves desde session storage
    this.loadClavesIntermediarioDesdeSesion();
    // ✅ Actualizar valores iniciales
    this.patchFormValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ✅ Actualizar formulario cuando cambian los inputs
    if (this.step1Form) {
      if (changes['tipoDocumentoTomador'] || changes['numeroDocumentoTomador'] ||
          changes['tipoDocumentoAsegurado'] || changes['numeroDocumentoAsegurado'] ||
          changes['tipoProducto'] || changes['claveIntermediario']) {
        this.patchFormValues();
      }
    }
  }

  /**
   * ✅ Configurar listeners del formulario
   */
  private setupFormListeners(): void {
    if (this.step1Form) {
      this.step1Form.valueChanges.subscribe((values) => {
        this.onFormValueChange(values);
      });

      this.step1Form.statusChanges.subscribe((status) => {
        this.formValidChange.emit(status === 'VALID');
      });
    }
  }

  /**
   * ✅ Actualizar valores del formulario desde inputs
   */
  private patchFormValues(): void {
    if (this.step1Form) {
      this.step1Form.patchValue({
        tipoDocumentoTomador: this.tipoDocumentoTomador,
        numeroDocumentoTomador: this.numeroDocumentoTomador,
        tipoDocumentoAsegurado: this.tipoDocumentoAsegurado,
        numeroDocumentoAsegurado: this.numeroDocumentoAsegurado,
        insuranceProduct: this.tipoProducto,
        claveIntermediario: this.claveIntermediario,
      }, { emitEvent: false });
    }
  }

  /**
   * ✅ Manejar cambios en el formulario
   */
  private onFormValueChange(values: any): void {
    // ✅ Emitir cambios individuales
    if (values.tipoDocumentoTomador !== this.tipoDocumentoTomador) {
      this.tipoDocumentoTomadorChange.emit(values.tipoDocumentoTomador);
    }
    if (values.numeroDocumentoTomador !== this.numeroDocumentoTomador) {
      this.numeroDocumentoTomadorChange.emit(values.numeroDocumentoTomador);
    }
    if (values.tipoDocumentoAsegurado !== this.tipoDocumentoAsegurado) {
      this.tipoDocumentoAseguradoChange.emit(values.tipoDocumentoAsegurado);
    }
    if (values.numeroDocumentoAsegurado !== this.numeroDocumentoAsegurado) {
      this.numeroDocumentoAseguradoChange.emit(values.numeroDocumentoAsegurado);
    }
    if (values.insuranceProduct !== this.tipoProducto) {
      this.tipoProductoChange.emit(values.insuranceProduct);
    }
    if (values.claveIntermediario !== this.claveIntermediario) {
      this.onClaveIntermediarioChange(values.claveIntermediario);
    }

    // ✅ Emitir cambio completo del formulario
    this.formValueChange.emit(values);
  }

  /**
   * ✅ Cargar claves de intermediario desde session storage
   */
  private loadClavesIntermediarioDesdeSesion(): void {
    this.logger.debug('Cargando claves desde session storage');
    const multiclavesData = this.sessionMulticlavesService.getMulticlaves() as IMulticlavesResponse | null;
    const totalClaves = multiclavesData?.claves?.length || 0;
    this.logger.debug('Datos de multiclaves en session storage', { totalClaves });

    const claves = this.sessionMulticlavesService.getClavesActivas();
    this.logger.debug('Claves activas encontradas', { total: claves.length });

    if (!claves.length) {
      this.logger.warn('No se encontraron claves activas - Mostrando INPUT para entrada manual');
      // ✅ Si NO hay claves → mostrar INPUT
      this.permiteEntradaManual = true;
      this.clavesIntermediario = [];
      this.cdr.detectChanges();
      return;
    }

    // ✅ Hay claves válidas → mostrar SELECT
    this.permiteEntradaManual = false;
    this.clavesIntermediario = claves.map(clave => ({
      codigo: clave.clave,
      nombre: this.sessionMulticlavesService.getClaveDisplay(clave),
    }));
    
    this.cdr.detectChanges();
  }

  /**
   * ✅ Manejar cambio de clave de intermediario
   */
  onClaveIntermediarioChange(value: string): void {
    this.claveIntermediario = value;
    const claveEncontrada = this.clavesIntermediario.find(c => c.codigo === value);
    this.nombreIntermediario = claveEncontrada?.nombre || '';
    this.claveIntermediarioError = false;
    this.claveIntermediarioValidationMessage = '';
    
    // ✅ Actualizar formulario
    if (this.step1Form) {
      this.step1Form.patchValue({ claveIntermediario: value }, { emitEvent: false });
    }
    
    this.claveIntermediarioChange.emit(value);
    this.validarClaveIntermediario(value);
  }

  /**
   * ✅ Validar clave de intermediario con el servicio
   */
  private validarClaveIntermediario(value: string): void {
    if (!value) {
      this.claveIntermediarioError = true;
      this.claveIntermediarioValidationMessage = 'La clave del intermediario es obligatoria';
      return;
    }

    this.recuperarAgenteService.recuperarAgente(value).subscribe({
      next: response => {
        this.nombreIntermediario = response.nombreRazonSocial || this.nombreIntermediario;
        this.claveIntermediarioError = false;
        this.claveIntermediarioValidationMessage = '';
        this.cdr.detectChanges();
      },
      error: error => {
        this.logger.error('Error validando clave de intermediario', error);
        this.claveIntermediarioError = true;
        this.claveIntermediarioValidationMessage = 'Clave inválida, verifica con tu portal';
        this.cdr.detectChanges();
      },
    });
  }

  /**
   * ✅ Validar si el formulario es válido
   */
  isFormValid(): boolean {
    return this.step1Form?.valid || false;
  }

  /**
   * ✅ Obtener valores del formulario
   */
  getFormValues(): any {
    return this.step1Form?.value || {};
  }
}
