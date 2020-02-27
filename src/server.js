const express = require('express');
const app = express();
const cors = require('cors');
const authMidd = require('./middlewares/auth');

app.use(express.json());

app.use(cors());

let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

const series = require('./routes/seriesRoutes');
const auth = require('./routes/authRoutes');
const generos = require('./routes/generosRoutes');

app.use(allowCrossDomain);
app.use('/auth', auth);
app.use('/series/generos', generos)
app.use(authMidd);
app.use('/series', series);

module.exports = app;