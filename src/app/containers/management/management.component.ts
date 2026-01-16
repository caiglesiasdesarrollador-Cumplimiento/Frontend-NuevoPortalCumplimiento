import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILibTbTable,
  ILibTbDropdown,
  ILibTbButton,
  ILibTbInputText,
  ILibTbBreadcrumb,
  ILibTbSnackbar,
  ILibTbRadioButton,
} from 'tech-block-lib';
import { BreadcrumbService, BreadcrumbItem } from '../../shared/services/breadcrumb.service';
import {
  IPolicyManagementItem,
  IManagementFilters,
  ITableAction,
  PolicyStatus,
  MOCK_MANAGEMENT_DATA,
  INITIAL_FILTERS,
  ESTADO_FILTER_OPTIONS,
  TIPO_FILTER_OPTIONS,
  PRODUCTO_FILTER_OPTIONS,
} from './management.interface';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  // ✅ Removido OnPush para que los clicks de botones funcionen correctamente
})
export class ManagementComponent implements OnInit {
  // ✅ Datos y filtros
  allData: IPolicyManagementItem[] = MOCK_MANAGEMENT_DATA;
  filteredData: IPolicyManagementItem[] = [];
  filters: IManagementFilters = { ...INITIAL_FILTERS };
  selectedItem: IPolicyManagementItem | null = null;
  selectedQuoteId: string | null = null; // ✅ Selección individual - Sin selección por defecto

  // ✅ Configuración de breadcrumb
  breadcrumbConfig: ILibTbBreadcrumb = {
    items: [],
  };

  // ✅ Configuración de notificación
  snackbarConfig: ILibTbSnackbar = {
    message: '',
    life: 5000,
    show: false,
    position: 'top-right',
    class: 'bg-successBase text-grayscaleWhite',
    libTbButton: {
      label: 'Cerrar',
      icon: 'fal fa-times',
      styleBtn: 'stroke',
      typeBtn: 'secondary',
      libTbClick: () => this.hideNotification(),
    },
  };

  constructor(
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit(): void {
    this.setupBreadcrumb();
    this.applyFilters();
  }

  private setupBreadcrumb(): void {
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Portal',
        icon: 'fal fa-home',
        routerLink: ['/portal'],
      },
      {
        label: 'Emitir póliza desde una cotización existente',
        icon: 'fal fa-redo',
      },
    ];

