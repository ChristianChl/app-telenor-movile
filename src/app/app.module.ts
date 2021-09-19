import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { DatePipe } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
