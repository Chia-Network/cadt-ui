import { ipcMain, dialog } from 'electron';
import { SelectFolderDialogResponse } from '@/vite-env';
import {calcFolderSize} from "../utils/calc-folder-size.js";
import {calcSizeBasedDeployFee} from "../utils/fees.js";

export async function mountOsHandles() {
  ipcMain.handle(
    'selectFolderDialog',
    async (): Promise<SelectFolderDialogResponse> => {
      try {
        const result = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });
        const selectedFilePath: string = result.filePaths[0];
        console.log('Selected folder path:', selectedFilePath);
        const selectedFolderSize = await calcFolderSize(selectedFilePath);
        const fee = calcSizeBasedDeployFee(selectedFolderSize);

        return {
          folderPath: selectedFilePath,
          folderSizeMb: selectedFolderSize,
          fee,
          error: null,
          success: true };
      } catch (error: any) {
        return {
          folderPath: '',
          folderSizeMb: 0,
          fee: 0,
          error,
          success: false };
      }
    },
  );
}
