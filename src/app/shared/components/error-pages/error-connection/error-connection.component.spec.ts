import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorConnectionComponent } from './error-connection.component';

describe('ErrorConnectionComponent', () => {
  let component: ErrorConnectionComponent;
  let fixture: ComponentFixture<ErrorConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorConnectionComponent],
      providers: [{ provide: Router, useValue: { navigate: jest.fn() } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(ErrorConnectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should retry', () => { expect(() => component.retry()).not.toThrow(); });
});
