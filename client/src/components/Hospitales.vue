<template>
<v-app>
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
      @click:row="showProfile"
    ></v-data-table>
  </v-card>

  <v-dialog
    v-model="dialog"
    max-height = "70%"
    max-width = "70%">
    <v-card
      class="mx-auto"
      width="100%"
      height="100%"
    >
    <v-row>
      <v-col width="70%">
        <v-card-title>Ubicación </v-card-title>
        <div>
        <google-map v-bind:center="{ lat: 25.647070, lng: -100.323470 }" v-bind:zoom="15"
          style="height:360px; width: 650px;margin:20px auto;">
          <GmapMarker
            v-for="(item, index) in markers"
            v-bind:key = "index"
            v-bind:position-"item.position"
            @click="center=item.position"
          />
        </google-map>
        </div>
      </v-col>
    </v-row>
    </v-card>

  </v-dialog>
</v-app>
</template>

<script>
  import HospitalService from '@/services/HospitalService'
  import * as VueGoogleMaps from 'vue2-google-maps'

  export default {
    components:{
      'GmapMarker': VueGoogleMaps.GmapMarker
    },
    data () {
      return {
        markers:[
        { position: {lat:25.646240, lng: -100.325317} },
        ],
        dialog: false,
        search: '',
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
        },

        showProfile(){
          this.dialog = true;
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
