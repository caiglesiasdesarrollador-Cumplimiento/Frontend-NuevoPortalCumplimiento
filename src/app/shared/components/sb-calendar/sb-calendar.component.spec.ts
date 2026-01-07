import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SbCalendarComponent } from './sb-calendar.component';

describe('SbCalendarComponent', () => {
  let component: SbCalendarComponent;
  let fixture: ComponentFixture<SbCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SbCalendarComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SbCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      expect(component.label).toBe('');
      expect(component.placeholder).toBe('Seleccione una fecha');
      expect(component.disabled).toBe(false);
      expect(component.required).toBe(false);
      expect(component.showCalendar).toBe(false);
    });

    it('should initialize months array with 12 months', () => {
      expect(component.months.length).toBe(12);
      expect(component.months[0]).toBe('Enero');
      expect(component.months[11]).toBe('Diciembre');
    });

    it('should initialize weekDays array', () => {
      expect(component.weekDays.length).toBe(7);
      expect(component.weekDays[0]).toBe('Do');
    });

    it('should generate years array on init', () => {
      component.ngOnInit();
      expect(component.years.length).toBeGreaterThanOrEqual(21); // At least 21 years
    });

    it('should call updateCalendar on init', () => {
      const spy = jest.spyOn(component, 'updateCalendar');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('toggleCalendar', () => {
    it('should toggle showCalendar when not disabled', () => {
      component.disabled = false;
      component.showCalendar = false;
      
      component.toggleCalendar();
      expect(component.showCalendar).toBe(true);
      
      component.toggleCalendar();
      expect(component.showCalendar).toBe(false);
    });

    it('should not toggle when disabled', () => {
      component.disabled = true;
      component.showCalendar = false;
      
      component.toggleCalendar();
      expect(component.showCalendar).toBe(false);
    });

    it('should position calendar to selected date month when value exists', () => {
      component.value = '2025-06-15';
      component.toggleCalendar();
      
      expect(component.currentMonth).toBe(5); // June (0-indexed)
      expect(component.currentYear).toBe(2025);
    });
  });

  describe('updateCalendar', () => {
    it('should generate calendar days', () => {
      component.currentMonth = 0; // January
      component.currentYear = 2025;
      component.updateCalendar();
      
      expect(component.calendarDays.length).toBe(42);
    });

    it('should mark today correctly', () => {
      const today = new Date();
      component.currentMonth = today.getMonth();
      component.currentYear = today.getFullYear();
      component.updateCalendar();
      
      const todayDay = component.calendarDays.find(d => d.today && d.currentMonth);
      expect(todayDay).toBeTruthy();
      expect(todayDay?.day).toBe(today.getDate());
    });
  });

  describe('prevMonth', () => {
    it('should go to previous month', () => {
      component.currentMonth = 5; // June
      component.currentYear = 2025;
      
      component.prevMonth();
      
      expect(component.currentMonth).toBe(4); // May
      expect(component.currentYear).toBe(2025);
    });

    it('should go to previous year when at January', () => {
      component.currentMonth = 0; // January
      component.currentYear = 2025;
      
      component.prevMonth();
      
      expect(component.currentMonth).toBe(11); // December
      expect(component.currentYear).toBe(2024);
    });
  });

  describe('nextMonth', () => {
    it('should go to next month', () => {
      component.currentMonth = 5; // June
      component.currentYear = 2025;
      
      component.nextMonth();
      
      expect(component.currentMonth).toBe(6); // July
      expect(component.currentYear).toBe(2025);
    });

    it('should go to next year when at December', () => {
      component.currentMonth = 11; // December
      component.currentYear = 2025;
      
      component.nextMonth();
      
      expect(component.currentMonth).toBe(0); // January
      expect(component.currentYear).toBe(2026);
    });
  });

  describe('selectDate', () => {
    it('should select date when in current month', () => {
      const day = {
        day: 15,
        currentMonth: true,
        selected: false,
        today: false,
        date: new Date(2025, 5, 15)
      };
      
      component.selectDate(day);
      
      expect(component.tempSelectedDate).toEqual(day.date);
    });

    it('should not select date when not in current month', () => {
      const day = {
        day: 15,
        currentMonth: false,
        selected: false,
        today: false,
        date: new Date(2025, 4, 15)
      };
      
      component.tempSelectedDate = null;
      component.selectDate(day);
      
      expect(component.tempSelectedDate).toBeNull();
    });
  });

  describe('acceptSelection', () => {
    it('should set value and close calendar when date selected', () => {
      component.tempSelectedDate = new Date(2025, 5, 15);
      component.showCalendar = true;
      
      component.acceptSelection();
      
      expect(component.value).toBe('2025-06-15');
      expect(component.showCalendar).toBe(false);
    });

    it('should emit dateChange event', () => {
      const spy = jest.spyOn(component.dateChange, 'emit');
      component.tempSelectedDate = new Date(2025, 5, 15);
      
      component.acceptSelection();
      
      expect(spy).toHaveBeenCalledWith('2025-06-15');
    });
  });

  describe('cancelSelection', () => {
    it('should close calendar without saving', () => {
      component.showCalendar = true;
      component.value = '2025-05-10';
      component.tempSelectedDate = new Date(2025, 5, 15);
      
      component.cancelSelection();
      
      expect(component.showCalendar).toBe(false);
      expect(component.value).toBe('2025-05-10'); // Original value preserved
    });
  });

  describe('formatDisplayDate', () => {
    it('should format YYYY-MM-DD to DD/MM/YY', () => {
      expect(component.formatDisplayDate('2025-06-15')).toBe('15/06/25');
    });

    it('should return empty for empty input', () => {
      expect(component.formatDisplayDate('')).toBe('');
    });

    it('should return empty for undefined', () => {
      expect(component.formatDisplayDate('undefined')).toBe('');
    });

    it('should return empty for null string', () => {
      expect(component.formatDisplayDate('null')).toBe('');
    });

    it('should return same value if already in DD/MM/YY format', () => {
      expect(component.formatDisplayDate('15/06/25')).toBe('15/06/25');
    });
  });

  describe('clearDate', () => {
    it('should clear all date values', () => {
      component.value = '2025-06-15';
      component.displayValue = '15/06/25';
      component.tempSelectedDate = new Date(2025, 5, 15);
      
      const event = { stopPropagation: jest.fn() } as any;
      component.clearDate(event);
      
      expect(component.value).toBe('');
      expect(component.displayValue).toBe('');
      expect(component.tempSelectedDate).toBeNull();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should emit empty dateChange', () => {
      const spy = jest.spyOn(component.dateChange, 'emit');
      const event = { stopPropagation: jest.fn() } as any;
      
      component.clearDate(event);
      
      expect(spy).toHaveBeenCalledWith('');
    });
  });

  describe('isSameDate', () => {
    it('should return true for same dates', () => {
      const date1 = new Date(2025, 5, 15);
      const date2 = new Date(2025, 5, 15);
      
      expect(component.isSameDate(date1, date2)).toBe(true);
    });

    it('should return false for different dates', () => {
      const date1 = new Date(2025, 5, 15);
      const date2 = new Date(2025, 5, 16);
      
      expect(component.isSameDate(date1, date2)).toBe(false);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value correctly', () => {
      component.writeValue('2025-06-15');
      
      expect(component.value).toBe('2025-06-15');
      expect(component.displayValue).toBe('15/06/25');
    });

    it('should handle empty value in writeValue', () => {
      component.writeValue('');
      
      expect(component.value).toBe('');
      expect(component.displayValue).toBe('');
    });

    it('should register onChange callback', () => {
      const fn = jest.fn();
      component.registerOnChange(fn);
      
      component.tempSelectedDate = new Date(2025, 5, 15);
      component.acceptSelection();
      
      expect(fn).toHaveBeenCalled();
    });

    it('should register onTouched callback', () => {
      const fn = jest.fn();
      component.registerOnTouched(fn);
      
      component.toggleCalendar();
      
      expect(fn).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
      
      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });

  describe('calculatePopupPosition', () => {
    it('should set default position to bottom-right', () => {
      component.calendarContainer = {
        nativeElement: {
          getBoundingClientRect: () => ({
            right: 100,
            bottom: 100
          })
        }
      } as any;
      
      component.calculatePopupPosition();
      
      expect(component.popupPosition).toBe('bottom-right');
    });
  });
});

