import {
  validatorRequired,
  validatorMaxLength,
  validatorMinValue,
  validatorPattern,
  validatorMinLength,
  validatorMaxValue,
} from './validators';

describe('Validators', () => {
  it('validatorRequired debería retornar la configuración correcta', () => {
    const config = validatorRequired();
    expect(config.message).toEqual('Este campo es requerido');
  });

  it('validatorRequired debería permitir un mensaje personalizado', () => {
    const config = validatorRequired('Campo obligatorio');
    expect(config.message).toEqual('Campo obligatorio');
  });

  it('validatorMaxLength debería retornar la configuración correcta', () => {
    const config = validatorMaxLength(10);
    expect(config.message).toEqual('Ha superado el límite de 10 caracteres permitidos.');
  });

  it('validatorMinLength debería retornar la configuración correcta', () => {
    const config = validatorMinLength(10, 'La longitud máxima debe ser 10');
    expect(config.message).toEqual('La longitud máxima debe ser 10');
  });

  it('validatorMaxValue debería retornar la configuración correcta', () => {
    const config = validatorMaxValue(10, 'El valor máximo debe ser 10');
    expect(config.message).toEqual('El valor máximo debe ser 10');
  });

  it('validatorMinValue debería retornar la configuración correcta', () => {
    const config = validatorMinValue(10);
    expect(config.message).toEqual('El valor mínimo debe ser 10');
  });

  it('validatorPattern debería retornar la configuración correcta', () => {
    const config = validatorPattern('\\d+', 'El formato no es correcto');
    expect(config.message).toEqual('El formato no es correcto');
  });

  it('validatorPattern debería permitir un mensaje personalizado', () => {
    const config = validatorPattern('\\d+', 'Solo se permiten números');
    expect(config.message).toBe('Solo se permiten números');
  });
});
