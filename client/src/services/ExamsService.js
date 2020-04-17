import Api from '@/services/Api'

export default {
  getExams (headers) {
    return Api().get('exams', headers)
  },
  
}

// Lo que hace este pedo es que ahora podemos hacer algo
// como esto
// examService.register({
//    name: Eren,
//    email: 'puesElMail@tmail.com',
//    password: 'UnaPasswordEncriptadaOAlgoAsiMeImaginoYo'
// });
