import { Component } from "@angular/core";
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
})
export class AuthButtonComponent {
  constructor(
    public readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  toLogin(): void {
    this.router.navigate([APP_PATHS.LOGIN]);
  }
}
