import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GoogleScriptService {
  private scriptLoaded = false;
  private scriptLoadingPromise?: Promise<void>;

  load(): Promise<void> {
    if (this.scriptLoaded) {
      return Promise.resolve();
    }

    if (this.scriptLoadingPromise) {
      return this.scriptLoadingPromise;
    }

    this.scriptLoadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };

      script.onerror = () => {
        this.scriptLoadingPromise = undefined;
        reject('Failed to load Google Identity script');
      };

      document.head.appendChild(script);
    });

    return this.scriptLoadingPromise;
  }
}
