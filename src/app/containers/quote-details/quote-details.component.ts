import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILibTbBreadcrumb, ILibTbButton, ILibTbSnackbar } from 'tech-block-lib';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';
import { QuoteDetailsData } from './quote-details.interface';
import {
  MOCK_MANAGEMENT_DATA,
  IPolicyManagementItem,
  ProductType,
} from '../management/management.interface';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss'],
})
export class QuoteDetailsComponent implements OnInit {
  quoteData: QuoteDetailsData | null = null;
  originalQuoteItem: IPolicyManagementItem | null = null; // ✅ Guardar item original para acceder a datos adicionales
  showEmissionButton: boolean = false; // ✅ Controlar si mostrar botón de emisión

  // ✅ Datos de coberturas para mostrar en el resumen
  complianceCoverages: any[] = [];
  rcCoverages: any[] = [];

  // ✅ Configuración del snackbar para notificaciones
  snackbarConfig: ILibTbSnackbar = {
    show: false,
    message: '',
    position: 'top-right',
    life: 5000,
    orientation: 'horizontal',
  };

  // ✅ Configuración del breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  // ✅ Botón para volver a management
  btnBackToManagement: ILibTbButton = {
    label: 'Volver a Cotizaciones',
    icon: 'fa-solid fa-arrow-left',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.backToManagement(),
  };

  // ✅ Botón para generar emisión
  btnGenerateEmission: ILibTbButton = {
    label: 'Generar emisión',
    icon: 'fa-solid fa-file-check',
    iconPosition: 'right',
    styleBtn: 'fill',
    typeBtn: 'primary',
    class: 'rounded-full px-8 py-3 min-w-[150px]', // ✅ Estilo redondeado como en imagen
    libTbClick: () => this.generateEmission(),
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    console.log('🔍 QUOTE-DETAILS: Componente inicializado');

    // Obtener query parameters para configurar el comportamiento
    this.route.queryParams.subscribe(queryParams => {
      this.showEmissionButton = queryParams['showEmissionButton'] === 'true';
      console.log('🔍 QUOTE-DETAILS: Mostrar botón de emisión:', this.showEmissionButton);
    });

    // Obtener ID de la cotización desde route params
    this.route.params.subscribe(params => {
      const quoteId = params['id'];
      console.log('🔍 QUOTE-DETAILS: ID recibido:', quoteId);

      if (quoteId) {
        this.loadQuoteDetails(quoteId);
      } else {
        console.error('❌ QUOTE-DETAILS: No se proporcionó ID de cotización');
        this.router.navigate(['/management']);
      }
    });
  }

  private loadQuoteDetails(quoteId: string): void {
    console.log('📋 QUOTE-DETAILS: Cargando detalles para ID:', quoteId);

    // Buscar la cotización en los datos mock
    const managementItem = MOCK_MANAGEMENT_DATA.find(item => item.id === quoteId);

    if (managementItem) {
      console.log('✅ QUOTE-DETAILS: Cotización encontrada:', managementItem);

      // Guardar referencia al item original
      this.originalQuoteItem = managementItem;

      // Convertir datos de management a formato de quote details
      this.quoteData = this.mapManagementToQuoteDetails(managementItem);

      // Configurar breadcrumb
      this.setupBreadcrumb(managementItem);

      // ✅ Generar datos de coberturas
      this.generateCoverageData();
    } else {
      console.error('❌ QUOTE-DETAILS: Cotización no encontrada con ID:', quoteId);
      this.router.navigate(['/management']);
    }
  }

