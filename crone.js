var connection = require('./config/dbConnection');
var schedule = require('node-schedule');
var async = require('async');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');

var category = [
  {jobsIe:'architecture_design', name:'Arts, Audio/Video Technology and Communications'},
  {jobsIe:'online_digital_media', name:'Arts, Audio/Video Technology and Communications'},
  {jobsIe:'financial_services', name:'Business Management and Administration'},
  {jobsIe:'accountancy_finance', name:'Business Management and Administration'},
  {jobsIe:'managers_supervisors', name:'Business Management and Administration'},
  {jobsIe:'secretarial_admin_pa', name:'Business Management and Administration'},
  {jobsIe:'hr_recruitment', name:'Business Management and Administration'},
  {jobsIe:'academic', name:'Education and Training'},
  {jobsIe:'education_training', name:'Education and Training'},
  {jobsIe:'accountancy_finance', name:'Finance'},
  {jobsIe:'banking_insurance', name:'Finance'},
  {jobsIe:'fitness_and_leisure', name:'Health Science'},
  {jobsIe:'healthcare_medical', name:'Health Science'},
  {jobsIe:'pharmaceutical_science', name:'Health Science'},
  {jobsIe:'chef_jobs', name:'Hospitality and Tourism'},
  {jobsIe:'hotels', name:'Hospitality and Tourism'},
  {jobsIe:'travel_tourism', name:'Hospitality and Tourism'},
  {jobsIe:'restaurants_catering', name:'Hospitality and Tourism'},
  {jobsIe:'pubs_bars_clubs', name:'Hospitality and Tourism'},
  {jobsIe:'childcare', name:'Human Services'},
  {jobsIe:'hair_and_beauty', name:'Human Services'},
  {jobsIe:'big_data_business_analysis', name:'Information Technology'},
  {jobsIe:'it_programming', name:'Information Technology'},
  {jobsIe:'tech_support_services', name:'Information Technology'},
  {jobsIe:'legal', name:'Law, Public Safety, Corrections and Security'},
  {jobsIe:'security', name:'Law, Public Safety, Corrections and Security'},
  {jobsIe:'security', name:'Law, Public Safety, Corrections and Security'},
  {jobsIe:'manufacturing_engineering', name:'Manufacturing'},
  {jobsIe:'marketing_market_research', name:'Marketing, Sales and Service'},
  {jobsIe:'sales_up_to_euro35k', name:'Marketing, Sales and Service'},
  {jobsIe:'sales_euro35k', name:'Marketing, Sales and Service'},
  {jobsIe:'call_centre_customer_service', name:'Marketing, Sales and Service'},
  {jobsIe:'voluntary_charity_work', name:'Marketing, Sales and Service'},
  {jobsIe:'multi_lingual', name:'Marketing, Sales and Service'},
  {jobsIe:'trades_operative_manual', name:'Marketing, Sales and Service'},
  {jobsIe:'motors', name:'Marketing, Sales and Service'},
  {jobsIe:'construction_engineering', name:'Science, Technology, Engineering and Mathematics'},
  {jobsIe:'drivers', name:'Transportation, Distribution and Logistics'},
  {jobsIe:'drivers', name:'Transportation, Distribution and Logistics'},
  {jobsIe:'warehouse_logistics_shipping', name:'Transportation, Distribution and Logistics'},
  {jobsIe:'graduate', name:'Graduate'}
];

var categoryIrjobs = [
  {irjobs:'9', name:'Architecture and Construction'},
  {irjobs:'115', name:'Government and Public Administration'},
  {irjobs:'25', name:'Arts, Audio/Video Technology and Communications'},
  {irjobs:'27', name:'Business Management and Administration'},
  {irjobs:'8', name:'Business Management and Administration'},
  {irjobs:'114', name:'Business Management and Administration'},
  {irjobs:'16', name:'Business Management and Administration'},
  {irjobs:'13', name:'Education and Training'},
  {irjobs:'20', name:'Finance'},
  {irjobs:'2', name:'Health Science'},
  {irjobs:'17', name:'Health Science'},
  {irjobs:'1', name:'Hospitality and Tourism'},
  {irjobs:'19', name:'Hospitality and Tourism'},
  {irjobs:'11', name:'Human Services'},
  {irjobs:'3', name:'Information Technology'},
  {irjobs:'5', name:'Information Technology'},
  {irjobs:'4', name:'Law, Public Safety, Corrections and Security'},
  {irjobs:'7', name:'Manufacturing'},
  {irjobs:'21', name:'Marketing, Sales and Service'},
  {irjobs:'24', name:'Marketing, Sales and Service'},
  {irjobs:'23', name:'Marketing, Sales and Service'},
  {irjobs:'10', name:'Marketing, Sales and Service'},
  {irjobs:'12', name:'Marketing, Sales and Service'},
  {irjobs:'26', name:'Science, Technology, Engineering and Mathematics'},
  {irjobs:'6', name:'Science, Technology, Engineering and Mathematics'},
  {irjobs:'18', name:'Transportation, Distribution and Logistics'},
  {irjobs:'14', name:'Transportation, Distribution and Logistics'},
  {irjobs:'28', name:'Graduate'}
];

