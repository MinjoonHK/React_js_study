var crypto = require('crypto');

var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update('Minjun369!', 'utf8', 'hex')
mystr += mykey.final('hex');

console.log(mystr);