const express = require('express');
const app = express();

const indexRoutes = require('./routes/index.routes');
const userRoutes = require('./routes/user.routes');
const screeningRoutes = require('./routes/screening.routes');
const episodeRoutes = require('./routes/episode.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use('/api', indexRoutes);
app.use('/api/user', userRoutes);
app.use('/api/screening', screeningRoutes);
app.use('/api/episode', episodeRoutes);

//SETTINGS
app.set('port', process.env.PORT || 3000)

module.exports = app;