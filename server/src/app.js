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
        uid: status["uid"],
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

  const uid = req.headers.uid;
  console.log(uid);

  ref.where("paciente", "==", uid).get()
  .then(snapshot => {
    var examenes  = [];

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach((exam) => {
      examenes.push({
        id: exam.id,
        examen: exam.data().examen,
        inicio: exam.data().inicio_tratamiento,
        final: exam.data().fin_tratamiento,
        comentario: exam.data().comentarios,
        favorito: exam.data().favorito,
        archivo: exam.data().archivo,
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

//Update Exams
app.put('/exams', (req, res) => {
  var ref = db.collection('examen_paciente')
  var statusCode = 0

  let exam_id = req.body.data.examen
  // TO DO: cambiar a que recibamos el id del paciente.
  ref.doc(exam_id).update({ 
    favorito: req.body.data.favorito,

  })
  .then(function(){
      console.log('Favorito Updated');

      res.send({
        status: 'Updated Correctly',
        statusCode: 200,
      })
  })
  .catch(function(error) {
    console.log(error);
    console.log('ERROR')
  });
})

//get Hospitals
app.get('/hospitals', (req, res) => {
  var ref = db.collection('hospital')

  // El user id que recibimos del cliente.
  const uid = req.headers.uid;
  var hospitales_paciente = []

  // Sacamos todas las citas del paciente y ponemos los hospitales a los que ha
  // ido en una lista.
  db.collection('cita_medica').where("exme_paciente_id", "==", uid).get()
  .then(snapshot => {
      snapshot.forEach((cita) => {
        console.log(cita.data().hospital)
        hospitales_paciente.push(cita.data().hospital);
      });

      console.log(hospitales_paciente.includes('2KNYxVHbsN3OqOo4xf41'));

      // Una vez que tengamos los hospitales ya pedimos su info.
      // No hay mas info de hospitales (???)
      ref.get().then(snapshot => {
        var hospitales = [];

        if (snapshot.empty) {
          console.log("No matching documents");
          return;
        }

        snapshot.forEach((hospital) => {
          // Si el id existe en la lista de hospitales del paciente, lo agregamos.
          console.log(hospitales_paciente.includes(hospital.id))
          if (hospitales_paciente.includes(hospital.id)) {
            hospitales.push({
              hospital: hospital.data().name
            });
          }
        });

        res.send({
          data: hospitales
        })

      }) 
      .catch(err => {
        console.log("Error getting hospital documents", err);
      });
  }).catch(err => {
    console.log("Error getting citas documents", err);
  })

})

//Get Doctores
app.get('/doctores', (req, res) => {
  var ref = db.collection('medicos')

  // El user id que recibimos del cliente.
  const uid = req.headers.uid;
  var doctores_paciente = []

  // Sacamos todas las citas del paciente y ponemos los doctores a los que ha
  // ido en una lista.
  db.collection('cita_medica').where("exme_paciente_id", "==", uid).get()
  .then(snapshot => {
      snapshot.forEach((cita) => {
        doctores_paciente.push(cita.data().exme_medico_id);
      });

      // Una vez que tengamos los doctores ya pedimos su info.
      ref.get().then(snapshot => {
        var doctores = [];

        if (snapshot.empty) {
          console.log("No matching documents");
          return;
        }

        snapshot.forEach((doctor) => {
          // Si el id existe en la lista de doctores del paciente, lo agregamos.
          if (doctores_paciente.includes(doctor.id)) {
            doctores.push({
              nombre: doctor.data().name,
              apellido: doctor.data().apellido1,
              telefono: doctor.data().celular,
              email: doctor.data().email
            });
          }
        });

        res.send({
          data: doctores
        })

      }) 
      .catch(err => {
        console.log("Error getting doctors documents", err);
      });
  }).catch(err => {
    console.log("Error getting citas documents", err);
  })
})

app.get('/pacientes', (req, res) => {
  res.send({
    message: `${req.body.name}, ya te registraste campeon`
  })
})

app.listen(process.env.PORT || 8081)
