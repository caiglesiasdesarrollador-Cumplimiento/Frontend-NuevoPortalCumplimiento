```css
.avatar-css-variables {
  --c-lib-tb-avatar-font-family: ;
  --c-lib-tb-avatar-font-size: ;
  --c-lib-tb-avatar-bg: ;
  --c-lib-tb-avatar-color-icon: ;
  --c-lib-tb-avatar-color-text: ;
  --c-lib-tb-avatar-border-width: ;
  --c-lib-tb-avatar-border-color: ;
}
```

```typescript
/** COMPONENTE  */
avatarCustomTheme: ILibTbAvatar = {
  ...avatarCustom,
  class: 'avatar-css-variables'
};
```

```html
<lib-tb-avatar [custom]="avatarCustomTheme"></lib-tb-avatar>
```
