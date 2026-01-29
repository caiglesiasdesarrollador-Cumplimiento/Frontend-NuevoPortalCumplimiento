/**
 * Utilidades para almacenar valores cifrados en sessionStorage.
 */
const encode = (value: string): string =>
  typeof window === 'undefined' ? value : btoa(unescape(encodeURIComponent(value)));

const decode = (value: string): string =>
  typeof window === 'undefined' ? value : decodeURIComponent(escape(atob(value)));

export const SessionStorageUtil = {
  setEncryptedItem(key: string, data: unknown): void {
    const json = JSON.stringify(data);
    sessionStorage.setItem(key, encode(json));
  },

  getDecryptedItem<T>(key: string): T | null {
    const raw = sessionStorage.getItem(key);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(decode(raw)) as T;
    } catch {
      console.warn(`No se pudo decodificar la clave ${key}`);
      return null;
    }
  },

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  },
};
