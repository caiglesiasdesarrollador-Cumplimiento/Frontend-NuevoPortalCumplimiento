import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/components/header/header.module';
import { AppRoutingModule } from './app-routing.module';
import { LoaderModule } from './shared/components/loader/loader.module';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './shared/components/notification/notification.module';
import { LibTbButtonModule } from 'tech-block-lib';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HeaderModule,
    AppRoutingModule,
    LoaderModule,
    NotificationModule,
    LibTbButtonModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
