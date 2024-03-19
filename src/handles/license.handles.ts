import { ipcMain } from 'electron';
import superagent from 'superagent';
import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { v4 as uuidv4 } from 'uuid';

function getOrCreateAppInstanceId() {
  const userDataPath = app.getPath('userData');
  const instanceIdFilePath = path.join(userDataPath, 'instance-id.txt');

  try {
    // Try to read the existing instance ID from the file
    const instanceId = fs.readFileSync(instanceIdFilePath, 'utf8');
    if (instanceId) {
      console.log('Existing instance ID found:', instanceId);
      return instanceId;
    }
  } catch (error) {
    // File not found or unreadable, we'll create a new instance ID
    console.log('No existing instance ID found, generating a new one.');
  }

  // Generate a new instance ID
  const newInstanceId = uuidv4();
  console.log('New instance ID generated:', newInstanceId);

  // Write the new instance ID to the file
  fs.writeFileSync(instanceIdFilePath, newInstanceId, 'utf8');
  return newInstanceId;
}

export async function mountLicenseHandles() {
  ipcMain.handle('isLicenseValid', async (_, { accessKey, accessSecret }) => {
    try {
      const appId = getOrCreateAppInstanceId();

      const response = await superagent
        .get('https://api.datalayer.storage/user/v1/license')
        .auth(accessKey, accessSecret)
        .query({ appId });
        
      // Check if the subscriptions array has at least one entry
      const isValid =
        response.body.subscriptions && response.body.subscriptions.length > 0;

      return { valid: isValid, error: null, success: true };
    } catch (error: any) {
      console.error('Error checking license validity:', error);
      console.log(accessKey, accessSecret);
      // Return error information if the request fails
      return { valid: false, error: error.message, success: false };
    }
  });
}
