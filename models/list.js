var connection = require('../config/dbConnection');
var async = require('async');
var _ = require('lodash');

function List() {

  this.titles = function(req,res) {
    connection.acquire(function(err,con){
      var array = [];

      function county(callback){
        con.query("SELECT DISTINCT(county) FROM jobs", function(err, rows) {
          if(rows.length > 0){
            rows.forEach(function(row){
              array.push({
                county: row.county
              })
            });
          }

          callback();
        });
      }

      function careers(callback){
        con.query("SELECT DISTINCT(occupation) FROM jobs", function(err, rows) {
          if(rows.length > 0){
            rows.forEach(function(row){
              array.push({
                careers: row.occupation
              })
            });
        }
          callback();

        });
      }

      async.series([
             county,
             careers
         ], function (err, result) {
           res.send(array);
      })

    })
  }


}

module.exports = new List();
