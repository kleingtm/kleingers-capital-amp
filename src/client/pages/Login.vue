<template>
  <div id="login">
	<img src="../assets/logo.png">
	<h1>{{ msg }}</h1>
	<form @submit.prevent="login">
		<div class='input-container'>
			<div class='input-row'>
				<label>Email:</label>
				<input v-model="email">
			</div>
			<div class='input-row'>
				<label>Password:</label>
				<input v-model="password" type="password">
			</div>
			<button type="submit">Login</button>
			<p v-if="error" class="error">Bad login information</p>
		</div>
	</form>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import LoginService from "./Login.service";
import "../components/input";

export default Vue.extend({
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: false,
      msg: "Welcome to the login page!"
    };
  },
  methods: {
    login: function(e: MouseEvent) {
      LoginService.login({
        email: this.email,
        password: this.password
      })
        .then(response => {
          console.log(`successful response to FE: ${JSON.stringify(response)}`);
        })
        .catch(err => {
          console.log(`login error to FE`);
        });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$input-margin-lr: 15px;

h1,
h2 {
  font-weight: normal;
}
.input-container {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: auto;
}
.input-row {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

input {
  flex: 1;
  margin-left: $input-margin-lr;
  margin-right: calc(2* #{$input-margin-lr});
}
label {
  margin-left: $input-margin-lr;
  text-align: right;
  width: 75px;
  line-height: 42px;
}
button {
  margin: 25px auto;
}
</style>
