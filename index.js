const express = require('express');
const cors = require('cors');
const { connect } = require('./src/utils/database/db');
const { configCloudinary } = require('./src/utils/cloudinary/config');
const TeamRoutes = require('./src/api/teams/teams.routes');
const PilotRoutes = require('./src/api/pilots/pilots.routes');
const UserRoutes = require('./src/api/users/users.routes');
const PORT = process.env.PORT || 8080;
const app = express();

connect();

configCloudinary();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true
}));

app.use(express.json({ limit: '5mb' }))

app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));

//colocamos la bienvenida en la url base
app.get("/", (req, res) => {
    res.send("Bienvenido al server de Jorge Riballo");
  });

app.use('/users', UserRoutes);
app.use('/teams', TeamRoutes);
app.use('/pilots', PilotRoutes);

app.use('*', (req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Route not found';
    return next(error);
});

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

app.disable('x-powered-by');

const server = app.listen(PORT, () => {
    console.log(`Server listening on port 🙈: ${PORT}`)
});

/* // Info API
const documentation = require('./src/utils/documentation/api.json');
// Documentation de nuestra Api
app.use('/api', (req, res, next) => {
    return res.json(documentation);
}); */