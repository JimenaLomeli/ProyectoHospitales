<template>
<div >
    <v-app-bar height = "50%" color = "#sfd188" dense>
        <v-spacer></v-spacer>
        <v-btn text large to="/usermain/examenes">Ver resultados</v-btn>
        <v-btn text large to="/usermain/hospitales">Directorio de Hospitales</v-btn>
        <v-btn text large >Directorio de Doctores</v-btn>
        <v-btn text large >Guardados</v-btn>
        <v-btn text large >Mi cuenta</v-btn>
        <v-btn  @click="logoutUser" outlined>Cerrar Sesión</v-btn>
    </v-app-bar>
    <router-view></router-view>
</div>
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'

export default {
  methods: {
    async logoutUser (){
      this.$router.push("/")
       const response = await AuthenticationService.logout()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  color: white;
  margin-top: 25px;
}

.v-app-bar {
    height: 105%;
 }

.v-btn {
  color: none;
}

</style>
