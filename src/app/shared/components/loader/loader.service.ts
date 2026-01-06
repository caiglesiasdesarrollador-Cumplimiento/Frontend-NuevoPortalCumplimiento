import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly loader = new Subject<boolean>();
  loaderObserver = this.loader.asObservable();

  show(): void {
    this.loader.next(true);
  }

  hide(): void {
    this.loader.next(false);
  }
}
