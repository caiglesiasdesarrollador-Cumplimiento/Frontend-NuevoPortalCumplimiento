import { Injectable } from '@angular/core';
import { IMulticlavesClave, IMulticlavesResponse } from '../interfaces/comunes.interface';
import { SessionStorageUtil } from '../utils/session-storage.util';

@Injectable({
  providedIn: 'root',
})
export class SessionMulticlavesService {
  private static readonly STORAGE_KEY = 'fakeLoginMulticlaves';

  getMulticlaves(): IMulticlavesResponse | null {
    return SessionStorageUtil.getDecryptedItem<IMulticlavesResponse>(
      SessionMulticlavesService.STORAGE_KEY,
    );
  }

  getClavesActivas(): IMulticlavesClave[] {
    const multiclaves = this.getMulticlaves();
    if (!multiclaves?.claves?.length) {
      return [];
    }

    return multiclaves.claves.filter(clave => clave.marcaClaveActiva === 'S');
  }

  getClaveDisplay(clave: IMulticlavesClave): string {
    if (!clave) return '';
    if (clave.nombreRazonSocial) {
      return `${clave.clave} - ${clave.nombreRazonSocial}`;
    }
    if (clave.descripcionCentroCostos) {
      return `${clave.clave} - ${clave.descripcionCentroCostos}`;
    }
    return clave.clave;
  }
}
