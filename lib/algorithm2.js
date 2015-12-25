var gen = require('./generator.js');
var async = require('async');
var time = require('./timeutil.js')
  //courseQ of coursees
var courseQ = ['CORE-102','CORE-111','CHEM-105A','ENGR-102']
var term = 20153;
//gets all course data from courseQ and puts it into array
function getAllCourses(processArrayCallback) {
  async.map(courseQ, function(course, callback) {
    console.log('getting ', course, '\n');
    gen.getJSON(course, term, function(json) {
      callback(null, json);
    });
  }, function(err, JSONarray) {
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
function display(answer) {
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
  console.log('json2: ',answer[1]);
  console.log('possibilities: ', answer.length);
}
async.waterfall([getAllCourses, conflictCheck, display], function(error) {});
