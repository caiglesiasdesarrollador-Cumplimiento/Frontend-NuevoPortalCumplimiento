```html
<lib-tb-input-number [custom]="inputNumberCustom">
  <ng-template libTbTemplate="label" let-label>
    {{ label }} HTML label template
  </ng-template>
  <ng-template libTbTemplate="caption" let-caption>
    {{ caption }} HTML caption template
  </ng-template>
</lib-tb-input-number>
```
