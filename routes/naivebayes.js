var express = require('express');
var router = express.Router();
var _ = require('lodash');
var stats = require('../models/stats');

router.post('/API/v1/naiveBayes', function(req,res){
    stats.naive_bayes(req,res);
});

router.post('/API/v1/alldays', function(req,res){
    stats.allDays(req,res);
})

router.post('/API/v1/compare', function(req,res){
    stats.compareTwoSectors(req,res);
})

module.exports = router;
