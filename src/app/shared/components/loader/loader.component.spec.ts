import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { LoaderModule } from './loader.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderService } from './loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      imports: [NoopAnimationsModule, LoaderModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;

    loaderService = TestBed.inject(LoaderService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set modalLoader.visible to true when loaderObserver emits true', () => {
    loaderService.show();
    expect(component.modalLoader.visible).toBe(true);
  });

  it('should show and hide loader', () => {
    loaderService.show();
    expect(component.modalLoader.visible).toBe(true);

    loaderService.hide();
    expect(component.modalLoader.visible).toBe(false);
  });

  it('should unsubscribe from loaderObserver on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.loaderSubscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