var county = ['Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Dublin', 'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick',
'Longford', 'Louth', 'Mayo', 'Meath', 'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Waterford',
'Westmeath', 'Wexford', 'Wicklow'];

var regionIrJobs = {
  'Carlow': 2,
  'Cavan': 24,
  'Clare': 41,
  'Cork': 42,
  'Donegal': 11,
  'Dublin': 102,
  'Galway': 61,
  'Kerry': 44,
  'Kildare': 3,
  'Kilkenny': 4,
  'Laois': 5,
  'Leitrim': 63,
  'Limerick': 45,
  'Longford': 6,
  'Louth': 7,
  'Mayo': 64,
  'Meath': 8,
  'Monaghan': 29,
  'Offaly': 9,
  'Roscommon': 65,
  'Sligo': 66,
  'Tipperary': 47,
  'Waterford': 48,
  'Westmeath': 10,
  'Wexford': 11,
  'Wicklow':12
}


function Crone(){

  var rule = new schedule.RecurrenceRule();
  rule.hour = 00;
  rule.minute = 06;

  var rule2 = new schedule.RecurrenceRule();
  rule2.hour = 00;
  rule2.minute = 26;

  var newdata = new schedule.RecurrenceRule();
  newdata.hour = 13;
  newdata.minute = 35;

schedule.scheduleJob(newdata, function(){

  connection.acquire(function(err,con){
      var array = [];
      var yesterday = [];

       function firstQueryFunction(callback){
           con.query("SELECT county, occupation, sum(num_jobs) as num_jobs, ROUND(AVG(NULLIF(salary,0))) AS salary FROM irishjobs_ie WHERE date(datetime) = date(CURDATE() - interval 1 day) GROUP BY county, occupation", function(err, rows) {
             rows.forEach(function(row){
               if(row.salary === null){
                 row.salary = 0;
               }

               array.push({
                 county: row.county,
                 occupation: row.occupation,
                 number_jobs: row.num_jobs,
                 salary: row.salary
               });
             });
            callback();

          });
       }

       function secondQueryFunction(callback){

           con.query("SELECT county, occupation, sum(num_jobs) AS num_jobs FROM jobs_ie WHERE date(datetime) = date(CURDATE() - Interval 1 day) GROUP BY county, occupation", function(err, rows) {

             rows.forEach(function(row){
               array.push({
                 county: row.county,
                 occupation: row.occupation,
                 number_jobs: row.num_jobs,
                 salary: 0
               });
            });

            callback();
          });
       }

       function thirdQueryFunction(callback){

           con.query("SELECT * FROM JOBS WHERE date(datetime) = date(CURDATE() - INTERVAL 1 day)", function(err, rows) {

              rows.forEach(function(row){
                	yesterday.push({
                             county: row.county,
                             occupation: row.occupation,
                             salary: row.salary,
                             num_jobs: row.num_jobs,
                           });
             });
             callback();
           })
       }

       async.series([
              firstQueryFunction,
              secondQueryFunction,
              thirdQueryFunction
          ], function (err, result) {
            var output = _(array)
                        .groupBy(function(value){
                          return value.occupation + '#' + value.county;
                        })
                        .map(function(v) {
                          return {
                            county: v[0].county,
                            occupation: v[0].occupation,
                            salary: v[0].salary,
                            total:  _.sumBy(v, 'number_jobs')
                          }
                        })
                        .value();


          _.each(output,function(v,k){
              return _.mapValues(yesterday, function(v1,k1){
                if(v.county === v1.county && v.occupation === v1.occupation){
                  if(v.total > v1.num_jobs){
                    v.rate = 1;
                    return v;
                  }else{
                    v.rate= 0;
                    return v;
                  }
                }
              })
            })

            output.forEach(function (results) {
                con.query("insert into jobs (county, occupation, num_jobs, salary, rate) values(?,?,?,?,?)",[results.county, results.occupation, results.total, results.salary, results.rate], function(err,rows){})
            });

       });
  });
})

schedule.scheduleJob( rule2, function(){
  var urls = [];

  categoryIrjobs.forEach( function(occupation){
    for(var key in regionIrJobs){
        var url = 'http://www.irishjobs.ie/ShowResults.aspx?Keywords=&Location='+ regionIrJobs[key] + '&Category=' + occupation.irjobs + '&Recruiter=Company&Recruiter=Agency';
          urls.push({
            category: occupation.name,
            url: url,
            county: key
          });
    }
  })

  var slice = [];
  var i = 0;
  var failure = [];
  var results = [];

  function scraping(url, callback){

      results = [];
      request({uri: url.url}, function(error, response, body) {

          if (error) {

            failure.push(url);
            console.log("We've encountered an error: " + error);
            return callback();

          } else {
            var $ = cheerio.load(body);
            var total = ($('div.job-options.sort-job label').eq(0).text());
            //get from each card
            ($('ul.job-overview')).each(function(i,elm){
                  var salary = ($(elm).find('li.salary').eq(0).text());
                  var a = salary.split(/[ -]+/);

                   _.forEach(a, function (value){
                     value = parseInt(value.replace(/\D+/g,''));
                     if(!isNaN(value)){
                       avgSalary.push(value);
                     }
                   })

            });

            if(avgSalary.length > 0){
              avgSalary = Math.round((_.sum(avgSalary)/avgSalary.length)/1000)*1000;
            }else{
              avgSalary = 0;
            }

            if(isNaN(total)){
              total = 0;
            }

            results.push({
              occupation: url.category,
              county: url.county,
              salary: avgSalary,
              total: total
            })


            return callback(error , results );
          }

        });
  }

  var loop = function(){

   setTimeout( function(){

      console.log(i + "   start");
      slice = _.slice(urls, i , i += 50);

      if(i <= (urls.length+50)){
        async.map(slice, scraping, function(err, data) {
           console.log(results.length   + "     results lenght");
           addTodb(results);
           loop();
        })
      }
      else{
        if(failure.length > 0){

          var failurl = [];
          failurl = failurl.concat(failure);
          failure = [];

          async.map(failurl, scraping, function(err, data) {
              console.log(failure.length + "      failure lenght");
              addTodb(results);
              loop();
          })

        }else{
          console.log("Clear");
          clearTimeout(loop);
        }
      }

    }, 25000);
  }

  function addTodb(results){
    connection.acquire(function(err,con){

      results.forEach(function(result) {
        con.query("insert into irishjobs_ie (county,occupation,num_jobs,salary) values(?,?,?,?)",[result.county, result.occupation, result.total, result.salary], function(){});
      })
    })
  }

  loop();
})

schedule.scheduleJob( rule, function(){
    var urls = [];

    category.forEach( function(occupation){
      for (var i = 0; i < county.length; i++) {
        var url = 'http://www.jobs.ie/'+ occupation.jobsIe +'-' + county[i] + '_jobs.aspx';
            urls.push({
              category: occupation.name,
              url: url,
              county: county[i]
            });

      }
    })

    var slice = [];
    var i = 0;
    var failure = [];
    var results = [];

    function scraping(url, callback){

          results = [];
          request({uri: url.url}, function(error, response, body) {

              if (error) {

                failure.push(url);
                console.log("We've encountered an error: " + error);
                return callback();

              } else {
                var $ = cheerio.load(body),
                    total = ($('div#displaying-no strong').eq(1).text());

                results.push({
                  occupation: url.category,
                  county: url.county,
                  total: total
                })
                return callback(error , results );
              }

            });
      }

    var loop = function(){

     setTimeout(function(){

         console.log(i + " start");
      slice = _.slice(urls, i, i += 50);

      if(i <= (urls.length+50)){
        async.map(slice, scraping, function(err, data) {
           console.log(results.length   + "     results lenght");
           addTodb(results);
           loop();
        })
      }
      else{
        if(failure.length > 0){

          var failurl = [];
          failurl = failurl.concat(failure);
          failure = [];

          async.map(failurl, scraping, function(err, data) {
              addTodb(results);
              loop();
              console.log(failure.length + "      failure lenght");
          })
        }else{
          console.log("Clear");
          clearTimeout(loop);
        }
      }

      }, 25000);
  }

  function addTodb(results) {
    connection.acquire(function(err,con){

      results.forEach(function(result){

        con.query("insert into jobs_ie (county,occupation,num_jobs) values(?,?,?)",[result.county, result.occupation, result.total], function(err,rows,result){});
      })
    })
  }

    loop();
  })

}

module.exports = new Crone();
