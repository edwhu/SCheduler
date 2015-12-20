/* generator.js- generates an array of section-sets for a given course
section-set: an array containing distinct elements of a course, represents
one possibility of a course schedule*/

var query = require('./request-course.js');
var time = require('./timeutil.js');
//creates an object with keys of section type containing corresponding
//sections
function generateInfo(classname, dept, term, cb) {
  query.requestSection(classname, dept, 20161, function(sectionArray) {
    var setInfo = {};
    sectionArray.forEach(function(section) {
      var keys = Object.keys(setInfo);
      var sectionType = section.type;
      //if exists push section into section type array
      if (keys.indexOf(sectionType) > -1) {
        setInfo[sectionType].push(section);
      } else {
        //else create new array at key section type, push into
        // setInfo and update keys
        setInfo[sectionType] = [];
        setInfo[sectionType].push(section);
        keys.push(sectionType);
      }
    }); //end foreach
    cb(setInfo, sectionArray);
  }); //end query
} //end generate


//generates course-sets index numbers using sectionArray data
//distinctSec:[a,b,c], a is an array of all type a elements
//split up json into multiple json objects
function setIndexGenerator(distinctSecIndex, distinctSec, answer, func) {
  generateSetIndex(distinctSecIndex, distinctSec, answer, func, [], 0);
} // end setIndexGenerator
function generateSetIndex(distinctSecIndex, distinctSec, answer, func, args, index) {
  if (distinctSecIndex.length == 0) {
    func(args, distinctSec, answer);
  } else {
    var rest = distinctSecIndex.slice(1);
    for (args[index] = 0; args[index] < distinctSecIndex[0]; ++args[index]) {
      generateSetIndex(rest, distinctSec, answer, func, args, index + 1);
    }
  }
} //end generateSetIndex

//combine and check for conflicts in the course set
function combine(args, distinctSec, answer) {
  var limit = args.length - 1;
  answer.push(args.map(function(curr, index, array) {
    return distinctSec[index][curr];
  }));
} //end combine

function sectionSetOK(sectionSet) {
  var limit = sectionSet.length - 1;
  return sectionSet.every(function(section, index, array) {
    if (index < limit) {
      //return true if no conflict
      return !time.conflict(section, array[index + 1]) && (section.day!=array[index+1].day);
    }
    return true;
  })
} //end sectionOK

//answer: [[a,b,c],[d,e,f],[g,h,i]]
function answerOK(answer, cb) {
  var foo = answer.filter(sectionSetOK);
  cb(foo);
} //end courseSetOK

//final method, call this to create Answer, array of coursesets
function sendJason(name, dept, term, cb) {
  var answer = [];
  generateInfo(name, dept, term, function(setInfo, sectionArray) {
    //create distinctsec out of set info
    var distinctSec = Object.keys(setInfo).map(function(key) {
      return setInfo[key]
    });
    //generate array of indexes of distinctsec
    var distinctSecIndex = Object.keys(setInfo).map(function(key) {
      return setInfo[key].length;
    });
    setIndexGenerator(distinctSecIndex, distinctSec, answer, combine);
    console.log('original length: ',answer.length);
    //check courseSet for conflicts
    answerOK(answer, cb);
    //cb(answer);
  }); //end generate info
}
sendJason('CSCI-103', 'csci', 20161, function(x) {
  console.log('optimization:    ', x.length);
});
module.exports.sendJason = sendJason;
