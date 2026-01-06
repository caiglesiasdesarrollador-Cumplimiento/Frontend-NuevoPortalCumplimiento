import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function getTextByUnitTestId<T>(
  fixture: ComponentFixture<T>,
  unitTestId: string,
): string | null {
  const debugElement = queryByUnitTestId(fixture, unitTestId);
  const element: HTMLElement = debugElement.nativeElement;
  return element.textContent;
}

export function query<T>(fixture: ComponentFixture<T>, selector: string): DebugElement {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`query: Element with ${selector} not found`);
  }
  return debugElement;
}

export function queryByUnitTestId<T>(
  fixture: ComponentFixture<T>,
  unitTestId: string,
): DebugElement {
  const selector = `[unit-test-id="${unitTestId}"]`;
  return query(fixture, selector);
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector));
}

export function queryAllByDirective<T, D>(
  fixture: ComponentFixture<T>,
  directive: Type<D>,
): DebugElement[] {
  return fixture.debugElement.queryAll(By.directive(directive));
}
