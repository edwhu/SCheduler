//returns all courses from a department: [{course},{course},{course}]
function requestDept(dept, term, cb) {
  var request = require('request');
  var url = 'http://web-app.usc.edu/web/soc/api/classes/' + dept + '/' + term;
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      //parses the body text into a JSON object
      var metaResponse = JSON.parse(body);
      var deptResponse = metaResponse.OfferedCourses.course;
      cb(deptResponse);
    } else {
      console.log("Got an error: ", error, ", status code: ", response.statusCode);
    }
  });
} //END requestDept()

//returns an individual course from Department
function requestCourse(coursename, dept, term, cb) {
  requestDept(dept, term, function(courses) {
    //filter out course we want
    var course = courses.filter(function(course) {
      return course.PublishedCourseID == coursename;
    });
    cb(course);
  });
}

//returns section data from a course
function requestSection(coursename, dept, term, cb) {
  requestCourse(coursename, dept, term, function(course) {
    //section array [lecture, lecture, quiz, etc]
    var section = course[0].CourseData.SectionData;
    cb(section);
  });
}


module.exports.requestDept = requestDept;
module.exports.requestCourse = requestCourse;
module.exports.requestSection = requestSection;
