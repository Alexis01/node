var properties = require('node-properties')('lskjdf'),
    express = require('express');

  // SERVICIOS LOCALES
var mainService = require('../services/mainService.js');

  // ROUTING
module.exports = express.Router()
  .get('/', homeController);

  // CALLBACkS
function homeController (req, res) {
  mainService.fetch(req, res, function(err, data) {
    if(err) {
      res.status(500).send('Unhandled error');
    }
    res.format({
      'text/html': function() {
        res.send(data);
      },
      'application/json': function() {
        res.send(data);
      },
      'default': function() {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    });
  });
}
