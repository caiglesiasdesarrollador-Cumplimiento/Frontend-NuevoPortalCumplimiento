import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorConnectionComponent } from './error-connection.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

describe('ErrorConnectionComponent', () => {
  let component: ErrorConnectionComponent;
  let fixture: ComponentFixture<ErrorConnectionComponent>;

  const mockLocation = {
    back: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorConnectionComponent],
      providers: [
        { provide: Location, useValue: mockLocation }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorConnectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should go back', () => { 
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled(); 
  });
});




