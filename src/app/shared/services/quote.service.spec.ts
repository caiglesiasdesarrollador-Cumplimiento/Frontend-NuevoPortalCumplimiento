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
});
