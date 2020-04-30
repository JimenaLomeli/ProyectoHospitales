<template>
<v-app style = "background: #00cd9b;">
  <v-card>
    <v-card-title>
      Examenes
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

  <template>
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
            <td> 
              <v-icon  v-if="row.item.favorito" color = "yellow" @click="updateExam(row.item)">mdi-star</v-icon>
              <v-icon  v-else @click="updateExam(row.item)">mdi-star</v-icon>
            </td>
          </tr>
      </template>
    
    </v-data-table>
   </template> 
  </v-card>
</v-app>
</template>

<script>
  import examsService from '@/services/ExamsService'
  import FileDialog from './dialogs/FileDialog'


  export default {
    components: { FileDialog },
    data () {
      return {
        singleSelect: false,
        emptyString: "",
        selected: [],
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
          { text: 'Marcar Guardado', value: 'favorito' },
        ],
        examenes: [
          
        ],
        updateExam: async (exam) => {
          console.log("LALAALALAL");
          exam.favorito = !exam.favorito
          const response = await examsService.updateExam(exam.id, exam.favorito);
          console.log(response.data.data)

        }
      }
    },
    methods: {
      async getExams() {
            const response = await examsService.getExams({
              headers: {
                  uid: localStorage.uid,
              }
            })
            console.log(response.data.data);
            this.examenes = this.examenes.concat(response.data.data);
        }
    },

    created: function() {
      this.getExams();
    },

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
