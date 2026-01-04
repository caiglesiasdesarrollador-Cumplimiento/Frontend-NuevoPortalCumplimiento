import { Validators } from '@angular/forms';
import { ILibTbValidatorConfig } from 'tech-block-lib';

export const validatorRequired = (message?: string): ILibTbValidatorConfig => ({
  name: 'required',
  message: message ?? 'Este campo es requerido',
  validator: Validators.required,
});

export const validatorMaxLength = (length: number, message?: string): ILibTbValidatorConfig => ({
  name: 'maxlength',
  message: message ?? `Ha superado el límite de ${length} caracteres permitidos.`,
  validator: Validators.maxLength(length),
});

export const validatorMinLength = (length: number, message?: string): ILibTbValidatorConfig => ({
  name: 'minlength',
  message: message ?? `La longitud mínima debe ser ${length}`,
  validator: Validators.minLength(length),
});

export const validatorMaxValue = (value: number, message: string): ILibTbValidatorConfig => ({
  name: 'max',
  message: message,
  validator: Validators.max(value),
});

export const validatorMinValue = (value: number, message?: string): ILibTbValidatorConfig => ({
  name: 'min',
  message: message ?? `El valor mínimo debe ser ${value}`,
  validator: Validators.min(value),
});

export const validatorPattern = (pattern: string, message: string): ILibTbValidatorConfig => ({
  name: 'pattern',
  message: message,
  validator: Validators.pattern(pattern),
});
