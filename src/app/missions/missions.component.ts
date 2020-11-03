import { Component, Input } from '@angular/core';
import { SpaceXLaunch } from '../store/type/spacex-launch-details.type';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css'],
})
export class MissionsComponent {
  @Input() launchDetails: SpaceXLaunch[];
}
