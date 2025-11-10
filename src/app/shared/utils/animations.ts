import { animate, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))]),
]);
