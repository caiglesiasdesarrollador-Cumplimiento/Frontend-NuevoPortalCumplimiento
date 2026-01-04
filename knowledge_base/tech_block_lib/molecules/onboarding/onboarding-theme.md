```css
.onboarding-css-variables {
  --c-lib-tb-onboarding-bg-overlay: ;
  --c-lib-tb-onboarding-bg: ;
  --c-lib-tb-onboarding-leitmotiv-primary-color: ;
  --c-lib-tb-onboarding-leitmotiv-secondary-color: ;
  --c-lib-tb-onboarding-font-family-title: ;
  --c-lib-tb-onboarding-font-family-description: ;

  --c-lib-tb-onboarding-color-description: ;
  --c-lib-tb-onboarding-max-with-media: ;
  --c-lib-tb-onboarding-color-title-welcome: ;
  --c-lib-tb-onboarding-font-size-title-welcome: ;
  --c-lib-tb-onboarding-font-size-description-welcome: ;
  --c-lib-tb-onboarding-max-with-welcome: ;
  --c-lib-tb-onboarding-box-shadow-welcome: ;
  --c-lib-tb-onboarding-padding-close-btn-welcome: ;
  --c-lib-tb-onboarding-box-shadow-guide: ;

  --c-lib-tb-onboarding-max-with-guide: ;
  --c-lib-tb-onboarding-font-size-title-guide: ;
  --c-lib-tb-onboarding-font-size-description-guide: ;
  --c-lib-tb-onboarding-color-title-guide: ;
  --c-lib-tb-onboarding-padding-close-btn-guide: ;
}
```

```typescript
/** COMPONENTE  */
onboardingCustomTheme: ILibTbOnboarding = {
  ...onboardingCustom,
  class: 'onboarding-css-variables'
};
```

```html
<lib-tb-onboarding [custom]="onboardingCustomTheme"></lib-tb-onboarding>
```
