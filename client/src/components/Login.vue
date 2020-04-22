<template>
  <div>
    <h2>Iniciar Sesión</h2>
    <v-form v-model="valid">
      <v-container>
        <v-row>
        </v-row>
            <v-text-field
              v-model="email"
              label="E-mail"
              required
              single-line
              solo
            ></v-text-field>
        </v-row>
            <v-text-field
              v-model="password"
              :type="'password'"
              label="Contraseña"
              required
              single-line
              solo
            ></v-text-field>
          </v-col>

        <v-btn
          class="mr-4"
          @click="loginUser"
          >
          Iniciar Sesión
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
      error: null
    }
  },
  methods: {
    async loginUser (){
       const response = await AuthenticationService.login({
        email: this.email,
        password: this.password
      })
      if (response.data["statusCode"] == 200) {
        this.$router.push("/usermain")
      }
      localStorage.uid = response.data["uid"];
      console.log(response.data)

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
.v-form {
	width: 50%;
  margin:auto;
}
.v-col{
  text-align: center;
}

.v-btn {
  text-align: center;
}

</style>
