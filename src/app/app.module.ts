import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GuardService} from './services/guard.service';
import {AuthModule} from './auth/auth.module';
import {PokemonModule} from './pokemon/pokemon.module';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
      BrowserModule,
      AuthModule,
      PokemonModule,
      AppRoutingModule,
  ],
  providers: [
      GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
