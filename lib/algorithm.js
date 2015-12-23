var gen = require('./generator.js');
var async = require('async');
//courseQ of classes
var courseQ = ['MATH-226', 'CSCI-103'];

function getFirstClass(getNextClassCB) {
  gen.getJSON('MATH-226', 20161, function(json) {
    getNextClassCB(null, json);
  });
}

function getNextClass(result, processClassCallback) {
  gen.getJSON('CSCI-103', 20161, function(json) {
    processClassCallback(null, result, json);
  });
}

function processFirstSecondClasses(result, oresult, display) {
  result = result.map(function(sections) {
    return sections.map(function(section){
      return section.type;
    });
  });
  oresult = oresult.map(function(sections) {
    return sections.map(function(section){
      return section.type;
    });
  });
  display(null,result,oresult);
}
function display(result,oresult){
  console.log("Result",result);
  console.log("Next",oresult);
}

async.waterfall([getFirstClass, getNextClass, processFirstSecondClasses,display], function(error) {});
//gen.getJSON('CSCI-103',20161,function(x){console.log(x.length);})
