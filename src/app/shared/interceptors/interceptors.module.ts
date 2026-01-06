import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  providers: [
    // ✅ Configuración del interceptor de autorización
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // ✅ Aquí se pueden agregar más interceptors en el futuro
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoadingInterceptor,
    //   multi: true,
    // },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InterceptorsModule {}
