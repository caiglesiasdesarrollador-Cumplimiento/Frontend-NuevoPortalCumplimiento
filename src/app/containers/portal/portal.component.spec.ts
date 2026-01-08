import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { PortalComponent } from './portal.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortalComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: BreadcrumbService, useValue: { setBreadcrumb: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(PortalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have menuItems', () => { expect(component.menuItems).toBeDefined(); });
  it('should navigate', () => { expect(() => component.navigateTo('/test')).not.toThrow(); });
});
