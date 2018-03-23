/* https://horizon-testnet.stellar.org/ */

import * as express from 'express';
import StellarAccountRouter from './stellar.account.api';
const StellarSdk = require('stellar-sdk');
const StellarServer = new StellarSdk.Server('https://horizon.stellar.org');

export function Stellar(app) {

    const StellarRouter = express.Router({mergeParams: true});

    // get asset information by public address
    // get accounts
    StellarRouter.get('/assets/:account', (req, res) => {
        StellarServer.transactions().forAccount(req.params.account).call()
        .then(page => {
            console.log('Page 1: ');
            console.log(page.records);
            // return page.next();
            console.log(`page: ${JSON.stringify(page)}`)
            res.json({
                records: page.records //
            })
        })
        .catch(function (err) {
            console.log(err);
        })
    });

    StellarRouter.use('/account/:account', StellarAccountRouter); // attach stellar account router to stellar router
    app.use('/api/stellar', StellarRouter); // attach stellar router to main router
}