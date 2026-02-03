import { Injectable } from '@angular/core';

/**
 * ✅ RF-005: Tipos de persona según tipo de documento
 */
export type TipoPersona = 'natural' | 'juridica';

/**
 * ✅ RF-005: Servicio para validaciones de producto vs tipo de cliente
 * Maneja validaciones de producto seleccionado vs tipo de entidad y combinación de clientes
 */
@Injectable({
  providedIn: 'root',
})
export class ProductoValidacionService {
  /**
   * ✅ RF-005 Regla 5.3: Determinar si un tipo de documento corresponde a entidad jurídica pública
   * @param tipoDocumento Tipo de documento
   * @param numeroDocumento Número de documento
   * @returns true si es entidad jurídica pública
   */
  esEntidadJuridicaPublica(tipoDocumento: string, numeroDocumento: string): boolean {
    // TODO: Conectar con servicio real para validar si es entidad jurídica pública
    // Por ahora, en el mock, los NITs que empiezan con 8 son entidades públicas
    if (tipoDocumento === 'NIT' || tipoDocumento === 'NT') {
      return numeroDocumento.startsWith('8');
    }
    return false;
  }

  /**
   * ✅ RF-005 Regla 5.3: Validar si producto corresponde al tipo de entidad
   * @param productoId ID del producto seleccionado
   * @param esEntidadPublica true si el tomador es entidad jurídica pública
   * @returns true si el producto es válido para el tipo de entidad
   */
  validarProductoVsTipoEntidad(productoId: string, esEntidadPublica: boolean): boolean {
    // Producto 455 es para entidades oficiales
    const PRODUCTO_ENTIDADES_OFICIALES = '455';
    const PRODUCTO_CUMPLIMIENTO_ENTIDADES_OFICIALES = '455 - Cumplimiento Entidades Oficiales';

    if (esEntidadPublica) {
      // Si es entidad pública, debe ser producto 455
      return (
        productoId === PRODUCTO_ENTIDADES_OFICIALES ||
        productoId.includes(PRODUCTO_ENTIDADES_OFICIALES) ||
        productoId === PRODUCTO_CUMPLIMIENTO_ENTIDADES_OFICIALES
      );
    }

    // Si no es entidad pública, cualquier producto es válido (excepto 455 si se requiere exclusividad)
    return true;
  }

  /**
   * ✅ RF-005 Regla 5.4: Determinar tipo de persona según tipo de documento
   * @param tipoDocumento Tipo de documento
   * @returns Tipo de persona (natural o jurídica)
   */
  obtenerTipoPersona(tipoDocumento: string): TipoPersona {
    // Documentos de personas naturales
    const documentosNaturales = ['CC', 'CE', 'PP', 'PT', 'TI', 'PA'];

    // Documentos de personas jurídicas
    const documentosJuridicos = ['NIT', 'NT', 'NE'];

    if (documentosNaturales.includes(tipoDocumento)) {
      return 'natural';
    }

    if (documentosJuridicos.includes(tipoDocumento)) {
      return 'juridica';
    }

    // Por defecto, asumir natural si no se reconoce
    return 'natural';
  }

  /**
   * ✅ RF-005 Regla 5.4: Validar combinación de clientes para productos 450 y 455
   * @param productoId ID del producto seleccionado
   * @param tipoDocumentoTomador Tipo de documento del tomador
   * @param tipoDocumentoAsegurado Tipo de documento del asegurado
   * @returns true si la combinación es válida
   */
  validarCombinacionClientes(
    productoId: string,
    tipoDocumentoTomador: string,
    tipoDocumentoAsegurado: string,
  ): boolean {
    // Productos que requieren validación especial
    const PRODUCTOS_VALIDACION_COMBINACION = ['450', '455'];

    // Verificar si el producto requiere validación
    const requiereValidacion = PRODUCTOS_VALIDACION_COMBINACION.some(prod =>
      productoId.includes(prod),
    );

    if (!requiereValidacion) {
      // Si no requiere validación, cualquier combinación es válida
      return true;
    }

    // Para productos 450 y 455: al menos uno debe ser jurídica
    const tipoTomador = this.obtenerTipoPersona(tipoDocumentoTomador);
    const tipoAsegurado = this.obtenerTipoPersona(tipoDocumentoAsegurado);

    // Si ambos son naturales, la combinación no es válida
    if (tipoTomador === 'natural' && tipoAsegurado === 'natural') {
      return false;
    }

    // Si al menos uno es jurídica, la combinación es válida
    return true;
  }
}
