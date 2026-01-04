```css
.modal-css-variables {
  --c-lib-tb-modal-bg-overlay: ;
  --c-lib-tb-modal-bg: ;
  --c-lib-tb-modal-max-width: ;
  --c-lib-tb-modal-border-radius: ;
  --c-lib-tb-modal-color-icon-close: ;
  --c-lib-tb-modal-font-family-title: ;
  --c-lib-tb-modal-font-family-description: ;
  --c-lib-tb-modal-font-size-title: ;
  --c-lib-tb-modal-font-size-description: ;
  --c-lib-tb-modal-color-title: ;
  --c-lib-tb-modal-color-description: ;
}
```

```typescript
/** COMPONENTE  */
modalCustomTheme: ILibTbModal = {
  ...modalCustom,
  class: 'modal-css-variables'
};
```

```html
<lib-tb-modal [custom]="modalCustomTheme"></lib-tb-modal>
```
