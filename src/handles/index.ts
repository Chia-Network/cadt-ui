// Each Electron Side API module should have its own handlers file. 
// This is the entry point for all handlers files.

import { mountDatalayerRpcHandles } from './datalayer.handles.js';
import { mountWalletRpcHandles } from './wallet.handles.js';
import { mountOsHandles } from './os.handles.js';
import { mountDatSeederHandles } from './dat-seeder.handles.js';
import { mountFsDeployHandles } from './chia-datalayer-fs-deploy.handles.js';
import { mountLicenseHandles } from './license.handles.js';

export const mountHandles = () => {
  mountDatalayerRpcHandles();
  mountWalletRpcHandles();
  mountOsHandles();
  mountDatSeederHandles();
  mountFsDeployHandles();
  mountLicenseHandles();
}