    this.breadcrumbService.setBreadcrumb(breadcrumbItems);
    this.breadcrumbConfig.items = breadcrumbItems.map(item => ({
      label: item.label,
      icon: item.icon,
      routerLink: item.routerLink?.join('/'),
    }));
  }

  // ✅ Configuración de la tabla usando tech-block-lib
  tableConfig: ILibTbTable = {
    value: this.filteredData,
    paginator: true,
    rows: 10,
    rowsPerPageOptions: [5, 10, 15, 20],
    sortMode: 'single',
    selectionMode: 'single',
    dataKey: 'id',
    class: 'management__table bg-grayscaleWhite',
    responsive: true,
    responsiveLayout: 'scroll',
    filterLocale: 'es',
    libTbSelectionChange: event => this.onRowSelect(event),
    libTbOnRowSelect: event => this.onRowSelect(event),
  };

  // ✅ Configuración del filtro de búsqueda
  searchInput: ILibTbInputText = {
    placeholder: 'Buscar por número, tomador o contrato...',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
    libTbKeyup: (event: any) => this.onSearchTextChange(event.target.value),
  };

  // ✅ Configuración de dropdowns de filtros
  tipoFilterDropdown: ILibTbDropdown = {
    options: TIPO_FILTER_OPTIONS,
    optionLabel: 'label',
    optionValue: 'value',
    placeholder: 'Tipo',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
    libTbChange: (event: any) => this.onTipoFilterChange(event.value),
  };

  estadoFilterDropdown: ILibTbDropdown = {
    options: ESTADO_FILTER_OPTIONS,
    optionLabel: 'label',
    optionValue: 'value',
    placeholder: 'Estado',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
    libTbChange: (event: any) => this.onEstadoFilterChange(event.value),
  };

  productoFilterDropdown: ILibTbDropdown = {
    options: PRODUCTO_FILTER_OPTIONS,
    optionLabel: 'label',
    optionValue: 'value',
    placeholder: 'Producto',
    floatLabel: false, // ✅ CRÍTICO: tema Seguros Bolívar
    class: 'w-full',
    libTbChange: (event: any) => this.onProductoFilterChange(event.value),
  };

  // ✅ Configuración de botones de acción
  btnNew: ILibTbButton = {
    label: 'Nueva Cotización',
    icon: 'fal fa-plus',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'primary',
    libTbClick: () => this.navigateToNewQuote(),
  };

  btnRefresh: ILibTbButton = {
    label: 'Actualizar',
    icon: 'fal fa-refresh',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.refreshData(),
  };

  btnClearFilters: ILibTbButton = {
    label: 'Limpiar Filtros',
    icon: 'fal fa-times',
    iconPosition: 'left',
    styleBtn: 'stroke',
    typeBtn: 'secondary',
    libTbClick: () => this.clearFilters(),
  };

  // ✅ Botón para crear una póliza nueva
  btnCrearPolizaNueva: ILibTbButton = {
    label: 'Crear una póliza nueva',
    icon: 'fal fa-plus',
    iconPosition: 'left',
    styleBtn: 'fill',
    typeBtn: 'secondary',
    libTbClick: () => this.crearPolizaNueva(),
  };

  // ✅ Configuración del radio button para selección individual
  getRadioConfig(item: IPolicyManagementItem): ILibTbRadioButton {
    return {
      name: 'quote-selection',
      value: item.id,
      class: 'flex justify-center items-center h-full',
    };
  }

  // ✅ Método para generar botón con estilo exacto de la imagen (amarillo redondeado)
  getBtnEmitirPoliza(): ILibTbButton {
    const hasSelection = !!this.selectedQuoteId;

    return {
      label: 'Emitir póliza',
      styleBtn: 'fill',
      typeBtn: 'primary', // ✅ Siempre primary para que sea amarillo como en la imagen
      disabled: !hasSelection, // ✅ Deshabilitado cuando no hay selección
      class: 'rounded-full px-8 py-3 min-w-[150px]', // ✅ Estilo redondeado como en la imagen
      libTbClick: hasSelection ? () => this.emitirPolizaSeleccionada() : undefined,
    };
  }

  // ✅ Método para obtener la cotización seleccionada
  getSelectedQuote(): IPolicyManagementItem | undefined {
    return this.filteredData.find(item => item.id === this.selectedQuoteId);
  }

  // ✅ Acciones disponibles por fila
  getRowActions(item: IPolicyManagementItem): ITableAction[] {
    console.log(
      `📋 Obteniendo acciones para item: ${item.numero} - Estado: ${item.estado} - Tipo: ${item.tipo}`,
    );
    const actions = [
      {
        icon: 'fal fa-eye',
        label: 'Ver Detalles',
        action: 'view',
        styleBtn: 'stroke' as const,
        typeBtn: 'primary' as const,
        visible: () => true,
      },
      {
        icon: 'fal fa-edit',
        label: 'Modificar',
        action: 'edit',
        styleBtn: 'stroke' as const,
        typeBtn: 'secondary' as const,
        visible: (item: IPolicyManagementItem) =>
          item.estado !== PolicyStatus.CANCELADA && item.estado !== PolicyStatus.VENCIDA,
      },
      {
        icon: 'fal fa-redo',
        label: 'Renovar',
        action: 'renew',
        styleBtn: 'stroke' as const,
        typeBtn: 'error' as const,
        visible: (item: IPolicyManagementItem) =>
          item.tipo === 'poliza' && item.estado === PolicyStatus.VENCIDA,
      },
    ];

    const filteredActions = actions.filter(action => action.visible(item));
    console.log(
      `✅ Acciones filtradas para ${item.numero}:`,
      filteredActions.map(a => a.action),
    );

    return filteredActions;
  }

  // ✅ Métodos de filtrado
  applyFilters(): void {
    let filtered = [...this.allData];

    // Filtro de texto
    if (this.filters.searchText.trim()) {
      const searchLower = this.filters.searchText.toLowerCase().trim();
      filtered = filtered.filter(
        item =>
          item.numero.toLowerCase().includes(searchLower) ||
          item.tomador.toLowerCase().includes(searchLower) ||
          item.numeroDocumento.toLowerCase().includes(searchLower) ||
          (item.numeroContrato?.toLowerCase().includes(searchLower) ?? false) ||
          item.observaciones?.toLowerCase().includes(searchLower),
      );
    }

    // Filtro por tipo
    if (this.filters.tipoFiltro !== 'todos') {
      filtered = filtered.filter(item => item.tipo === this.filters.tipoFiltro);
    }

    // Filtro por estado
    if (this.filters.estadoFiltro !== 'todos') {
      filtered = filtered.filter(item => item.estado === this.filters.estadoFiltro);
    }

    // Filtro por producto
    if (this.filters.productoFiltro !== 'todos') {
      filtered = filtered.filter(item => item.producto === this.filters.productoFiltro);
    }

    // Filtro por fechas
    if (this.filters.fechaDesde) {
      filtered = filtered.filter(item => item.fechaCreacion >= this.filters.fechaDesde);
    }
    if (this.filters.fechaHasta) {
      filtered = filtered.filter(item => item.fechaCreacion <= this.filters.fechaHasta);
    }

    this.filteredData = filtered;
    this.tableConfig.value = this.filteredData;
  }

  // ✅ Eventos de filtros
  onSearchTextChange(value: string): void {
    this.filters.searchText = value;
    this.applyFilters();
  }

  onTipoFilterChange(value: any): void {
    this.filters.tipoFiltro = value;
    this.applyFilters();
  }

  onEstadoFilterChange(value: any): void {
    this.filters.estadoFiltro = value;
    this.applyFilters();
  }

  onProductoFilterChange(value: any): void {
    this.filters.productoFiltro = value;
    this.applyFilters();
  }

  // ✅ Eventos de tabla
  onRowSelect(event: any): void {
    this.selectedItem = event.data || event;
    console.log('Item seleccionado:', this.selectedItem);
  }

  onActionClick(action: string, item: IPolicyManagementItem): void {
    console.log(`🔥 CLICK DETECTADO! Acción: ${action} en item:`, item);
    console.log('🔍 Tipo de acción:', typeof action);
    console.log('🔍 Item ID:', item.id);
    console.log('🔍 Item estado:', item.estado);
    console.log('🔍 Item tipo:', item.tipo);

    switch (action) {
      case 'view':
        console.log('👁️ Ejecutando viewDetails');
        this.viewDetails(item);
        break;
      case 'edit':
        console.log('✏️ Ejecutando editItem');
        this.editItem(item);
        break;

      case 'renew':
        console.log('🔄 Ejecutando renewPolicy');
        this.renewPolicy(item);
        break;
      default:
        console.error('❌ Acción no reconocida:', action);
    }
  }

  // ✅ Métodos de acción
  viewDetails(item: IPolicyManagementItem): void {
    console.log('👁️ Viendo detalles de cotización:', item.numero);
    console.log('📋 Datos del item:', item);

    // ✅ Navegar a la nueva vista independiente de detalles
    this.router.navigate(['/quote-details', item.id]);
  }

  editItem(item: IPolicyManagementItem): void {
    console.log('✏️ Modificando cotización:', item.numero);
    console.log('📋 Datos del item:', item);

    // Navegar directamente al Paso 2 del formulario de emisión con datos precargados
    this.router.navigate(['/policy-input'], {
      queryParams: {
        action: 'modificar',
        id: item.id,
        step: '2', // Ir directamente al paso 2
        preload: 'true', // Indicar que debe precargar datos
      },
    });
  }

  renewPolicy(item: IPolicyManagementItem): void {
    // Navegar a policy-input en modo renovación
    this.router.navigate(['/policy-input'], {
      queryParams: { action: 'renovar', renewId: item.id },
    });
  }

  navigateToNewQuote(): void {
    this.router.navigate(['/policy-input'], {
      queryParams: { action: 'cotizar' },
    });
  }

  refreshData(): void {
    // Simular recarga de datos
    console.log('Actualizando datos...');
    this.applyFilters();
  }

  clearFilters(): void {
    this.filters = { ...INITIAL_FILTERS };
    // ✅ Los valores se resetearán automáticamente al aplicar los filtros
    // No se pueden establecer valores directamente en las configuraciones
    this.applyFilters();
  }

  // ✅ Método para mostrar notificaciones de éxito
  showSuccessNotification(title: string, message: string): void {
    console.log('🔔 Configurando snackbar con:', { title, message });
    this.snackbarConfig = {
      message: `${title}\n${message}`,
      life: 5000,
      show: true,
      position: 'top-right',
      class: 'bg-successBase text-grayscaleWhite p-4 rounded-lg shadow-lg',
      libTbButton: {
        label: 'Cerrar',
        icon: 'fal fa-times',
        styleBtn: 'stroke',
        typeBtn: 'secondary',
        libTbClick: () => this.hideNotification(),
      },
    };
  }

  // ✅ Método para ocultar notificación
  hideNotification(): void {
    this.snackbarConfig.show = false;
  }

  // ✅ Método para manejar cambios en la selección individual
  onQuoteSelectionChange(quoteId: string): void {
    console.log('📋 Cotización seleccionada:', quoteId);
    this.selectedQuoteId = quoteId;

    const selectedQuote = this.getSelectedQuote();
    if (selectedQuote) {
      console.log('📋 Cotización seleccionada:', selectedQuote.numero);
    }
  }

  // ✅ Método para emitir póliza de la cotización seleccionada
  emitirPolizaSeleccionada(): void {
    if (!this.selectedQuoteId) {
      console.warn('⚠️ No hay cotización seleccionada');
      return;
    }

    const selectedQuote = this.getSelectedQuote();
    if (!selectedQuote) {
      console.error('❌ Cotización no encontrada');
      return;
    }

    console.log('📋 Mostrando resumen de cotización para emisión:', selectedQuote);

    // Navegar al resumen de cotización para revisar antes de emitir
    this.router.navigate(['/quote-details', selectedQuote.id], {
      queryParams: {
        action: 'emitir',
        source: 'management',
        showEmissionButton: 'true',
      },
    });

    this.showSuccessNotification(
      'Revisión de cotización',
      `Mostrando resumen de la cotización ${selectedQuote.numero}`,
    );
  }

  // ✅ Método para crear una póliza nueva
  crearPolizaNueva(): void {
    console.log('📋 Iniciando creación de póliza nueva');

    // Navegar al formulario de policy-input para crear una nueva póliza
    this.router.navigate(['/policy-input'], {
      queryParams: {
        action: 'emitir',
        source: 'management',
        mode: 'new',
      },
    });

    this.showSuccessNotification('Nueva póliza', 'Iniciando proceso de creación de nueva póliza');
  }

  // ✅ Métodos auxiliares para el template
  getStatusClass(status: PolicyStatus): string {
    const statusClasses = {
      [PolicyStatus.BORRADOR]: 'bg-grayscaleD100 text-grayscaleWhite',
      [PolicyStatus.EN_REVISION]: 'bg-warningBase text-grayscaleBlack',
      [PolicyStatus.COTIZADA]: 'bg-infoBase text-grayscaleWhite',
      [PolicyStatus.EMITIDA]: 'bg-successBase text-grayscaleWhite',
      [PolicyStatus.VIGENTE]: 'bg-primaryBase text-grayscaleWhite',
      [PolicyStatus.VENCIDA]: 'bg-errorBase text-grayscaleWhite',
      [PolicyStatus.CANCELADA]: 'bg-grayscaleD200 text-grayscaleWhite',
    };
    return statusClasses[status] || 'bg-grayscaleL200 text-grayscaleBlack';
  }

  getTipoIcon(tipo: 'cotizacion' | 'poliza'): string {
    return tipo === 'poliza' ? 'fal fa-shield-check' : 'fal fa-file-invoice';
  }

  // ✅ Método para mostrar el texto correcto del tipo con ortografía adecuada
  getTipoDisplayText(tipo: 'cotizacion' | 'poliza'): string {
    return tipo === 'cotizacion' ? 'Cotización' : 'Póliza';
  }

  getActionButtonConfig(action: ITableAction, item: IPolicyManagementItem): ILibTbButton {
    console.log(`🔧 Configurando botón para acción: ${action.action} - Item: ${item.numero}`);
    const buttonConfig = {
      icon: action.icon,
      styleBtn: action.styleBtn,
      typeBtn: action.typeBtn,
      libTbClick: () => {
        console.log(`🎯 BOTÓN CLICKEADO! Acción: ${action.action} - Item: ${item.numero}`);
        this.onActionClick(action.action, item);
      },
    };
    console.log('🔧 Configuración del botón:', buttonConfig);
    return buttonConfig;
  }

  // ✅ TrackBy function para mejorar performance
  trackByItemId(_index: number, item: IPolicyManagementItem): string {
    return item.id;
  }

  // ✅ Métodos para configurar botones individuales
  getBtnViewDetails(item: IPolicyManagementItem): ILibTbButton {
    return {
      icon: 'fal fa-eye',
      styleBtn: 'stroke',
      typeBtn: 'primary',
      libTbClick: () => {
        console.log('🚀🚀🚀 VER DETALLES CLICKEADO PARA:', item.numero);
        console.log('📋 Item completo:', item);
        this.viewDetails(item);
      },
    };
  }

  getBtnEdit(item: IPolicyManagementItem): ILibTbButton {
    return {
      icon: 'fal fa-edit',
      styleBtn: 'stroke',
      typeBtn: 'secondary',
      libTbClick: () => {
        console.log('🚀 Editar clickeado para:', item.numero);
        this.editItem(item);
      },
    };
  }

  getBtnRenew(item: IPolicyManagementItem): ILibTbButton {
    return {
      icon: 'fal fa-redo',
      styleBtn: 'stroke',
      typeBtn: 'error',
      libTbClick: () => {
        console.log('🚀 Renovar clickeado para:', item.numero);
        this.renewPolicy(item);
      },
    };
  }

  // ✅ Regla 17.3: Botón para imprimir cotización/póliza
  getBtnPrint(item: IPolicyManagementItem): ILibTbButton {
    return {
      icon: 'fal fa-print',
      styleBtn: 'stroke',
      typeBtn: 'primary',
      libTbClick: () => {
        console.log('🖨️ Imprimir clickeado para:', item.numero);
        this.imprimirPoliza(item);
      },
    };
  }

  // ✅ Regla 17.3: Método para imprimir póliza/cotización desde management
  imprimirPoliza(item: IPolicyManagementItem): void {
    console.log('🖨️ Imprimir póliza/cotización:', item.id);
    
    // Abrir ventana de impresión
    const ventanaImpresion = window.open('', '_blank');
    if (!ventanaImpresion) {
      alert('Por favor, permite ventanas emergentes para imprimir');
      return;
    }

    const contenido = this.generarContenidoImpresion(item);
    ventanaImpresion.document.write(contenido);
    ventanaImpresion.document.close();
    
    // Esperar a que se cargue el contenido antes de imprimir
    ventanaImpresion.onload = () => {
      setTimeout(() => {
        ventanaImpresion.print();
      }, 250);
    };
  }

  // ✅ Generar contenido HTML para impresión desde management
  private generarContenidoImpresion(item: IPolicyManagementItem): string {
    const tipoDocumento = item.tipo === 'poliza' ? 'PÓLIZA' : 'COTIZACIÓN';
    
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${tipoDocumento} ${item.numero}</title>
        <style>
          @media print {
            @page { margin: 2cm; }
            body { font-family: Arial, sans-serif; font-size: 12px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #038450; padding-bottom: 20px; }
            .header h1 { color: #038450; margin: 0; }
            .section { margin-bottom: 20px; }
            .section h2 { color: #038450; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .label { font-weight: bold; width: 40%; }
            .value { width: 60%; }
            .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            table th, table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            table th { background-color: #038450; color: white; }
          }
          body { font-family: Arial, sans-serif; font-size: 12px; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #038450; padding-bottom: 20px; }
          .header h1 { color: #038450; margin: 0; }
          .section { margin-bottom: 20px; }
          .section h2 { color: #038450; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .label { font-weight: bold; width: 40%; }
          .value { width: 60%; }
          .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          table th, table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          table th { background-color: #038450; color: white; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SEGUROS BOLÍVAR</h1>
          <h2>${tipoDocumento} ${item.numero}</h2>
        </div>

        <div class="section">
          <h2>Información General</h2>
          <div class="row">
            <span class="label">Número:</span>
            <span class="value">${item.numero}</span>
          </div>
          <div class="row">
            <span class="label">Tipo:</span>
            <span class="value">${item.tipo === 'poliza' ? 'Póliza' : 'Cotización'}</span>
          </div>
          <div class="row">
            <span class="label">Estado:</span>
            <span class="value">${item.estado}</span>
          </div>
          <div class="row">
            <span class="label">Fecha de Creación:</span>
            <span class="value">${item.fechaCreacion}</span>
          </div>
          <div class="row">
            <span class="label">Producto:</span>
            <span class="value">${item.producto}</span>
          </div>
        </div>

        <div class="section">
          <h2>Datos del Tomador</h2>
          <div class="row">
            <span class="label">Número de Documento:</span>
            <span class="value">${item.numeroDocumento || 'N/A'}</span>
          </div>
          <div class="row">
            <span class="label">Nombre:</span>
            <span class="value">${item.tomador || 'N/A'}</span>
          </div>
        </div>

        <div class="section">
          <h2>Valores</h2>
          <div class="row">
            <span class="label">Valor Asegurado:</span>
            <span class="value">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.valorAsegurado)}</span>
          </div>
        </div>

        ${item.numeroContrato ? `
        <div class="section">
          <h2>Contrato</h2>
          <div class="row">
            <span class="label">Número de Contrato:</span>
            <span class="value">${item.numeroContrato}</span>
          </div>
        </div>
        ` : ''}

        <div class="footer">
          <p>Documento generado el ${new Date().toLocaleDateString('es-CO')} a las ${new Date().toLocaleTimeString('es-CO')}</p>
          <p>Seguros Bolívar - Sistema de Cumplimiento Digital</p>
        </div>
      </body>
      </html>
    `;
  }

  // ✅ Getters para el template
  get totalItems(): number {
    return this.filteredData.length;
  }

  get hasFiltersApplied(): boolean {
    return (
      this.filters.searchText.trim() !== '' ||
      this.filters.tipoFiltro !== 'todos' ||
      this.filters.estadoFiltro !== 'todos' ||
      this.filters.productoFiltro !== 'todos' ||
      this.filters.fechaDesde !== '' ||
      this.filters.fechaHasta !== ''
    );
  }
}


