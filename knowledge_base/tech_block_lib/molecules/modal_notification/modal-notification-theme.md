```css
.modal-notification-css-variables {
  --c-lib-tb-modal-notification-bg-overlay: ;
  --c-lib-tb-modal-notification-bg: ;
  --c-lib-tb-modal-notification-max-width: ;
  --c-lib-tb-modal-notification-border-radius: ;
  --c-lib-tb-modal-notification-color-icon-close: ;
  --c-lib-tb-modal-notification-font-family-title: ;
  --c-lib-tb-modal-notification-font-family-message: ;
  --c-lib-tb-modal-notification-font-size-title: ;
  --c-lib-tb-modal-notification-font-size-message: ;
  --c-lib-tb-modal-notification-color-title: ;
  --c-lib-tb-modal-notification-color-message: ;
  --c-lib-tb-modal-notification-icon-gradient: ;
}
```

```typescript
/** COMPONENTE  */
modalNotificationCustomTheme: ILibTbModalNotification = {
  ...modalNotificationCustom,
  class: 'modal-notification-css-variables'
};
```

```html
<lib-tb-modal-notification [custom]="modalNotificationCustomTheme"></lib-tb-modal-notification>
```
