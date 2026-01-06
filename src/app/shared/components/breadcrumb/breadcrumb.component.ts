import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ILibTbBreadcrumb } from 'tech-block-lib';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  // ✅ Observable del breadcrumb usando el servicio
  breadcrumb$: Observable<ILibTbBreadcrumb>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumb$ = this.breadcrumbService.breadcrumb$;
  }

  ngOnInit(): void {
    // ✅ Inicializar con breadcrumb básico
    this.breadcrumbService.clearBreadcrumb();
  }
}
