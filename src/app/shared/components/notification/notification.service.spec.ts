import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have notificationObserver defined', () => {
      expect(service.notificationObserver).toBeDefined();
    });
  });

  describe('show', () => {
    it('should emit notification config when show is called', (done) => {
      const mockConfig = {
        title: 'Test Title',
        message: 'Test Message',
        type: 'success' as const
      };

      service.notificationObserver.subscribe(config => {
        expect(config).toEqual(mockConfig);
        done();
      });
      
      service.show(mockConfig as any);
    });

    it('should emit different configs for different calls', () => {
      const emissions: any[] = [];
      
      service.notificationObserver.subscribe(config => {
        emissions.push(config);
      });
      
      service.show({ title: 'First' } as any);
      service.show({ title: 'Second' } as any);
      
      expect(emissions.length).toBe(2);
      expect(emissions[0].title).toBe('First');
      expect(emissions[1].title).toBe('Second');
    });
  });

  describe('close', () => {
    it('should emit null when close is called', (done) => {
      service.notificationObserver.subscribe(config => {
        expect(config).toBeNull();
        done();
      });
      
      service.close();
    });
  });

  describe('Show and close sequence', () => {
    it('should handle show followed by close', () => {
      const emissions: any[] = [];
      
      service.notificationObserver.subscribe(config => {
        emissions.push(config);
      });
      
      service.show({ title: 'Test' } as any);
      service.close();
      
      expect(emissions.length).toBe(2);
      expect(emissions[0]).toEqual({ title: 'Test' });
      expect(emissions[1]).toBeNull();
    });
  });
});

