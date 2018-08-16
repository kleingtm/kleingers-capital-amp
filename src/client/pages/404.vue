<template>
    <div class="404">
        <h1>{{ errorMsg }}</h1>
        <img src="../assets/lego404.png">
    </div>
</template>

<script lang='ts'>
    export default {
        name: 'four-o-four',
        data () {
            return {
                errorMsg: `Oops! We can't find the page you're looking for.`
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
