import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ILibTbTable } from 'tech-block-lib';

@Component({
  standalone: false,
  selector: 'app-coberturas-cumplimiento-table',
  templateUrl: './coberturas-cumplimiento-table.component.html',
  styleUrls: ['./coberturas-cumplimiento-table.component.scss'],
})
export class CoberturasCumplimientoTableComponent {
  // ✅ Input para recibir la configuración de la tabla
  @Input() coberturasTable: ILibTbTable = {};

  // ✅ Outputs para los eventos de la tabla
  @Output() coberturaSelect = new EventEmitter<any>();
  @Output() coberturaSelectionChange = new EventEmitter<any>();
  @Output() porcentajeChange = new EventEmitter<{ cobertura: any; event: any }>();
  @Output() valorAseguradoChange = new EventEmitter<{ cobertura: any; event: any }>();
  @Output() tasaChange = new EventEmitter<{ cobertura: any; event: any }>();
  @Output() fechaInicioChange = new EventEmitter<{ cobertura: any; event: any }>();
  @Output() fechaFinChange = new EventEmitter<{ cobertura: any; event: any }>();
  @Output() fechaVencimientoChange = new EventEmitter<{ cobertura: any; event: any }>();
  @Output() tiempoAdicionalChange = new EventEmitter<{ cobertura: any; event: any }>();
  @Output() primaChange = new EventEmitter<{ cobertura: any; event: any }>();
  @Output() checkboxChange = new EventEmitter<{ cobertura: any; event: any }>();
  @Output() clearSelection = new EventEmitter<void>();
  @Output() refreshCoberturas = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<void>();

  // ✅ Métodos para manejar eventos de la tabla
  onCoberturaSelect(event: any): void {
    this.coberturaSelect.emit(event);
  }

  onCoberturaSelectionChange(event: any): void {
    this.coberturaSelectionChange.emit(event);
  }

  onPorcentajeChange(cobertura: any, event: any): void {
    this.porcentajeChange.emit({ cobertura, event });
  }

  onValorAseguradoChange(cobertura: any, event: any): void {
    this.valorAseguradoChange.emit({ cobertura, event });
  }

  onTasaChange(cobertura: any, event: any): void {
    this.tasaChange.emit({ cobertura, event });
  }

  onFechaInicioChange(cobertura: any, event: any): void {
    this.fechaInicioChange.emit({ cobertura, event });
  }

  onFechaFinChange(cobertura: any, event: any): void {
    this.fechaFinChange.emit({ cobertura, event });
  }

  onFechaVencimientoChange(cobertura: any, event: any): void {
    this.fechaVencimientoChange.emit({ cobertura, event });
  }

  onTiempoAdicionalChange(cobertura: any, event: any): void {
    this.tiempoAdicionalChange.emit({ cobertura, event });
  }

  onPrimaChange(cobertura: any, event: any): void {
    this.primaChange.emit({ cobertura, event });
  }

  onCoberturaCheckboxChange(cobertura: any, event: any): void {
    this.checkboxChange.emit({ cobertura, event });
  }

  onClearSelection(): void {
    this.clearSelection.emit();
  }

  onRefreshCoberturas(): void {
    this.refreshCoberturas.emit();
  }

  onSaveChanges(): void {
    this.saveChanges.emit();
  }
}
