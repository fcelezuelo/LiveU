const express = require('express');
const routes = express.Router();

const mainCtrl = require('./app/controllers/mainController');

routes.get('/', mainCtrl.index);
routes.post('/create', mainCtrl.create);

module.exports = routes;