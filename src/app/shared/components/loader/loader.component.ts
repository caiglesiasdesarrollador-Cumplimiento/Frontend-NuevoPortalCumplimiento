import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILibTbModal, ILibTbProgressSpinner } from 'tech-block-lib';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  modalLoader: ILibTbModal = {
    closable: false,
  };

  spinnerLoader: ILibTbProgressSpinner = {
    integrated: true,
    style: {
      'width': '130px',
      'height': '130px',
    },
  };

  loaderSubscription: Subscription | undefined;
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService.loaderObserver.subscribe(show => {
      this.modalLoader.visible = show;
    });
  }

  ngOnDestroy(): void {
    this.loaderSubscription?.unsubscribe();
  }
}
