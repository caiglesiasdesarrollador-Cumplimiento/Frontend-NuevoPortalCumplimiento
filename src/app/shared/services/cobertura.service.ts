/**
 * ✅ RF-013 Regla 13.6: Servicio para validar garantías y calcular prima
 *
 * Este servicio realiza todas las validaciones de las garantías y retorna
 * el valor de la prima para cada cobertura, contemplando prima mínima de
 * cobertura y prima mínima de póliza.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ICoberturaValidacionRequest {
  cobertura: {
    id: number;
    codigo: string;
    nombre: string;
    porcentaje: number;
    valorAsegurado: number;
    tasa: number;
    fechaInicio: string;
    fechaFin: string;
    fechaVencimiento: string;
    tiempoAdicional: number;
  };
  valorContrato: number;
  producto: string;
  programaId?: string;
  tipoUsuario: string;
  tipoCliente: string;
}

export interface ICoberturaValidacionResponse {
  success: boolean;
  prima: number;
  primaMinimaCobertura: number;
  primaMinimaPoliza: number;
  validaciones: {
    porcentajeValido: boolean;
    valorAseguradoValido: boolean;
    tasaValida: boolean;
    fechaValida: boolean;
    errores: string[];
  };
}

export interface IValidacionGarantiasRequest {
  coberturas: ICoberturaValidacionRequest[];
  valorContrato: number;
  producto: string;
  programaId?: string;
  tipoUsuario: string;
  tipoCliente: string;
  moneda: string;
}

export interface IValidacionGarantiasResponse {
  success: boolean;
  coberturas: ICoberturaValidacionResponse[];
  primaTotal: number;
  primaMinimaPoliza: number;
  validacionesGenerales: {
    todasValidas: boolean;
    errores: string[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class CoberturaService {
  constructor() {}

  /**
   * ✅ RF-013 Regla 13.6: Validar garantías y calcular prima
   * Realiza todas las validaciones de las garantías y retorna el valor de la prima
   * para cada cobertura, contemplando prima mínima de cobertura y prima mínima de póliza
   */
  validarGarantiasYCalcularPrima(
    request: IValidacionGarantiasRequest,
  ): Observable<IValidacionGarantiasResponse> {
    // TODO: Implementar llamada real al backend cuando esté disponible
    // Por ahora, simular respuesta con validaciones y cálculos

    const coberturasValidadas: ICoberturaValidacionResponse[] = request.coberturas.map(cobReq => {
      // Calcular prima con coeficiente proporcional
      const diasVigencia = this.calcularDiasVigencia(
        cobReq.cobertura.fechaInicio,
        cobReq.cobertura.fechaVencimiento,
      );
      const coeficiente = diasVigencia / 365;
      const prima = Math.round(
        coeficiente * cobReq.cobertura.valorAsegurado * (cobReq.cobertura.tasa / 100),
      );

      // Obtener prima mínima de cobertura (mock - debe venir del backend)
      const primaMinimaCobertura = this.obtenerPrimaMinimaCobertura(
        cobReq.cobertura.codigo,
        request.producto,
        request.moneda,
      );

      // Aplicar prima mínima si es necesario
      const primaFinal = Math.max(prima, primaMinimaCobertura);

      // Validaciones
      const errores: string[] = [];
      if (cobReq.cobertura.porcentaje < 0.01 || cobReq.cobertura.porcentaje > 100) {
        errores.push('El porcentaje debe estar entre 0.01% y 100%');
      }
      if (cobReq.cobertura.valorAsegurado <= 0) {
        errores.push('Valor asegurado debe ser mayor que cero');
      }
      if (cobReq.cobertura.valorAsegurado > cobReq.valorContrato) {
        errores.push('Valor asegurado no puede exceder el valor del contrato');
      }
      if (cobReq.cobertura.tasa <= 0) {
        errores.push('La tasa debe ser mayor que cero');
      }

      return {
        success: errores.length === 0,
        prima: primaFinal,
        primaMinimaCobertura,
        primaMinimaPoliza: 0, // Se calculará después
        validaciones: {
          porcentajeValido:
            cobReq.cobertura.porcentaje >= 0.01 && cobReq.cobertura.porcentaje <= 100,
          valorAseguradoValido:
            cobReq.cobertura.valorAsegurado > 0 &&
            cobReq.cobertura.valorAsegurado <= cobReq.valorContrato,
          tasaValida: cobReq.cobertura.tasa > 0,
          fechaValida: true, // Validación de fechas se hace en el componente
          errores,
        },
      };
    });

    // Calcular prima total
    const primaTotal = coberturasValidadas.reduce((total, cob) => total + cob.prima, 0);

    // Obtener prima mínima de póliza (mock - debe venir del backend)
    const primaMinimaPoliza = this.obtenerPrimaMinimaPoliza(
      request.producto,
      request.moneda,
      request.tipoUsuario,
    );

    // Aplicar prima mínima de póliza si es necesario
    const primaTotalFinal = Math.max(primaTotal, primaMinimaPoliza);

    // Actualizar prima mínima de póliza en todas las coberturas
    coberturasValidadas.forEach(cob => {
      cob.primaMinimaPoliza = primaMinimaPoliza;
    });

    return of({
      success: true,
      coberturas: coberturasValidadas,
      primaTotal: primaTotalFinal,
      primaMinimaPoliza,
      validacionesGenerales: {
        todasValidas: coberturasValidadas.every(c => c.success),
        errores: coberturasValidadas.flatMap(c => c.validaciones.errores),
      },
    }).pipe(delay(500)); // Simular delay de red
  }

  /**
   * Calcular días de vigencia entre dos fechas
   */
  private calcularDiasVigencia(fechaInicio: string, fechaVencimiento: string): number {
    const inicio = new Date(fechaInicio);
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = Math.floor(
      (vencimiento.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diferencia > 0 ? diferencia : 365; // Por defecto 365 días
  }

  /**
   * Obtener prima mínima de cobertura (mock - debe venir del backend)
   */
  private obtenerPrimaMinimaCobertura(
    codigoCobertura: string,
    _producto: string,
    _moneda: string,
  ): number {
    // TODO: Implementar llamada real al backend
    // Por ahora, valores mock según código de cobertura
    const primasMinimas: { [key: string]: number } = {
      '403': 50000, // CUMPLIMIENTO
      '401': 30000, // SERIEDAD DE LA OFERTA
      '402': 40000, // MANEJO DEL ANTICIPO
      '404': 35000, // SALARIOS Y PRESTACIONES SOCIALES
      '405': 45000, // ESTABILIDAD DE LA OBRA
      '406': 40000, // CALIDAD DEL SERVICIO
      '407': 35000, // BUEN FUNCIONAMIENTO DE LOS EQUIPOS
      '411': 30000, // SUMINISTRO DE REPUESTOS
      '412': 30000, // CALIDAD DE LOS BIENES SUMINISTRADOS
      '413': 60000, // PAGO ANTICIPADO
    };

    return primasMinimas[codigoCobertura] || 50000;
  }

  /**
   * Obtener prima mínima de póliza (mock - debe venir del backend)
   */
  private obtenerPrimaMinimaPoliza(
    producto: string,
    _moneda: string,
    _tipoUsuario: string,
  ): number {
    // TODO: Implementar llamada real al backend
    // Por ahora, valores mock según producto
    const primasMinimasPoliza: { [key: string]: number } = {
      '440': 200000, // Grandes Beneficiarios
      '450': 150000, // Particulares
      '455': 180000, // Estatales
    };

    const productoCodigo =
      producto === 'grandes-beneficiarios' ? '440' : producto === 'particulares' ? '450' : '455';

    return primasMinimasPoliza[productoCodigo] || 150000;
  }
}
