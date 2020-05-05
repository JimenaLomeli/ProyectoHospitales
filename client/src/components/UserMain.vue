<template>
<div id="app" >
    <v-app-bar class="topnav" color = "#sfd188" dense>
        <v-btn class="button1" text large to="/usermain/calendario">Calendario
          <v-icon dark right>mdi-calendar-month</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="button1" text large to="/usermain/examenes">Ver resultados
            <v-icon dark right>mdi-animation-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="button1" text large to="/usermain/hospitales">Directorio de Hospitales
            <v-icon dark right>mdi-hospital-marker</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="button1" text large to="/usermain/doctores">Directorio de Doctores
            <v-icon dark right>mdi-doctor</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="button1" text large to="/usermain/guardados">Guardados
            <v-icon dark right>mdi-bookmark-multiple-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="button2" @click="logoutUser" outlined>Cerrar Sesión</v-btn>
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
    height: auto;
 }

@media screen and (max-width: 1220px) {
  .button1 {
     text-indent: -9999px; 
  }

   .button2 {
     margin-right: 10px;
     font-size: small;
   }
}



.v-btn {
  color: none;
}

</style>
