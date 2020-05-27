<template>
  <div data-app>
    <h2>Iniciar Sesión</h2>
    <v-form>
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

            <v-text-field
              v-model="password"
              :type="'password'"
              label="Contraseña"
              required
              single-line
              solo
            ></v-text-field>


            <v-btn
              class="mr-4"
              v-model = "error"
              @click="loginUser"
              >
              Iniciar Sesión
                <v-dialog v-model="dialog"
                  max-width="500px">
                  <v-card>
                    <v-card-title class="headline">Datos incorrectos</v-card-title>

                    <v-card-text>
                      Intente de nuevo
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        OK
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
      dialog: false,
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
        this.error = "200"
      }
      else{
        this.error = "400";
        response.data = "400";
        this.dialog = true;
      }
      localStorage.uid = response.data["uid"];
      // console.log("holaa")
      // console.log(this.error)

    },

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
