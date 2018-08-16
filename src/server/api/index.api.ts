import * as express from 'express';
import { Hello } from './hello.api';
import { Stellar } from './stellar.api';

export function Api (app: express.Application) {
    app.use(require('morgan')('short'));
    Hello(app);
    Stellar(app);
}