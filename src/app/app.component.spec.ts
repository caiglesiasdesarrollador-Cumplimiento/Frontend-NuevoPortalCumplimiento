import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppComponent } from './app.component';
import { NotificationService } from './shared/components/notification/notification.service';
import { LoaderService } from './shared/components/loader/loader.service';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const routerEvents = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn(), events: routerEvents.asObservable() } },
        { provide: NotificationService, useValue: { show: jest.fn() } },
        { provide: LoaderService, useValue: { show: jest.fn(), hide: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have showHeader', () => { expect(component.showHeader).toBeDefined(); });
  it('should handle navigation', () => {
    routerEvents.next(new NavigationEnd(1, '/test', '/test'));
    expect(component.showHeader).toBeDefined();
  });
});
