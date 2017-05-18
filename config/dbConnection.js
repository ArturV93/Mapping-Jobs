var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 100,
      host: 'localhost',
      user: 'b5e257b31bd185',
      password: 'bccad01c',
      database: 'mappingjobs'
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
