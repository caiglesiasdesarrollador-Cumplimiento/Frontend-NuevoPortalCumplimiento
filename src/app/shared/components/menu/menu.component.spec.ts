import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn()
    } as any;

    // Mock window.location
    delete (window as any).location;
    (window as any).location = { href: '' };

    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have isMobile as false by default', () => {
      expect(component.isMobile).toBe(false);
    });

    it('should have menuItems defined', () => {
      expect(component.menuItems).toBeDefined();
      expect(Array.isArray(component.menuItems)).toBe(true);
    });
  });

  describe('Input properties', () => {
    it('should accept isMobile input', () => {
      component.isMobile = true;
      expect(component.isMobile).toBe(true);
    });
  });

  describe('Output events', () => {
    it('should emit menuClose event', () => {
      const emitSpy = jest.spyOn(component.menuClose, 'emit');
      component.menuClose.emit();
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('onMenuItemClick', () => {
    it('should not navigate if item is disabled', () => {
      const disabledItem = { label: 'Test', disabled: true, url: '/test' };
      component.onMenuItemClick(disabledItem);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('should navigate if item has internal URL', () => {
      const menuCloseEmitSpy = jest.spyOn(component.menuClose, 'emit');
      const internalItem = { label: 'Test', disabled: false, url: '/portal' };
      component.onMenuItemClick(internalItem);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/portal']);
      expect(menuCloseEmitSpy).toHaveBeenCalled();
    });

    it('should navigate to policy-input', () => {
      const menuCloseEmitSpy = jest.spyOn(component.menuClose, 'emit');
      const internalItem = { label: 'Test', disabled: false, url: '/policy-input' };
      component.onMenuItemClick(internalItem);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/policy-input']);
      expect(menuCloseEmitSpy).toHaveBeenCalled();
    });

    it('should use window.location for external URLs', () => {
      const menuCloseEmitSpy = jest.spyOn(component.menuClose, 'emit');
      const externalItem = { label: 'Test', disabled: false, url: 'https://example.com' };
      component.onMenuItemClick(externalItem);
      expect(window.location.href).toBe('https://example.com');
      expect(menuCloseEmitSpy).toHaveBeenCalled();
    });

    it('should not navigate if no URL', () => {
      const itemWithoutUrl = { label: 'Test', disabled: false };
      component.onMenuItemClick(itemWithoutUrl);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });
});

