var _ = require('lodash');


var NaiveBayes = function(career) {
  career = career || {};
  // [{"county":"Cork","num_jobs":12,"rate":1},{"county":"Dublin","num_jobs":263,"rate":0},{"county":"Galway","num_jobs":10,"rate":1},
  // {"county":"Cork","num_jobs":12,"rate":0},{"county":"Dublin","num_jobs":284,"rate":1},
  // {"county":"Galway","num_jobs":9,"rate":0},{"county":"Cork","num_jobs":12,"rate":0},
  // {"county":"Dublin","num_jobs":284,"rate":1},{"county":"Galway","num_jobs":9,"rate":0},
  // {"county":"Dublin","num_jobs":284,"rate":1},{"county":"Galway","num_jobs":9,"rate":0},
  // {"county":"Cork","num_jobs":10,"rate":0},{"county":"Dublin","num_jobs":302,"rate":0},
  // {"county":"Galway","num_jobs":7,"rate":0},{"county":"Cork","num_jobs":10,"rate":0},
  // {"county":"Dublin","num_jobs":296,"rate":0},{"county":"Galway","num_jobs":6,"rate":0}]
  this.probabilities = {};

  NaiveBayes.prototype.train = function (){
    var frequencies = {};
    var probabilities = {};

    frequencies.rate_of_increase = _.countBy(career, function(data){
        return data.rate;
    })

    probabilities.rate_of_increase = _.mapValues(frequencies.rate_of_increase, function(v, k) {
      return v / career.length;
    });


    frequencies.county = _
                .chain(career)
                .groupBy('county')
                .mapValues(function(v, k) {
                  var obj = {};
                  obj =  _.countBy(v, 'rate');
                  return obj;
                })
                .value();

    probabilities.county = _.mapValues(frequencies.county, function(v,k){
      var obj = {};
      obj['0'] = v[0] / frequencies.rate_of_increase['0'];
      obj['1'] = v[1] / frequencies.rate_of_increase['1'];
      return obj;
    })

    probabilities.num_jobs = _(career)
                .chain()
                .groupBy('rate')
                .mapValues(function(v, k){

                  var obj = {};
                  var avg = _.sumBy(v, 'num_jobs')/ v.length

                  obj['mean']  = k = avg,
                  obj['std'] =   Math.sqrt(_.sumBy(_.map(v, function(i){ return Math.pow((i.num_jobs - avg),2)/ (v.length-1) })))

                  return obj;
                })
                .valueOf();

    this.probabilities = probabilities;

  };

  NaiveBayes.prototype.predict = function(prediction) {
    var answer = {};
    var probabilities = this.probabilities;
    var jobsValue = prediction.num_jobs;
    var countyValue = prediction.county;

    var numProb = _.mapValues(probabilities.num_jobs, function(v,k){
      var obj = {};
      var mean = v.mean;
      var std = v.std;
      obj = numericProbability(jobsValue, mean, std);
      return obj;
    });

    _.forOwn(probabilities.county, function(v,k){
        if(k === countyValue){
            answer = _.mapValues(v, function(v,k){
                var obj = {};
                obj = numProb[k] * v * probabilities.rate_of_increase[k];
                return obj;
            })
        }
    })


    if(answer['0'] > answer['1']){
      answer.num_jobs = _.minBy(career, 'num_jobs').num_jobs;
      answer.answer = 0;
    }else{
      answer.num_jobs = _.maxBy(career, 'num_jobs').num_jobs;
      answer.answer = 1;
    }

    return answer;

  }

  // Calculates probability of a numeric value
  function numericProbability(value, mean, std) {
    return (1 / ( std * Math.sqrt(2 * Math.PI))) *
                              Math.pow(Math.E,
                                       (-(Math.pow(value - mean, 2)) /
                                        (2 * Math.pow(std,2)))
                                      );
  }

};

module.exports = {
  NaiveBayes: NaiveBayes
};
