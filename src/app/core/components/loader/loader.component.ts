import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    @if (loaderService.isLoading()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80">
        <pre class="text-[10px] leading-[10px] sm:text-xs sm:leading-3">
          ⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⡌⡀⠉⠓⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⠄⡄⠀
          ⠀⠀⠀⣇⢧⣶⡠⣬⣿⣶⣤⣤⣠⣴⣦⣤⣄⣀⠀⣀⣠⠞⢛⣡⣴⣾⣾⠀
          ⠀⠀⠀⠹⡜⣿⣿⣯⠻⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣩⣽⣿⡿⡽⠀
          ⠀⠀⠀⠀⢺⠄⡻⠀⠐⢻⣿⣿⣿⣿⠻⢻⠿⢻⣿⢿⣿⣿⣿⣿⡿⡕⠁⠀
          ⠀⠀⠀⠀⢨⡆⠁⠀⠀⠀⠀⣿⡟⠃⠀⠈⠀⠀⠈⠻⢻⣿⣿⠏⢠⠃⠀⠀
          ⠀⠀⠀⠀⢨⠃⠀⣀⣰⡄⢰⡿⠁⢠⣆⣀⠀⠀⠀⠀⠈⠻⢧⠀⢇⠀⠀⠀
          ⠀⠀⠀⠀⠞⠀⣼⣿⣾⡗⢸⠇⣰⣿⣿⣿⣿⣷⣤⠤⠀⢀⢈⠀⢸⡂⠀⠀
          ⠀⠈⠐⠤⠆⢼⣿⣿⠋⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣚⣟⠀⠀⢳⡄⠀
          ⠀⠤⠤⢴⠧⣐⡺⢅⣤⣶⣶⡀⠀⠀⣻⣿⣿⠟⣻⣿⣿⡿⠷⢶⡀⠀⢻⠂
          ⠀⢈⡩⠿⢷⠒⠒⣺⣿⣿⣿⣧⣶⠠⠈⢨⣻⣿⡿⣿⣿⣿⡤⡄⢩⣬⡿⠆
          ⠈⠀⠀⠀⢚⡃⢀⣿⣿⣛⣿⣛⣻⣯⣽⣿⣿⣿⣿⣮⣿⣿⣿⣶⣦⣽⡍⠀
          ⠀⠀⠀⠀⢸⣅⢹⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⠻⠃⠀
          ⠀⠀⠀⠀⠈⠋⠘⠻⠋⢿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠛⠛⠁⠁⠀⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀
        </pre>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    pre {
      font-family: monospace;
      white-space: pre;
    }
  `]
})
export class LoaderComponent {
  readonly loaderService = inject(LoaderService);
}
