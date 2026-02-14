import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-auth-button",
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: "./auth-button.component.html",
})
export class AuthButtonComponent {
  constructor(
    public readonly userService: UserService,
    private readonly authService: AuthService
  ) {
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  login(): void {
    console.log('login clicked!');
    // this.authService.login().subscribe(() => console.log('logged in!'));
  }
}
