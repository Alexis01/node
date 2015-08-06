var properties = require('node-properties')('node-services', process.env.NODE_ENV),
    express = require('express'),
    router = express.Router(),
    path = require('path'),
    common = require('node-common')('node-services');

// Configuración para simular entorno de producción  (grunt pro)
var isDevMode = process.argv.slice(2)[0] === 'nobuild',
    baseFolder = isDevMode ? '.' : '../dist';

// Configuraciones iniciales
var app = express();
var lskjdf = require(path.join(__dirname, baseFolder, 'app.js'));

        // MIDDLEWARE Y ROUTING
app
    .use(setResponse)                                       // formatea respuestas a html o json según  lo que se envía
    .use(lskjdf)
    .use(errorStatus, errorRequest);                        // redirige errores


var server = app.listen(properties.nodePort, serve);        // Lanza el servidor

module.exports = app;

function setResponse (req, res, next) {
    var format = /\.json/;
    if (req.url.match(format)) {
        req.headers.accept = 'application/json';
        req.url = req.url.replace(format, '');
    }
    next();
}

function errorStatus (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function errorRequest (err, req, res, next) { // Error handler
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
}

function serve () {
    console.log('Server testing listening on: http://localhost:' + server.address().port + '/servicios/lskjdf');
}
