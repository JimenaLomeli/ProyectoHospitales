<template>
  <v-app style = "background: #00cd9b;">
  <v-card>
    <v-card-title>
      Doctores
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="doctores"
      :search="search"
      loading= true
      @click:row="showProfile"
    ></v-data-table>
  </v-card>
  <v-dialog
      v-model="dialog"
      max-height = "70%"
      max-width = "70%"

  >
    <v-card
      class="mx-auto"
      width="100%"
      height="100%"
    >
    <v-row>
      <v-col width="70%">
        <v-card-title>Nombre: {{currentDoctorProfile.nombreCompleto}}</v-card-title>
        <v-card-title>Email: {{currentDoctorProfile.email}}</v-card-title>
        <v-card-title>Telefono: {{currentDoctorProfile.telefono}}</v-card-title>
      </v-col>
      <v-col width="30%">
        <v-img src="https://upload.wikimedia.org/wikipedia/en/6/62/The_Good_Doctor_2017.png"></v-img>
      </v-col>
    </v-row>
    </v-card>
  </v-dialog>
  </v-app>
</template>

<script>
  import doctorService from '@/services/DoctorService'

  export default {
    data () {
      return {
        search: '',
        currentDoctorProfile: {},
        dialog: false,
        headers: [
          { text: 'Nombre', value: 'nombre' },
          { text: 'Apellido', value: 'apellido' },
          { text: 'Teléfono', value: 'telefono' },
          { text: 'Correo Electrónico', value: 'email' },
        ],
        doctores: [
          
        ]
      }
    },
    methods: {
        async getDoctors() {
            const response = await doctorService.getDoctors({
              headers: {
                  uid: localStorage.uid,
              }
            })
            this.doctores = this.doctores.concat(response.data.data);
            console.log(response.data.data);

        },

        showProfile(value){
          console.log(value);
          this.currentDoctorProfile = value;
          this.dialog = true;
        }
    },
    created: function() {
      this.getDoctors();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  color: black;
  align-self: center;
  margin: 10px;
}

.v-card {
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    width: 95%;
}
</style>
