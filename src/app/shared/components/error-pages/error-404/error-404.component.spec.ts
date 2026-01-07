import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error404Component } from './error-404.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [Error404Component],
      providers: [
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('goToHome', () => {
    it('should navigate to root path', () => {
      component.goToHome();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});

