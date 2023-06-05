import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const fadeAnimation =
  
  trigger('routerTransition', [
    transition('* <=> *', [
      /* order */
      /* 1 */ query(':enter, :leave', style({ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 })
        , { optional: true }),
      /* 2 */ group([  // block executes in parallel
        query(':enter', [
          style({
            // transform: 'translateY(100%) translateX(100%)',
            opacity: 0
          }),
          animate('0.5s ease-in-out', style({
            // transform: 'translateY(0%) translateX(0%)',
            opacity: 1
          }))
        ], { optional: true }),
        query(':leave', [
          style({
            // transform: 'translateY(0%)',
            opacity: 1
          }),
          animate('0.5s ease-in-out', style({
            // transform: 'translateY(100%) translateX(-100%)',
            opacity: 0
          }))
        ], { optional: true })
      ])
    ])
  ]);
