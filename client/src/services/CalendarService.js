import Api from '@/services/Api'

export default {
  getCalendarAppointments (credentials) {
    return Api().get('appointments', credentials)
  },

  postAppointment (credentials) {
    return Api().post('appointments', credentials)
  },

}
