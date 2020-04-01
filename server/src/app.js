const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Firebase integration.
// Seguro hay una mejor manera de hacerlo, poniendolo en otro archivo o algo.
// Despues vemos

var admin = require("firebase-admin");
const functions = require('firebase-functions');

var serviceAccount = require("./proyectohospitales-f1287-firebase-adminsdk-r36by-9f4ad8af6e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proyectohospitales-f1287.firebaseio.com"
});

let db = admin.firestore();
var firebase = require('firebase');

require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyDjRm8k61OoGoFpAyBVlXQTW6Kxjtl4aJk",
  authDomain: "proyectohospitales-f1287.firebaseapp.com",
  databaseURL: "https://proyectohospitales-f1287.firebaseio.com",
  projectId: "proyectohospitales-f1287",
  storageBucket: "proyectohospitales-f1287.appspot.com",
  messagingSenderId: "328211933291",
  appId: "1:328211933291:web:0cb0cfb81f1e0f7f42e92e",
  measurementId: "G-SRF4QQZRSR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
/*
//////
// Ejemplo de un endpoint.
//////
*/

app.post('/register', (req, res) => {
  //Creamos la conexion a la tabla 'usuarios'
  let usersTable = db.collection('usuarios')
  var statusCode = 0

  // Agregamos un documento.
  usersTable.auth().createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    is_active: true,
    date_joined: Date.now()
  }).then((status) => {
      statusCode = status
  }).catch((err) => {
      statusCode = err
  })

})



// app.post('/login', AuthenticationController.login)
  
//   var cred = firebase.auth.EmailAuthProvider.credential(
//     req.body.email,
//     req.body.password
// );
app.post('/login', (req, res) => {

    const promise = firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    //console.log( `sesion iniciada`);
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
    console.log('Wrong password.');
    } else {
    console.log(errorMessage);
    }
    promise.then(function(data) {
      // lo que quieras hacer cuando si este bien la contraseña}).catch(()
    console.log(error);
  });
})

// exports.login = functions.https.onRequest((req, rsp)=>{
//   const email = req.body.email;
//   const password = req.body.password;
//   let token = '';

//   firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
// //The promise sends me a user object, now I get the token, and refresh it by sending true (obviously another promise)            
// user.getIdToken(true).then((token)=>{
//               rsp.writeHead(200, {"Content-Type": "application/json"});
//               rsp.end(JSON.stringify({token:token}));
//           }).catch((err)=>{
//               rsp.writeHead(500, {"Content-Type": "application/json"});
//               rsp.end(JSON.stringify({error:err}));
//           });
//       }).catch((err)=>{
//           rsp.writeHead(500, {"Content-Type": "application/json"});
//           rsp.end(JSON.stringify({error:err}));
//       });
// });

})

  // app.post('/login', (req, res) => {
  //   var statusCode = 0

  //   res.send({
  //     statusCode: statusCode,
  //     message: `${req.body.name}, ya te registraste campeon`
  //   })
  // })

app.get('/pacientes', (req, res) => {
  res.send({
    message: `${req.body.name}, ya te registraste campeon`
  })
})

app.listen(process.env.PORT || 8081)
