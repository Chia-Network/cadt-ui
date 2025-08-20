import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the application version based on git tag or package.json + commit SHA
 * @returns {string} The application version
 */
export function getAppVersion() {
  try {
    // First, try to get the current git tag
    try {
      const gitTag = execSync('git describe --exact-match --tags HEAD', { 
        encoding: 'utf8',
        stdio: 'pipe'
      }).trim();
      
      if (gitTag) {
        return gitTag;
      }
    } catch (error) {
      // Not on a tagged commit, continue to package.json + commit SHA
    }

    // Fall back to package.json version + commit SHA
    const packageJsonPath = join(__dirname, '../package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    const packageVersion = packageJson.version;

    // Get the current commit SHA (short version)
    const commitSha = execSync('git rev-parse --short HEAD', { 
      encoding: 'utf8',
      stdio: 'pipe'
    }).trim();

    return `${packageVersion}-${commitSha}`;
  } catch (error) {
    console.warn('Failed to determine app version:', error.message);
    
    // Last resort: just return package.json version
    try {
      const packageJsonPath = join(__dirname, '../package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      return packageJson.version;
    } catch (fallbackError) {
      console.error('Failed to read package.json:', fallbackError.message);
      return 'unknown';
    }
  }
}