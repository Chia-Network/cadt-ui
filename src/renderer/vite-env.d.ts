/// <reference types="vite/client" />

/**
 * interface to add the wallet and datalayer ipc API's to the electron
 * Window module.
 */
interface Window {
  walletAPI: any;
  datalayerAPI: DatalayerAPI;
}

export interface SelectFolderDialogResponse {
  folderPath: string;
  folderSizeMb: number;
  fee: number;
  error: Error | null;
  success: boolean;
}

interface SettingToggleProps {
  labelTranslationId: string;
  settingKey: string;
}

interface SettingTextInputProps {
  labelTranslationId: string;
  settingKey: string;
  inputType: string;
}

interface DeploymentSettingPayload {
  settingKey: string;
  value: string | number | boolean | null;
}