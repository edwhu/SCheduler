var gen = require('./generator.js');
var async = require('async');
var time = require('./timeutil.js')
//courseQ of courses
var courseQ = [];
var term = 20161;
function create(course,callback){
  if(course==='') return;
  courseQ.push(course);
  console.log(courseQ);
  async.waterfall([getAllCourses, conflictCheck, display], function(error, results) {
    if(error){
      return console.error(new Error('failed to get course: '+error.message));
    }
    callback(results);
  });
}
//test
//create('asdf',function(x){console.log(x);});

//gets all course data from courseQ and puts it into array
function getAllCourses(processArrayCallback) {
  async.map(courseQ, function(course, callback) {
    console.log('getting ', course, '...');
    gen.createSectionsArray(course, term, function(err,json) {
      if(err){
        return callback(err);
      }
      callback(null, json);
    });
  }, function(err, JSONarray) {
    if(err){
      courseQ.splice(courseQ.length-1,1);
      return console.error(err.message);
    }
    processArrayCallback(null, JSONarray);
  });
} //end getAllCourses

//take in course1 and transform into Answer
//course1: [[a,b,c],[d,e,f]]
function conflictCheck(JSONarray, callback) {
  //processed: processed data so far
  //next: index of next element to compare to processed
  function recursiveCheck(processed, next) {
    //if done
    if (next == JSONarray.length) {
      callback(null, processed);
    } else {
      processed = process(processed, next);
      recursiveCheck(processed, next + 1);
    }
  } //end recursiveCheck

  function process(currentData, nextIndex) {
    var nextData = JSONarray[nextIndex];
    var answer = [];
    for (var i = 0; i < currentData.length; i++) {
      for (var j = 0; j < nextData.length; j++) {
        if (time.sectionCheck(currentData[i], nextData[j])) {
          answer.push(currentData[i].concat(nextData[j]));
        }
      }
    }
    return answer;
  } //end process
  recursiveCheck(JSONarray[0], 1);

}

//displays final schedule possibilities
//answer: full JSON set
//we use simpleJSON for ease of debugging
function display(answer, callback) {
  var simpleJSON = answer.map(function(schedule) {
    return schedule.map(function(section) {
      var obj = {};
      obj.type = section.type;
      obj.title = section.title;
      obj.section_title = section.section_title;
      obj.day = section.day;
      obj.start = section.start_time;
      obj.end = section.end_time;
      return obj;
    });
  });
  //console.log('json: ', simpleJSON)
  // console.log('json2: ',answer[1]);
  // console.log('possibilities: ', answer.length);
  callback(null, simpleJSON[0]);
}
module.exports.create = create;
