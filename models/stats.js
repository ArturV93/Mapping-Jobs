var connection = require('../config/dbConnection');
var async = require('async');
var _ = require('lodash');
var moment = require('moment')
var naiveBayes = require('../naivebayes');


function Stats() {

  this.allDays = function(req,res) {
    connection.acquire(function(err,con){
      var result = [];
      var county = req.body.county.county;
      var careers = req.body.occupation.careers;

      if(careers && county){
        var allDaysQuery = "SELECT county,num_jobs,rate,datetime FROM jobs WHERE occupation='"+ careers + "' AND county='"+ county +"' ORDER BY date(datetime) ASC";
      }

      con.query(allDaysQuery, function(err, rows) {
        rows.forEach(function(row){

          result.push({
            visits: row.num_jobs,
            date: row.datetime
          })
        })

        res.send(result);
      })
    })
  }

  this.naive_bayes = function(req,res) {
    connection.acquire(function(err,con){
      var careers = req.body.occupation.careers;
      var county = req.body.county.county;
      var lasttendays = "SELECT county,num_jobs,rate FROM jobs WHERE occupation=? ORDER BY date(datetime) ASC";
      var predict = "SELECT county,num_jobs FROM jobs WHERE occupation = ? AND county = ? AND date(datetime) = date(curdate()) ORDER BY date(datetime) ASC";
      var todayDate = {};
      var array = [];

      function firstQueryFunction(callback){
        con.query(lasttendays, [careers], function(err,rows){
          rows.forEach(function(row){
            array.push({
              county: row.county,
              num_jobs: row.num_jobs,
              rate: row.rate
            })
          })
          callback();
        })
      }

      function secondQueryFunction(callback){
          con.query(predict,[careers,county], function(err,rows){

            todayDate = {
              county: rows[0].county,
              num_jobs: rows[0].num_jobs
            }
            callback();
          })
      }

      async.series([
             firstQueryFunction,
             secondQueryFunction
         ], function (err, result) {
            var cls = new naiveBayes.NaiveBayes(array);
            cls.train();
            var answer = cls.predict(todayDate);
            res.send(answer);
          });

    })
  }


  this.compareTwoSectors = function(req,res) {
    connection.acquire(function(err,con){

      var occupationA = req.body.occupationA.careers;
      var occupationB = req.body.occupationB.careers;
      var countyA = req.body.countyA.county;
      var countyB = req.body.countyB.county;

      var seriesA = "SELECT county, num_jobs, salary, datetime FROM jobs WHERE occupation = ? AND county = ? AND date(datetime) > date(now() - INTERVAL 20 Day) ORDER BY date(datetime) ASC";
      var seriesB = "SELECT county, num_jobs, salary, datetime FROM jobs WHERE occupation = ? AND county = ? AND date(datetime) > date(now() - INTERVAL 20 Day) ORDER BY date(datetime) ASC";
      var seriesAarr = { county: [], num_jobs: [], datetime: [], salary: []};
      var seriesBarr = { county: [], num_jobs: [], datetime: [], salary: []};

      function firstQueryFunction(callback){
        con.query(seriesA, [occupationA, countyA], function(err,rows){
          rows.forEach(function(row){
            seriesAarr.county.push(row.county);
            seriesAarr.num_jobs.push(row.num_jobs);
            seriesAarr.datetime.push(moment(row.datetime).format('MMMM Do'));
            seriesAarr.salary.push((row.salary));
          })
          callback();
        })
      }

      function secondQueryFunction(callback){
          con.query(seriesB, [occupationB, countyB], function(err,rows){
            rows.forEach(function(row){
              seriesBarr.county.push(row.county);
              seriesBarr.num_jobs.push(row.num_jobs);
              seriesBarr.datetime.push(moment(row.datetime).format('MMMM Do'));
              seriesBarr.salary.push((row.salary));
            })
            callback();
          })
      }

      async.series([
             firstQueryFunction,
             secondQueryFunction
         ], function (err, result) {
           
            var output = {
              labels: seriesAarr.datetime,
              data: [seriesAarr.num_jobs, seriesBarr.num_jobs]
            }

            res.send(output);
          });

    })
  }

}

module.exports = new Stats();
