/** /api/stellar/account/account:id
 * https://horizon-testnet.stellar.org/ **/

import * as express from 'express';
const StellarSdk = require('stellar-sdk');
const StellarServer = new StellarSdk.Server('https://horizon.stellar.org');

const StellarAccountRouter = express.Router({ mergeParams: true });

/** get general account information by public address
 * e.g. curl "https://horizon.stellar.org/accounts/GCSNF6RJBAVWMBSUNL4JYIETGYCOKZ3FWCUNTZDRORGJ4BLU2FE5SGOV/payments?limit=100"
 * http://localhost:3000/api/stellar/account/GCSNF6RJBAVWMBSUNL4JYIETGYCOKZ3FWCUNTZDRORGJ4BLU2FE5SGOV/payments
 * **/
StellarAccountRouter.get('/', (req, res) => {
    StellarServer.loadAccount(req.params.account)
        .then(accountResponse => {
            res.json({
                id: accountResponse.id,
                balances: accountResponse.balances,
                inflation_destination: accountResponse.inflation_destination
            })
        })
        .catch(function (err) {
            console.log(err);
        })
});


/** get transaction information by public address
 * curl "https://horizon.stellar.org/accounts/GCSNF6RJBAVWMBSUNL4JYIETGYCOKZ3FWCUNTZDRORGJ4BLU2FE5SGOV/transactions?limit=100"
 * http://localhost:3000/api/stellar/account/GCSNF6RJBAVWMBSUNL4JYIETGYCOKZ3FWCUNTZDRORGJ4BLU2FE5SGOV/txs
 * **/
StellarAccountRouter.get('/txs', (req, res) => {
    StellarServer.transactions().forAccount(req.params.account).call()
        .then(page => {
            // console.log('Page 1: ');
            // return page.next();
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

/** get payments to and from account by public address
 * e.g. curl "https://horizon.stellar.org/accounts/GCSNF6RJBAVWMBSUNL4JYIETGYCOKZ3FWCUNTZDRORGJ4BLU2FE5SGOV/payments?limit=100"
 * http://localhost:3000/api/stellar/account/GCSNF6RJBAVWMBSUNL4JYIETGYCOKZ3FWCUNTZDRORGJ4BLU2FE5SGOV/payments
 * **/
StellarAccountRouter.get('/payments', (req, res) => {
    StellarServer.payments().limit(req.query.limit || 100).forAccount(req.params.account).call()
        .then(page => {
            res.json({
                records: page.records
            })
        })
        .catch(function (err) {
            console.log(err);
        })
});

export default StellarAccountRouter;