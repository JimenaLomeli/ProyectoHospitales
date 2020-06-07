<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn dark class="mr-4" v-on="on" color="green darken-1" >
            Agregar Cita
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark fluid color="green lighten">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Nueva Cita</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="postAppointment">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-col class="d-flex">
                    <v-text-field
                    v-model= "name"
                    label="Nombre"
                    ></v-text-field>
            </v-col>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-col class="d-flex">
                    <v-select
                    :items="hospitales"
                    item-value="id" 
                    v-model= "hospitalId"
                    item-text="hospital"
                    label="Hospital"
                    ></v-select>
            </v-col>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-col class="d-flex">
                    <v-select
                    :items="doctores"
                    item-value="id" 
                    v-model= "doctorId"
                    item-text="nombreCompleto"
                    label="Doctor"
                    ></v-select>
               </v-col>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-date-picker
                    full-width
                    v-model="picker"
                    :landscape="$vuetify.breakpoint.smAndUp"
                    class="mt-4"
                    color="green lighten"
               >
               </v-date-picker>        
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-textarea
                label="Comentarios"
                v-model="comentarios"
                auto-grow
                outlined
                rows="3"
                row-height="25"
                shaped
                ></v-textarea>      
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
</template>

<script>
  import CalendarService from '@/services/CalendarService';

  export default {
    props: ['doctores', 'hospitales'],
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        picker: new Date().toISOString().substr(0, 10),
        comentarios: "",
        doctorId: "",
        hospitalId: "",
        names: "",
        name: "",
      }
    },
    methods: {
        // Funcion que registra cita en base de datos.
        async postAppointment() {
            var appointmentObject = {
                name: this.name,
                hospital: this.hospitalId,
                doctor: this.doctorId,
                date: this.picker,
                observaciones: this.comentarios
            }

            var body = {
                appointment: appointmentObject,
                uid: localStorage.uid
            }

            const response = await CalendarService.postAppointment(body)
            .then(resp => {
              if (resp.status == 200) {
                alert("La cita ha sido guardada exitosamente");
              }
            })
            .catch(err => {
              alert(err);
            })
            
            this.dialog = false
        }
    }
  }
</script>

<style scoped>
.v-dialog > .v-card > .v-toolbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>