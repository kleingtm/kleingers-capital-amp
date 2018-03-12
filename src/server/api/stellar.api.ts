/* https://horizon-testnet.stellar.org/ */

import * as express from 'express';
const StellarSdk = require('stellar-sdk');
const StellarServer = new StellarSdk.Server('https://horizon.stellar.org');

export function Stellar(app) {

    const stellarRouter = express.Router({mergeParams: true});

    // get account information by public address
    stellarRouter.get('/account/:account', (req, res) => {
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
        // .then(page => {
        //     console.log('Page 2: ');
        //     console.log(page.records);
        // })
        .catch(function (err) {
            console.log(err);
        })
    });

    // get asset information by public address
    // get accounts
    stellarRouter.get('/assets/:account', (req, res) => {
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

    app.use('/api/stellar', stellarRouter);
}