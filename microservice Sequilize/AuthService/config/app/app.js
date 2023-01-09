const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
require('../database/db');
const errorHandler = require('../../middleware/error-handler');
const responseHandler = require('../../middleware/response-handler');
const {corsOptionsDelegate} = require('./cors');
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api routes 
app.use('/auth', require('../../controller/auth.controller'));
app.get('*', function (req, res) {
  res.status(404).send({ message: "Url not found" });
});
// global error handler
app.use(errorHandler);

app.use(responseHandler);

module.exports = app;