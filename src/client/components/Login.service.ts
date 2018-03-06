'use strict';
import axios, { AxiosResponse, AxiosError } from 'axios';

class LoginService {

    login(params): Promise<void | AxiosResponse<any>> {
        return axios.post(`/login`, {
            email: params.email,
            password: params.password
        })
        .then(this.onSuccess)
        .catch(this.onError);
    }

    private onSuccess(response: AxiosResponse) {
        window.location.href = response.data.redirectUrl; // on successful login, a redirect url will come back. use it to redirect.
        return response;
    }

    private onError(error: AxiosError) {
        if (error.response) {
            console.log(`Login error status: ${error.response.status}, ${error.response.statusText}`);
        } else {
            console.log(error.message);
        }
        throw error;
    }
}

export default (new LoginService());