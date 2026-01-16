import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalComponent } from './portal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalComponent, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PortalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have userInfo', () => { expect(component.userInfo).toBeDefined(); });
  it('should have informacionGeneral', () => { expect(component.informacionGeneral).toBeDefined(); });
  it('should navigate to url', () => { expect(() => component.navigateToUrl('/test')).not.toThrow(); });
  it('should handle image error', () => { 
    const mockEvent = { target: { style: { display: '' }, nextElementSibling: { style: { display: '' } } } } as any;
    expect(() => component.onImageError(mockEvent)).not.toThrow(); 
  });
});




