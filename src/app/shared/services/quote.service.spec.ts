import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { QuoteService } from './quote.service';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteService]
    });
    service = TestBed.inject(QuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateQuote', () => {
    it('should generate a quote with provided data', fakeAsync(() => {
      const mockData = {
        product: 'Test Product',
        contractValue: 50000
      };
      
      let result: any;
      service.generateQuote(mockData).subscribe(res => {
        result = res;
      });
      
      tick(2100); // Wait for delay
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.quoteNumber).toMatch(/^COT-\d+-\d{3}$/);
      expect(result.product).toBe('Test Product');
      expect(result.contractValue).toBe(50000);
      expect(result.generatedAt).toBeDefined();
    }));

    it('should use default values when data is empty', fakeAsync(() => {
      let result: any;
      service.generateQuote({}).subscribe(res => {
        result = res;
      });
      
      tick(2100);
      
      expect(result.product).toBe('Producto por defecto');
      expect(result.contractValue).toBe(0);
    }));
  });

  // ✅ RF017.2: Tests para getSavedQuote
  describe('getSavedQuote', () => {
    it('should get saved quote by ID', fakeAsync(() => {
      const quoteId = 'q001';
      let result: any;
      
      service.getSavedQuote(quoteId).subscribe(res => {
        result = res;
      });
      
      tick(600); // Wait for delay
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.id).toBe(quoteId);
      expect(result.numero).toContain('COT-');
      expect(result.pasoGuardado).toBe(1);
      expect(result.datosGenerales).toBeDefined();
      expect(result.datosGenerales.tipoDocTomador).toBe('NIT');
      expect(result.ubicacionRiesgo).toBeDefined();
      expect(result.detallesContrato).toBeDefined();
      expect(result.producto).toBe('Responsabilidad Civil');
      expect(result.valorAsegurado).toBe(500000000);
      expect(result.estado).toBe('Borrador');
    }));

    it('should return quote with correct structure', fakeAsync(() => {
      const quoteId = 'q002';
      let result: any;
      
      service.getSavedQuote(quoteId).subscribe(res => {
        result = res;
      });
      
      tick(600);
      
      expect(result.datosGenerales).toHaveProperty('tipoDocTomador');
      expect(result.datosGenerales).toHaveProperty('numDocTomador');
      expect(result.datosGenerales).toHaveProperty('nombreTomador');
      expect(result.datosGenerales).toHaveProperty('tipoDocAsegurado');
      expect(result.datosGenerales).toHaveProperty('numDocAsegurado');
      expect(result.datosGenerales).toHaveProperty('nombreAsegurado');
      expect(result.datosGenerales).toHaveProperty('numeroContrato');
      expect(result.datosGenerales).toHaveProperty('moneda');
      expect(result.ubicacionRiesgo).toHaveProperty('departamento');
      expect(result.ubicacionRiesgo).toHaveProperty('municipio');
      expect(result.ubicacionRiesgo).toHaveProperty('direccion');
      expect(result.detallesContrato).toHaveProperty('valorContrato');
      expect(result.detallesContrato).toHaveProperty('fechaInicio');
      expect(result.detallesContrato).toHaveProperty('fechaFin');
      expect(result.detallesContrato).toHaveProperty('duracion');
    }));

    it('should include pasoGuardado in response', fakeAsync(() => {
      const quoteId = 'q003';
      let result: any;
      
      service.getSavedQuote(quoteId).subscribe(res => {
        result = res;
      });
      
      tick(600);
      
      expect(result.pasoGuardado).toBeDefined();
      expect(typeof result.pasoGuardado).toBe('number');
      expect(result.pasoGuardado).toBeGreaterThanOrEqual(1);
    }));
  });
});
