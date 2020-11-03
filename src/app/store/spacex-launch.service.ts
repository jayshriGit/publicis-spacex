import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNil, not } from 'ramda';
import { Observable, } from 'rxjs';
import 'rxjs/add/operator/map';
import { Filters } from '../launch-programs/type/filters.type';
import { SpaceXLaunch } from './type/spacex-launch-details.type';

@Injectable({
  providedIn: 'root',
})
export class SpacexLaunchService {
  launchDetails: SpaceXLaunch[];
  baseUrl: string;
  filteredUrl: string;

  constructor(private http: HttpClient) {}

  getLaunchDetails(filter?: Filters): Observable<SpaceXLaunch[]> {
    this.baseUrl = 'https://api.spacexdata.com/v3/launches?limit=100';
    if (not(isNil(filter))) {
      const filterParams: Filters = {
        year: Number(filter.year) > 0 ? `&launch_year=${filter.year}` : '',
        launch: isNil(filter.launch) ? '' : `&launch_success=${filter.launch}`,
        landed: isNil(filter.landed) ? '' : `&land_success=${filter.landed}`,
      };

      this.baseUrl =
        this.baseUrl +
        filterParams.launch +
        filterParams.landed +
        filterParams.year;
    }
    return this.http
      .get(this.baseUrl)
      .pipe()

      .map(this.extractData);
  }

  extractData(res: SpaceXLaunch[]) {
    this.launchDetails = res;
    return this.launchDetails;
  }
}
