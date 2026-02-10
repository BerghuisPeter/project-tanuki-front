import { Component } from '@angular/core';
import { APP_PATHS } from "../../shared/models/app-paths.model";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  APP_PATHS = APP_PATHS;
  readonly enableBattleShipFeature = environment.enableBattleShipFeature == 'true';
}
