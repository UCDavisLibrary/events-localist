import path from 'path';
import fs from 'fs-extra'
import buildConfig from './config.js';
import { fileURLToPath } from 'url';
import corkAppBuild from '@ucd-lib/cork-app-build';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let dist = `${buildConfig.destinationDir}/dist`;
let distFolder = path.join(__dirname, dist);
if( fs.existsSync(distFolder) ) {
  fs.removeSync(distFolder);
}

let config = corkAppBuild.dist({
  root : __dirname,
  entry : buildConfig.entry,
  dist: distFolder,
  modern : buildConfig.fileName,
  ie: `${buildConfig.fileName.split(".")[0]}-ie.js`,
  clientModules : buildConfig.clientModules
});


if( !Array.isArray(config) ) config = [config];

export default config;
