import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
    service = TestBed.inject(LoaderService);
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have loaderObserver defined', () => {
      expect(service.loaderObserver).toBeDefined();
    });
  });

  describe('show', () => {
    it('should emit true when show is called', (done) => {
      service.loaderObserver.subscribe(value => {
        expect(value).toBe(true);
        done();
      });
      
      service.show();
    });
  });

  describe('hide', () => {
    it('should emit false when hide is called', (done) => {
      service.loaderObserver.subscribe(value => {
        expect(value).toBe(false);
        done();
      });
      
      service.hide();
    });
  });

  describe('Multiple emissions', () => {
    it('should emit multiple values in sequence', () => {
      const emissions: boolean[] = [];
      
      service.loaderObserver.subscribe(value => {
        emissions.push(value);
      });
      
      service.show();
      service.hide();
      service.show();
      
      expect(emissions).toEqual([true, false, true]);
    });
  });
});

