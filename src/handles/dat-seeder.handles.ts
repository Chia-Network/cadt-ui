import { ipcMain } from 'electron';
import ChiaDatSeeder from 'chia-dat-seeder';
import { getChiaRoot } from 'chia-root-resolver';

const chiaRoot = getChiaRoot();
const chiaDatSeeder = new ChiaDatSeeder(chiaRoot);

export async function mountDatSeederHandles() {
  ipcMain.handle('initDatSeeder', async (event) => {
    chiaDatSeeder.start();

    chiaDatSeeder.on('queueLengthChanged', (length) => {
      console.log('queueLengthChanged', length);
      event.sender.send('datFileSync', length);
    });
  });

  ipcMain.handle(
    'setDatSeederAuthCredentials',
    async (_, accessKey: string, secretKey: string) => {
      chiaDatSeeder.setAuthCredentials({
        username: accessKey,
        password: secretKey,
      });
    },
  );

  ipcMain.handle('setDatSeederServer', async (_, serverUrl: string) => {
    chiaDatSeeder.setAuthCredentials(serverUrl);
  });
}
