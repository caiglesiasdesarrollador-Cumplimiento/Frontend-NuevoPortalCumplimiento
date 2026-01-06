import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sb-animated-ring',
  templateUrl: './sb-animated-ring.component.html',
  styleUrls: ['./sb-animated-ring.component.scss']
})
export class SbAnimatedRingComponent {
  /** Icono de FontAwesome a mostrar en el centro (ej: 'fa-solid fa-plug-circle-xmark') */
  @Input() icon: string = 'fa-solid fa-circle-exclamation';
  
  /** Tamaño del contenedor en píxeles */
  @Input() size: number = 240;
  
  /** Color del icono central (por defecto verde Bolívar) */
  @Input() iconColor: string = '#038450';
}








