import '../environment';
import * as express from 'express';
import * as webpack from 'webpack';
import * as history from 'connect-history-api-fallback';
import * as config from 'config';
import Session from './session/index.session'; // node-config
import * as WebpackDevMiddleware from 'webpack-dev-middleware';
import * as WebpackConfig from '../../webpack.config.js';
import { Api } from './api/index.api';
import DB from '../db/index.db';

DB.connect() // connect to the database
    .then(() => {

        const app = express();// instantiate app
        new Session({ // initialize authorization middleware / passport -- public routes not locked down should go above this
            app: app,
            db: DB
        });

        Api(app); // api routes -- must be registered before history mode & webpack dev middleware
        app.use(history()); // allow rendering of vue non-hash (history mode) urls

        // serving up the client app comes last per express route-order convention
        if (process.env.NODE_ENV === 'development') {
            const webpackMiddelwareInstance = WebpackDevMiddleware(webpack(WebpackConfig), {
                stats: {
                    colors: true
                }
            });
            // webpackMiddelwareInstance.waitUntilValid(function(){
            //     //require('./splash.js');
            // });
            app.use(webpackMiddelwareInstance);
        }

        // launch express app
        app.listen(config.get('app.port'), () => {
            console.log(`Node listening on ${config.get('app.host')}:${config.get('app.port')}`);
            console.log(`Webpack building...`);
        });
    });