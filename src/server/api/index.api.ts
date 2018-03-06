import * as express from 'express';
import { Hello } from './hello.api';

export function Api (app: express.Application) {
    // pull in routes categorized by file:
    Hello(app);
}