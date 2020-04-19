import Api from '@/services/Api'

export default {
  getDoctors (credentials) {
    return Api().get('doctores', credentials)
  },
  
}

// Lo que hace este pedo es que ahora podemos hacer algo
// como esto
// examService.register({
//    name: Eren,
//    email: 'puesElMail@tmail.com',
//    password: 'UnaPasswordEncriptadaOAlgoAsiMeImaginoYo'
// });
