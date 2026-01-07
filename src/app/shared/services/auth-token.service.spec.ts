import { TestBed } from '@angular/core/testing';
import { AuthTokenService } from './auth-token.service';

describe('AuthTokenService', () => {
  let service: AuthTokenService;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    localStorageMock = {};

    // Mock localStorage
    const localStorageSpyObj = {
      getItem: jest.fn((key: string) => localStorageMock[key] || null),
      setItem: jest.fn((key: string, value: string) => { localStorageMock[key] = value; }),
      removeItem: jest.fn((key: string) => { delete localStorageMock[key]; }),
      clear: jest.fn(() => { localStorageMock = {}; })
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpyObj,
      writable: true
    });

    TestBed.configureTestingModule({
      providers: [AuthTokenService]
    });

    service = TestBed.inject(AuthTokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorageMock = {};
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      localStorageMock['auth_token'] = 'test-token';
      expect(service.getToken()).toBe('test-token');
    });

    it('should return null if no token exists', () => {
      expect(service.getToken()).toBeNull();
    });
  });

  describe('setToken', () => {
    it('should save token to localStorage', () => {
      service.setToken('new-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'new-token');
    });

    it('should save expiry time to localStorage', () => {
      service.setToken('new-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('auth_token_expiry', expect.any(String));
    });
  });

  describe('setTokenData', () => {
    it('should save complete token data', () => {
      const tokenData = {
        access_token: 'access-token-123',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'refresh-token-456'
      };

      service.setTokenData(tokenData);

      expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'access-token-123');
      expect(localStorage.setItem).toHaveBeenCalledWith('refresh_token', 'refresh-token-456');
    });

    it('should not save refresh token if not provided', () => {
      const tokenData = {
        access_token: 'access-token-123',
        token_type: 'Bearer',
        expires_in: 3600
      };

      service.setTokenData(tokenData);

      expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'access-token-123');
      expect(localStorage.setItem).not.toHaveBeenCalledWith('refresh_token', expect.any(String));
    });
  });

  describe('getRefreshToken', () => {
    it('should return refresh token from localStorage', () => {
      localStorageMock['refresh_token'] = 'refresh-token';
      expect(service.getRefreshToken()).toBe('refresh-token');
    });

    it('should return null if no refresh token exists', () => {
      expect(service.getRefreshToken()).toBeNull();
    });
  });

  describe('removeToken', () => {
    it('should remove all tokens from localStorage', () => {
      service.removeToken();

      expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token_expiry');
      expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    });
  });

  describe('isTokenExpired', () => {
    it('should return true if no expiry time exists', () => {
      expect(service.isTokenExpired()).toBe(true);
    });

    it('should return true if token has expired', () => {
      const pastTime = Date.now() - 1000;
      localStorageMock['auth_token_expiry'] = pastTime.toString();

      expect(service.isTokenExpired()).toBe(true);
    });

    it('should return false if token has not expired', () => {
      const futureTime = Date.now() + 3600000;
      localStorageMock['auth_token_expiry'] = futureTime.toString();

      expect(service.isTokenExpired()).toBe(false);
    });
  });

  describe('hasValidToken', () => {
    it('should return true if token exists and is not expired', () => {
      localStorageMock['auth_token'] = 'valid-token';
      localStorageMock['auth_token_expiry'] = (Date.now() + 3600000).toString();

      expect(service.hasValidToken()).toBe(true);
    });

    it('should return false if token does not exist', () => {
      expect(service.hasValidToken()).toBe(false);
    });

    it('should return false if token is expired', () => {
      localStorageMock['auth_token'] = 'expired-token';
      localStorageMock['auth_token_expiry'] = (Date.now() - 1000).toString();

      expect(service.hasValidToken()).toBe(false);
    });
  });

  describe('getTimeUntilExpiry', () => {
    it('should return 0 if no expiry time exists', () => {
      expect(service.getTimeUntilExpiry()).toBe(0);
    });

    it('should return remaining time in seconds', () => {
      const futureTime = Date.now() + 3600000; // 1 hour
      localStorageMock['auth_token_expiry'] = futureTime.toString();

      const timeRemaining = service.getTimeUntilExpiry();
      expect(timeRemaining).toBeGreaterThan(3500); // Should be around 3600 seconds
      expect(timeRemaining).toBeLessThanOrEqual(3600);
    });

    it('should return 0 if token is expired', () => {
      const pastTime = Date.now() - 1000;
      localStorageMock['auth_token_expiry'] = pastTime.toString();

      expect(service.getTimeUntilExpiry()).toBe(0);
    });
  });

  describe('clearAuthData', () => {
    it('should call removeToken', () => {
      const removeTokenSpy = jest.spyOn(service, 'removeToken');
      service.clearAuthData();

      expect(removeTokenSpy).toHaveBeenCalled();
    });
  });
});

