/**
 * ✅ RF-009 Regla 9.6: Servicio para almacenamiento de archivos en S3 y FileNet
 *
 * Nomenclatura S3:
 * IdMongo_Seccion_Producto_TipoDocTomador_NroDocTomador_TipoArchivo_Fecha_Estado.Formato
 *
 * Nomenclatura FileNet:
 * Seccion_Producto_NumeroPoliza_TipoDocTomador_NroDocTomador_TipoArchivo
 */

import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http'; // Reservado para uso futuro
import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators'; // Reservado para uso futuro
// import { environment } from '../../../environments/environment'; // Reservado para uso futuro
import { LoggerService } from './logger.service';
import {
  IFileStorageMetadata,
  IFileStorageResult,
  // TipoArchivo, // Reservado para uso futuro
  // EstadoArchivo, // Reservado para uso futuro
} from '../../containers/contract-reader/contract-reader.interface';

@Injectable({
  providedIn: 'root',
})
export class FileStorageService {
  // private readonly baseUrl: string; // Reservado para uso futuro

  constructor(private readonly logger: LoggerService) {
    // private readonly http: HttpClient, // Reservado para uso futuro
    // TODO: Configurar URL del servicio de almacenamiento según ambiente cuando se implemente HTTP real
    // this.baseUrl = environment.apiUrl || '';
  }

  /**
   * ✅ RF-009 Regla 9.6: Generar nombre de archivo para S3
   * Formato: IdMongo_Seccion_Producto_TipoDocTomador_NroDocTomador_TipoArchivo_Fecha_Estado.Formato
   *
   * @param metadata Metadatos del archivo
   * @returns Nombre de archivo formateado para S3
   */
  generarNombreS3(metadata: IFileStorageMetadata): string {
    const partes = [
      metadata.idMongo,
      metadata.seccion,
      metadata.producto,
      metadata.tipoDocTomador,
      metadata.nroDocTomador,
      metadata.tipoArchivo,
      metadata.fecha,
      metadata.estado,
    ];

    const nombreSinExtension = partes.join('_');
    const extension = metadata.formato.toLowerCase();

    return `${nombreSinExtension}.${extension}`;
  }

  /**
   * ✅ RF-009 Regla 9.6: Generar nombre de archivo para FileNet
   * Formato: Seccion_Producto_NumeroPoliza_TipoDocTomador_NroDocTomador_TipoArchivo
   *
   * @param metadata Metadatos del archivo
   * @returns Nombre de archivo formateado para FileNet
   */
  generarNombreFileNet(metadata: IFileStorageMetadata): string {
    if (!metadata.numeroPoliza) {
      throw new Error('El número de póliza es requerido para FileNet');
    }

    const partes = [
      metadata.seccion,
      metadata.producto,
      metadata.numeroPoliza,
      metadata.tipoDocTomador,
      metadata.nroDocTomador,
      metadata.tipoArchivo,
    ];

    return partes.join('_');
  }

