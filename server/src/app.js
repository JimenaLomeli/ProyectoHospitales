const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

/*
//////
// Ejemplo de un endpoint.
//////

app.get('/pagina_ejemplo', (req, res) => {
    res.send({
        message: 'hello world'
    })
})
*/

app.listen(process.env.PORT || 8081)