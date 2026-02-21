import { Component, inject } from '@angular/core';
import { PageLoaderService } from "./page-loader.service";

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
  standalone: true
})
export class PageLoaderComponent {
  readonly pageLoaderService = inject(PageLoaderService);
}
