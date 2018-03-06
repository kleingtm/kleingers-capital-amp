<template>
  <div id="login">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <form @submit.prevent="login">
      <label><input v-model="username" placeholder="username"></label><br>
      <label><input v-model="password" placeholder="password" type="password"></label><br>
      <button type="submit">Login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>
  </div>
</template>

<script lang='ts'>

    import Vue from 'vue';
    import LoginService from './Login.service';

    console.log(JSON.stringify(process.env));

    export default Vue.extend({
        name: 'login',
        data () {
            return {
                email: '',
                pass: '',
                error: false,
                msg: 'Welcome to the login page!'
            }
        },
        methods: {
            login: function (e:MouseEvent) {
                console.log('button clicked!');
                LoginService.login({
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    console.log('response');
                });
            }
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
