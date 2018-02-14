import { Hello } from './hello.api';

export function Api (app) {

    // pull in routes categorized by file:
    Hello(app)
}