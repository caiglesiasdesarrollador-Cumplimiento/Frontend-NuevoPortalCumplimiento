```html
<lib-tb-dropdown [custom]="dropdownCustom">
  <ng-template libTbTemplate="label" let-label>
    {{ label }} HTML label template
  </ng-template>
  <ng-template libTbTemplate="caption" let-caption>
    {{ caption }} HTML caption template
  </ng-template>
  <ng-template libTbTemplate="item" let-item>
    <h4>{{ item.name }}</h4>
  </ng-template>
  <ng-template libTbTemplate="group" let-group>
    <h4>{{ group.type }}</h4>
  </ng-template>
  <ng-template libTbTemplate="selectedItem" let-value>
    <h4>{{ value.name }}</h4>
  </ng-template>
  <ng-template libTbTemplate="emptyFilter">
    <h4>emptyFilter</h4>
  </ng-template>
  <ng-template libTbTemplate="empty">
    <h4>empty</h4>
  </ng-template>
  <ng-template libTbTemplate="header">
    <h4>Header</h4>
  </ng-template>
  <ng-template libTbTemplate="footer">
    <h4>Footer</h4>
  </ng-template>
</lib-tb-dropdown>
```
