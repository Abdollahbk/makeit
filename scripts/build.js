import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const rootDir = process.cwd();
const landingDir = path.join(rootDir, 'apps/landing');
const builderDir = path.join(rootDir, 'apps/builder');
const finalDist = path.join(landingDir, 'dist');

async function build() {
  try {
    console.log('Building Landing App...');
    execSync('npm run build --workspace=apps/landing', { stdio: 'inherit' });

    console.log('Building Builder App...');
    execSync('npm run build --workspace=apps/builder', { stdio: 'inherit' });

    console.log('Merging builds...');
    const builderDist = path.join(builderDir, 'dist');
    const targetBuilderDir = path.join(finalDist, 'builder');

    if (fs.existsSync(targetBuilderDir)) {
      await fs.remove(targetBuilderDir);
    }
    
    await fs.copy(builderDist, targetBuilderDir);

    console.log('Build completed! Final output in apps/landing/dist');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
