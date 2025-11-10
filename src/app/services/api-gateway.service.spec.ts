import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiGatewayService } from './api-gateway.service';
import { environment } from '../../environments/environment';

describe('ApiGatewayService', () => {
  let service: ApiGatewayService;
  let httpMock: HttpTestingController;

  // Variables globales para las rutas de los endpoints
  const LAMBDA_ENDPOINT_PATH = '/cumplimientodigital/';
  const ECS_ENDPOINT_PATH = '/cumplimiento/api/hello';

  // Respuestas de texto para los diferentes endpoints
  const mockLambdaResponse = '¡Hola Mundo desde Lambda en Java!';
  const mockEcsResponse = 'Hello World!';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiGatewayService]
    });

    service = TestBed.inject(ApiGatewayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have correct URL configuration', () => {
      const expectedBaseUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}`;
      const expectedLambdaUrl = `{expectedBaseUrl}{environment.apiGateway.endpoints.lambda}`;
      const expectedEcsUrl = `{expectedBaseUrl}{environment.apiGateway.endpoints.ecs}`;

      // Access private properties for testing purposes
      expect((service as any).baseUrl).toBe(expectedBaseUrl);
      expect((service as any).lambdaUrl).toBe(expectedLambdaUrl);
      expect((service as any).ecsUrl).toBe(expectedEcsUrl);
    });
  });

  describe('getLambdaData', () => {
    it('should make GET request to Lambda endpoint expecting text response', () => {
      service.getLambdaData().subscribe(response => {
        expect(response).toEqual(mockLambdaResponse);
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.lambda}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('text');

      req.flush(mockLambdaResponse);
    });

    it('should handle error response for Lambda endpoint', () => {
      const errorMessage = 'Lambda service error';

      service.getLambdaData().subscribe({
        next: () => fail('Should have failed with error'),
        error: error => {
          expect(error.status).toBe(500);
          expect(error.error).toBe(errorMessage);
        }
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.lambda}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.responseType).toBe('text');

      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getEcsData', () => {
    it('should make GET request to ECS endpoint expecting text response', () => {
      service.getEcsData().subscribe(response => {
        expect(response).toEqual(mockEcsResponse);
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.ecs}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('text');

      req.flush(mockEcsResponse);
    });

    it('should handle error response for ECS endpoint', () => {
      const errorMessage = 'ECS service error';

      service.getEcsData().subscribe({
        next: () => fail('Should have failed with error'),
        error: error => {
          expect(error.status).toBe(404);
          expect(error.error).toBe(errorMessage);
        }
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.ecs}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.responseType).toBe('text');

      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('postLambdaData', () => {
    it('should make POST request to Lambda endpoint with data expecting text response', () => {
      const testData = { userId: 123, action: 'create' };

      service.postLambdaData(testData).subscribe(response => {
        expect(response).toEqual(mockLambdaResponse);
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.lambda}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toBe('text');
      expect(req.request.body).toEqual(testData);

      req.flush(mockLambdaResponse);
    });

    it('should handle POST request with null data', () => {
      service.postLambdaData(null).subscribe(response => {
        expect(response).toEqual(mockLambdaResponse);
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.lambda}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toBe('text');
      expect(req.request.body).toBeNull();

      req.flush(mockLambdaResponse);
    });

    it('should handle error response for POST Lambda', () => {
      const testData = { invalid: 'data' };
      const errorMessage = 'Validation error';

      service.postLambdaData(testData).subscribe({
        next: () => fail('Should have failed with error'),
        error: error => {
          expect(error.status).toBe(400);
          expect(error.error).toBe(errorMessage);
        }
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.lambda}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.responseType).toBe('text');

      req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('postEcsData', () => {
    it('should make POST request to ECS endpoint with data expecting text response', () => {
      const testData = { containerId: 'abc123', operation: 'restart' };

      service.postEcsData(testData).subscribe(response => {
        expect(response).toEqual(mockEcsResponse);
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.ecs}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toBe('text');
      expect(req.request.body).toEqual(testData);

      req.flush(mockEcsResponse);
    });

    it('should handle POST request with empty object', () => {
      const testData = {};

      service.postEcsData(testData).subscribe(response => {
        expect(response).toEqual(mockEcsResponse);
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.ecs}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toBe('text');
      expect(req.request.body).toEqual(testData);

      req.flush(mockEcsResponse);
    });

    it('should handle error response for POST ECS', () => {
      const testData = { operation: 'invalid' };
      const errorMessage = 'Operation not supported';

      service.postEcsData(testData).subscribe({
        next: () => fail('Should have failed with error'),
        error: error => {
          expect(error.status).toBe(422);
          expect(error.error).toBe(errorMessage);
        }
      });

      const expectedUrl = `{environment.apiGateway.baseUrl}/{environment.apiGateway.stage}{environment.apiGateway.endpoints.ecs}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.responseType).toBe('text');

      req.flush(errorMessage, { status: 422, statusText: 'Unprocessable Entity' });
    });
  });

  describe('Integration Tests', () => {
    it('should handle multiple concurrent requests', () => {
      const lambdaData = { type: 'lambda' };
      const ecsData = { type: 'ecs' };

      let lambdaResponse: string | undefined;
      let ecsResponse: string | undefined;

      // Realizar múltiples requests concurrentes
      service.getLambdaData().subscribe(response => lambdaResponse = response);
      service.getEcsData().subscribe(response => ecsResponse = response);
      service.postLambdaData(lambdaData).subscribe();
      service.postEcsData(ecsData).subscribe();      // Verificar que se realizaron todas las requests
      const lambdaGetReq = httpMock.expectOne(req =>
        req.method === 'GET' && req.url.includes(LAMBDA_ENDPOINT_PATH)
      );
      const ecsGetReq = httpMock.expectOne(req =>
        req.method === 'GET' && req.url.includes(ECS_ENDPOINT_PATH)
      );
      const lambdaPostReq = httpMock.expectOne(req =>
        req.method === 'POST' && req.url.includes(LAMBDA_ENDPOINT_PATH)
      );
      const ecsPostReq = httpMock.expectOne(req =>
        req.method === 'POST' && req.url.includes(ECS_ENDPOINT_PATH)
      );

      // Verificar tipos de respuesta esperados
      expect(lambdaGetReq.request.responseType).toBe('text');
      expect(ecsGetReq.request.responseType).toBe('text');
      expect(lambdaPostReq.request.responseType).toBe('text');
      expect(ecsPostReq.request.responseType).toBe('text');

      // Responder a todas las requests
      lambdaGetReq.flush(mockLambdaResponse);
      ecsGetReq.flush(mockEcsResponse);
      lambdaPostReq.flush(mockLambdaResponse);
      ecsPostReq.flush(mockEcsResponse);

      // Verificar que las responses fueron recibidas
      expect(lambdaResponse).toEqual(mockLambdaResponse);
      expect(ecsResponse).toEqual(mockEcsResponse);
    });

    it('should construct URLs correctly based on environment', () => {
      // Esta prueba verifica que las URLs se construyen correctamente      service.getLambdaData().subscribe();
      service.getEcsData().subscribe();

      const lambdaReq = httpMock.expectOne(req => req.url.includes(LAMBDA_ENDPOINT_PATH));
      const ecsReq = httpMock.expectOne(req => req.url.includes(ECS_ENDPOINT_PATH));

      expect(lambdaReq.request.url).toContain(environment.apiGateway.stage);
      expect(ecsReq.request.url).toContain(environment.apiGateway.stage);
      expect(lambdaReq.request.responseType).toBe('text');
      expect(ecsReq.request.responseType).toBe('text');

      lambdaReq.flush(mockLambdaResponse);
      ecsReq.flush(mockEcsResponse);
    });
  });
});
