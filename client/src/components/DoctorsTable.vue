<template>
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
    ></v-data-table>
  </v-card>
</template>

<script>
  import doctorService from '@/services/DoctorService'

  export default {
    data () {
      return {
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
            })
            this.doctores = this.doctores.concat(response.data.data);
            console.log(response.data.data);

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
