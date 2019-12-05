<template>
  <div>
    <body class="text-center">
      <form class="form-signin" @submit.prevent="signIn">
        <img
          class="mb-4"
          src="/docs/4.3/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 class="h3 mb-3 font-weight-normal">登入</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          autofocus
          v-model="user.username"
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
        />
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> 記住我
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <router-link class="nav-link" to="/customPage">
          按此略過
        </router-link>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
      </form>
    </body>
  </div>
</template>

<script>
export default {
    data() {
        return{
            user: {
                username: '',
                password: '',
            }

        }
    },
    methods: {
      signIn: function(){
        const api = `${process.env.VUE_APP_API}/admin/signin`;
        this.$http.post(api, this.user).then((response) =>{
          // console.log(response);
          if (response.data.success) {
            this.$router.push('/admin/products');
          }
        })
      }
    },
}
</script>
<style scoped>
    html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
