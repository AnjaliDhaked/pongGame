import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { QrComponent } from './qr/qr.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    QrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
