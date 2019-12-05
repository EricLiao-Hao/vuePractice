<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">文具店</a>
          <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
              <a class="nav-link " href="#" @click.prevent="signOut" v-if="status.success">登入中，按此登出</a>
              <a class="nav-link " href="#" @click.prevent="signInt" v-else>尚未登入，按此登入</a>
            </li>
          </ul>
        </nav>
        
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return{
      status: '',
      route:''
    }
  },
  methods: {
    signOut: function(){
        const api = `${process.env.VUE_APP_API}/logout`;
        this.$http.post(api).then((response) =>{
          if (this.$route.path !== '/customPage') {
            this.$router.push('/login');
          } else {
            this.logStatus();
          }
        })
    },
    signInt(){
      const api = `${process.env.VUE_APP_API}/logout`;
        this.$http.post(api).then((response) =>{
          this.$router.push('/login');         
        })
    },
    logStatus() {
      const api = `${process.env.VUE_APP_API}/api/user/check`
      this.$http.post(api).then((response) => {
        // console.log(response.data);
        this.status=response.data;
        console.log(this.$route.path);
      })
    },
  },
  created() {
    this.logStatus();
  },
}
</script>

<style scoped>
.text{
  color:coral;
}
</style>