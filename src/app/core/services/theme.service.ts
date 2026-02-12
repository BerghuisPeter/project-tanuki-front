import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private static readonly THEME_KEY = 'user-theme';
  isDarkMode = signal<boolean>(this.loadTheme());

  constructor() {
    this.applyTheme(this.isDarkMode());
  }

  toggleTheme(): void {
    const newMode = !this.isDarkMode();
    this.isDarkMode.set(newMode);
    this.saveTheme(newMode);
    this.applyTheme(newMode);
  }

  private loadTheme(): boolean {
    const savedTheme = localStorage.getItem(ThemeService.THEME_KEY);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private saveTheme(isDark: boolean): void {
    localStorage.setItem(ThemeService.THEME_KEY, isDark ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      document.body.style.colorScheme = 'dark';
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      document.body.style.colorScheme = 'light';
    }
  }
}
