'use strict';

var assert = require('assert');

/**
* need to have mongodb server running via
mongod -f ./mongod.conf
**/
describe('MongoDB Layer', function() {

    it('should have a mongodb on localhost with wordrank collection', function(done) {
        var db = require('mongoskin').db('mongodb://localhost:27017/wordrank');
        db.collection('words').find().toArray(function(err, result) {
            if (err) {
                throw err;
            }
            assert(result.length > 0);
            done();
        });
    });

});
