var gen = require('./generator.js');
var async = require('async');
var chalk = require('chalk');
var time = require('./timeutil.js')
  //courseQ of coursees
var courseQ = ['CSCI-109','CSCI-103'];


function getFirstCourse(getNextCourseCB) {
  gen.getJSON(courseQ[0], 20161, function(json) {
    getNextCourseCB(null, json);
  });
}

function getNextCourse(course1, processCourseCallback) {
  gen.getJSON(courseQ[1], 20161, function(json) {
    processCourseCallback(null, course1, json);
  });
}


//take in course1 and transform into Answer
//course1: [[a,b,c],[d,e,f]]
function conflictCheck(course1, course2, callback) {
  var answer = [];

  for (var i = 0; i < course1.length; i++) {
    for (var j = 0; j < course2.length; j++) {
      if (time.sectionCheck(course1[i], course2[j])) {
        answer.push(course1[i].concat(course2[j]));
      }
    }
  }
  callback(null, answer);
}

function display(answer) {
  var simpleJSON =  answer.map(function(schedule) {
    return schedule.map(function(section) {
      var obj = {};
      obj.day = section.day;
      obj.start = section.start_time;
      obj.end = section.end_time;
      return obj;
    });
  });
  console.log('json: ',simpleJSON);
  console.log('possibilities: ', answer.length);
}


//async.waterfall([getFirstCourse, getNextCourse, conflictCheck, display], function(error) {});
//take in course1 and transform into Answer
//course1: [[a,b,c],[d,e,f]]
function conflictCheckTest(callback) {
  var answer = [];
  var course1 = [
    [{
      type: 'Lec',
      start_time: '4:30',
      end_time: '6:50',
      day: 'M'
    }, {
      type: 'Lab',
      start_time: '14:00',
      end_time: '15:50',
      day: 'W'
    }, {
      type: 'Qz',
      start_time: '19:00',
      end_time: '20:50',
      day: 'F'
    }],
    [{
      type: 'Lec',
      start_time: '11:30',
      end_time: '12:50',
      day: 'T'
    }, {
      type: 'Lab',
      start_time: '14:00',
      end_time: '15:50',
      day: 'W'
    }, {
      type: 'Qz',
      start_time: '19:00',
      end_time: '20:50',
      day: 'F'
    }]

  ];
  var course2 = [
    [{
      type: 'Lec',
      start_time: '4:30',
      end_time: '6:50',
      day: 'T'
    }, {
      type: 'Lab',
      start_time: '14:00',
      end_time: '15:50',
      day: 'TH'
    }, {
      type: 'Qz',
      start_time: '1:00',
      end_time: '2:50',
      day: 'F'
    }]
  ];

  for (var i = 0; i < course1.length; i++) {
    for (var j = 0; j < course2.length; j++) {
      if (time.sectionCheck(course1[i], course2[j])) {
        answer.push(course1[i].concat(course2[j]));
      }
    }
  }
  callback(null, answer);
}
async.waterfall([getFirstCourse, getNextCourse, conflictCheck, display], function(error) {});
//test
// async.waterfall([,display], function(error) {});
