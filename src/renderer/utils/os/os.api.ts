import { SelectFolderDialogResponse } from '@/vite-env';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export interface DeployStoreParams {
  storeId: string,
  deployDir: string,
  deployMode: string,
  blockChainFee: string,
  options: any
}

export function selectFolderDialogue(): Promise<SelectFolderDialogResponse> {
  return ipcRenderer.invoke('selectFolderDialog');
}

export function deployStore({storeId, deployDir, deployMode = 'replace', blockChainFee, options = {}} :DeployStoreParams){
  return ipcRenderer.invoke(
    'deployStore',
    storeId,
    deployDir,
    deployMode,
    blockChainFee,
    options,
  );
}
