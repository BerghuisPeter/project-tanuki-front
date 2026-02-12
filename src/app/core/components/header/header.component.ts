import { Component, Input } from '@angular/core';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { TitleCasePipe } from "@angular/common";
import { ThemeService } from "../../services/theme.service";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, TitleCasePipe, MatTooltip],
})
export class HeaderComponent {
  @Input() title: string = 'headerTitle';

  constructor(private readonly matIconRegistry: MatIconRegistry, private readonly domSanitizer: DomSanitizer, public readonly themeService: ThemeService) {

    this.matIconRegistry.addSvgIcon(
      `racoon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/racoon.svg")
    );
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  get ThemeTooltip(): string {
    return this.isDarkMode ? 'Light mode' : 'Dark mode';
  }
}
