import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SpaceXLaunchDetails } from './mocks/spacex-launch-details.mock';
import { SpacexLaunchService } from './spacex-launch.service';

describe('SpacexLaunchService', () => {
  let injector: TestBed;
  let service: SpacexLaunchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpacexLaunchService],
    });
    injector = getTestBed();
    service = injector.get(SpacexLaunchService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getLaunchDetails', () => {
    it('should return an Observable<User[]>', () => {
      service.baseUrl = 'https://api.spacexdata.com/v3/launches?limit=100';
      service.getLaunchDetails().subscribe((launch) => {
        expect(launch.length).toBe(2);
        expect(launch).toEqual(SpaceXLaunchDetails);
      });

      const req = httpMock.expectOne(`${service.baseUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush(SpaceXLaunchDetails);
    });
  });
});
