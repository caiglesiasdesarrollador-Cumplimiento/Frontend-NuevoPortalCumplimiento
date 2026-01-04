```html
<lib-tb-alert [custom]="alertFloatCustom">
  <ng-template libTbTemplate="content" let-alert>
    <div>Contenido HTML del template {{ alert.description }}<a href="#">Link</a></div>
  </ng-template>
</lib-tb-alert>
```
