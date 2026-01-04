```typescript
// Servicio LibTbOnboardingService creado y exportado desde la librería tech-block-lib
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LibTbOnboardingService {
  onboardingSource = new Subject<boolean>();

  onboardingObserver = this.onboardingSource.asObservable();

  show(): void {
    this.onboardingSource.next(true);
  }

  hide(): void {
    this.onboardingSource.next(false);
  }
}
```

```typescript
// Componente LibTbOnboardingComponent creado y exportado desde la librería tech-block-lib
import { ILibTbOnboarding } from './onboarding.interface';
@Component({
  selector: 'lib-tb-onboarding',
  templateUrl: './onboarding.component.html'
})
export class LibTbOnboardingComponent {
    // custom: ILibTbOnboarding, es el único @Input() que tiene definido el componente lib-tb-onboarding
  @Input() custom: ILibTbOnboarding = {};
  ... // No existen más @Input(), ni existen @Output() porque los eventos se definen en la interface ILibTbOnboarding
}
```

```typescript
// Modulo donde se declara y se exporta LibTbOnboardingComponent
import { LibTbOnboardingComponent } from './onboarding.component';
import { LibTbOnboardingService } from './onboarding.service';
@NgModule({
  declarations: [LibTbOnboardingComponent],
  exports: [LibTbOnboardingComponent, ...],
  providers: [LibTbOnboardingService],
  ...
})
export class LibTbOnboardingModule {}
```
