import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpacexLaunchService } from '../store/spacex-launch.service';
import { SpaceXLaunch } from '../store/type/spacex-launch-details.type';
import { Filters } from './type/filters.type';

@Component({
  selector: 'app-launch-programs',
  templateUrl: './launch-programs.component.html',
  styleUrls: ['./launch-programs.component.css'],
})
export class LaunchProgramsComponent implements OnInit {
  startYear = 2006; // staring year in the added filters
  launchDetails: SpaceXLaunch[] = [];
  allMissionDetails: SpaceXLaunch[];
  // Initial filter value
  filters: Filters = {
    year: null,
    landed: null,
    launch: null,
  };

  subscriptions = new Subscription();

  constructor(private spacexLaunchService: SpacexLaunchService) {}

  ngOnInit(): void {
    this.fetchLaunchDetails();
  }

  // fetch launch details without filters
  fetchLaunchDetails(): void {
    this.subscriptions.add(
      this.spacexLaunchService
        .getLaunchDetails()
        .subscribe((mission: SpaceXLaunch[]) => {
          if (!!mission) {
            this.launchDetails = mission;
          }
        })
    );
  }

  // counter to get array of years
  counter(i: number) {
    return new Array(i);
  }

  applyFilters(
    yearFilter: string,
    launchFilter: string,
    landingFilter: string
  ): void {
    this.allMissionDetails = this.launchDetails; // Saved all mission details to use at time of clear filters
    this.filters = {
      year: yearFilter,
      launch: launchFilter,
      landed: landingFilter,
    };

    // fetch launch details with selected filters
    this.spacexLaunchService
      .getLaunchDetails(this.filters)
      .subscribe((mission: SpaceXLaunch[]) => {
        if (!!mission) this.launchDetails = mission;
      });
  }

  // Clear call the filters applied and fetch details
  clearFilters(): void {
    this.filters = {
      year: null,
      landed: null,
      launch: null,
    };

    this.launchDetails = this.allMissionDetails;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
