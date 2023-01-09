const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('../../middleware/error-handler');
const responseHandler = require('../../middleware/response-handler');
require('dotenv').config();
require('../database/db');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api routes 
app.use('/post', require('../../controller/post.controller'));
app.get('*', function (req, res) {
    res.status(404).send({ message: "Url not found" });
});
// global error handler
app.use(errorHandler);

app.use(responseHandler);

module.exports = app;