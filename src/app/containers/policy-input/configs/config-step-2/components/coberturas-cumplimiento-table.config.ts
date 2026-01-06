import { ILibTbDynamicFormConfigType, ILibTbTable } from 'tech-block-lib';
import { CoberturasCumplimientoTableComponent } from './coberturas-cumplimiento-table.component';

export const createCoberturasCumplimientoTableConfig = (
  coberturasTable: ILibTbTable,
  eventHandlers: {
    onCoberturaSelect: (event: any) => void;
    onCoberturaSelectionChange: (event: any) => void;
    onPorcentajeChange: (data: { cobertura: any; event: any }) => void;
    onValorAseguradoChange: (data: { cobertura: any; event: any }) => void;
    onTasaChange: (data: { cobertura: any; event: any }) => void;
    onFechaInicioChange: (data: { cobertura: any; event: any }) => void;
    onFechaVencimientoChange: (data: { cobertura: any; event: any }) => void;
    onTiempoAdicionalChange: (data: { cobertura: any; event: any }) => void;
    onPrimaChange: (data: { cobertura: any; event: any }) => void;
    onCheckboxChange: (data: { cobertura: any; event: any }) => void;
    onClearSelection: () => void;
    onRefreshCoberturas: () => void;
    onSaveChanges: () => void;
  },
): ILibTbDynamicFormConfigType => ({
  containerId: 'step2-coberturas-table-container',
  formId: 'coberturasCumplimientoTable',
  component: CoberturasCumplimientoTableComponent,
  componentInputs: {
    // ✅ Input para pasar la configuración de la tabla
    coberturasTable: coberturasTable,
  },
  componentOutputs: {
    // ✅ Outputs para manejar eventos de la tabla
    coberturaSelect: eventHandlers.onCoberturaSelect,
    coberturaSelectionChange: eventHandlers.onCoberturaSelectionChange,
    porcentajeChange: eventHandlers.onPorcentajeChange,
    valorAseguradoChange: eventHandlers.onValorAseguradoChange,
    tasaChange: eventHandlers.onTasaChange,
    fechaInicioChange: eventHandlers.onFechaInicioChange,
    fechaVencimientoChange: eventHandlers.onFechaVencimientoChange,
    tiempoAdicionalChange: eventHandlers.onTiempoAdicionalChange,
    primaChange: eventHandlers.onPrimaChange,
    checkboxChange: eventHandlers.onCheckboxChange,
    clearSelection: eventHandlers.onClearSelection,
    refreshCoberturas: eventHandlers.onRefreshCoberturas,
    saveChanges: eventHandlers.onSaveChanges,
  },
  custom: {
    name: 'coberturasCumplimientoTable',
  },
  classContainer: '',
});
