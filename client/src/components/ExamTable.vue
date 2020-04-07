<template>
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
    <v-data-table
      :headers="headers"
      :items="examenes"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  import examsService from '@/services/ExamsService'

  export default {
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
      }
    },
    methods: {
        async getExams() {
            const response = await examsService.getExams({
              
            })

            console.log(response.data.data);

            this.examenes = this.examenes.concat(response.data.data);
        }
    },
    created: function() {
      this.getExams();
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
