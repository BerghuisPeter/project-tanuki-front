import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  template: '<p>Logging in...</p>'
})
export class GoogleCallbackComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('Google callback initiated!!!!');
    console.log('Current URL:', window.location.href);
    console.log('Query params:', this.route.snapshot.queryParams);
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      console.log('Code found, sending to opener...');
      // Send the code to the parent window
      if (window.opener) {
        window.opener.postMessage({ type: 'GOOGLE_LOGIN_SUCCESS', code: code }, window.location.origin);
        console.log('Message sent to opener');
      } else {
        console.error('window.opener is null. This might be due to Cross-Origin-Opener-Policy (COOP).');
      }
      setTimeout(() => {
        console.log('Closing popup...');
        window.close();
      }, 1000);
    } else {
      console.warn('No code found in query params');
    }
  }
}
