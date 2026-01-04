```html
<lib-tb-stepper-vertical [custom]="stepperVerticalCustom">
  <lib-tb-step [custom]="stepperVerticalStep1">
    <!-- HEADER -->
    <ng-template libTbTemplate="header">
      Contenido HTML del template
    </ng-template>

    <!-- CONTENIDO -->
    <ng-template libTbTemplate="content">
      Contenido HTML del template
    </ng-template>
  </lib-tb-step>

  <lib-tb-step [custom]="stepperVerticalStep2">
    <!-- CONTENIDO -->
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione expedita
      exercitationem, voluptatum consequuntur fugit in!
    </p>
  </lib-tb-step>
</lib-tb-stepper-vertical>
```
