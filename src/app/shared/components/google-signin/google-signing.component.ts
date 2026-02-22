import { Component, inject, NgZone, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../core/services/auth.service";
import { GoogleScriptService } from "../../../core/services/google-script.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconButton } from "@angular/material/button";
import { Router } from "@angular/router";
import { APP_PATHS } from "../../models/app-paths.model";

@Component({
  selector: 'app-google-signin',
  standalone: true,
  imports: [MatSnackBarModule, MatIconButton],
  template: `
    <button (click)="onGoogleLoginClick()" type="button" matIconButton>
      <svg height="18" viewBox="0 0 48 48" width="18" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          fill="#4285F4"/>
        <path
          d="M6.3 14.7l6.6 4.8C14.6 15.8 19 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.5 2 9.9 5.8 6.3 11.6z"
          fill="#EA4335"/>
        <path
          d="M24 46c5.9 0 11.2-2.4 15-6.1l-6.1-5.1c-2.4 1.7-5.4 2.7-8.9 2.7-5.1 0-9.6-3.2-11.4-7.8l-7.3 5.6C9.1 40.8 16.1 46 24 46z"
          fill="#34A853"/>
        <path d="M4.6 30.3c-.4-1.3-.6-2.7-.6-4.3s.2-3 .6-4.3l-7.3-5.6C3.1 19.3 2 22.5 2 26s1.1 6.7 3.3 9.9l7.3-5.6z"
              fill="#FBBC05"/>
      </svg>
    </button>
  `,
})
export class GoogleSigningComponent implements OnInit {
  private readonly ngZone = inject(NgZone);
  private readonly authService = inject(AuthService);
  private readonly googleScriptService = inject(GoogleScriptService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private client: any;

  ngOnInit(): void {
    from(this.googleScriptService.load()).subscribe(() => {
      this.initializeGoogle();
    });
  }

  onGoogleLoginClick() {
    if (this.client) {
      this.client.requestCode();
    }
  }

  private initializeGoogle(): void {
    this.client = google.accounts.oauth2.initCodeClient({
      client_id: environment.googleClientId,
      scope: 'openid email profile',
      ux_mode: 'popup',
      callback: (response: any) => {
        this.ngZone.run(() => {
          this.handleCredentialResponse(response);
        });
      },
      error_callback: (error: any) => {
        this.ngZone.run(() => {
          this.handleGoogleError(error);
        });
      }
    });
  }

  private handleGoogleError(error: any): void {
    console.error('Google Auth error:', error);
    let message = 'An error occurred during Google Sign-In.';

    if (error.type === 'popup_closed') {
      message = 'Sign-in popup was closed before completing.';
    } else if (error.type === 'access_denied') {
      message = 'Access to your Google account was denied.';
    } else if (error.type === 'invalid_grant' || error.type === 'unauthorized_client') {
      message = 'There is a configuration issue with the Google Sign-In. Please check your origin/client ID.';
    }

    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['bg-red-500', 'text-white']
    });
  }

  private handleCredentialResponse(response: any): void {
    if (!response.code) return;

    this.authService.loginWithGoogle(response.code).subscribe({
      next: () => this.router.navigate([APP_PATHS.HOME], { replaceUrl: true }),
      error: (err) => {
        console.error('Google login failed', err);
        this.snackBar.open('Google login failed. Please try again later.', 'Close', {
          duration: 5000,
          panelClass: ['bg-red-500', 'text-white']
        });
      },
    });
  }
}
