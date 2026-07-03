import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SocialService } from './social.service';
import { environment } from '../../environments/environment';

describe('SocialService', () => {
  let service: SocialService;
  let httpMock: HttpTestingController;
  const api = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SocialService],
    });
    service = TestBed.inject(SocialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFriends() should GET /friends', () => {
    const mockUsers = [
      { id: '1', email: 'friend@test.com', name: 'Friend' },
    ];

    service.getFriends().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${api}/friends`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
