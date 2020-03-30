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

var serviceAccount = require("./proyectohospitales-f1287-firebase-adminsdk-r36by-29ba8608e2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proyectohospitales-f1287.firebaseio.com"
});

let db = admin.firestore();

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
  usersTable.add({
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

  res.send({
    statusCode: statusCode,
    message: `${req.body.name}, ya te registraste campeon`
  })
})

app.get('/pacientes', (req, res) => {
  res.send({
    message: `${req.body.name}, ya te registraste campeon`
  })
})

app.listen(process.env.PORT || 8081)
