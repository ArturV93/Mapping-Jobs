var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 100,
      host: 'eu-cdbr-west-01.cleardb.com',
      user: 'b5e257b31bd185',
      password: 'bccad01c',
      database: 'heroku_9e20d23bc8e3b8e'
    });
  };


  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
      connection.release();
    });
  };
}

module.exports = new Connection();
