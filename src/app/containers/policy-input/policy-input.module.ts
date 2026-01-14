import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// ✅ Policy-input components (ahora standalone)
import { PolicyInputComponent } from './policy-input.component';
import { PolicyInputRoutingModule } from './policy-input-routing.module';

@NgModule({
  imports: [
    PolicyInputComponent, // ✅ Componente standalone
    PolicyInputRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PolicyInputModule {}

