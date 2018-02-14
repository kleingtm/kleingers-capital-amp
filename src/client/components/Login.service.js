'use strict';
import axios from 'axios';

class Login {
    constructor() {

    }

    login(params) {
        axios.post(`/login`, {
            username: params.username,
            password: params.password

        })
        .then(response => {
            window.location = response.data.redirectUrl; // on successful login, a redirect url will come back. use it to redirect.
        })
        .catch(e => {
            // login error
            throw e;
        })
    }
}

export default (new Login());