/**
 * Interfaces para @seguros-bolivar/ui-bundle
 * Reemplazan las interfaces de tech-block-lib
 * Compatible con Angular 20 + Web Components
 */

// =====================================================
// BUTTON
// =====================================================
export interface ILibTbButton {
  label?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  styleBtn?: 'fill' | 'stroke' | 'text';
  typeBtn?: 'primary' | 'secondary' | 'tertiary' | 'error';
  disabled?: boolean;
  class?: string;
  libTbClick?: (value?: unknown) => void;
  [key: string]: unknown;
}

// =====================================================
// INPUT TEXT
// =====================================================
export interface ILibTbInputText {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number;
  minlength?: number;
  required?: boolean;
  helpText?: string;
  errorMessage?: string;
  [key: string]: unknown;
}

// =====================================================
// INPUT NUMBER
// =====================================================
export interface ILibTbInputNumber {
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  mode?: 'decimal' | 'currency';
  currency?: string;
  locale?: string;
  prefix?: string;
  suffix?: string;
  [key: string]: unknown;
}

// =====================================================
// DROPDOWN
// =====================================================
export interface ILibTbDropdown {
  label?: string;
  placeholder?: string;
  options?: { label: string; value: unknown }[];
  optionLabel?: string;
  optionValue?: string;
  disabled?: boolean;
  filter?: boolean;
  showClear?: boolean;
  required?: boolean;
  [key: string]: unknown;
}

// =====================================================
// DROPDOWN MULTI SELECT
// =====================================================
export interface ILibTbDropdownMultiSelect {
  label?: string;
  placeholder?: string;
  options?: { label: string; value: unknown }[];
  optionLabel?: string;
  optionValue?: string;
  disabled?: boolean;
  filter?: boolean;
  showClear?: boolean;
  maxSelectedLabels?: number;
  selectionLimit?: number;
  [key: string]: unknown;
}

// =====================================================
// CHECKBOX
// =====================================================
export interface ILibTbCheckbox {
  label?: string;
  binary?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  [key: string]: unknown;
}

// =====================================================
// RADIO BUTTON
// =====================================================
export interface ILibTbRadioButton {
  label?: string;
  value?: unknown;
  name?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

// =====================================================
// SWITCH
// =====================================================
export interface ILibTbSwitch {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  [key: string]: unknown;
}

// =====================================================
// TEXTAREA
// =====================================================
export interface ILibTbTextArea {
  label?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  maxlength?: number;
  disabled?: boolean;
  readonly?: boolean;
  [key: string]: unknown;
}

// =====================================================
// TABLE
// =====================================================
export interface ILibTbTable {
  value?: any[];
  columns?: ILibTbTableColumn[];
  selection?: any[];
  selectionMode?: 'single' | 'multiple' | 'checkbox';
  paginator?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  sortMode?: 'single' | 'multiple';
  scrollable?: boolean;
  scrollHeight?: string;
  loading?: boolean;
  emptyMessage?: string;
  libTbSelectionChange?: (event: any) => void;
  libTbOnRowSelect?: (event: any) => void;
  libTbOnSort?: (event: any) => void;
  [key: string]: any;
}

export interface ILibTbTableColumn {
  field?: string;
  header?: string;
  sortable?: boolean;
  filter?: boolean;
  filterType?: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'numeric' | 'date' | 'boolean' | 'currency' | 'template';
  template?: string;
  [key: string]: unknown;
}

// =====================================================
// ACCORDION
// =====================================================
export interface ILibTbAccordion {
  multiple?: boolean;
  activeIndex?: number | number[];
  [key: string]: unknown;
}

export interface ILibTbAccordionTab {
  header?: string;
  selected?: boolean;
  disabled?: boolean;
  [key: string]: unknown;
}

// =====================================================
// STEPPER
// =====================================================
export interface ILibTbStepper {
  activeIndex?: number;
  linear?: boolean;
  orientation?: 'horizontal' | 'vertical';
  steps?: ILibTbStepperStep[];
  items?: ILibTbStepperStep[];
  libTbActiveIndexChange?: (index: number) => void;
  [key: string]: any;
}

export interface ILibTbStepperStep {
  label?: string;
  disabled?: boolean;
  completed?: boolean;
  optional?: boolean;
  [key: string]: unknown;
}

// =====================================================
// DYNAMIC FORM
// =====================================================
export interface ILibTbDynamicFormFormGroup {
  valid: boolean;
  invalid: boolean;
  value: any;
  reset: () => void;
  patchValue: (value: any) => void;
  get: (key: string) => any;
  statusChanges: any;
  valueChanges: any;
  [key: string]: any;
}

export interface ILibTbDynamicForm {
  formId?: string;
  name?: string;
  form?: ILibTbDynamicFormFormGroup;
  fields?: ILibTbDynamicFormField[];
  libTbSubmit?: (value: any) => void;
  libTbUpdated?: (form: ILibTbDynamicFormFormGroup) => void;
  libTbCallSubmit?: () => void;
  [key: string]: any;
}

export interface ILibTbDynamicFormField {
  key?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: unknown }[];
  validators?: unknown[];
  [key: string]: unknown;
}

