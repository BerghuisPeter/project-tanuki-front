import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./core/components/header/header.component";
import { LoaderComponent } from "./core/components/loader/loader.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, LoaderComponent]
})
export class AppComponent {
  title: string = 'project-tanuki';
}
