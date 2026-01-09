import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  const mockLoaderService = {
    loaderObserver: new BehaviorSubject(false)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [
        { provide: LoaderService, useValue: mockLoaderService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should have isLoading', () => { expect(component.isLoading).toBe(false); });
  it('should update isLoading when service emits', () => { 
    mockLoaderService.loaderObserver.next(true);
    expect(component.isLoading).toBe(true); 
  });
});


