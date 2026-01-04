// Settings container interfaces
export interface ISystemSettings {
  theme: string;
  language: string;
  notifications: boolean;
  autoBackup: boolean;
  reportFrequency: string;
  dataRetention: number;
  debugMode: boolean;
}

export interface IUserPreferences {
  defaultCurrency: string;
  timeZone: string;
  dateFormat: string;
  emailNotifications: boolean;
}

export interface ISecuritySettings {
  sessionTimeout: number;
  twoFactorAuth: boolean;
  passwordExpiration: number;
  loginAttempts: number;
}

export interface ISettingsFormData extends ISystemSettings, IUserPreferences, ISecuritySettings {}
