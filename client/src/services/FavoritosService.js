import Api from '@/services/Api'

export default {
  getFavoritos (headers) {
    return Api().get('guardados', headers)
  },
}

// Lo que hace este pedo es que ahora podemos hacer algo
// como esto
// examService.register({
//    name: Eren,
//    email: 'puesElMail@tmail.com',
//    password: 'UnaPasswordEncriptadaOAlgoAsiMeImaginoYo'
// });
