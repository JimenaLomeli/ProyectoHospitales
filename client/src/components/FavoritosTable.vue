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
      :items="examenes"
      :search="search"
    >
      <template v-slot:item="row">
          <tr>
            <td>{{row.item.examen}}</td>
            <td>{{row.item.inicio.substring(0,10)}}</td>
            <td>{{row.item.final.substring(0,10)}}</td>
            <td>{{row.item.comentario}}</td>
            <td>
              <fileDialog v-if="row.item.archivo !== emptyString && row.item.archivo !== undefined" 
              :base64File = "row.item.archivo"></fileDialog> 
            </td>
          </tr>
      </template>
    
    </v-data-table>
  </v-card>
</v-app>
</template>

<script>
  import favoritosService from '@/services/FavoritosService'
  import FileDialog from './dialogs/FileDialog'

  export default {
    components: { FileDialog },
    data () {
      return {
        headers: [
          {
            text: 'Examen',
            align: 'start',
            sortable: false,
            value: 'examen',
          },
          { text: 'Fecha Inicio', value: 'inicio' },
          { text: 'Fecha Final', value: 'final' },
          { text: 'Comentarios', value: 'comentario' },
          { text: 'Archivo', value: 'archivo' },
        ],
        examenes: [
          
        ],
        dialog: false,
        emptyString: "",
      }
    },
      methods: {
         async getFavoritos() {
            const response = await favoritosService.getFavoritos({
              headers: {
                  uid: localStorage.uid,
              }
            })
            console.log(response.data.data);
            this.examenes = this.examenes.concat(response.data.data);
        },
        showFile(base64File) {
          console.log(base64File);
        }
    },
    created: function() {
      this.getFavoritos();
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
