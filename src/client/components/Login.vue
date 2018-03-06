<template>
  <div id="login">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="email"></label><br>
      <label><input v-model="password" placeholder="password" type="password"></label><br>
      <button type="submit">Login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>
  </div>
</template>

<script lang='ts'>

    import Vue from 'vue';
    import LoginService from './Login.service';

    export default Vue.extend({
        name: 'login',
        data () {
            return {
                email: '',
                password: '',
                error: false,
                msg: 'Welcome to the login page!'
            }
        },
        methods: {
            login: function (e:MouseEvent) {
                LoginService.login({
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    console.log(`successful response to FE: ${JSON.stringify(response)}`);
                })
                .catch(err => {
                    console.log(`login error to FE`)
                })
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
