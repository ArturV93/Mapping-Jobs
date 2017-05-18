var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');


var regionJobs = {
  'Carlow': 7,
  'Cavan': 8,
  'Clare': 9,
  'Cork': 10,
  'Donegal': 11,
  'Dublin': 63,
  'Dublin': 5,
  'Dublin': 4,
  'Dublin': 6,
  'Dublin': 3,
  'Galway': 12,
  'Kerry': 13,
  'Kildare': 14,
  'Kilkenny': 15,
  'Laois': 16,
  'Leitrim': 17,
  'Limerick': 18,
  'Longford': 19,
  'Louth': 20,
  'Mayo': 21,
  'Meath': 22,
  'Monaghan': 23,
  'Offaly': 24,
  'Roscommon': 25,
  'Sligo': 26,
  'Tipperary': 27,
  'Waterford': 28,
  'Westmeath':29,
  'Wexford':30,
  'Wicklow':31
}

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

router.post('/API/v1/scrape', function(req,res){

  var results = [];
  var urls = [];
  var str = req.body.search;
  if(str !== undefined){
    var input = str.split(' ').join('+');
  }

  for (var key in regionJobs) {
    if (regionJobs.hasOwnProperty(key)) {
      var url = 'http://www.jobs.ie/Jobs.aspx?hd_searchbutton=true&Categories=0&Regions='+ regionJobs[key] +'&Keywords=' + input;
      urls.push({
              id: 0,
              url: url,
              county: key
            });
    }
  }

  for (var key in regionIrJobs) {
    if (regionJobs.hasOwnProperty(key)) {
      var url = 'http://www.irishjobs.ie/ShowResults.aspx?Keywords='+ input + '&Location='+ regionIrJobs[key]  + '&Category=&Recruiter=Company&Recruiter=Agency';
      urls.push({
              url: url,
              county: key
            });
    }
  }

  function scraping(url, callback) {

    request({uri: url.url}, function(error, resp, body) {

        if (error) {
          console.log("We've encountered an error: " + error);
          return callback();

        } else {
          var $ = cheerio.load(body);

          if(url.id === 0){
            var total = ($('div#displaying-no strong').eq(1).text());

            if(total === ''){
              total = 0;
            }
            results.push({
              county: url.county,
              salary: 0,
              total: parseInt(total)
            })
            return callback();
          }
          else{
            var total = ($('div.job-options.sort-job label').eq(0).text());
            var salary = ($('div.refine-option').text());
            var avgSalary = 0;
            total = parseInt(total.replace(/[^0-9\.]+/g, ""));
            salary = salary.match(/\€(\d+)/g);
             _.forEach(salary, function (value){
               value = parseInt(value.replace(/\D+/g,''));
               avgSalary += value;
             })
             if(salary){
               avgSalary = Math.round((avgSalary/salary.length)/1000)*1000;
             }

            results.push({
              county: url.county,
              salary: avgSalary,
              total: total
            })

            return callback();
          }
        }
    });

  }

  async.map(urls, scraping, function(err, result) {

    var output = _(results)
                .groupBy('county')
                .map(function(v, k) {
                  return {
                    id: k,
                    description: salaryFunc(_.sumBy(v, 'salary')),
                    customData:  _.sumBy(v, 'total'),
                    value:  _.sumBy(v, 'total')
                  }
                })
                .value();

    function salaryFunc(salary){
      if(salary === 0){
        return 'Not Available';
      }else{
        return '€' + Math.round(salary);
      }
    }

    res.send(output);
  });


});

module.exports = router;
