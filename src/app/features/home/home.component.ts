import { Component } from '@angular/core';
import { APP_PATHS } from "../../shared/models/app-paths.model";
import { environment } from '../../../environments/environment';
import { CommonModule } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class HomeComponent {
  APP_PATHS = APP_PATHS;
  readonly enableBattleShipFeature = environment.enableBattleShipFeature == 'true';
}
