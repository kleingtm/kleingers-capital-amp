<template>
 <input v-bind:value="value" v-on:input="updateValue($event.target.value);" 
        :type='type' :placeholder='placeholder'>
</template>

<script lang='ts'>
import Vue from 'vue';
import VueCustomElement from 'vue-custom-element'
Vue.use(VueCustomElement); // use vue custom elements

const element = {
  props: [
    'value',
    'placeholder',
    'type'
  ],
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value);
    }
  }
}
Vue.customElement('input-element', element); // register element
export default element; // export element as normal Vue component (for use in vue projects)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>