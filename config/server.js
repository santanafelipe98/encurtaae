const express = require('express');
const consign = require('consign');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// conecta ao banco

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/encurtaae';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// configura engine de views

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors

const corsOptions = {
    origin: 'http://localhost/',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .then('app/utils')
    .into(app);


// handler erro 404

app.use((req, res, next) => {
    res.status(404).render('404');
});

module.exports = app;