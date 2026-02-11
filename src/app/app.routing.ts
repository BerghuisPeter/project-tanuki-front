import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_PATHS } from "./shared/models/app-paths.model";

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
