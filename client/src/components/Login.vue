<template>
  <div>
    <h1>Login</h1>
    <input type = "email"
    name = "email"
    v-model="email"
    placeholder="email"/>
    <br>

    <input type = "password"
    name = "password"
    v-model="password"
    placeholder="password"/>
    <br>
    <br>
    <button @click="login">Login</button>
  </div>
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login (){
       const response = await AuthenticationService.login({
        email: this.email,
        password: this.password
      })
      
      console.log(response.data)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
