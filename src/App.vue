<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created(){
    // console.log(process.env.VUE_APP_API)
  }
}
</script>
<style lang="scss">
@import "./assets/all.scss"

</style>
