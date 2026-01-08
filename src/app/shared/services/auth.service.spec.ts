import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, ILoginRequest, ILoginResponse } from './auth.service';
import { AuthTokenService } from './auth-token.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let authTokenServiceMock: jest.Mocked<AuthTokenService>;

  const mockLoginResponse: ILoginResponse = {
    access_token: 'test-access-token',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: 'test-refresh-token',
    user: {
      id: '123',
      email: 'test@test.com',
      name: 'Test User'
    }
  };

  const mockCredentials: ILoginRequest = {
    email: 'test@test.com',
    password: 'password123'
  };

  beforeEach(() => {
    authTokenServiceMock = {
      setTokenData: jest.fn(),
      getRefreshToken: jest.fn().mockReturnValue('test-refresh-token'),
      hasValidToken: jest.fn().mockReturnValue(false),
      getTimeUntilExpiry: jest.fn().mockReturnValue(3600),
      clearAuthData: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: AuthTokenService, useValue: authTokenServiceMock }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have isAuthenticated$ observable', () => {
      expect(service.isAuthenticated$).toBeDefined();
    });

    it('should check initial auth state', () => {
      expect(authTokenServiceMock.hasValidToken).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should make POST request to /api/auth/login', () => {
      service.login(mockCredentials).subscribe();

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCredentials);
      req.flush(mockLoginResponse);
    });

    it('should store token data on successful login', fakeAsync(() => {
      service.login(mockCredentials).subscribe();

      const req = httpMock.expectOne('/api/auth/login');
      req.flush(mockLoginResponse);
      tick();

      expect(authTokenServiceMock.setTokenData).toHaveBeenCalledWith({
        access_token: mockLoginResponse.access_token,
        token_type: mockLoginResponse.token_type,
        expires_in: mockLoginResponse.expires_in,
        refresh_token: mockLoginResponse.refresh_token
      });
    }));

    it('should update isAuthenticated to true on successful login', fakeAsync(() => {
      let isAuthenticated = false;
      service.isAuthenticated$.subscribe(val => isAuthenticated = val);

      service.login(mockCredentials).subscribe();
      const req = httpMock.expectOne('/api/auth/login');
      req.flush(mockLoginResponse);
      tick();

      expect(isAuthenticated).toBe(true);
    }));
  });

  describe('logout', () => {
    it('should make POST request to /api/auth/logout', () => {
      service.logout().subscribe();

      const req = httpMock.expectOne('/api/auth/logout');
      expect(req.request.method).toBe('POST');
      req.flush({});
    });

    it('should clear auth data on successful logout', fakeAsync(() => {
      service.logout().subscribe();

      const req = httpMock.expectOne('/api/auth/logout');
      req.flush({});
      tick();

      expect(authTokenServiceMock.clearAuthData).toHaveBeenCalled();
    }));
  });

  describe('refreshToken', () => {
    it('should throw error if no refresh token available', () => {
      authTokenServiceMock.getRefreshToken.mockReturnValue(null);

      expect(() => service.refreshToken()).toThrow('No hay refresh token disponible');
    });

    it('should make POST request to /api/auth/refresh with refresh token', () => {
      service.refreshToken().subscribe();

      const req = httpMock.expectOne('/api/auth/refresh');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ refresh_token: 'test-refresh-token' });
      req.flush(mockLoginResponse);
    });

    it('should update token data on successful refresh', fakeAsync(() => {
      service.refreshToken().subscribe();

      const req = httpMock.expectOne('/api/auth/refresh');
      req.flush(mockLoginResponse);
      tick();

      expect(authTokenServiceMock.setTokenData).toHaveBeenCalled();
    }));
  });

  describe('getUserProfile', () => {
    it('should make GET request to /api/auth/profile', () => {
      service.getUserProfile().subscribe();

      const req = httpMock.expectOne('/api/auth/profile');
      expect(req.request.method).toBe('GET');
      req.flush({ name: 'Test User' });
    });
  });

  describe('getProtectedData', () => {
    it('should make GET request to /api/protected/data', () => {
      service.getProtectedData().subscribe();

      const req = httpMock.expectOne('/api/protected/data');
      expect(req.request.method).toBe('GET');
      req.flush({ data: 'protected' });
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if token is valid', () => {
      authTokenServiceMock.hasValidToken.mockReturnValue(true);
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false if token is invalid', () => {
      authTokenServiceMock.hasValidToken.mockReturnValue(false);
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('getTokenTimeRemaining', () => {
    it('should return time until token expiry', () => {
      authTokenServiceMock.getTimeUntilExpiry.mockReturnValue(1800);
      expect(service.getTokenTimeRemaining()).toBe(1800);
    });
  });

  describe('clearAuthData', () => {
    it('should clear token data', () => {
      service.clearAuthData();
      expect(authTokenServiceMock.clearAuthData).toHaveBeenCalled();
    });

    it('should update isAuthenticated to false', fakeAsync(() => {
      let isAuthenticated = true;
      service.isAuthenticated$.subscribe(val => isAuthenticated = val);

      service.clearAuthData();
      tick();

      expect(isAuthenticated).toBe(false);
    }));
  });
});

