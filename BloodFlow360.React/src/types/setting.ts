export interface Setting {
  id: string;
  settingKey: string;
  settingValue: string;
  description: string;
  isEncrypted: boolean;
}

export interface CreateSetting {
  settingKey: string;
  settingValue: string;
  description: string;
  isEncrypted: boolean;
}

export interface UpdateSetting {
  settingValue: string;
  description: string;
  isEncrypted: boolean;
}
