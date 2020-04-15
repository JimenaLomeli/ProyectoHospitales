import Api from '@/services/Api'

export default {
  getCalendarAppointments () {
    return Api().get('appointments')
  },

}
