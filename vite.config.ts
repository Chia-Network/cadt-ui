import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { getAppVersion } from './src/version.js';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Vite plugin to generate version.json during build
function generateVersionPlugin() {
  return {
    name: 'generate-version',
    writeBundle() {
      const version = getAppVersion();
      const versionData = {
        version,
        buildTime: new Date().toISOString(),
        gitCommit: (() => {
          try {
            return execSync('git rev-parse HEAD', { encoding: 'utf8', stdio: 'pipe' }).trim();
          } catch {
            return null;
          }
        })()
      };

      const versionFilePath = path.resolve(__dirname, 'build/version.json');
      writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2));
      console.log(`Generated version file with version: ${version}`);
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), generateVersionPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/renderer'),
    },
  },
  build: {
    // Specify the directory to output the build files
    outDir: path.resolve(__dirname, 'build/renderer'),
  },
  server: {
    port: 5173,
    headers: {
      'x-app-version': getAppVersion(),
    },
  },
});
