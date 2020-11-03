import { Subscription } from 'rxjs';
import { SpaceXLaunchDetails } from '../store/mocks/spacex-launch-details.mock';
import { MockSpaceXLaunchService } from '../store/spacex-launch.service.mock';
import { LaunchProgramsComponent } from './launch-programs.component';

describe('LaunchProgramsComponent', () => {
  let component;
  let spacexLaunchService;

  beforeEach(() => {
    spacexLaunchService = MockSpaceXLaunchService as any;

    component = new LaunchProgramsComponent(spacexLaunchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchLaunchDetails', () => {
    spyOn(component, 'fetchLaunchDetails');
    component.ngOnInit();
    expect(component.fetchLaunchDetails).toHaveBeenCalled();
  });

  it('should create array of years', () => {
    const expacted = [undefined, undefined];
    expect(component.counter(2)).toEqual(expacted);
  });

  it('should destroy all the subscribtions', () => {
    component['subscriptions'] = new Subscription();
    spyOn(component['subscriptions'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
  });

  it('should clear filters call  fetchLaunchDetails', () => {
    spyOn(component, 'fetchLaunchDetails');
    const expected = {
      year: null,
      landed: null,
      launch: null,
    };
    component.clearFilters();
    expect(component.filters).toEqual(expected);
  });

  it('should reset the launchDetails ', () => {
    component.allMissionDetails = SpaceXLaunchDetails;
    component.clearFilters();
    expect(component.launchDetails).toEqual(SpaceXLaunchDetails);
  });
});
