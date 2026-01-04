```css
.search-css-variables {
  /* General */
  --c-lib-tb-search-font-family: ;
  --c-lib-tb-search-font-size: ;
  --c-lib-tb-search-font-size-item: ;
  --c-lib-tb-search-text-decoration: ;

  /* Default */
  --c-lib-tb-search-bg: ;
  --c-lib-tb-search-color: ;
  --c-lib-tb-search-border-color: ;
  --c-lib-tb-search-border-color-group-label: ;
  --c-lib-tb-search-filter: ;
  --c-lib-tb-search-icon: ;
  --c-lib-tb-search-left-icon: ;
  --c-lib-tb-search-border-radius: ;
  --c-lib-tb-search-border-radius-rounded: ;

  /* Hover */
  --c-lib-tb-search-bg-hover: ;
  --c-lib-tb-search-color-hover: ;
  --c-lib-tb-search-border-color-hover: ;
  --c-lib-tb-search-filter-hover: ;
  --c-lib-tb-search-icon-hover: ;
  --c-lib-tb-search-left-icon-hover: ;

  /* Focus */
  --c-lib-tb-search-bg-focus: ;
  --c-lib-tb-search-color-focus: ;
  --c-lib-tb-search-border-color-focus: ;
  --c-lib-tb-search-filter-focus: ;
  --c-lib-tb-search-icon-focus: ;
  --c-lib-tb-search-left-icon-focus: ;
  --c-lib-tb-search-box-shadow-focus: ;

  /* Active */
  --c-lib-tb-search-bg-active: ;
  --c-lib-tb-search-color-active: ;
  --c-lib-tb-search-border-color-active: ;
  --c-lib-tb-search-filter-active: ;
  --c-lib-tb-search-icon-active: ;
  --c-lib-tb-search-left-icon-active: ;

  /* Disabled */
  --c-lib-tb-search-bg-disabled: ;
  --c-lib-tb-search-color-disabled: ;
  --c-lib-tb-search-border-color-disabled: ;
  --c-lib-tb-search-filter-disabled: ;
  --c-lib-tb-search-icon-disabled: ;
  --c-lib-tb-search-left-icon-disabled: ;

  /* //Expanded header */
  --c-lib-tb-search-bg-expanded: ;
  --c-lib-tb-search-color-expanded-header: ;
  --c-lib-tb-search-border-color-expanded-header: ;
  --c-lib-tb-search-filter-expanded-header: ;

  /* Expanded */
  --c-lib-tb-search-bg-expanded: ;
  --c-lib-tb-search-color-expanded: ;
  --c-lib-tb-search-color-label-expanded: ;
  --c-lib-tb-search-color-description-expanded: ;
  --c-lib-tb-search-color-icon-expanded: ;
  --c-lib-tb-search-border-color-expanded: ;
  --c-lib-tb-search-filter-expanded: ;
  --c-lib-tb-search-border-radius-sm-expanded: ;
  --c-lib-tb-search-border-radius-sm-rounded-expanded: ;
  --c-lib-tb-search-border-radius-expanded: ;
  --c-lib-tb-search-border-radius-rounded-expanded: ;
  --c-lib-tb-search-border-radius-lg-expanded: ;
  --c-lib-tb-search-border-radius-lg-rounded-expanded: ;
  --c-lib-tb-search-separator-width-expanded: ;
  --c-lib-tb-search-separator-style-expanded: ;
  --c-lib-tb-search-separator-color-expanded: ;
  --c-lib-tb-search-icon-expanded: ;
  --c-lib-tb-search-left-icon-expanded: ;

  /* Expanded hover */
  --c-lib-tb-search-bg-expanded-hover: ;
  --c-lib-tb-search-color-expanded-hover: ;
  --c-lib-tb-search-color-label-expanded-hover: ;
  --c-lib-tb-search-color-description-expanded-hover: ;
  --c-lib-tb-search-color-icon-expanded-hover: ;
  --c-lib-tb-search-border-color-expanded-hover: ;

  /* Expanded pressed */
  --c-lib-tb-search-bg-expanded-pressed: ;
  --c-lib-tb-search-color-expanded-pressed: ;
  --c-lib-tb-search-color-label-expanded-pressed: ;
  --c-lib-tb-search-color-description-expanded-pressed: ;
  --c-lib-tb-search-color-icon-expanded-pressed: ;
  --c-lib-tb-search-border-color-expanded-pressed: ;

  /* Expanded focus */
  --c-lib-tb-search-bg-expanded-focus: ;
  --c-lib-tb-search-color-expanded-focus: ;
  --c-lib-tb-search-color-label-expanded-focus: ;
  --c-lib-tb-search-color-description-expanded-focus: ;
  --c-lib-tb-search-color-icon-expanded-focus: ;
  --c-lib-tb-search-border-color-expanded-focus: ;

  /* Expanded active */
  --c-lib-tb-search-bg-expanded-active: ;
  --c-lib-tb-search-color-expanded-active: ;
  --c-lib-tb-search-color-label-expanded-active: ;
  --c-lib-tb-search-color-description-expanded-active: ;
  --c-lib-tb-search-color-icon-expanded-active: ;
  --c-lib-tb-search-border-color-expanded-active: ;
}
```

```typescript
/** COMPONENTE  */
searchCustomTheme: ILibTbSearch = {
  ...searchCustom,
  class: 'search-css-variables'
};
```

```html
<lib-tb-search [custom]="searchCustomTheme"></lib-tb-search>
```
