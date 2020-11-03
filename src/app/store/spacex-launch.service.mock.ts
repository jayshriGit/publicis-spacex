import { of as observableOf } from 'rxjs';
import { SpaceXLaunchDetails } from './mocks/spacex-launch-details.mock';

export class MockSpaceXLaunchService {
  getLaunchDetails = () => observableOf(SpaceXLaunchDetails);
}
