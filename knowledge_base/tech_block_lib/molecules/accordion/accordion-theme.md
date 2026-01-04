```css
.accordion-css-variables {
/* Generals */
--c-lib-tb-accordion-font-family: ; /* Asigna la fuente del componente */
--c-lib-tb-accordion-header-font-size: ; /* Asigna el tamaño de la fuente del header */
--c-lib-tb-accordion-icon-font-size: ; /* Asigna el tamaño de la fuente del icon */
--c-lib-tb-accordion-trigger-font-size: ; /* Asigna el tamaño de la fuente del trigger */
--c-lib-tb-accordion-spacing: ; /* Establece el espaceado entre accordions */
--c-lib-tb-accordion-border-radius-header: ; /* Establece el borde del header */
--c-lib-tb-accordion-border-radius-content: ; /* Establece el borde del content */
--c-lib-tb-accordion-word-break-title: ; /* Establece el word-break del titulo */

/* Default */
--c-lib-tb-accordion-label: ; /* Asigna el color del label */
--c-lib-tb-accordion-label-font-weight: ; /* Asigna el peso de la fuente del label */
--c-lib-tb-accordion-icon: ; /* Asigna el color del icono */
--c-lib-tb-accordion-trigger: ; /* Asigna el color del trigger */
--c-lib-tb-accordion-border: ; /* Asigna el color del borde */
--c-lib-tb-accordion-border-content: ; /* Asigna el color del borde del contenido */
--c-lib-tb-accordion-content: ; /* Asigna el color de la fuente del contenido */
--c-lib-tb-accordion-bg: ; /* Asigna el color del fondo */
--c-lib-tb-accordion-bg-content: ; /* Asigna el color del fondo del contenido */
--c-lib-tb-accordion-box-shadow: ;
/* Hover */
--c-lib-tb-accordion-border-hover: ; /* Asigna el color del borde en hover */
--c-lib-tb-accordion-bg-hover: ; /* Asigna el color del fondo en hover */
--c-lib-tb-accordion-label-hover: ; /* Asigna el color del texto en hover */
--c-lib-tb-accordion-label-font-weight-hover: ; /* Asigna el peso de la fuente del label en hover */
--c-lib-tb-accordion-icon-hover: ; /* Asigna el color del icono en hover */
--c-lib-tb-accordion-trigger-hover: ; /* Asigna el color del trigger en hover */
--c-lib-tb-accordion-box-shadow-hover: ;
/* Focus */
--c-lib-tb-accordion-border-focus: ; /* Asigna el color del borde en focus */
--c-lib-tb-accordion-border-width-focus: ;
--c-lib-tb-accordion-bg-focus: ; /* Asigna el color del fondo en focus */
--c-lib-tb-accordion-label-focus: ; /* Asigna el color del texto en focus */
--c-lib-tb-accordion-label-font-weight-focus: ; /* Asigna el peso de la fuente del label en focus */
--c-lib-tb-accordion-icon-focus: ; /* Asigna el color del icono en focus */
--c-lib-tb-accordion-trigger-focus: ; /* Asigna el color del trigger en focus */
--c-lib-tb-accordion-box-shadow-focus: ;
/* Pressed */
--c-lib-tb-accordion-border-pressed: ; /* Asigna el color del borde */
--c-lib-tb-accordion-bg-pressed: ; /* Asigna el color del fondo */
--c-lib-tb-accordion-label-pressed: ; /* Asigna el color del texto */
--c-lib-tb-accordion-label-font-weight-pressed: ; /* Asigna el peso de la fuente del label en pressed */
--c-lib-tb-accordion-icon-pressed: ; /* Asigna el color del icono en pressed */
--c-lib-tb-accordion-trigger-pressed: ; /* Asigna el color del trigger en pressed */
--c-lib-tb-accordion-box-shadow-pressed: ;
/* Expanded */
--c-lib-tb-accordion-border-expanded: ; /* Asigna el color del borde */
--c-lib-tb-accordion-bg-expanded: ; /* Asigna el color del fondo */
--c-lib-tb-accordion-label-expanded: ; /* Asigna el color del texto */
--c-lib-tb-accordion-label-font-weight-expanded: ; /* Asigna el peso de la fuente del label en expanded */
--c-lib-tb-accordion-icon-expanded: ; /* Asigna el color del icono en expanded */
--c-lib-tb-accordion-trigger-expanded: ; /* Asigna el color del trigger en expanded */
--c-lib-tb-accordion-box-shadow-expanded: ;
/* Disabled */
--c-lib-tb-accordion-border-disabled: ; /* Asigna el color del borde */
--c-lib-tb-accordion-bg-disabled: ; /* Asigna el color del fondo */
--c-lib-tb-accordion-label-disabled: ; /* Asigna el color del texto */
--c-lib-tb-accordion-label-font-weight-disabled: ; /* Asigna el peso de la fuente del label en disabled */
--c-lib-tb-accordion-icon-disabled: ; /* Asigna el color del icono en disabled */
--c-lib-tb-accordion-trigger-disabled: ; /* Asigna el color del trigger en disabled */
--c-lib-tb-accordion-box-shadow-disabled: ;
}
```

```typescript
/** COMPONENTE  */
accordionCustomTheme: ILibTbAccordion = {
  ...accordionCustom,
  class: 'accordion-css-variables'
};
```

```html
<lib-tb-accordion [custom]="accordionCustomTheme"></lib-tb-accordion>
```