  private mapManagementToQuoteDetails(item: IPolicyManagementItem): QuoteDetailsData {
    // ✅ Mapear datos específicos según el tipo de producto y cotización
    const productTypeMapping = {
      [ProductType.CUMPLIMIENTO_CONTRATO]: {
        ubicacion: {
          departamento: 'Cundinamarca',
          municipio: 'Bogotá',
          direccion: 'Av. Carrera 68 # 45-67, Zona Industrial',
        },
        contrato: { duracion: '18', fechaInicio: '2024-03-01', fechaFin: '2025-09-01' },
      },
      [ProductType.RESPONSABILIDAD_CIVIL]: {
        ubicacion: {
          departamento: 'Antioquia',
          municipio: 'Medellín',
          direccion: 'Calle 50 # 25-30, Centro',
        },
        contrato: { duracion: '12', fechaInicio: '2024-02-15', fechaFin: '2025-02-15' },
      },
      [ProductType.BUEN_MANEJO]: {
        ubicacion: {
          departamento: 'Valle del Cauca',
          municipio: 'Cali',
          direccion: 'Carrera 15 # 100-25, Norte',
        },
        contrato: { duracion: '24', fechaInicio: '2024-01-20', fechaFin: '2026-01-20' },
      },
      [ProductType.SERIEDAD_OFERTA]: {
        ubicacion: {
          departamento: 'Atlántico',
          municipio: 'Barranquilla',
          direccion: 'Calle 72 # 41-112, Norte',
        },
        contrato: { duracion: '6', fechaInicio: '2024-02-01', fechaFin: '2024-08-01' },
      },
      [ProductType.CALIDAD_SERVICIO]: {
        ubicacion: {
          departamento: 'Santander',
          municipio: 'Bucaramanga',
          direccion: 'Carrera 27 # 34-15, Centro',
        },
        contrato: { duracion: '36', fechaInicio: '2024-01-30', fechaFin: '2027-01-30' },
      },
    };

    const productInfo =
      productTypeMapping[item.producto] || productTypeMapping[ProductType.CUMPLIMIENTO_CONTRATO];

    return {
      id: item.id,
      numero: item.numero,
      fechaCreacion: item.fechaCreacion,
      tomador: item.tomador,
      numeroDocumento: item.numeroDocumento,
      valorAsegurado: item.valorAsegurado.toString(),
      estado: item.estado,

      // ✅ Datos reales de la cotización seleccionada
      numeroContratoGeneral: item.numeroContrato ?? `CONT-${item.numero.replace('COT', 'GENERAL')}`,
      tipoDocumentoTomadorGeneral: 'NIT',
      nombreTomadorGeneral: item.tomador,
      numeroDocumentoTomadorGeneral: item.numeroDocumento,
      nombreAseguradoGeneral: item.tomador, // Por defecto mismo que tomador
      numeroDocumentoAseguradoGeneral: item.numeroDocumento,
      tipoDocumentoAseguradoGeneral: 'NIT',
      moneda: 'COP',

      // ✅ Ubicación específica según tipo de producto
      departamento: productInfo.ubicacion.departamento,
      localidadMunicipio: productInfo.ubicacion.municipio,
      direccionRiesgo: productInfo.ubicacion.direccion,

      // ✅ Detalles del contrato específicos según cotización
      valorContrato: item.valorAsegurado.toString(),
      fechaInicioContrato: productInfo.contrato.fechaInicio,
      duracionContrato: productInfo.contrato.duracion,
      fechaFinContrato: productInfo.contrato.fechaFin,
    };
  }

  // ✅ Método para generar datos de coberturas
  private generateCoverageData(): void {
    console.log('🔍 QUOTE-DETAILS: Generando datos de coberturas');

    // ✅ Coberturas de cumplimiento (imagen 1) - 3 coberturas seleccionadas
    this.complianceCoverages = [
      {
        id: '401',
        name: 'Seriedad De La Oferta',
        value: 150000000,
        percentage: 5,
        status: 'Activa',
        accepted: true,
      },
      {
        id: '403',
        name: 'Cumplimiento',
        value: 300000000,
        percentage: 10,
        status: 'Activa',
        accepted: true,
      },
      {
        id: '406',
        name: 'Calidad Del Servicio',
        value: 200000000,
        percentage: 7,
        status: 'Activa',
        accepted: true,
      },
    ];

    // ✅ Coberturas RC (imagen 2) - 3 coberturas seleccionadas
    this.rcCoverages = [
      {
        id: '226',
        name: 'Contratista Y Subcontratista',
        value: 500000000,
        percentage: 15,
        status: 'Activa',
        accepted: true,
      },
      {
        id: '227',
        name: 'Gastos Medicos Persona',
        value: 100000000,
        percentage: 3,
        status: 'Activa',
        accepted: true,
      },
      {
        id: '232',
        name: 'Contaminación Accidental',
        value: 200000000,
        percentage: 6,
        status: 'Activa',
        accepted: true,
      },
    ];

    console.log(
      '✅ QUOTE-DETAILS: Coberturas de cumplimiento generadas:',
      this.complianceCoverages,
    );
    console.log('✅ QUOTE-DETAILS: Coberturas RC generadas:', this.rcCoverages);
  }

