var gen = require('./generator.js');
var async = require('async');
//courseQ of classes
var courseQ = ['MATH-226', 'CSCI-103'];

function getFirstClass(getNextClassCB){
    gen.getJSON('MATH-226',20161,function(json){
      getNextClassCB(null,json);
    });
}

function getNextClass(result,processClassCallback){
  gen.getJSON('CSCI-103',20161, function(json){
    console.log('done');
    processClassCallback(null);
  });
}

async.waterfall([getFirstClass,getNextClass],function(error){});
//gen.getJSON('CSCI-103',20161,function(x){console.log(x.length);})
