import { trigger, state, style, transition, animate } from '@angular/animations';

export const menuAnimations = [
  // Animación para expandir/contraer elementos del menu
  trigger('slideInOut', [
    transition(':enter', [
      style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
        transform: 'translateY(-10px)',
      }),
      animate(
        '300ms ease-in-out',
        style({
          height: '*',
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
    ]),
    transition(':leave', [
      style({
        height: '*',
        opacity: 1,
        transform: 'translateY(0)',
      }),
      animate(
        '300ms ease-in-out',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
          transform: 'translateY(-10px)',
        }),
      ),
    ]),
  ]),

  // Animación para el menú mobile
  trigger('mobileSlide', [
    state(
      'closed',
      style({
        transform: 'translateX(-100%)',
      }),
    ),
    state(
      'open',
      style({
        transform: 'translateX(0)',
      }),
    ),
    transition('closed <=> open', [animate('300ms ease-in-out')]),
  ]),

  // Animación para fade in de elementos
  trigger('fadeIn', [
    transition(':enter', [style({ opacity: 0 }), animate('200ms ease-in', style({ opacity: 1 }))]),
    transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))]),
  ]),
];
