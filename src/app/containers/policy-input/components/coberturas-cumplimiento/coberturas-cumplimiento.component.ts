import { Component, Input, Output, EventEmitter, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { LoggerService } from '../../../../shared/services/logger.service'; // Reservado para uso futuro

/**
 * ✅ CoberturasCumplimientoComponent - Componente para gestión de coberturas de cumplimiento
 * 
 * Responsabilidades:
 * - Mostrar tabla de coberturas de cumplimiento
 * - Permitir agregar/editar/eliminar coberturas
 * - Calcular totales de prima
 * 
 * Patrón: Presentational Component con comunicación vía @Input/@Output
 */
@Component({
  selector: 'app-coberturas-cumplimiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coberturas-cumplimiento.component.html',
  styleUrls: ['./coberturas-cumplimiento.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoberturasCumplimientoComponent implements OnInit {
  @Input() coberturas: any[] = [];
  @Input() isFormEnabled: boolean = true;

  @Output() coberturasChange = new EventEmitter<any[]>();
  @Output() totalPrimaChange = new EventEmitter<number>();

  totalPrima = 0;

  constructor() {}

  ngOnInit(): void {
    this.calcularTotalPrima();
  }

  /**
   * ✅ Calcular total de prima
   */
  calcularTotalPrima(): void {
    this.totalPrima = this.coberturas.reduce((sum, cob) => sum + (cob.prima || 0), 0);
    this.totalPrimaChange.emit(this.totalPrima);
  }

  /**
   * ✅ Formatear moneda
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }
}
