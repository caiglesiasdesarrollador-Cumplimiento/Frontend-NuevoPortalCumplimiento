import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ILibTbButton, ILibTbModalNotification } from 'tech-block-lib';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-help',
  standalone: false,
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpComponent {
  // ✅ Estado para controlar si mostrar el texto
  showText = false;

  constructor(private readonly notificationService: NotificationService) {}

  // ✅ Botón de ayuda único (se expande con hover)
  helpBtn: ILibTbButton = {
    label: '', // Sin texto inicialmente
    icon: 'fal fa-question-circle',
    styleBtn: 'fill',
    typeBtn: 'primary',
    class: 'help-btn--hover',
    libTbClick: () => this.openHelp(),
  };

  // ✅ Método para mostrar texto en hover
  onMouseEnter(): void {
    this.showText = true;
    this.helpBtn = {
      ...this.helpBtn,
      label: '¿Necesitas ayuda?',
      iconPosition: 'left',
    };
  }

  // ✅ Método para ocultar texto al salir del hover
  onMouseLeave(): void {
    this.showText = false;
    this.helpBtn = {
      ...this.helpBtn,
      label: '',
      iconPosition: undefined,
    };
  }

  // ✅ Método para abrir el modal de ayuda
  openHelp(): void {
    const config: ILibTbModalNotification = {
      key: 'app-notification',
      icon: 'fal fa-question-circle',
      title: '¿Necesitas ayuda?',
      message:
        'Cuéntanos en qué podemos ayudarte. Comunícate con soporte o revisa la guía según tu proceso.',
      acceptButtonVisible: true,
      rejectButtonVisible: false,
      acceptButton: {
        label: 'Cerrar',
        styleBtn: 'fill',
        typeBtn: 'primary',
        libTbClick: () => this.notificationService.close(),
      },
      showClose: true,
    };

    this.notificationService.show(config);
  }
}
