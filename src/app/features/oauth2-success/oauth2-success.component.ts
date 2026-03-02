import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../core/services/auth.service";
import { APP_PATHS } from "../../shared/models/app-paths.model";

@Component({
  selector: 'app-oauth2-success',
  standalone: true,
  template: `
    <div class="flex h-screen items-center justify-center">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4">Logging you in...</h2>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `
})
export class OAuth2SuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    console.log('OAuth2 callback initiated!!!!');
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      this.authService.exchangeOAuth2Code(code).subscribe({
        next: () => {
          this.router.navigate([APP_PATHS.HOME], { replaceUrl: true });
        },
        error: (err) => {
          console.error('Exchange code for tokens failed', err);
          this.router.navigate([APP_PATHS.AUTHENTICATION], { queryParams: { error: 'auth_failed' }, replaceUrl: true });
        }
      });
    } else {
      console.warn('No code found in query params');
      this.router.navigate([APP_PATHS.AUTHENTICATION], { replaceUrl: true });
    }
  }
}
