import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SimpleHttpComponent } from './simple-http/simple-http.component';
import { YouTubeSearchComponent } from './you-tube-search/you-tube-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    YouTubeSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
