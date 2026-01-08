import { fadeAnimation } from './animations';

describe('Animations', () => {
  describe('fadeAnimation', () => {
    it('should be defined', () => {
      expect(fadeAnimation).toBeDefined();
    });

    it('should have name fadeAnimation', () => {
      expect(fadeAnimation.name).toBe('fadeAnimation');
    });

    it('should have definitions array', () => {
      expect(fadeAnimation.definitions).toBeDefined();
      expect(Array.isArray(fadeAnimation.definitions)).toBe(true);
    });
  });
});

