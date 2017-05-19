var connection = require('../config/dbConnection');
var async = require('async');
var _ = require('lodash');
var outliers = require('../outliers');

function Data() {

  this.jobs = function(req,res) {
    connection.acquire(function(err,con){
      var obj = [];
      var total = 0;

      if(req.body.occupation !== undefined && req.body.occupation !== ''){
        var occupation = "SELECT * FROM jobs where occupation='" + req.body.occupation + "' AND DATE(datetime) = date('2017-04-11') ORDER BY num_jobs";
        con.query(occupation, function(err, rows) {
            if(err){
              res.send("Error")
            }
            if(rows.length > 0){
              var total = outliers.Outliers(rows);
              rows.forEach(function(row){
                var salary = salaryFunc(row.salary);
                obj.push({
                  id: row.county,
                  customData: row.num_jobs,
                  value: mapValue(row.num_jobs/total),
                  description: salary
                });
              });
            }
            res.send(obj);
         })
      }
      else{
        var occupation = "SELECT county, sum(num_jobs) as num_jobs, AVG(salary) as salary FROM jobs where DATE(datetime) = date('2017-04-11') GROUP BY county ORDER BY num_jobs";

        con.query(occupation, function(err, rows) {
            if(err){
              res.send("Error");
            }

          if(rows.length > 0){
            var total = outliers.Outliers(rows);
            rows.forEach(function(row){
              var salary = salaryFunc(row.salary);
              obj.push({
                id: row.county,
                customData: row.num_jobs,
                value: mapValue(row.num_jobs/total),
                description: salary
              });
            });
            res.send(obj);
          }else{
            res.send("Error");
          }
        })
      }

      function salaryFunc(salary){
        if(salary === 0){
          return 'Not Available';
        }else{
          return '€' + Math.round(salary);
        }
      }

      function mapValue(value){
        if(value > 1){
          return 1;
        }else{
          return value;
        }
      }

    })
  }


  this.careersInfoDonught = function(req,res) {
    connection.acquire(function(err,con){
        var obj = {
          labels: [],
          data: [],
          percentage: []
        };

        if(req.body.county){
          var totalquery = "SELECT SUM(num_jobs) AS NUM FROM JOBS WHERE date(datetime) = DATE(NOW()) AND county='" + req.body.county + "'";
          var precentagequery = "SELECT DISTINCT(occupation), SUM(num_jobs) AS num_jobs FROM JOBS WHERE date(datetime) = date(CURDATE()) AND county='"+ req.body.county + "' GROUP BY occupation ORDER BY num_jobs DESC";
        }else{
          var totalquery = "SELECT SUM(num_jobs) AS NUM FROM JOBS WHERE date(datetime) = DATE(NOW())";
          var precentagequery = "SELECT DISTINCT(occupation), SUM(num_jobs) AS num_jobs FROM JOBS WHERE date(datetime) = date(CURDATE()) GROUP BY occupation ORDER BY num_jobs DESC";
        }
        var total = 0;

        function firstQueryFunction(callback){
             con.query(totalquery, function(err, rows) {
               if(err){
                //  console.log(err);
                 callback();
               }

               if(rows[0]['NUM'] !== undefined){
                 obj.total = rows[0]['NUM'];
                }
                callback();
             })


        }

        function secondQueryFunction(callback){
            con.query(precentagequery, function(err, rows) {
              if(err){
                callback();
              }
              if(rows.length > 0){
                rows.forEach(function(row){
                  var percentage = ((row.num_jobs/obj.total)*100);
                  var round = Math.round(((percentage*100)))/100;
                  obj.labels.push(row.occupation);
                  obj.data.push(row.num_jobs);
                  obj.percentage.push(round);
                })
              }

              callback();
            })
          }

         async.series([
                firstQueryFunction,
                secondQueryFunction
            ], function (err, result) {
                res.send(obj);
            });
    });
  }

  this.cardInfo = function(req,res) {
    connection.acquire(function(err,con){
      var obj = {};

      function firstQueryFunction(callback){
           con.query("SELECT SUM(num_jobs) AS NUM, AVG(salary) AS avgSalary FROM JOBS WHERE date(datetime) = DATE(curdate())", function(err, rows) {
             if(err){
               callback();
             }
              if(rows[rows.length - 1]){
                obj.avgSalary = Math.round(rows[0]['avgSalary']);
                obj.total = rows[0]['NUM'];
              }
              callback();
           })


      }

      function secondQueryFunction(callback){
          con.query("SELECT * FROM JOBS WHERE date(datetime) = DATE(curdate()) ORDER BY num_jobs DESC LIMIT 1", function(err, rows) {
            if(err){
              console.log(err);
              callback();
            }

            if(rows[rows.length - 1]){
               obj.mostpopular = rows[0]['occupation'];
               obj.county = rows[0]['county'];
             }
             callback();
          })
        }

       async.series([
              firstQueryFunction,
              secondQueryFunction
          ], function (err, result) {
                res.send(obj);
          });
    });
  }

}

module.exports = new Data();
