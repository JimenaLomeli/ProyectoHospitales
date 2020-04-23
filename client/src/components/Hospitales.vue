<template>
<v-card>
  <v-card-title>
    Hospitales
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
    :items="hospitales"
    :search="search"
  ></v-data-table>
</v-card>
</template>

<script>
  import HospitalService from '@/services/HospitalService'

  export default {
    data () {
      return {
        headers: [
          { text: 'Hospital', value: 'hospital' }
        ],
        hospitales: [],
      }
    },
    methods: {
        async getHospitals() {

            const response = await HospitalService.getHospitals({
              headers: {
                  uid: localStorage.uid,
              }
            })

            console.log(response.data.data);
            this.hospitales = this.hospitales.concat(response.data.data);
        }
    },
    created: function() {
      this.getHospitals();
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
