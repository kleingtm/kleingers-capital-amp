<template>
  <div id="login">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <button v-on:click="loginHandler">Login</button>
  </div>
</template>

<script>

    import LoginService from './Login.service';

    console.log(JSON.stringify(process.env));

    export default {
        name: 'login',
        data () {
            return {
                msg: 'Welcome to the login page!'
            }
        },
        methods: {
            loginHandler: function (e) {
                console.log('button clicked!');
                LoginService.login({
                    username: 'dwmtest.homeofficeb@gmail.com',
                    password: 'M5tar123'
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
