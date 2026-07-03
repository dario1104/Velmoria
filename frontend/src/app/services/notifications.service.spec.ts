import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationsService } from './notifications.service';
import { environment } from '../../environments/environment';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let httpMock: HttpTestingController;
  const api = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationsService],
    });
    service = TestBed.inject(NotificationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getNotifications() should GET /notifications', () => {
    const mockNotifications = [
      { id: '1', type: 'info', message: 'Test notification', read: false, createdAt: '2024-01-01' },
    ];

    service.findAll().subscribe(notifications => {
      expect(notifications).toEqual(mockNotifications);
    });

    const req = httpMock.expectOne(`${api}/notifications`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNotifications);
  });

  it('markRead() should PATCH /notifications/:id/read', () => {
    service.markRead('1').subscribe();

    const req = httpMock.expectOne(`${api}/notifications/1/read`);
    expect(req.request.method).toBe('PATCH');
    req.flush(null);
  });

  it('markAllRead() should PATCH /notifications/read-all', () => {
    service.markAllRead().subscribe();

    const req = httpMock.expectOne(`${api}/notifications/read-all`);
    expect(req.request.method).toBe('PATCH');
    req.flush(null);
  });
});