// =====================================================
// MODAL
// =====================================================
export interface ILibTbModal {
  header?: string;
  visible?: boolean;
  modal?: boolean;
  closable?: boolean;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  primaryButton?: ILibTbButton;
  secondaryButton?: ILibTbButton;
  libTbOnShow?: () => void;
  libTbOnHide?: () => void;
  [key: string]: any;
}

// =====================================================
// MODAL NOTIFICATION
// =====================================================
export interface ILibTbModalNotification {
  key?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
  visible?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  showClose?: boolean;
  dismissableMask?: boolean;
  closeOnEscape?: boolean;
  class?: string;
  img?: { src?: string; alt?: string };
  closeButton?: ILibTbButton;
  acceptButton?: ILibTbButton;
  rejectButton?: ILibTbButton;
  rejectButtonVisible?: boolean;
  libTbOnConfirm?: () => void;
  libTbOnCancel?: () => void;
  [key: string]: unknown;
}

// =====================================================
// VALIDATOR CONFIG
// =====================================================
export interface ILibTbValidatorConfig {
  name?: string;
  message?: string;
  validator?: unknown;
  [key: string]: unknown;
}

// =====================================================
// SNACKBAR / ALERT MESSAGE
// =====================================================
export interface ILibTbSnackbar {
  severity?: 'success' | 'info' | 'warn' | 'warning' | 'error';
  summary?: string;
  detail?: string;
  life?: number;
  closable?: boolean;
  sticky?: boolean;
  [key: string]: unknown;
}

export interface ILibTbAlertMessage {
  id?: string;
  type?: 'success' | 'info' | 'warn' | 'warning' | 'error';
  severity?: 'success' | 'info' | 'warn' | 'warning' | 'error';
  summary?: string;
  detail?: string;
  life?: number;
  closable?: boolean;
  [key: string]: unknown;
}

// =====================================================
// BREADCRUMB
// =====================================================
export interface ILibTbBreadcrumb {
  items?: ILibTbBreadcrumbItem[];
  home?: ILibTbBreadcrumbItem;
  [key: string]: unknown;
}

export interface ILibTbBreadcrumbItem {
  label?: string;
  icon?: string;
  routerLink?: string | string[];
  url?: string;
  command?: (event?: unknown) => void;
  [key: string]: unknown;
}

// =====================================================
// FILE UPLOAD
// =====================================================
export interface ILibTbFileUploadField {
  name?: string;
  url?: string;
  multiple?: boolean;
  accept?: string;
  maxFileSize?: number;
  auto?: boolean;
  disabled?: boolean;
  chooseLabel?: string;
  uploadLabel?: string;
  cancelLabel?: string;
  libTbOnSelect?: (event: unknown) => void;
  libTbOnUpload?: (event: unknown) => void;
  libTbOnError?: (event: unknown) => void;
  libTbOnRemove?: (event: unknown) => void;
  libTbOnReloadFile?: (uploadingFile: ILibTbUploadingFile) => void;
  [key: string]: unknown;
}

export interface ILibTbUploadingFile {
  file: File;
  name?: string;
  size?: number;
  type?: string;
  progress?: number;
  status?: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  [key: string]: any;
}

// =====================================================
// CALENDAR
// =====================================================
export interface ILibTbCalendar {
  selectionMode?: 'single' | 'multiple' | 'range';
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDays?: number[];
  disabledDates?: Date[];
  showIcon?: boolean;
  showOnFocus?: boolean;
  showButtonBar?: boolean;
  showTime?: boolean;
  timeOnly?: boolean;
  hourFormat?: '12' | '24';
  readonlyInput?: boolean;
  disabled?: boolean;
  placeholder?: string;
  [key: string]: unknown;
}

// =====================================================
// PAGINATOR
// =====================================================
export interface ILibTbPaginator {
  rows?: number;
  totalRecords?: number;
  first?: number;
  rowsPerPageOptions?: number[];
  showCurrentPageReport?: boolean;
  currentPageReportTemplate?: string;
  [key: string]: unknown;
}

// =====================================================
// TABS
// =====================================================
export interface ILibTbTabs {
  activeIndex?: number;
  [key: string]: unknown;
}

export interface ILibTbTabPanel {
  header?: string;
  selected?: boolean;
  disabled?: boolean;
  closable?: boolean;
  [key: string]: unknown;
}

