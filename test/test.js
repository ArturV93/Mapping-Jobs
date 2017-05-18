process.env.NODE_ENV = 'test';



//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let _ = require('lodash');
let outliers = require('../outliers');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

chai.use(chaiHttp);

// describe('/GET API v1', function() {
//     it('it should GET Hello World', function(done) {
//       	chai.request(server)
//             .get('/API/v1/')
//             .end(function(err, res){
// 		      res.should.have.status(200);
// 		      // res.should.be.json;
// 		      // res.body.should.be.a('array');
// 		      done();
// 		    });
//     });
// })

describe('Scraping page with JSDOM', function() {
    it('it should GET Scrape Page', function(done) {
      	chai.request(server)
            .get('/tests/API/v1/scraping/jsdom')
            .end(function(err, res){
    		      res.should.have.status(200);
    		      res.should.be.json;
    		      // res.body.should.be.a('array');
		      done();
		    });
    });
})

describe('Scraping page with Cheerio', function() {
    it('it should GET Scrape Page', function(done) {
      	chai.request(server)
            .get('/tests/API/v1/scraping/cheerio')
            .end(function(err, res){
    		      res.should.have.status(200);
    		      res.should.be.json;
    		      // res.body.should.be.a('array');
		      done();
		    });
    });
})


describe('Normal Distribution', function() {
    it('it should compare with calculated manual answer for normal distribution', function(done) {

        var mean = 79.1;
        var std = 10.2;
        var value = 74;

        var normal_dist = (1 / ( std * Math.sqrt(2 * Math.PI))) *
                                  Math.pow(Math.E,
                                           (-(Math.pow(value - mean, 2)) /
                                            (2 * Math.pow(std,2)))
                                          );
        normal_dist = Math.round(normal_dist * 100000000)/ 100000000;
        assert.isNumber(normal_dist, 'this is the number');
        assert.equal(0.03451621,normal_dist, 'answer is === to manual calculated');

        done();
    });
})

describe('Standard deviation and Mean', function() {
    it('it should compare with calculated manual answer for standratd deviation', function(done) {

        var v = [
        {"county":"Dublin","num_jobs":263,"rate":0},
        {"county":"Dublin","num_jobs":284,"rate":1},
        {"county":"Dublin","num_jobs":284,"rate":1},
        {"county":"Dublin","num_jobs":302,"rate":0},
        {"county":"Dublin","num_jobs":296,"rate":0},
        {"county":"Dublin","num_jobs":296,"rate":0}];

        var mean = _.sumBy(v, 'num_jobs')/ v.length;
        var normal_dist = Math.sqrt(_.sumBy(_.map(v, function(i){ return Math.pow((i.num_jobs - mean),2)/ (v.length-1) })));
        //round by 8 numbers
        normal_dist = Math.round(normal_dist * 100000000)/ 100000000;

        assert.isNumber(mean, 'this is the number');
        assert.isNumber(normal_dist, 'this is the number');
        assert.equal(287.5, mean, 'answer is === to manual calculated');
        assert.equal(13.99642812, normal_dist, 'answer is === to manual calculated');

        done();
    });
})

describe('Comparing two arrays', function() {
    it('it should compare two arrays and add "rate" key if jobs are increased is 1 and 0 for decreased', function(done) {
            var today = [{
            	county: 'Dublin',
              occupation: 'Art',
              num_jobs: 256
            },{
            	county: 'Dublin',
              occupation: 'Graduate',
              num_jobs: 100
            },{
            	county: 'Clare',
              occupation: 'Art',
              num_jobs: 100
            },{
            	county: 'Dundalk',
              occupation: 'Graduate',
              num_jobs: 70
            }]
            var yesterday = [{
            	county: 'Dublin',
              occupation: 'Art',
              num_jobs: 356
            },{
            	county: 'Dublin',
              occupation: 'Graduate',
              num_jobs: 70
            },{
            	county: 'Clare',
              occupation: 'Graduate',
              num_jobs: 50
            },{
            	county: 'Cavan',
              occupation: 'Graduate',
              num_jobs: 90
            }]
            var something = _.each(today,function(v,k){
             	return _.mapValues(yesterday, function(v1,k1){
                if(v.county === v1.county && v.occupation === v1.occupation){

                  if(v.num_jobs > v1.num_jobs){
                  	v.rate = 1;
                    return v;
                  }else{
                  	v.rate= 0;
                    return v;
                  }
                }
              })
            })

            expect(something[0]).to.have.property('rate');
            expect(something[0]).to.deep.equal({county: "Dublin", occupation: "Art", num_jobs: 256, rate: 0});
            assert.isArray(something, 'not empty array');

            done();
    })
})

describe('Comparing two arrays', function() {
    it('it should return true that array has outlier', function(done) {
            var findOutlier = [{
            	county: 'Dundalk',
              occupation: 'Graduate',
              num_jobs: 70
            },{
            	county: 'Dublin',
              occupation: 'Graduate',
              num_jobs: 100
            },{
            	county: 'Clare',
              occupation: 'Art',
              num_jobs: 100
            },{
            	county: 'Dublin',
              occupation: 'Art',
              num_jobs: 256
            },{
            	county: 'Dublin',
              occupation: 'Art',
              num_jobs: 1000
            }]

            var value = outliers.Outliers(findOutlier);
            assert.isNumber(bool, 'this is the number');
            assert.equal(305.2, bool, 'answer is === to manual calculated');

            done();
    })
})
