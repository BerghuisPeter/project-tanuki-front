import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./core/components/header/header.component";
import { PageLoaderComponent } from "./core/components/page-loader/page-loader.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, PageLoaderComponent]
})
export class AppComponent {
  title: string = 'project-tanuki';
}
