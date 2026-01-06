import { ILibTbTable } from 'tech-block-lib';

// ✅ Datos de coberturas según imagen 2
export const COBERTURAS_DATA = [
  {
    id: 1,
    seleccionado: false,
    cobertura: '401-Seriedad De La Oferta',
    porcentajeAsegurado: 10,
    valorAsegurado: 15000000,
    tasa: 0.85,
    fechaInicio: '2025-05-05',
    fechaVencimiento: '2025-11-05',
  },
  {
    id: 2,
    seleccionado: false,
    cobertura: '402-Manejo Del Anticipo',
    porcentajeAsegurado: 50,
    valorAsegurado: 75000000,
    tasa: 1.25,
    fechaInicio: '2025-05-05',
    fechaVencimiento: '2026-05-04',
  },
  {
    id: 3,
    seleccionado: true, // ✅ Solo esta está seleccionada según imagen 2
    cobertura: '403-Cumplimiento',
    porcentajeAsegurado: 20,
    valorAsegurado: 30000000,
    tasa: 0.95,
    fechaInicio: '2025-05-05',
    fechaVencimiento: '2026-05-04',
  },
  {
    id: 4,
    seleccionado: false,
    cobertura: '404-Salarios Y Prestaciones S',
    porcentajeAsegurado: 20,
    valorAsegurado: 30000000,
    tasa: 1.15,
    fechaInicio: '2025-05-05',
    fechaVencimiento: '2026-05-04',
  },
  {
    id: 5,
    seleccionado: false,
    cobertura: '405-Estabilidad De La Obra',
    porcentajeAsegurado: 30,
    valorAsegurado: 45000000,
    tasa: 1.45,
    fechaInicio: '2026-05-05',
    fechaVencimiento: '2031-05-04',
  },
  {
    id: 6,
    seleccionado: false,
    cobertura: '406-Calidad Del Servicio',
    porcentajeAsegurado: 25,
    valorAsegurado: 37500000,
    tasa: 1.35,
    fechaInicio: '2026-05-05',
    fechaVencimiento: '2027-05-04',
  },
  {
    id: 7,
    seleccionado: false,
    cobertura: '407-Buen Funcionamiento De Lo',
    porcentajeAsegurado: 15,
    valorAsegurado: 22500000,
    tasa: 1.05,
    fechaInicio: '2026-05-05',
    fechaVencimiento: '2027-05-04',
  },
  {
    id: 8,
    seleccionado: false,
    cobertura: '411-Suministro De Repuestos',
    porcentajeAsegurado: 10,
    valorAsegurado: 15000000,
    tasa: 0.75,
    fechaInicio: '2026-05-05',
    fechaVencimiento: '2027-05-04',
  },
  {
    id: 9,
    seleccionado: false,
    cobertura: '412-Calidad De Los Bienes Sum',
    porcentajeAsegurado: 10,
    valorAsegurado: 15000000,
    tasa: 0.85,
    fechaInicio: '2026-05-05',
    fechaVencimiento: '2027-05-04',
  },
  {
    id: 10,
    seleccionado: false,
    cobertura: '413-Pago Anticipado',
    porcentajeAsegurado: 100,
    valorAsegurado: 150000000,
    tasa: 2.5,
    fechaInicio: '2025-05-05',
    fechaVencimiento: '2026-05-04',
  },
];

// ✅ Configuración de la tabla usando tech-block-lib
export const coberturasCumplimientoTable: ILibTbTable = {
  dataQaId: 'coberturas-cumplimiento-table',
  value: COBERTURAS_DATA,
  columns: [
    {
      field: 'seleccionado',
      header: 'Sel.',
      type: 'checkbox',
      width: '80px',
      sortable: false,
      filterable: false,
      custom: {
        class: 'text-center',
      },
    },
    {
      field: 'cobertura',
      header: 'Coberturas',
      type: 'text',
      width: '300px',
      sortable: true,
      filterable: true,
      custom: {
        class: 'font-medium',
      },
    },
    {
      field: 'porcentajeAsegurado',
      header: '% Asegurado',
      type: 'number',
      width: '120px',
      sortable: true,
      filterable: true,
      custom: {
        class: 'text-center',
        format: (value: number) => `${value}%`,
      },
    },
    {
      field: 'valorAsegurado',
      header: 'Valor Asegurado',
      type: 'number',
      width: '180px',
      sortable: true,
      filterable: true,
      custom: {
        class: 'text-right',
        format: (value: number) => value.toLocaleString('es-CO'),
      },
    },
    {
      field: 'tasa',
      header: 'Tasa',
      type: 'number',
      width: '100px',
      sortable: true,
      filterable: true,
      custom: {
        class: 'text-center',
        format: (value: number) => `${value.toFixed(2)}%`,
      },
    },
    {
      field: 'fechaInicio',
      header: 'Fecha Inicio',
      type: 'date',
      width: '140px',
      sortable: true,
      filterable: true,
      custom: {
        class: 'text-center',
        format: (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
        },
      },
    },
    {
      field: 'fechaVencimiento',
      header: 'Fecha Vencimiento',
      type: 'date',
      width: '160px',
      sortable: true,
      filterable: true,
      custom: {
        class: 'text-center',
        format: (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
        },
      },
    },
  ],
  paginator: true,
  sortable: true,
  filterable: true,
  resizableColumns: true,
  scrollable: true,
  scrollHeight: '400px',
  custom: {
    class: 'w-full',
    tableClass: 'min-w-full',
    headerClass: 'bg-grayscaleL200 text-grayscaleBlack font-medium',
    rowClass: 'border-b border-grayscaleL200 hover:bg-grayscaleL400',
    selectedRowClass: 'bg-primaryL100 border-primaryBase',
  },
  libTbOnRowSelect: (event: any) => {
    console.log('Fila seleccionada:', event);
  },
  libTbOnRowUnselect: (event: any) => {
    console.log('Fila deseleccionada:', event);
  },
  libTbOnSelectionChange: (event: any) => {
    console.log('Selección cambiada:', event);
  },
};
