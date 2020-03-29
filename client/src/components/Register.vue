<template>
  <div>
    <h1>Register</h1>
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

    <input type = "name"
    name = "name"
    v-model="name"
    placeholder="name"/>
    <br>
    <button @click="registerUser">Register</button>
  </div>
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      name: ''
    }
  },
  methods: {
    async registerUser (){
      const response = await AuthenticationService.register({
        email: this.email,
        name: this.name,
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
