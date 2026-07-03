import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TripsService } from './trips.service';
import { environment } from '../../environments/environment';

describe('TripsService', () => {
  let service: TripsService;
  let httpMock: HttpTestingController;
  const api = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripsService],
    });
    service = TestBed.inject(TripsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findAll() should GET /trips', () => {
    const mockTrips = [
      { id: '1', title: 'Trip 1', userId: 'u1', startDate: '2024-01-01', isActive: true, createdAt: '2024-01-01' },
    ];

    service.findAll().subscribe(trips => {
      expect(trips).toEqual(mockTrips);
    });

    const req = httpMock.expectOne(`${api}/trips`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrips);
  });

  it('findOne() should GET /trips/:id', () => {
    const mockTrip = { id: '1', title: 'Trip 1', userId: 'u1', startDate: '2024-01-01', isActive: true, createdAt: '2024-01-01' };

    service.findOne('1').subscribe(trip => {
      expect(trip).toEqual(mockTrip);
    });

    const req = httpMock.expectOne(`${api}/trips/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrip);
  });

  it('create() should POST /trips', () => {
    const mockTrip = { id: '1', title: 'New Trip', userId: 'u1', startDate: '2024-01-01', isActive: true, createdAt: '2024-01-01' };

    service.create('New Trip', 'A description').subscribe(trip => {
      expect(trip).toEqual(mockTrip);
    });

    const req = httpMock.expectOne(`${api}/trips`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: 'New Trip', description: 'A description' });
    req.flush(mockTrip);
  });

  it('remove() should DELETE /trips/:id', () => {
    service.remove('1').subscribe();

    const req = httpMock.expectOne(`${api}/trips/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
