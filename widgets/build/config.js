/**
 * @description Shared config values for dist and dev builds
 */
const config = {
  fileName: 'ucdlib-events-widgets.js',
  entry: '../src/index.js',
  destinationDir: '../js',
  clientModules: [
    '../node_modules',
  ]
};

export default config;
