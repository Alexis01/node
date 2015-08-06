var properties = require('node-properties')('lskjdf'),
    common = require('node-common')('lskjdf'),
    async = require('async');

module.exports.fetch = function(req, res, callback) {
    var resultList = [
        {
            title:  'La web de RTVE',
            url:    'http://www.rtve.es/'
        },
        {
            title:  'Portal NodeJS en Pre',
            url:    'http://rediseno.pre.rtve.es'
        }
    ];

    callback(null, resultList);
};
