```css
.dropdown-css-variables {
    /* General */
  --c-lib-tb-dropdown-font-family: ;
  --c-lib-tb-dropdown-font-family-label: ;
  --c-lib-tb-dropdown-font-family-caption: ;
  --c-lib-tb-dropdown-font-size-input: ;
  --c-lib-tb-dropdown-font-size-label: ;
  --c-lib-tb-dropdown-font-size-icon: ;
  --c-lib-tb-dropdown-font-size-float: ;
  --c-lib-tb-dropdown-font-size-item: ;
  --c-lib-tb-dropdown-font-size-caption: ;
  --c-lib-tb-dropdown-color-pholder: ;
  --c-lib-tb-dropdown-border-radius-input: ;
  --c-lib-tb-dropdown-border-radius-panel: ;
  --c-lib-tb-dropdown-border-radius-filter: ;

  /* Default */
  --c-lib-tb-dropdown-color-label: ;
  --c-lib-tb-dropdown-bg-input: ;
  --c-lib-tb-dropdown-color-input: ;
  --c-lib-tb-dropdown-color-icon-input: ;
  --c-lib-tb-dropdown-border-color-input: ;
  --c-lib-tb-dropdown-color-caption: ;
  --c-lib-tb-dropdown-color-icon-caption: ;
  --c-lib-tb-dropdown-border-color-panel: ;
  --c-lib-tb-dropdown-border-color-group: ;

  /* Hover */
  --c-lib-tb-dropdown-color-label-hover: ;
  --c-lib-tb-dropdown-bg-input-hover: ;
  --c-lib-tb-dropdown-color-input-hover: ;
  --c-lib-tb-dropdown-color-icon-input-hover: ;
  --c-lib-tb-dropdown-border-color-input-hover: ;
  --c-lib-tb-dropdown-color-caption-hover: ;
  --c-lib-tb-dropdown-color-icon-caption-hover: ;
  --c-lib-tb-dropdown-color-hover: ;

  /* Focus */
  --c-lib-tb-dropdown-color-label-focus: ;
  --c-lib-tb-dropdown-bg-input-focus: ;
  --c-lib-tb-dropdown-color-input-focus: ;
  --c-lib-tb-dropdown-color-icon-input-focus: ;
  --c-lib-tb-dropdown-border-color-input-focus: ;
  --c-lib-tb-dropdown-box-shadow-input-focus: ;
  --c-lib-tb-dropdown-color-caption-focus: ;
  --c-lib-tb-dropdown-color-icon-caption-focus: ;

  /* Active */
  --c-lib-tb-dropdown-color-label-active: ;
  --c-lib-tb-dropdown-bg-input-active: ;
  --c-lib-tb-dropdown-color-input-active: ;
  --c-lib-tb-dropdown-color-icon-input-active: ;
  --c-lib-tb-dropdown-border-color-input-active: ;
  --c-lib-tb-dropdown-color-caption-active: ;
  --c-lib-tb-dropdown-color-icon-caption-active: ;

  /* Disabled */
  --c-lib-tb-dropdown-color-label-disabled: ;
  --c-lib-tb-dropdown-bg-input-disabled: ;
  --c-lib-tb-dropdown-color-input-disabled: ;
  --c-lib-tb-dropdown-color-icon-input-disabled: ;
  --c-lib-tb-dropdown-border-color-input-disabled: ;
  --c-lib-tb-dropdown-color-caption-disabled: ;
  --c-lib-tb-dropdown-color-icon-caption-disabled: ;

  /* Error */
  --c-lib-tb-dropdown-color-label-error: ;
  --c-lib-tb-dropdown-bg-input-error: ;
  --c-lib-tb-dropdown-color-input-error: ;
  --c-lib-tb-dropdown-color-icon-input-error: ;
  --c-lib-tb-dropdown-border-color-input-error: ;
  --c-lib-tb-dropdown-color-caption-error: ;
  --c-lib-tb-dropdown-color-icon-caption-error: ;

  /* Success */
  --c-lib-tb-dropdown-color-label-success: ;
  --c-lib-tb-dropdown-bg-input-success: ;
  --c-lib-tb-dropdown-color-input-success: ;
  --c-lib-tb-dropdown-color-icon-input-success: ;
  --c-lib-tb-dropdown-border-color-input-success: ;
  --c-lib-tb-dropdown-color-caption-success: ;
  --c-lib-tb-dropdown-color-icon-caption-success: ;

  /* View */
  --c-lib-tb-dropdown-color-label-view: ;
  --c-lib-tb-dropdown-color-view: ;

  /* Expanded header */
  --c-lib-tb-dropdown-bg-expanded-header: ;
  --c-lib-tb-dropdown-color-expanded-header: v;
  --c-lib-tb-dropdown-border-color-expanded-header: ;
  --c-lib-tb-dropdown-box-shadow-expanded-header: ;

  /* Expanded */
  --c-lib-tb-dropdown-bg-expanded: ;
  --c-lib-tb-dropdown-color-expanded: ;
  --c-lib-tb-dropdown-border-color-expanded: ;
  --c-lib-tb-dropdown-box-shadow-expanded: ;

  /* Expanded hover */
  --c-lib-tb-dropdown-bg-expanded-hover: ;
  --c-lib-tb-dropdown-color-expanded-hover: ;
  --c-lib-tb-dropdown-border-color-expanded-hover: ;

  /* Expanded pressed */
  --c-lib-tb-dropdown-bg-expanded-pressed: ;
  --c-lib-tb-dropdown-color-expanded-pressed: ;
  --c-lib-tb-dropdown-border-color-expanded-pressed: ;

  /* Expanded focus */
  --c-lib-tb-dropdown-bg-expanded-focus: ;
  --c-lib-tb-dropdown-color-expanded-focus: ;
  --c-lib-tb-dropdown-border-color-expanded-focus: ;

  /* Expanded active */
  --c-lib-tb-dropdown-bg-expanded-active: ;
  --c-lib-tb-dropdown-color-expanded-active: ;
  --c-lib-tb-dropdown-border-color-expanded-active: ;

  /* Expanded disabled */
  --c-lib-tb-dropdown-bg-expanded-disabled: ;
  --c-lib-tb-dropdown-color-expanded-disabled: ;
  --c-lib-tb-dropdown-border-color-expanded-disabled: ;
}
```

```typescript
/** COMPONENTE  */
dropdownCustomTheme: ILibTbDropdown  = {
  ...dropdownCustom,
  class: 'dropdown-css-variables'
};
```

```html
<lib-tb-dropdown [custom]="dropdownCustomTheme"></lib-tb-dropdown>
```
