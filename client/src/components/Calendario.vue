<template>
<v-app>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                color="grey darken-2"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>

          </v-menu>
          <appointmentDialog></appointmentDialog>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn @click="deleteAppointment()" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>

            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cerrar
              </v-btn>

                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn text color="secondary" dark v-on="on">Editar</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Actualizar Cita</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                            v-model = "fecha_cita"
                            label="Nueva fecha (YYYY-MM-DD)*" required></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                            v-model = "observaciones"
                            label="Comentarios"></v-text-field>
                          </v-col>

                        </v-row>
                      </v-container>
                      <small>*Campo obligatorio</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
                      <v-btn color="blue darken-1" text @click="updateAppointment()">Guardar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</v-app>
</template>

<script>
  import calendarService from '@/services/CalendarService';
  import AppointmentDialog from './dialogs/AppointmentDialog';

  export default {
    components: { AppointmentDialog },
    data: () => ({
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days"
      },
      name: null,
      color: "#1976D2",
      details: null,
      start: null,
      end: null,
      currentlyEditing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      dialog: false,

      fecha_cita: new Date().toISOString().substr(0, 10),
      observaciones: null,
      nombre_cita: null
    }),
    created: function(){
      // Para no tener que hacer el GET mas veces.
      if (this.events.length == 0){
        this.getCalendarAppointments();
      }
    },
    computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    }
  },
    methods: {
     async getCalendarAppointments() {

      const response = await calendarService.getCalendarAppointments({
        headers: {
            uid: localStorage.uid,
        }
      });

      this.events = response.data.data

      //Vuetify nos pide que tengamos (name, start) para que se pueda ver el event
      this.events.forEach(function (event) {
          if(!event.hasAttribute("name")) {
            event.name = " ";
          }
      })
    },
    async updateAppointment(){
      var appointmentObject = {
        id: this.selectedEvent.id,
        date: this.fecha_cita,
        observaciones: this.observaciones,
        nombre_cita: this.selectedEvent.name
      }

      var body = {
        appointment: appointmentObject,
        uid: localStorage.uid
      }

      const response = await calendarService.updateAppointment(body)
      this.dialog = false
      //Esto se hace para que las citas se actualicen.
      this.getCalendarAppointments();
    },

    async deleteAppointment() {
      //TO DO -> funcion para eliminar una cita
      // var appointmentObject = {nombre_cita: }

      var body = {
        headers: {
            uid: localStorage.uid,
            appointment: this.selectedEvent.name
        }
      }

      const response = await calendarService.deleteAppointment(body)
    },
    viewDay ({ date }) {
     this.focus = date
     this.type = 'day'
   },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        console.log(event);
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }

  }
  }
</script>
