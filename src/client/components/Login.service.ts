'use strict';
import axios, { AxiosResponse, AxiosError } from 'axios';

class LoginService {

    login(params): Promise<AxiosResponse<any> | AxiosError> {
        return axios.post(`/login`, {
            username: params.username,
            password: params.password
        })
        .then(this.onSuccess)
        .catch(this.onError);
    }

    private onSuccess (response: AxiosResponse) {
        window.location.href = response.data.redirectUrl; // on successful login, a redirect url will come back. use it to redirect.
        return response;
    }

    private onError (error: AxiosError) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else {
            console.log(error.message);
          }
          return error;
    }
}

export default (new LoginService());