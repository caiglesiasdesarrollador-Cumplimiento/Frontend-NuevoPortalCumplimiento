```html
<lib-tb-calendar [custom]="calendarCustom">
  <ng-template libTbTemplate="label" let-label>
    {{ label }} HTML label template
  </ng-template>
  <ng-template libTbTemplate="caption" let-caption>
    {{ caption }} HTML caption template
  </ng-template>
  <ng-template libTbTemplate="date" let-date>
    <h2>{{ date.day | json }} date</h2>
  </ng-template>
  <ng-template libTbTemplate="header">
    <h4>Header</h4>
  </ng-template>
  <ng-template libTbTemplate="footer">
    <h4>Footer</h4>
  </ng-template>
</lib-tb-calendar>
```
