import { TestBed } from '@angular/core/testing';
import { SbCalendarModule } from './sb-calendar.module';
import { SbCalendarComponent } from './sb-calendar.component';

describe('SbCalendarModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbCalendarModule]
    }).compileComponents();
  });

  it('should create the module', () => {
    expect(SbCalendarModule).toBeDefined();
  });

  it('should declare SbCalendarComponent', () => {
    const fixture = TestBed.createComponent(SbCalendarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should export SbCalendarComponent', () => {
    const fixture = TestBed.createComponent(SbCalendarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeInstanceOf(SbCalendarComponent);
  });
});

