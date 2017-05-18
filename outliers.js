var _ = require('lodash');


var Outliers = function(array) {
  array = array || {};

  function Outliers(someArray) {

      var values = [];
      
      someArray.forEach(function(value){
        values.push(value.num_jobs);
      })

      var q1 = median(values.slice(0, Math.floor(values.length / 2)));
      var q3 = median(values.slice(Math.ceil(values.length / 2)));
      var iqr = (q3 - q1);

      var range = iqr * 1.5;
      var middle = median(values);

      var outlier =  [];

      values.forEach(function(x) {
          if(Math.abs(x - middle) > range){
              outlier.push(x);
          }
      });
      // Then return
      return outlier;
  }

  function median(array) {
      var half = Math.floor(array.length / 2);
      return array.length % 2 ? array[half] : (array[half - 1] + array[half]) / 2;
  };


  if(Outliers(array).length > 0){
    return _.sumBy(array, 'num_jobs')/array.length;
  }
  else{
    return _.maxBy(array, 'num_jobs').num_jobs;
  }

}

module.exports = {
  Outliers: Outliers
};
