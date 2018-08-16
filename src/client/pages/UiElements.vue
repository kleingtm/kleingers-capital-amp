<template>
  <div class="ui-elements-page">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'ui-elements',
  data () {
    return {
      msg: 'Welcome to the UI Elements page!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
