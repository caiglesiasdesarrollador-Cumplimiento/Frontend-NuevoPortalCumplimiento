import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiGatewayService } from './api-gateway.service';

describe('ApiGatewayService', () => {
  let service: ApiGatewayService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiGatewayService]
    });
    service = TestBed.inject(ApiGatewayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { httpMock.verify(); });

  it('should be created', () => { expect(service).toBeTruthy(); });
  it('should get lambda data', () => {
    service.getLambdaData().subscribe(data => expect(data).toBeDefined());
    const req = httpMock.expectOne(r => r.url.includes('lambda'));
    req.flush('test');
  });
  it('should get ecs data', () => {
    service.getEcsData().subscribe(data => expect(data).toBeDefined());
    const req = httpMock.expectOne(r => r.url.includes('ecs'));
    req.flush('test');
  });
});
