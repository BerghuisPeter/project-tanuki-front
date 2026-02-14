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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly userService: UserService, private readonly authControllerAuthService: AuthControllerAuthService) {
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
    this.userService.setLoggedInUser(authRes.user.id)
  }
}
