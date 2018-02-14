var pjson = require('./package.json');

module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [
        {
            name      : pjson.name,
            //interpreter: 'ts-node',
            script    : 'src/server/index.server.ts',
            // cwd: './',
            watch: ['./src/server', './src/environment'],
            ignore_watch: ['[\/\\]\./', 'node_modules', 'src/client'],
            args: ['--color'],
            node_args: ['--inspect'],

            // instances : 'max',
            //exec_mode : 'cluster',
            env: {
                COMMON_VARIABLE: 'COMMON VARIABLE'
            },
            env_development: {
                NODE_ENV: 'development'
            }
        }
    ]
};