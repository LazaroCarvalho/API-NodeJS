const express = require('express');
const app = express();

app.use(express.json());

let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

const series = require('./routes/seriesRoutes');
const auth = require('./routes/authRoutes');

app.use(allowCrossDomain);
app.use('/auth', auth);
app.use('/series', series);

module.exports = app;