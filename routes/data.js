var express = require('express');
var router = express.Router();
var data = require('../models/data');

//used in alerts-ctrl.js
router.post('/API/v1/jobs', function(req,res){
    data.jobs(req,res);
});

router.post('/API/v1/careersInfo', function(req,res){
    data.careersInfoDonught(req,res);
});

router.get('/API/v1/cardinfo', function(req,res){
    data.cardInfo(req,res);
});

module.exports = router;
