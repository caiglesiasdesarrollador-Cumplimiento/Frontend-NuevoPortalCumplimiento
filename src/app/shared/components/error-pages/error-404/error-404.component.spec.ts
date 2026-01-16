import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error404Component } from './error-404.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error404Component, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should go to home', () => { expect(() => component.goToHome()).not.toThrow(); });
});





