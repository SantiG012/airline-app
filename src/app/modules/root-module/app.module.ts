import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/main-component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminStatusDirective } from './directives/admin-status.directive';

@NgModule({
  declarations: [
    AppComponent,
    AdminStatusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
