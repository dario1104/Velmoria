import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const api = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login() should POST to /auth/login', () => {
    const mockResponse = {
      user: { id: '1', email: 'test@test.com' },
      accessToken: 'abc',
      refreshToken: 'def',
      expiresIn: 3600,
    };

    service.login('test@test.com', 'pass').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${api}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@test.com', password: 'pass' });
    req.flush(mockResponse);
  });

  it('register() should POST to /auth/register', () => {
    const mockResponse = {
      user: { id: '1', email: 'test@test.com' },
      accessToken: 'abc',
      refreshToken: 'def',
      expiresIn: 3600,
    };

    service.register('test@test.com', 'pass', 'Test').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${api}/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@test.com', password: 'pass', name: 'Test' });
    req.flush(mockResponse);
  });

  it('refresh() should POST to /auth/refresh', () => {
    localStorage.setItem('refreshToken', 'old-refresh');
    const mockResponse = { accessToken: 'new-at', refreshToken: 'new-rt', expiresIn: 3600 };

    service.refresh().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${api}/auth/refresh`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ refreshToken: 'old-refresh' });
    req.flush(mockResponse);
  });

  it('logout() should clear localStorage', () => {
    localStorage.setItem('accessToken', 'abc');
    localStorage.setItem('refreshToken', 'def');

    service.logout();

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });

  it('isLoggedIn() should return false when no token', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('storeTokens should save to localStorage', () => {
    const tokens = { accessToken: 'abc', refreshToken: 'def', expiresIn: 3600, user: { id: '1', email: 't@t.com' } };

    service.login('t@t.com', 'p').subscribe();

    const req = httpMock.expectOne(`${api}/auth/login`);
    req.flush(tokens);

    expect(localStorage.getItem('accessToken')).toBe('abc');
    expect(localStorage.getItem('refreshToken')).toBe('def');
  });
});
