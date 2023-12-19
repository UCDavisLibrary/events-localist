import path from 'path';
import fs from 'fs-extra'
import buildConfig from './config.js';
import { fileURLToPath } from 'url';
import corkAppBuild from '@ucd-lib/cork-app-build';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let preview = `${buildConfig.destinationDir}/dev`;
let previewFolder = path.join(__dirname, preview);
if( fs.existsSync(previewFolder) ) {
  fs.removeSync(previewFolder);
}

let config = corkAppBuild.watch({
  root : __dirname,
  entry : buildConfig.entry,
  preview : preview,
  modern : buildConfig.fileName,
  clientModules : buildConfig.clientModules
});

if( !Array.isArray(config) ) config = [config];

export default config;
