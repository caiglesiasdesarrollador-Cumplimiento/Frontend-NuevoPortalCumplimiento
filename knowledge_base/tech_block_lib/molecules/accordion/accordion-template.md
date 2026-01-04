```html
<lib-tb-accordion [custom]="accordionCustom">
  <lib-tb-accordion-tab [custom]="{ header: 'header 1', selected: true }">
    Contenido HTML
  </lib-tb-accordion-tab>
  <lib-tb-accordion-tab [custom]="{ header: 'header 2' }">
    <ng-template libTbTemplate="header">
      <div>
        <h4>Contenido HTML del template</h4>
      </div>
    </ng-template>
    Contenido HTML
  </lib-tb-accordion-tab>
</lib-tb-accordion>
```
