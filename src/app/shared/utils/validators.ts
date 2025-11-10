import { Validators } from '@angular/forms';
import { ILibTbValidatorConfig } from 'tech-block-lib';

export const validatorRequired = (message?: string): ILibTbValidatorConfig => ({
  name: 'required',
  message: message || 'Este campo es requerido',
  validator: Validators.required,
});

export const validatorMaxLength = (length: number, message?: string): ILibTbValidatorConfig => ({
  name: 'maxlength',
  message: message || `La longitud máxima debe ser ${length}`,
  validator: Validators.maxLength(length),
});

export const validatorMinLength = (length: number, message?: string): ILibTbValidatorConfig => ({
  name: 'minlength',
  message: message || `La longitud mínima debe ser ${length}`,
  validator: Validators.minLength(length),
});

export const validatorPattern = (pattern: string, message?: string): ILibTbValidatorConfig => ({
  name: 'pattern',
  message: message || 'El formato no es correcto',
  validator: Validators.pattern(pattern),
});
