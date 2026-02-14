import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { BASE_PATH as BASE_PATH_AUTH } from "../openApi/auth";
import { BASE_PATH as BASE_PATH_PROFILE } from "../openApi/profile";
import { authInterceptor } from "./core/interceptors/auth.interceptor";

const options = {
  autoConnect: false,
  withCredentials: true
};

const config: SocketIoConfig = {
  url: environment.socketNodeServerUrl,
  options: options
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(SocketIoModule.forRoot(config)),
    { provide: BASE_PATH_AUTH, useValue: environment.authServiceUrl },
    { provide: BASE_PATH_PROFILE, useValue: environment.profileServiceUrl }
  ]
};
