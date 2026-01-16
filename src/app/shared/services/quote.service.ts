import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor() {
    // Constructor vacío intencionalmente
  }

  /**
   * Simula la generación de una cotización
   * @param data Datos necesarios para generar la cotización
   * @returns Observable con la respuesta de la cotización generada
   */
  generateQuote(data: any): Observable<any> {
    // Simular llamada HTTP con delay
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const randomSuffix = (randomArray[0] % 1000).toString().padStart(3, '0');
    return of({
      success: true,
      quoteNumber: `COT-${Date.now().toString().slice(-6)}-${randomSuffix}`,
      product: data.product || 'Producto por defecto',
      contractValue: data.contractValue || 0,
      generatedAt: new Date().toISOString(),
    }).pipe(
      delay(2000), // Simular 2 segundos de procesamiento
    );
  }

  /**
   * Regla 17.2: Obtener cotización guardada por ID para retomar
   * @param quoteId ID de la cotización a obtener
   * @returns Observable con los datos de la cotización guardada
   */
  getSavedQuote(quoteId: string): Observable<any> {
    // Simular llamada HTTP con delay
    return of({
      success: true,
      id: quoteId,
      numero: `COT-${quoteId.slice(-3)}`,
      pasoGuardado: 1, // Paso donde se quedó (1 = paso 2, 2 = paso 3)
      datosGenerales: {
        tipoDocTomador: 'NIT',
        numDocTomador: '900123456-7',
        nombreTomador: 'Empresa Ejemplo S.A.S',
        tipoDocAsegurado: 'NIT',
        numDocAsegurado: '900987654-3',
        nombreAsegurado: 'Cliente Ejemplo Ltda',
        numeroContrato: 'CT-2024-001',
        moneda: 'COP',
      },
      ubicacionRiesgo: {
        departamento: 'Bogotá D.C.',
        municipio: 'Bogotá',
        direccion: 'Calle 100 # 10-20',
      },
      detallesContrato: {
        valorContrato: 500000000,
        fechaInicio: '2024-01-01',
        fechaFin: '2025-01-01',
        duracion: '12',
      },
      producto: 'Responsabilidad Civil',
      valorAsegurado: 500000000,
      estado: 'Borrador',
      fechaCreacion: new Date().toISOString(),
    }).pipe(
      delay(500), // Simular 500ms de procesamiento
    );
  }
}
