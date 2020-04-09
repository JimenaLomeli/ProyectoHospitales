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

var serviceAccount = require("./proyectohospitales-f1287-firebase-adminsdk-r36by-43151ab37a.json");

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
// Endpoints
//////
*/

app.post('/register', (req, res) => {
  //Creamos la conexion a la tabla 'usuarios'
  let usersTable = db.collection('usuarios')
  var statusCode = 0

  // Crear usuario.
  admin.auth().createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    is_active: true,
    date_joined: Date.now()
  }).then((status) => {
      res.send({
        status: status,
        statusCode: 200,
      })
  }).catch((err) => {
    res.send({
      message: err,
      statusCode: 400,
    })
  })

})

// Login Endpoint
app.post('/login', (req, res) => {

    const promise = firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((status) => {
      res.send({
        status: status,
        statusCode: 200,
      })
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
    } else {
    console.log(errorMessage);
    }
    promise.then(function(data) {
    console.log(error);
    });
  })
})

app.post('/', () =>{
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('LOGOUT SUCCESSFUL');
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });

})

//Get Exams
app.get('/exams', (req, res) => {
  var ref = db.collection('examen_paciente')

  // TO DO: cambiar a que recibamos el id del paciente.
  ref.where("paciente", "==", "9H44szqWQLPahniix3xn11KYDS82").get()
  .then(snapshot => {
    var examenes  = [];

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach((exam) => {
      console.log(exam.data());

      examenes.push({
        examen: 1,
        inicio: exam.data().inicio_tratamiento,
        final: exam.data().fin_tratamiento,
        comentario: exam.data().comentarios,
        archivo: exam.data().archivo
      });
    });

    res.send({
      data: examenes
    })
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
})

//get Hospitals
app.get('/hospitals', (req, res) => {
  var ref = db.collection('hospital')
  ref.get()
  .then(snapshot => {
    var hospitales = [];

    if (snapshot.empty) {
      console.log("No matching documents");
      return;
    }
    snapshot.forEach((hospital) => {
      console.log(hospital.data());

      hospitales.push({
        hospital: hospital.data().name
      });
    });
    res.send({
      data: hospitales
    })
  })
  .catch(err => {
    console.log("Error getting hospital documents", err);
     });
})

//Get Doctores
app.get('/doctores', (req, res) => {
  var ref = db.collection('medicos')
  //var hospref = db.collection('hospital')

  ref.get()
  .then( snapshot => {
    var doctores  = [];
    if (snapshot.empty) {
      console.log('No se encontraron doctores registrados');
      return;
    }  

    snapshot.forEach((doctor) => {
      console.log(doctor.data());

      doctores.push({
        nombre: doctor.data().name,
        apellido: doctor.data().apellido1,
        telefono: doctor.data().celular,
        email: doctor.data().email
      });

    });

    res.send({
      data: doctores
    })
  })
  .catch(err => {
    console.log('Error getting doctors', err);
  });
})

app.get('/pacientes', (req, res) => {
  res.send({
    message: `${req.body.name}, ya te registraste campeon`
  })
})

app.listen(process.env.PORT || 8081)