// =====================================================
// LIST
// =====================================================
export interface ILibTbList {
  value?: unknown[];
  selection?: unknown[];
  selectionMode?: 'single' | 'multiple';
  emptyMessage?: string;
  [key: string]: unknown;
}

// =====================================================
// PROGRESS
// =====================================================
export interface ILibTbProgressBar {
  value?: number;
  showValue?: boolean;
  mode?: 'determinate' | 'indeterminate';
  [key: string]: unknown;
}

export interface ILibTbProgressSpinner {
  strokeWidth?: string | number;
  fill?: string;
  animationDuration?: string;
  [key: string]: unknown;
}

// =====================================================
// ALERT
// =====================================================
export interface ILibTbAlert {
  severity?: 'success' | 'info' | 'warn' | 'warning' | 'error';
  summary?: string;
  detail?: string;
  life?: number;
  closable?: boolean;
  [key: string]: unknown;
}

// =====================================================
// DYNAMIC FORM CONFIG TYPE
// =====================================================
export type ILibTbDynamicFormConfigType = ILibTbDynamicFormField;

// =====================================================
// TOOLTIP
// =====================================================
export interface ILibTbTooltip {
  position?: 'top' | 'bottom' | 'left' | 'right';
  event?: 'hover' | 'focus';
  appendTo?: 'body' | 'target';
  hideDelay?: number;
  showDelay?: number;
  [key: string]: unknown;
}

// =====================================================
// EMPTY STATE
// =====================================================
export interface ILibTbEmptyState {
  title?: string;
  message?: string;
  icon?: string;
  actionLabel?: string;
  actionCallback?: () => void;
  [key: string]: unknown;
}

// =====================================================
// MENU / CONTEXT MENU
// =====================================================
export interface ILibTbMenu {
  model?: ILibTbMenuItem[];
  popup?: boolean;
  [key: string]: unknown;
}

export interface ILibTbMenuItem {
  label?: string;
  icon?: string;
  command?: (event?: unknown) => void;
  routerLink?: string | string[];
  items?: ILibTbMenuItem[];
  separator?: boolean;
  disabled?: boolean;
  visible?: boolean;
  [key: string]: unknown;
}

// =====================================================
// CARD
// =====================================================
export interface ILibTbCard {
  header?: string;
  subheader?: string;
  footer?: string;
  [key: string]: unknown;
}

// =====================================================
// BADGE / TAG / CHIP
// =====================================================
export interface ILibTbBadge {
  value?: string | number;
  severity?: 'success' | 'info' | 'warning' | 'danger';
  size?: 'large' | 'xlarge';
  [key: string]: unknown;
}

export interface ILibTbTag {
  value?: string;
  severity?: 'success' | 'info' | 'warning' | 'danger';
  rounded?: boolean;
  icon?: string;
  [key: string]: unknown;
}

export interface ILibTbChip {
  label?: string;
  icon?: string;
  image?: string;
  removable?: boolean;
  [key: string]: unknown;
}

// =====================================================
// AVATAR
// =====================================================
export interface ILibTbAvatar {
  label?: string;
  icon?: string;
  image?: string;
  size?: 'normal' | 'large' | 'xlarge';
  shape?: 'square' | 'circle';
  [key: string]: unknown;
}

// =====================================================
// SKELETON
// =====================================================
export interface ILibTbSkeleton {
  shape?: 'rectangle' | 'circle';
  size?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  animation?: 'wave' | 'none';
  [key: string]: unknown;
}

// =====================================================
// BANNER
// =====================================================
export interface ILibTbBanner {
  severity?: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message?: string;
  closable?: boolean;
  [key: string]: unknown;
}

// =====================================================
// ONBOARDING
// =====================================================
export interface ILibTbOnboarding {
  steps?: ILibTbOnboardingStep[];
  activeIndex?: number;
  [key: string]: unknown;
}

export interface ILibTbOnboardingStep {
  title?: string;
  content?: string;
  target?: string;
  [key: string]: unknown;
}

// =====================================================
// CAROUSEL
// =====================================================
export interface ILibTbCarousel {
  value?: unknown[];
  numVisible?: number;
  numScroll?: number;
  circular?: boolean;
  autoplayInterval?: number;
  [key: string]: unknown;
}

// =====================================================
// CHART
// =====================================================
export interface ILibTbChart {
  type?: 'line' | 'bar' | 'pie' | 'doughnut' | 'polarArea' | 'radar';
  data?: unknown;
  options?: unknown;
  [key: string]: unknown;
}

// =====================================================
// MAP
// =====================================================
export interface ILibTbMap {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: ILibTbMapMarker[];
  [key: string]: unknown;
}

export interface ILibTbMapMarker {
  position?: { lat: number; lng: number };
  title?: string;
  icon?: string;
  [key: string]: unknown;
}

