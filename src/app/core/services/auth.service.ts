import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import {
  AuthControllerAuthService,
  AuthResponse,
  LoginRequest,
  RefreshRequest,
  RegisterRequest,
  UserResponse
} from "../../../openApi/auth";
import { firstValueFrom, tap } from "rxjs";
import { Router } from "@angular/router";
import { APP_PATHS } from "../../shared/models/app-paths.model";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly userService: UserService, private readonly authControllerAuthService: AuthControllerAuthService, private readonly router: Router) {
  }

  register(email: string, password: string) {
    const registerRequest: RegisterRequest = { email, password };
    return this.authControllerAuthService.register(registerRequest)
      .pipe(
        tap(authRes => this.handleAuthResponse(authRes))
      );
  }

  login(email: string, password: string) {
    const loginRequest: LoginRequest = { email: email, password: password };
    return this.authControllerAuthService.login(loginRequest)
      .pipe(
        tap(authRes => this.handleAuthResponse(authRes))
      );
  }

  logout() {
    return this.authControllerAuthService.logout()
      .pipe(
        tap(() => {
          this.userService.logout();
          this.router.navigate([APP_PATHS.HOME]);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        })
      );
  }

  refreshToken(refreshToken: string) {
    const refreshRequest: RefreshRequest = { refreshToken: refreshToken };
    return this.authControllerAuthService.refresh(refreshRequest).pipe(
      tap(authRes => this.handleAuthResponse(authRes))
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  async initializeAuth(): Promise<void> {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return;
    }

    try {
      const user: UserResponse = await firstValueFrom(this.authControllerAuthService.me());
      this.userService.setLoggedInUser(user);
    } catch (error) {
      // TODO change to 401 in backend if expired if possible.
      // 401 Unauthorized: Means "I don't know who you are" or "Your session has expired/is invalid."
      // 403 Forbidden: Means "You don't have permission to access this resource."
      if (error instanceof HttpErrorResponse && error.status === 403) {
        const refreshToken = this.getRefreshToken();
        if (refreshToken) {
          try {
            await firstValueFrom(this.refreshToken(refreshToken));
            const user = await firstValueFrom(this.authControllerAuthService.me());
            this.userService.setLoggedInUser(user);
          } catch (refreshError) {
            console.error('Failed to refresh token or get user after refresh', refreshError);
            this.logout();
          }
        } else {
          this.logout();
        }
      } else {
        console.error('Error fetching user info', error);
      }
    }
  }

  private handleAuthResponse(authRes: AuthResponse) {
    localStorage.setItem('access_token', authRes.accessToken);
    localStorage.setItem('refresh_token', authRes.refreshToken);
    this.userService.setLoggedInUser(authRes.user);
  }
}
