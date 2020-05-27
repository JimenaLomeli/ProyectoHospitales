import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  
  login (credentials) {
    return Api().post('login', credentials)
  },

  logout () {
    return Api().post('/')
  },
  
//   miCuenta () {
//     return Api().get('miCuenta')
    
//   }
 }



// Lo que hace este pedo es que ahora podemos hacer algo
// como esto
// authenticationService.register({
//    name: Eren,
//    email: 'puesElMail@tmail.com',
//    password: 'UnaPasswordEncriptadaOAlgoAsiMeImaginoYo'
// });
