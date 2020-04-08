import Api from '@/services/Api'

export default {
  getHospitals (credentials) {
    return Api().get('hospitals', credentials)
  },

}
