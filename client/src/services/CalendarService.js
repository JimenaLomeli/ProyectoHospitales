import Api from '@/services/Api'

export default {
  getCalendarAppointments () {
    return Api().get('appointments')
  },
  
  postAppointment (credentials) {
    return Api().post('appointments', credentials)
  },

}
