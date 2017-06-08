var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 100,
      host: 'localhost',
      user: 'root',
      password: '',
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
