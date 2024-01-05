import path from 'path';
import fs from 'fs-extra'
import buildConfig from './config.js';
import { fileURLToPath } from 'url';
import corkAppBuild from '@ucd-lib/cork-app-build';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
