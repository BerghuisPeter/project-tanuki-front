import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { TitleCasePipe } from "@angular/common";
import { ThemeService } from "../../services/theme.service";
import { MatTooltip } from "@angular/material/tooltip";
import { AuthButtonComponent } from "../auth-button/auth-button.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, TitleCasePipe, MatTooltip, AuthButtonComponent, RouterLink],
})
export class HeaderComponent {
  @Input() title: string = 'headerTitle';

  constructor(
    public readonly themeService: ThemeService
  ) {
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  get ThemeTooltip(): string {
    return this.isDarkMode ? 'Light mode' : 'Dark mode';
  }
}
