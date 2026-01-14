import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockBreadcrumbService = {
    breadcrumbItems$: new BehaviorSubject([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [
        { provide: BreadcrumbService, useValue: mockBreadcrumbService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have isMenuOpen', () => { expect(component.isMenuOpen).toBeDefined(); });
  it('should have isMobile', () => { expect(component.isMobile).toBeDefined(); });
  it('should have showNavigation', () => { expect(component.showNavigation).toBe(true); });
  it('should toggle menu', () => { 
    component.isMenuOpen = false;
    component.toggleMenu(); 
    expect(component.isMenuOpen).toBe(true); 
  });
  it('should close menu', () => { 
    component.isMenuOpen = true;
    component.closeMenu(); 
    expect(component.isMenuOpen).toBe(false); 
  });
});




