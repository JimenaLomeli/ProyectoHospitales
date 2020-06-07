<template>
  <div>
    <h2>Crea una nueva cuenta</h2>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="30"
            md="10"
          >
            <v-text-field
              v-model="name"
              label="Nombre"
              color="white"
              required
              single-line
              solo
            ></v-text-field>
          </v-col>

          <v-col
            cols="30"
            md="10"
          >
            <v-text-field
              v-model="email"
              label="E-mail"
              required
              single-line
              solo
            ></v-text-field>
          </v-col>

          <v-col
            cols="30"
            md="10"
          >
            <v-text-field
              v-model="password"
              :type="'password'"
              label="Contraseña"
              required
              single-line
              solo
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          class="mr-4"
          @click="registerUser"
          >
          Registrar
        </v-btn>
      </v-container>
    </v-form>
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
      }).then(resp => {
        console.log(resp);
        if(resp.data.statusCode == 200){
          this.$router.push("/usermain/calendario")
          localStorage.uid = resp.data["uid"];
        }else {
          alert(resp.data.message.message)
        }
      })
      .catch(err => {
        alert(err);
      })
    
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  color: white;
  align-self: center;
  margin: 10px;
}
</style>
