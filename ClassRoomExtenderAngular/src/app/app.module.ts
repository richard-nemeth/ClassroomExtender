import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule } from './app-routing.module';

import {AppComponent} from './app.component';

import {RootComponent} from './components/root/RootComponent';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
