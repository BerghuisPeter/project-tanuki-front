import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet
} from "@angular/router";
import { HeaderComponent } from "./core/components/header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  title: string = 'project-tanuki';
  loading: boolean = false;

  constructor(private readonly router: Router) {

    router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loading = true;
      } else if (
        event instanceof RouteConfigLoadEnd ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }
}
