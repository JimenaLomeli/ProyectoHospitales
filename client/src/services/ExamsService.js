import Api from '@/services/Api'

export default {
  getExams (credentials) {
    return Api().get('exams', credentials)
  },

  updateExam() {
    return Api().put('exams')
  }
  
}

// Lo que hace este pedo es que ahora podemos hacer algo
// como esto
// examService.register({
//    name: Eren,
//    email: 'puesElMail@tmail.com',
//    password: 'UnaPasswordEncriptadaOAlgoAsiMeImaginoYo'
// });
