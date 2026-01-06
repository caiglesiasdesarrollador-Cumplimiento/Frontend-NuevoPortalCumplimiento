import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface CalendarDay {
  day: number;
  currentMonth: boolean;
  selected: boolean;
  today: boolean;
  date: Date;
}

@Component({
  selector: 'app-sb-calendar',
  standalone: false,
  templateUrl: './sb-calendar.component.html',
  styleUrls: ['./sb-calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbCalendarComponent),
      multi: true
    }
  ]
})
export class SbCalendarComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = 'Seleccione una fecha';
  @Input() minDate: string = '';
  @Input() maxDate: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() error: boolean = false;
  @Input() errorMessage: string = '';
  @Input() icon: string = 'fa-solid fa-calendar-alt';
  @Input() showLabelIcon: boolean = true; // Controla si se muestra el icono en el label
  @Input() forceBottom: boolean = false; // Forzar que el popup se muestre abajo
  
  @Output() dateChange = new EventEmitter<string>();
  
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  
  value: string = '';
  showCalendar: boolean = false;
  displayValue: string = '';
  
  // Posición del popup
  popupPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right';
  popupStyle: { [key: string]: string } = {};
  
  // Calendario nativo
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  calendarDays: CalendarDay[] = [];
  tempSelectedDate: Date | null = null;
  
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  weekDays: string[] = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
  
  years: number[] = [];
  
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  
  ngOnInit(): void {
    // Generar años (10 años atrás y 10 años adelante)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
    this.updateCalendar();
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.calendarContainer && !this.calendarContainer.nativeElement.contains(event.target)) {
      this.showCalendar = false;
    }
  }
  
  toggleCalendar(): void {
    if (!this.disabled) {
      this.showCalendar = !this.showCalendar;
      this.onTouched();
      
      if (this.showCalendar) {
        // Si hay una fecha seleccionada, posicionar el calendario en ese mes
        if (this.value) {
          const date = new Date(this.value + 'T00:00:00');
          this.currentMonth = date.getMonth();
          this.currentYear = date.getFullYear();
          this.tempSelectedDate = date;
        } else {
          this.tempSelectedDate = null;
        }
        this.updateCalendar();
        
        // Calcular posición óptima del popup
        setTimeout(() => this.calculatePopupPosition(), 10);
      }
    }
  }
  
  calculatePopupPosition(): void {
    if (!this.calendarContainer) return;
    
    const element = this.calendarContainer.nativeElement;
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const popupWidth = 300;
    const popupHeight = 350;
    
    // Detectar si está cerca del borde derecho
    const nearRightEdge = (rect.right + popupWidth) > viewportWidth;
    // Detectar si está cerca del borde inferior (solo si no está forzado abajo)
    const nearBottomEdge = !this.forceBottom && (rect.bottom + popupHeight) > viewportHeight;
    
    // Determinar posición
    if (nearBottomEdge && nearRightEdge) {
      this.popupPosition = 'top-left';
      this.popupStyle = {
        bottom: '100%',
        right: '0',
        left: 'auto',
        top: 'auto',
        marginBottom: '8px'
      };
    } else if (nearBottomEdge) {
      this.popupPosition = 'top-right';
      this.popupStyle = {
        bottom: '100%',
        left: '0',
        right: 'auto',
        top: 'auto',
        marginBottom: '8px'
      };
    } else if (nearRightEdge) {
      this.popupPosition = 'bottom-left';
      this.popupStyle = {
        top: '100%',
        right: '0',
        left: 'auto',
        bottom: 'auto',
        marginTop: '8px'
      };
    } else {
      this.popupPosition = 'bottom-right';
      this.popupStyle = {
        top: '100%',
        left: '0',
        right: 'auto',
        bottom: 'auto',
        marginTop: '8px'
      };
    }
  }
  
  updateCalendar(): void {
    this.calendarDays = [];
    
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Días del mes anterior
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(this.currentYear, this.currentMonth - 1, day);
      this.calendarDays.push({
        day,
        currentMonth: false,
        selected: false,
        today: false,
        date
      });
    }
    
    // Días del mes actual
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      const isSelected = this.tempSelectedDate ? 
        this.isSameDate(date, this.tempSelectedDate) : false;
      const isToday = this.isSameDate(date, today);
      
      this.calendarDays.push({
        day: i,
        currentMonth: true,
        selected: isSelected,
        today: isToday,
        date
      });
    }
    
    // Días del mes siguiente para completar la grilla
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(this.currentYear, this.currentMonth + 1, i);
      this.calendarDays.push({
        day: i,
        currentMonth: false,
        selected: false,
        today: false,
        date
      });
    }
  }
  
  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  
  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }
  
  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }
  
  selectDate(day: CalendarDay): void {
    if (day.currentMonth) {
      this.tempSelectedDate = day.date;
      this.updateCalendar();
    }
  }
  
  acceptSelection(): void {
    if (this.tempSelectedDate) {
      const year = this.tempSelectedDate.getFullYear();
      const month = String(this.tempSelectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(this.tempSelectedDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      this.value = dateString;
      this.displayValue = this.formatDisplayDate(dateString);
      this.onChange(dateString);
      this.dateChange.emit(dateString);
    }
    this.showCalendar = false;
  }
  
  cancelSelection(): void {
    this.tempSelectedDate = this.value ? new Date(this.value + 'T00:00:00') : null;
    this.showCalendar = false;
  }
  
  formatDisplayDate(dateString: string): string {
    if (!dateString || dateString === 'undefined' || dateString === 'null') return '';
    try {
      // Si ya viene en formato DD/MM/YY, retornarlo tal cual
      if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateString)) {
        return dateString;
      }
      // Si viene en formato YYYY-MM-DD
      const date = new Date(dateString + 'T00:00:00');
      if (isNaN(date.getTime())) {
        return ''; // Fecha inválida
      }
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2); // Solo últimos 2 dígitos del año
      return `${day}/${month}/${year}`;
    } catch {
      return '';
    }
  }
  
  clearDate(event: Event): void {
    event.stopPropagation();
    this.value = '';
    this.displayValue = '';
    this.tempSelectedDate = null;
    this.onChange('');
    this.dateChange.emit('');
  }
  
  // ControlValueAccessor implementation
  writeValue(value: string): void {
    if (!value || value === 'undefined' || value === 'null') {
      this.value = '';
      this.displayValue = '';
      this.tempSelectedDate = null;
      return;
    }
    this.value = value;
    this.displayValue = this.formatDisplayDate(value);
    if (value) {
      const date = new Date(value + 'T00:00:00');
      if (!isNaN(date.getTime())) {
        this.tempSelectedDate = date;
      }
    }
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
