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
}
