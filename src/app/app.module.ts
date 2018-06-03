import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponentComponent } from './components/map-component/map-component.component';
import { FileServiceService } from "app/services/file-service.service";
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    MapComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [FileServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
