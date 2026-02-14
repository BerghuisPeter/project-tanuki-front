import { Routes } from '@angular/router';
import { APP_PATHS } from "./shared/models/app-paths.model";
import { PageNotFoundComponent } from "./core/components/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: APP_PATHS.CHAT,
    loadComponent: () => import('./features/global-chat/global-chat.component').then(m => m.GlobalChatComponent)
  },
  {
    path: APP_PATHS.BOAT,
    loadChildren: () => import('./features/battleship/battleship.module').then(m => m.BattleshipModule)
  },
  {
    path: APP_PATHS.LOGIN,
    loadComponent: () => import('./features/authentication/authentication.component').then(m => m.AuthenticationComponent)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
