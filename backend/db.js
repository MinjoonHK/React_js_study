const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    mongoose.connect('localhost:27017', function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect); //연결이 해제되면 다시 connect
  require('./user.js'); // user.js는 나중에 만듭니다.
};