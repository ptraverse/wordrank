/**
* need to have mongodb server running via
mongod -f ./mongod.conf
**/
console.log("Checking Connection ... ");
var db = require('mongoskin').db('mongodb://localhost:27017/wordrank');
console.log("Connected!");


console.log("Dumping 'wordrank.words' collection ... ");
db.collection('words').find().toArray(function(err, result) {
    if (err) {
    	throw err;
    }
    console.log(result);
    process.exit(0); //finished [0=success, 1=fail]
});