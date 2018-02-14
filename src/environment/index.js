// https://github.com/lorenwest/node-config/wiki/Configuration-Files
process.env.NODE_CONFIG_DIR = __dirname; // tell node-config to look in the current ./environment directory
const config = require('config');

console.log(`\nEnvironment: ${process.env.NODE_ENV}\n`);
console.log(`Environment config:\n ${JSON.stringify(config, null, 4)}\n`);
console.log(`Webpack building...`);

module.exports = {
    config: config,
};