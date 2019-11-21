<template>
  <div class="home">
    <a href="#" @click="signOut">登出</a>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    signOut: function(){
        const api = `${process.env.VUE_APP_API}/logout`;
        this.$http.post(api).then((response) =>{
          if (response.data.success) {
            this.$router.push('/login');
          }
        })
      }
  },
}
</script>
