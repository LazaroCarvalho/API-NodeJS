const express = require('express');
const app = express();

app.use(express.json());

const series = require('./routes/seriesRoutes');
const auth = require('./routes/authRoutes');

app.use('/auth', auth);
app.use('/series', series);

module.exports = app;