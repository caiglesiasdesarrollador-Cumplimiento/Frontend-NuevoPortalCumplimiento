```html
<lib-tb-search [custom]="searchCustom">
  <ng-template libTbTemplate="header">
    <h4>Header</h4>
  </ng-template>
  <ng-template libTbTemplate="item" let-item>
    <h4>{{ item.name }}</h4>
  </ng-template>
  <ng-template libTbTemplate="group" let-group>
    <h4>{{ group.type }}</h4>
  </ng-template>
  <ng-template libTbTemplate="footer">
    <h4>Footer</h4>
  </ng-template>
  <ng-template libTbTemplate="empty">
    <h4>Sin resultados</h4>
  </ng-template>
</lib-tb-search>
```