  /**
   * ✅ RF-009 Regla 9.6: Subir archivo a S3
   *
   * @param file Archivo a subir
   * @param metadata Metadatos del archivo
   * @returns Observable con resultado del almacenamiento
   */
  subirAS3(file: File, metadata: IFileStorageMetadata): Observable<IFileStorageResult> {
    const nombreArchivo = this.generarNombreS3(metadata);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', nombreArchivo);
    formData.append('metadata', JSON.stringify(metadata));

    // const headers = new HttpHeaders(); // Reservado para uso futuro

    // TODO: Conectar con servicio real de S3 cuando esté disponible
    // return this.http.post<IFileStorageResult>(`${this.baseUrl}/storage/s3/upload`, formData, { headers })
    //   .pipe(
    //     map(response => ({
    //       ...response,
    //       s3Key: nombreArchivo,
    //     })),
    //     catchError(error => this.handleError(error, 'S3'))
    //   );

    // Mock para desarrollo
    this.logger.debug('Subiendo a S3', {
      nombreArchivo,
      metadata,
      tamaño: file.size,
    });

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          s3Key: nombreArchivo,
          s3Url: `https://s3.amazonaws.com/bucket/${nombreArchivo}`,
          success: true,
        });
        observer.complete();
      }, 1000);
    });
  }

  /**
   * ✅ RF-009 Regla 9.6: Mover archivo de S3 a FileNet
   *
   * @param s3Key Clave del archivo en S3
   * @param metadata Metadatos actualizados (debe incluir numeroPoliza)
   * @returns Observable con resultado del movimiento
   */
  moverS3AFileNet(s3Key: string, metadata: IFileStorageMetadata): Observable<IFileStorageResult> {
    if (!metadata.numeroPoliza) {
      return throwError(() => new Error('El número de póliza es requerido para mover a FileNet'));
    }

    const nombreFileNet = this.generarNombreFileNet(metadata);

    // const request = { // Reservado para uso futuro
    //   s3Key,
    //   fileNetName: nombreFileNet,
    //   metadata,
    // };

    // TODO: Conectar con servicio real cuando esté disponible
    // return this.http.post<IFileStorageResult>(`${this.baseUrl}/storage/filenet/move`, request)
    //   .pipe(
    //     map(response => ({
    //       ...response,
    //       fileNetId: nombreFileNet,
    //     })),
    //     catchError(error => this.handleError(error, 'FileNet'))
    //   );

    // Mock para desarrollo
    this.logger.debug('Moviendo a FileNet', {
      s3Key,
      nombreFileNet,
      metadata,
    });

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          s3Key,
          fileNetId: nombreFileNet,
          fileNetUrl: `https://filenet.example.com/${nombreFileNet}`,
          success: true,
        });
        observer.complete();
      }, 1500);
    });
  }

  /**
   * ✅ RF-009 Regla 9.6: Obtener URL de descarga desde S3
   *
   * @param s3Key Clave del archivo en S3
   * @returns Observable con URL de descarga
   */
  obtenerUrlDescargaS3(s3Key: string): Observable<string> {
    // TODO: Conectar con servicio real cuando esté disponible
    // return this.http.get<{ url: string }>(`${this.baseUrl}/storage/s3/download/${s3Key}`)
    //   .pipe(
    //     map(response => response.url),
    //     catchError(error => this.handleError(error, 'S3'))
    //   );

    // Mock para desarrollo
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(`https://s3.amazonaws.com/bucket/${s3Key}`);
        observer.complete();
      }, 500);
    });
  }

  /**
   * ✅ RF-008 Regla 8.2, RF-009 Regla 9.6: Validar formato de archivo según políticas FileNet
   *
   * @param file Archivo a validar
   * @returns true si el formato es válido
   */
  validarFormatoArchivo(file: File): boolean {
    const extensionesValidas = ['.pdf', '.docx', '.xlsx']; // ✅ RF-008 Regla 8.2: PDF, DOCX, XLSX
    const tiposValidos = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
    ];

    const nombreArchivo = file.name.toLowerCase();
    const tieneExtensionValida = extensionesValidas.some(ext => nombreArchivo.endsWith(ext));
    const tieneTipoValido = tiposValidos.includes(file.type);

    return tieneExtensionValida && tieneTipoValido;
  }

  /**
   * ✅ RF-008 Regla 8.2, RF-009 Regla 9.6: Obtener formato del archivo según políticas FileNet
   *
   * @param file Archivo
   * @returns Formato en mayúsculas (PDF, DOCX, XLSX)
   */
  obtenerFormatoArchivo(file: File): string {
    const nombreArchivo = file.name.toLowerCase();

    if (nombreArchivo.endsWith('.pdf')) return 'PDF';
    if (nombreArchivo.endsWith('.docx')) return 'DOCX';
    if (nombreArchivo.endsWith('.xlsx')) return 'XLSX';

    throw new Error(
      'Formato de archivo no soportado. Las extensiones soportadas son: *.DOCX, XLSX y *.PDF',
    );
  }

}
