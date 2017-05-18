var express = require('express');
var router = express.Router();
var list = require('../models/list');


router.get('/API/v1/titles', function(req,res){
      list.titles(req,res);
});

module.exports = router;
