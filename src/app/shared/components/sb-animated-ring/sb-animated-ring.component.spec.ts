import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SbAnimatedRingComponent } from './sb-animated-ring.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SbAnimatedRingComponent', () => {
  let component: SbAnimatedRingComponent;
  let fixture: ComponentFixture<SbAnimatedRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbAnimatedRingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SbAnimatedRingComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default icon', () => {
      expect(component.icon).toBe('fa-solid fa-circle-exclamation');
    });

    it('should have default size', () => {
      expect(component.size).toBe(240);
    });

    it('should have default iconColor (green Bolívar)', () => {
      expect(component.iconColor).toBe('#038450');
    });
  });

  describe('Input properties', () => {
    it('should accept custom icon', () => {
      component.icon = 'fa-solid fa-check';
      expect(component.icon).toBe('fa-solid fa-check');
    });

    it('should accept custom size', () => {
      component.size = 300;
      expect(component.size).toBe(300);
    });

    it('should accept custom iconColor', () => {
      component.iconColor = '#FFE16F';
      expect(component.iconColor).toBe('#FFE16F');
    });
  });
});


