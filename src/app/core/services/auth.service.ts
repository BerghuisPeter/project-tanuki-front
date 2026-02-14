import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import {
  AuthControllerAuthService,
  AuthResponse,
  LoginRequest,
  RefreshRequest,
  RegisterRequest
} from "../../../openApi/auth";
import { tap } from "rxjs";
import { Router } from "@angular/router";
import { APP_PATHS } from "../../shared/models/app-paths.model";

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

  private handleAuthResponse(authRes: AuthResponse) {
    localStorage.setItem('access_token', authRes.accessToken);
    localStorage.setItem('refresh_token', authRes.refreshToken);
    this.userService.setLoggedInUser(authRes.user.id);
  }
}
