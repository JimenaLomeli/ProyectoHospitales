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
      }).end()
  }).catch((err) => {
    console.log(err);
    res.send({
      message: err,
      statusCode: 400,
    }).end()
  })

})

// Login Endpoint
app.post('/login', (req, res) => {

    const promise = firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      res.send({
        uid: user.user.uid,
        statusCode: 200,
      })
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
      res.send({
        statusCode: 400,
      })
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
        inicio: exam.data().inicio_tratamiento.toDate(),
        final: exam.data().fin_tratamiento.toDate(),
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

//Get Favoritos
app.get('/guardados', (req, res) => {
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
      if(exam.data().favorito == true) {
        examenes.push({
          id: exam.id,
          examen: exam.data().examen,
          inicio: exam.data().inicio_tratamiento.toDate(),
          final: exam.data().fin_tratamiento.toDate(),
          comentario: exam.data().comentarios,
          favorito: exam.data().favorito,
          archivo: exam.data().archivo,
        });

      }


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
              hospital: hospital.data().name,
              id: hospital.id
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

//get las citas que estan programadas para el calendario
app.get('/appointments', (req, res) => {
  var ref = db.collection('cita_medica')

  const uid = req.headers.uid;
  console.log("el UID");
  console.log(uid);
  console.log("holaaaaa");

  ref.where("exme_paciente_id", "==", uid).get()
  .then(snapshot => {
    var citas = [];

    if (snapshot.empty) {
      console.log("no matching appointments");
      return;
    }

    snapshot.forEach((cita) => {
      citas.push({
        id: cita.id,
        name: cita.data().name,
        start: cita.data().fecha_cita.toDate().toISOString().substring(0, 10),
        details: cita.data().observaciones
      });
    });

    res.send({
      data:citas
    })
  })
  .catch(err => {
    console.log("Error getting appointments", err);
  })
})

// Cuando creamos una cita y se guarda.
app.post('/appointments', (req, res) => {
  // El user id que recibimos del cliente.
  const uid = req.headers.uid;
  console.log("aber", uid)

  console.log(req.body.appointment.date, typeof(req.body.appointment.date))
  console.log(req.body.appointment.date, new Date(req.body.appointment.date))

  const cita_medica = {
      name: req.body.appointment.name,
      created: Date.now(),
      exme_medico_id: "",
      exme_paciente_id: req.body.uid,
      fecha_cita: new Date(req.body.appointment.date),
      hospital: req.body.appointment.hospital,
      observaciones: req.body.appointment.observaciones
  }

  var ref = db.collection('cita_medica').add(cita_medica)
  .then(ref => {
    res.status(200)
    res.send("Cita guardada exitosamente")
  })
  .catch(err => {
    res.status(500)
    res.send(err)
  });

})


//actualizar la cita
app.put('/appointments', (req, res) =>{
  const appointment_id = req.body.appointment.id;

  const cita_actualizada = {
    fecha_cita: new Date(req.body.appointment.date),
    observaciones: req.body.appointment.observaciones
  }

  //Hacemos el update a la cita medica :)
  db.collection('cita_medica').doc(appointment_id)
  .update(cita_actualizada)
  .then((response) => {
      return res.status(200).json(response).end();
  })
  .catch((err) => {
      return res.status(400).end()
  })

})


//eliminar una cita
app.delete('/appointments', (req, res) =>{
  const uid = req.headers.uid
  // const uid = req.body.uid;
  console.log("oliii", uid)
  console.log(req.headers.appointment)


  //primero sacamos el paciente y la cita que se quiere eliminar
  db.collection('cita_medica').where("exme_paciente_id", "==", uid).where("name", "==", req.headers.appointment)
  .get()
  .then(
    function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        console.log(doc.id, " => ",doc.data());
        db.collection('cita_medica').doc(doc.id).delete()
      })
      res.send("Cita eliminada exitosamente")
    })
    .catch(err => {
      console.log("Error eliminando cita", err)
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
        doctores_paciente.push(String(cita.data().exme_medico_id));
      });

      // Una vez que tengamos los doctores ya pedimos su info.
      ref.get().then(snapshot => {
        var doctores = [];

        if (snapshot.empty) {
          res.message = "No matching documents";

          res.status(205)
          res.send().end();
        }

        snapshot.forEach((doctor) => {
          console.log(typeof(doctor.id))
          // Si el id existe en la lista de doctores del paciente, lo agregamos.
          if (doctores_paciente.includes(doctor.id)) {
            doctores.push({
              nombre: doctor.data().name,
              apellido: doctor.data().apellido1,
              nombreCompleto: "Dr. " + doctor.data().name + " " + doctor.data().apellido1,
              telefono: doctor.data().celular,
              email: doctor.data().email,
              id: doctor.id
            });
          }
        });

        console.log(doctores)
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
