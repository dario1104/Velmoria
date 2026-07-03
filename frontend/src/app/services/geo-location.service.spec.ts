import { TestBed } from '@angular/core/testing';
import { GeoLocationService } from './geo-location.service';
import { GpsService } from './gps.service';

describe('GeoLocationService', () => {
  let service: GeoLocationService;
  let gpsSpy: jasmine.SpyObj<GpsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GpsService', ['createPoint']);

    TestBed.configureTestingModule({
      providers: [
        GeoLocationService,
        { provide: GpsService, useValue: spy },
      ],
    });

    service = TestBed.inject(GeoLocationService);
    gpsSpy = TestBed.inject(GpsService) as jasmine.SpyObj<GpsService>;
  });

  afterEach(() => {
    if (navigator.geolocation && (navigator.geolocation as any).clearWatch) {
      navigator.geolocation.clearWatch(service['watchId']!);
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isTracking() should return false initially', () => {
    expect(service.isTracking()).toBeFalse();
  });

  it('startTracking() should call navigator.geolocation.watchPosition', () => {
    const watchPosition = jasmine.createSpy('watchPosition').and.returnValue(42);
    spyOnProperty(navigator, 'geolocation', 'get').and.returnValue({
      watchPosition,
      clearWatch: jasmine.createSpy('clearWatch'),
    } as any);

    service.startTracking('trip-1');

    expect(watchPosition).toHaveBeenCalled();
    expect(service.isTracking()).toBeTrue();
  });
});
