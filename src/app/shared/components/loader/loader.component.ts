import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  loaderSubscription: Subscription | undefined;

  constructor(private readonly loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService.loaderObserver.subscribe(show => {
      this.isLoading = show;
    });
  }

  ngOnDestroy(): void {
    this.loaderSubscription?.unsubscribe();
  }
}
