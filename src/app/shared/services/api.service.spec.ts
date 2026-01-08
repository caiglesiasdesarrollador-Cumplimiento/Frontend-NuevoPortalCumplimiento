import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getData', () => {
    it('should make GET request to /assets/api/data.json', () => {
      const mockData = { test: 'data' };
      
      service.getData().subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne('/assets/api/data.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should handle error response', () => {
      service.getData().subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne('/assets/api/data.json');
      req.flush('Server error', { status: 500, statusText: 'Server Error' });
    });
  });
});
