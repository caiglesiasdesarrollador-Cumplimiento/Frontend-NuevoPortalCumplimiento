/**
 * ✅ Utilidades de sanitización y validación de entrada
 * Previene inyección SQL/NoSQL, XSS y manipulación de parámetros
 */

export interface DocumentoValidationResult {
  sanitizado: string;
  valido: boolean;
  error?: string;
}

export interface LongitudDocumento {
  min: number;
  max: number;
}

/**
 * Tipos de documento válidos y sus longitudes permitidas
 */
const LONGITUDES_DOCUMENTO: Record<string, LongitudDocumento> = {
  CC: { min: 8, max: 10 },   // Cédula de Ciudadanía
  CE: { min: 6, max: 12 },   // Cédula de Extranjería
  NIT: { min: 9, max: 11 },  // NIT (con o sin dígito de verificación)
  NT: { min: 9, max: 11 },   // NIT (alternativo)
  NE: { min: 9, max: 11 },   // NIT Extranjero
  PP: { min: 6, max: 12 },  // Pasaporte
  PE: { min: 6, max: 12 },  // Permiso Especial
  PA: { min: 6, max: 12 },  // Permiso Administrativo
  TI: { min: 7, max: 10 },  // Tarjeta de Identidad
  PT: { min: 6, max: 12 },  // Permiso Temporal
};

/**
 * Tipos de documento válidos para personas naturales
 */
export const TIPOS_DOCUMENTO_NATURALES: readonly string[] = [
  'CC', 'CE', 'PP', 'PE', 'PA', 'TI', 'PT'
] as const;

/**
 * Tipos de documento válidos para personas jurídicas
 */
export const TIPOS_DOCUMENTO_JURIDICAS: readonly string[] = [
  'NIT', 'NT', 'NE'
] as const;

/**
 * Sanitiza un número de documento eliminando caracteres peligrosos
 * Solo permite números, letras mayúsculas y guiones
 */
export function sanitizarNumeroDocumento(numero: string): string {
  if (!numero || typeof numero !== 'string') {
    return '';
  }
  
  // Eliminar caracteres peligrosos: solo permitir números, letras y guiones
  return numero.replace(/[^0-9A-Za-z-]/g, '');
}

/**
 * Valida la longitud de un documento según su tipo
 */
export function validarLongitudDocumento(
  tipo: string,
  numero: string
): { valido: boolean; error?: string } {
  const limites = LONGITUDES_DOCUMENTO[tipo];
  
  if (!limites) {
    return {
      valido: false,
      error: `Tipo de documento no reconocido: ${tipo}`
    };
  }
  
  const longitud = numero.length;
  
  if (longitud < limites.min) {
    return {
      valido: false,
      error: `El documento ${tipo} debe tener al menos ${limites.min} caracteres`
    };
  }
  
  if (longitud > limites.max) {
    return {
      valido: false,
      error: `El documento ${tipo} no puede exceder ${limites.max} caracteres`
    };
  }
  
  return { valido: true };
}

/**
 * Valida el formato específico de un NIT
 * Formato esperado: 9 dígitos opcionalmente seguidos de un guion y 1 dígito
 */
export function validarFormatoNIT(numero: string): { valido: boolean; error?: string } {
  // Formato: 9 dígitos, opcionalmente seguidos de guion y 1 dígito de verificación
  const formatoNIT = /^\d{9}(-?\d{1})?$/;
  
  if (!formatoNIT.test(numero)) {
    return {
      valido: false,
      error: 'Formato de NIT inválido. Debe tener 9 dígitos opcionalmente seguidos de guion y 1 dígito de verificación'
    };
  }
  
  return { valido: true };
}

/**
 * Valida y sanitiza un número de documento completo
 */
export function validarYSanitizarDocumento(
  tipo: string,
  numero: string
): DocumentoValidationResult {
  // 1. Sanitizar entrada
  const sanitizado = sanitizarNumeroDocumento(numero);
  
  if (!sanitizado || sanitizado.length === 0) {
    return {
      sanitizado: '',
      valido: false,
      error: 'El número de documento no puede estar vacío'
    };
  }
  
  // 2. Validar longitud máxima general (prevenir DoS)
  if (sanitizado.length > 20) {
    return {
      sanitizado,
      valido: false,
      error: 'El número de documento excede la longitud máxima permitida (20 caracteres)'
    };
  }
  
  // 3. Validar longitud según tipo
  const validacionLongitud = validarLongitudDocumento(tipo, sanitizado);
  if (!validacionLongitud.valido) {
    return {
      sanitizado,
      valido: false,
      error: validacionLongitud.error
    };
  }
  
  // 4. Validar formato específico para NIT
  if ((tipo === 'NIT' || tipo === 'NT' || tipo === 'NE') && !validarFormatoNIT(sanitizado).valido) {
    const validacionFormato = validarFormatoNIT(sanitizado);
    return {
      sanitizado,
      valido: false,
      error: validacionFormato.error
    };
  }
  
  return {
    sanitizado,
    valido: true
  };
}

/**
 * Valida que un tipo de documento esté en la lista de tipos permitidos
 */
export function validarTipoDocumento(
  tipo: string,
  tiposPermitidos: readonly string[]
): { valido: boolean; error?: string } {
  if (!tipo || typeof tipo !== 'string') {
    return {
      valido: false,
      error: 'El tipo de documento es requerido'
    };
  }
  
  const tipoNormalizado = tipo.toUpperCase().trim();
  
  if (!tiposPermitidos.includes(tipoNormalizado)) {
    return {
      valido: false,
      error: `Tipo de documento inválido: ${tipo}. Tipos permitidos: ${tiposPermitidos.join(', ')}`
    };
  }
  
  return { valido: true };
}

/**
 * Sanitiza y valida un valor numérico
 */
export function sanitizarYValidarNumero(
  valor: string,
  min: number,
  max: number
): { valor: number; valido: boolean; error?: string } {
  if (!valor || typeof valor !== 'string') {
    return {
      valor: 0,
      valido: false,
      error: 'El valor numérico es requerido'
    };
  }
  
  // Sanitizar: solo números y punto decimal
  const sanitizado = valor.replace(/[^0-9.]/g, '');
  
  // Validar formato numérico (permite decimales con máximo 2 decimales)
  if (!/^\d+(\.\d{1,2})?$/.test(sanitizado)) {
    return {
      valor: 0,
      valido: false,
      error: 'Formato numérico inválido. Solo se permiten números y máximo 2 decimales'
    };
  }
  
  const numero = parseFloat(sanitizado);
  
  if (isNaN(numero)) {
    return {
      valor: 0,
      valido: false,
      error: 'No se pudo convertir el valor a número'
    };
  }
  
  if (numero < min || numero > max) {
    return {
      valor: numero,
      valido: false,
      error: `El valor debe estar entre ${min} y ${max}`
    };
  }
  
  return {
    valor: numero,
    valido: true
  };
}

/**
 * Sanitiza un string eliminando caracteres peligrosos para prevenir XSS
 */
export function sanitizarString(entrada: string, maxLength: number = 500): string {
  if (!entrada || typeof entrada !== 'string') {
    return '';
  }
  
  // Eliminar caracteres de control y caracteres peligrosos
  let sanitizado = entrada
    .replace(/[\x00-\x1F\x7F]/g, '') // Caracteres de control
    .replace(/[<>]/g, '') // Caracteres HTML peligrosos
    .trim();
  
  // Limitar longitud
  if (sanitizado.length > maxLength) {
    sanitizado = sanitizado.substring(0, maxLength);
  }
  
  return sanitizado;
}
