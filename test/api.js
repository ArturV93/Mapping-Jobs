var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
var request = require('request');
var cheerio = require('cheerio');
var url = require('url');

router.get('/API/v1/scraping/jsdom', function(req, res){

  //Tell the request that we want to fetch youtube.com, send the results to a callback function
   request({uri: 'http://www.jobs.ie/accountancy_finance-dublin_jobs.aspx'}, function(err, response, body){
       var self = this;
       self.items = [];//I feel like I want to save my results in an array

       //Just a basic error check
       if(err && response.statusCode !== 200){console.log('Request error.');}
       //Send the body param as the HTML code we will parse in jsdom
       jsdom.env({
                   html: body,
                   scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
                   done: function(err, window){
                      //Use jQuery just as in a regular HTML page
                     var $ = window.jQuery;

                     var $body = $('body');
                    //  console.log($body);
                    //  console.log($('div#displaying-no strong:eq(1)').text());
                    self.items.push($('div#displaying-no strong:eq(1)').text());
                     res.json(self.items);
                   }
         });
   });
})

router.get('/API/v1/scraping/cheerio', function(req, res){

  request('http://www.jobs.ie/accountancy_finance-dublin_jobs.aspx', function(err, resp, html) {

        var self = this;
        self.items = [];
        if(err && response.statusCode !== 200){console.log('Request error.');}
        $ = cheerio.load(html);

        self.items.push($('div#displaying-no strong').eq(1).text());

        $.html();
        res.send(self.items);
  });

})

module.exports = router;
