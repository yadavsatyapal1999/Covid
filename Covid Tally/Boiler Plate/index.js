const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const refresh = require('../Boiler Plate/createDatabase')
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector');
const api = require('./api')


app.use('/',api)


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;