import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/components/header/header.module';
import { AppRoutingModule } from './app-routing.module';
import { LoaderModule } from './shared/components/loader/loader.module';
import { NotificationModule } from './shared/components/notification/notification.module';
// HelpModule removido por UX - botón de ayuda eliminado
import { BreadcrumbModule } from './shared/components/breadcrumb/breadcrumb.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderModule,
    AppRoutingModule,
    LoaderModule,
    NotificationModule,
    BreadcrumbModule,
    // HelpModule removido - botón de ayuda eliminado
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

