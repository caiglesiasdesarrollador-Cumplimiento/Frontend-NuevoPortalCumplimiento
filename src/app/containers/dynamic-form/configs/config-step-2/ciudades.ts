import { validatorRequired } from '@shared/utils/validators';
import { ILibTbDynamicFormConfigType } from 'tech-block-lib';

export const ciudades: ILibTbDynamicFormConfigType = {
  tbType: 'dropdown-multiple',
  containerId: 'step2-location-info-container', // ✅ Aplicando regla: containerId específico
  formId: 'ciudades',
  template: ['ciudades:item', 'ciudades:group', 'ciudades:selectedItem', 'ciudades:header'],
  custom: {
    name: 'ciudades',
    label: 'Ciudades de interés',
    placeholder: 'Seleccione hasta 5 ciudades que le interesan',
    options: [
      {
        label: 'Colombia 🇨🇴',
        value: 'colombia',
        items: [
          { label: 'Bogotá', value: 'bogota', country: 'colombia', population: '7.4M' },
          { label: 'Medellín', value: 'medellin', country: 'colombia', population: '2.5M' },
          { label: 'Cali', value: 'cali', country: 'colombia', population: '2.2M' },
          { label: 'Barranquilla', value: 'barranquilla', country: 'colombia', population: '1.2M' },
          { label: 'Cartagena', value: 'cartagena', country: 'colombia', population: '1.0M' },
          { label: 'Bucaramanga', value: 'bucaramanga', country: 'colombia', population: '600K' },
        ],
      },
      {
        label: 'México 🇲🇽',
        value: 'mexico',
        items: [
          { label: 'Ciudad de México', value: 'cdmx', country: 'mexico', population: '9.2M' },
          { label: 'Guadalajara', value: 'guadalajara', country: 'mexico', population: '1.4M' },
          { label: 'Monterrey', value: 'monterrey', country: 'mexico', population: '1.1M' },
          { label: 'Puebla', value: 'puebla', country: 'mexico', population: '1.5M' },
          { label: 'Tijuana', value: 'tijuana', country: 'mexico', population: '1.6M' },
          { label: 'Cancún', value: 'cancun', country: 'mexico', population: '700K' },
        ],
      },
      {
        label: 'Argentina 🇦🇷',
        value: 'argentina',
        items: [
          {
            label: 'Buenos Aires',
            value: 'buenosaires',
            country: 'argentina',
            population: '15.6M',
          },
          { label: 'Córdoba', value: 'cordoba', country: 'argentina', population: '1.5M' },
          { label: 'Rosario', value: 'rosario', country: 'argentina', population: '1.2M' },
          { label: 'Mendoza', value: 'mendoza', country: 'argentina', population: '1.0M' },
          { label: 'La Plata', value: 'laplata', country: 'argentina', population: '900K' },
        ],
      },
      {
        label: 'Chile 🇨🇱',
        value: 'chile',
        items: [
          { label: 'Santiago', value: 'santiago', country: 'chile', population: '6.1M' },
          { label: 'Valparaíso', value: 'valparaiso', country: 'chile', population: '800K' },
          { label: 'Concepción', value: 'concepcion', country: 'chile', population: '700K' },
          { label: 'La Serena', value: 'laserena', country: 'chile', population: '400K' },
          { label: 'Antofagasta', value: 'antofagasta', country: 'chile', population: '400K' },
        ],
      },
      {
        label: 'Perú 🇵🇪',
        value: 'peru',
        items: [
          { label: 'Lima', value: 'lima', country: 'peru', population: '10.7M' },
          { label: 'Arequipa', value: 'arequipa', country: 'peru', population: '1.0M' },
          { label: 'Trujillo', value: 'trujillo', country: 'peru', population: '900K' },
          { label: 'Cusco', value: 'cusco', country: 'peru', population: '430K' },
        ],
      },
    ],
    group: true,
    optionGroupLabel: 'label',
    optionGroupChildren: 'items',
    optionLabel: 'label',
    optionValue: 'value',
    dataKey: 'value',
    filter: true,
    filterBy: 'label,country,population',
    filterPlaceholder: 'Buscar ciudades por nombre, país o población...',
    resetFilterOnHide: true,
    autofocusFilter: true,
    chip: true,
    ellipsis: true,
    dropdownIcon: 'fal fa-city',
    showToggleAll: false,
    showHeader: true,
    selectionLimit: 5,
    scrollHeight: '300px',
    floatLabel: true,
    caption: true,
    showIconCaption: true,
    showHelp: true,
    captionText: {
      help: 'Seleccione hasta 5 ciudades donde tiene interés profesional o personal',
      success: 'Ciudades seleccionadas correctamente',
      error: 'Debe seleccionar al menos una ciudad',
    },
    emptyFilterMessage: 'No se encontraron ciudades que coincidan con su búsqueda',
    toggleAllLabel: 'Seleccionar todas las ciudades visibles',
    libTbChange: event => {
      console.log('Ciudades seleccionadas:', event.value);
      if (event.value && event.value.length >= 5) {
        console.log('Límite de 5 ciudades alcanzado');
      }
    },
    libTbFilter: event => {
      console.log('Filtro aplicado:', event.filter);
    },
  },
  formProps: {
    validators: [validatorRequired()],
  },
};
