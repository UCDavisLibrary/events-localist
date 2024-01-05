import path from 'path';
import fs from 'fs-extra'
import buildConfig from './config.js';
import { fileURLToPath } from 'url';
import corkAppBuild from '@ucd-lib/cork-app-build';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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

config.forEach(conf => {

  // make stylesheet
  if( !Array.isArray(conf.entry) ) conf.entry = [conf.entry];
  conf.entry.push(path.join(__dirname, '../scss/style.scss'));
  conf.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      { loader: MiniCssExtractPlugin.loader},
      buildConfig.loaderOptions.css,
      buildConfig.loaderOptions.scss,
    ]
  });

  conf.plugins = [
    new MiniCssExtractPlugin({
      filename: `../../css/${buildConfig.cssFileName}`
    })
  ];
});

export default config;
