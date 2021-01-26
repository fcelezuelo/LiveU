const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const routes = require('./routes')

const app = express();
const port = 3000;

app.use(express.static('app'));
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
    console.log(`Server listening on port: ${process.env.PORT}`)
})