import { Component, inject, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { APP_PATHS } from "../../../shared/models/app-paths.model";

@Component({
  selector: "app-auth-button",
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: "./auth-button.component.html",
  styleUrl: "./auth-button.component.scss",
})
export class AuthButtonComponent {

  protected readonly isLoggingOut = signal<boolean>(false);
  public readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.isLoggingOut.set(true);
    this.authService.logout().subscribe({
      next: () => this.isLoggingOut.set(false),
      error: () => this.isLoggingOut.set(false),
    });
  }

  toLogin(): void {
    this.router.navigate([APP_PATHS.AUTHENTICATION]);
  }
}
