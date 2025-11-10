import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { query, queryByUnitTestId } from './finders.test';

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  isUnitTestId: boolean = false,
  event: unknown = null,
) {
  let element: DebugElement;
  if (isUnitTestId) {
    element = queryByUnitTestId(fixture, selector);
  } else {
    element = query(fixture, selector);
  }
  // angular events
  element.triggerEventHandler('click', event);
}

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  isUnitTestId: boolean = false,
) {
  let elementDebug: DebugElement;
  if (isUnitTestId) {
    elementDebug = queryByUnitTestId(fixture, selector);
  } else {
    elementDebug = query(fixture, selector);
  }
  const element: HTMLElement = elementDebug.nativeElement;
  element.click();
}
