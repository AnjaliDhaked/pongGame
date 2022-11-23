import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { QrComponent } from './qr/qr.component';
import { UsernameComponent } from './username/username.component';

const routes: Routes = [
  { path: 'qr', component: QrComponent },
  {
    path: 'player',
    component: PlayerComponent,
  },
  {
    path: '',
    component: UsernameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
