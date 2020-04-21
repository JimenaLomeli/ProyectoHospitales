
<head>
  <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
  <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>

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

  <template>
    <v-list  

      v-for="(exam, index) in examenes">
        <v-list-item>
          <template>
            <v-list-item-subtitle v-text="exam.examen"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="exam.inicio"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="exam.final"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="exam.comentario"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="exam.archivo" ></v-list-item-subtitle>
            <input 
              type="checkbox"
              color="orange"
              v-model="exam.favorito"
              v-on:click="updateExam(exam)">   
          </template>
          </v-list-item>
            <v-divider
              v-if="index + 1 < examenes.length"
              :key="index"
            ></v-divider>
     </v-list >
   </template> 
  </v-card>
</template>

<script>
  import examsService from '@/services/ExamsService'


  export default {
    data () {
      return {
        singleSelect: false,
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
          { text: 'Marcar Favorito', value: 'favorito' },
        ],
        examenes: [
          
        ],
        updateExam: async (exam) => {
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
