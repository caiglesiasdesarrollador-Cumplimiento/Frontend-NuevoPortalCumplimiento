```css
.answer-state-css-variables {
  --c-lib-tb-answer-state-font-family-number: ;
  --c-lib-tb-answer-state-font-family-title: ;
  --c-lib-tb-answer-state-font-family-description: ;
  --c-lib-tb-answer-state-font-size-number: ;
  --c-lib-tb-answer-state-font-size-title: ;
  --c-lib-tb-answer-state-font-size-description: ;
  --c-lib-tb-answer-state-max-width-lg: ;
  --c-lib-tb-answer-state-max-width-sm: ;
  --c-lib-tb-answer-state-bg: ;
  --c-lib-tb-answer-state-color-number: ;
  --c-lib-tb-answer-state-color-title: ;
  --c-lib-tb-answer-state-color-description: ;
  /* Cambio de colores para el pictograma por defecto */
  --c-lib-tb-answer-state-svg-bg-primary: ;
  --c-lib-tb-answer-state-svg-bg-secondary: ;
  --c-lib-tb-answer-state-svg-color-primary: ;
  --c-lib-tb-answer-state-svg-color-secondary: ;
}
```

```typescript
/** COMPONENTE  */
answerStateCustomTheme: ILibTbAnswerState = {
  ...answerStateCustom,
  class: 'answer-state-css-variables'
};
```

```html
<lib-tb-answer-state [custom]="answerStateCustomTheme"></lib-tb-answer-state>
```
