import { computed, inject, Injectable, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly _loadingCount = signal(0);
  /**
   * Returns true if any process has requested a loader.
   */
  readonly isLoading = computed(() => this._loadingCount() > 0);
  private readonly router = inject(Router);
  private _routerLoading = false;

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        if (!this._routerLoading) {
          this._routerLoading = true;
          this.show();
        }
      } else if (
        event instanceof RouteConfigLoadEnd ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        if (this._routerLoading) {
          this._routerLoading = false;
          this.hide();
        }
      }
    });
  }

  /**
   * Shows the loader. Increments the loader count.
   */
  show(): void {
    this._loadingCount.update(count => count + 1);
  }

  /**
   * Hides the loader. Decrements the loader count.
   */
  hide(): void {
    this._loadingCount.update(count => Math.max(0, count - 1));
  }
}