  private setupBreadcrumb(item: IPolicyManagementItem): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Portal',
        icon: 'fa-solid fa-home',
        routerLink: ['/portal'],
      },
    ];

    // ✅ Breadcrumb dinámico según contexto
    if (this.showEmissionButton) {
      // Viene desde management para emisión
      breadcrumbItems.push({
        label: 'Emitir póliza desde una cotización existente',
        icon: 'fa-solid fa-redo',
        routerLink: ['/management'],
      });
    } else {
      // Vista normal de detalles
      breadcrumbItems.push({
        label: 'Retomar Cotización',
        icon: 'fa-solid fa-file-alt',
        routerLink: ['/management'],
      });
    }

    breadcrumbItems.push({
      label: `Detalles ${item.numero}`,
      icon: 'fa-solid fa-eye',
    });

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(breadcrumbItem => ({
      label: breadcrumbItem.label,
      icon: breadcrumbItem.icon,
      routerLink: breadcrumbItem.routerLink,
    }));
  }

  backToManagement(): void {
    console.log('🔙 QUOTE-DETAILS: Volviendo a management');
    this.router.navigate(['/management']);
  }

  // ✅ Método para generar emisión de póliza
  generateEmission(): void {
    if (!this.quoteData) {
      console.error('❌ QUOTE-DETAILS: No hay datos de cotización para emitir');
      return;
    }

    console.log('📋 QUOTE-DETAILS: Generando emisión para cotización:', this.quoteData.numero);

    // Generar número de póliza basado en la cotización
    const policyNumber = this.quoteData.numero.replace('COT', 'POL');

    console.log('✅ QUOTE-DETAILS: Póliza generada exitosamente:', policyNumber);

    // Mostrar mensaje de confirmación de emisión
    this.showSuccessNotification(
      'Emisión Exitosa',
      `Póliza ${policyNumber} generada exitosamente. La emisión ha sido completada y está lista para su uso.`,
    );
  }

  // ✅ Método para mostrar notificación de éxito usando tech-block-lib
  private showSuccessNotification(title: string, message: string): void {
    console.log(`🎉 ${title}: ${message}`);

    // Configurar y mostrar snackbar de éxito siguiendo lineamientos tech-block-lib
    this.snackbarConfig = {
      show: true,
      message: `✅ ${title}: ${message}`,
      position: 'top-right',
      life: 6000, // 6 segundos según mejores prácticas UX
      orientation: 'horizontal',
      class: 'snackbar-success-theme', // ✅ Clase con variables CSS de tech-block-lib
      autoZIndex: true,
      baseZIndex: 1000,
      showTransitionOptions: '300ms ease-out',
      hideTransitionOptions: '250ms ease-in',
    };
  }

  // ✅ Métodos auxiliares para el template
  get hasQuoteData(): boolean {
    return this.quoteData !== null;
  }

  get formattedDate(): string {
    if (!this.quoteData) return '';
    return new Date(this.quoteData.fechaCreacion).toLocaleDateString('es-CO');
  }

  get formattedAmount(): string {
    if (!this.quoteData) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(Number(this.quoteData.valorAsegurado.replace(/[^0-9]/g, '')));
  }

  // ✅ Obtener tipo de producto de la cotización seleccionada
  getProductType(): string {
    return this.originalQuoteItem?.producto ?? 'No especificado';
  }

  // ✅ Calcular cupo disponible basado en el valor asegurado
  getCreditLimit(): string {
    if (!this.originalQuoteItem) return '$100.000.000';

    // Cupo disponible es aproximadamente 3-5 veces el valor asegurado
    const creditMultiplier = 4;
    const creditLimit = this.originalQuoteItem.valorAsegurado * creditMultiplier;

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(creditLimit);
  }

  // ✅ Calcular prima neta basada en el valor asegurado
  getPrimaNeta(): string {
    if (!this.originalQuoteItem) return '$2.500.000';

    // Prima es típicamente 0.5% - 1% del valor asegurado
    const primaRate = 0.007; // 0.7%
    const primaNeta = this.originalQuoteItem.valorAsegurado * primaRate;

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(primaNeta);
  }

  // ✅ Calcular IVA de la prima
  getIVA(): string {
    if (!this.originalQuoteItem) return '$475.000';

    const primaRate = 0.007;
    const primaNeta = this.originalQuoteItem.valorAsegurado * primaRate;
    const iva = primaNeta * 0.19; // 19% IVA

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(iva);
  }

  // ✅ Calcular prima total
  getPrimaTotal(): string {
    if (!this.originalQuoteItem) return '$2.975.000';

    const primaRate = 0.007;
    const primaNeta = this.originalQuoteItem.valorAsegurado * primaRate;
    const primaTotal = primaNeta * 1.19; // Prima + IVA

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(primaTotal);
  }
}
