var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test',
  password : 'test',
  database : 'test'
});
 
connection.connect();
 
connection.query('select * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('users: ',  results);
});
 
connection.end();