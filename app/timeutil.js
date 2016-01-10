//true if conflict, false if none
function conflict(obj1, obj2) {
  var onestart = convertToMin(obj1.start_time);
  var oneend = convertToMin(obj1.end_time);
  var twostart = convertToMin(obj2.start_time);
  var twoend = convertToMin(obj2.end_time);
  //if not on same day, no conflict possible
  //if MWF or TH etc
  if (obj1.day.length > 1 || obj2.day.length > 1) {
    var day1 = obj1.day.split('');
    var day2 = obj2.day.split('');
    //compare everything in day1's days with everything in day2
    for (var i = 0; i < day1.length; i++) {
      for (var j = 0; j < day2.length; j++) {
        //if days are same, we gotta compare time
        if (day1[i] == day2[j]) {
          //conflict - start at same time
          if (onestart == twostart) {
            //console.log(day1[i], ":", day2[j]);
            return true;
          }
          if (onestart < twostart) {
            //conflict - first ends after second's start
            if (oneend > twostart) {
              //console.log(day1[i], ":", day2[j]);
              return true;
            }
          } else { // if two start < one start, do stuff in reverse
            if (twoend > onestart) {
              //console.log(day1[i], ":", day2[j]);
              return true;
            }
          }
        }
        // else not on same day so  no conflict
      }
    }
    return false;
  } // end array check

  //ASSUMES THERE IS ONLY 1 DAY
  if (obj1.day === obj2.day) {
    if (onestart === twostart) return true;
    if (onestart < twostart) {
      return (oneend > twostart);
    } else {
      return conflict(obj2, obj1);
    }
  } else {
    return false;
  }

}

//convert string 'HH:MM' to minutes
function convertToMin(hhmm) {
  var explode = hhmm.split(':');
  var seconds = explode[0] * 60 + explode[1];
  return seconds;
}

//check sections of section1 array and section2 array
//returns true or false if sections conflict
function sectionCheck(section1, section2) {
  for (var i = 0; i < section1.length; i++) {
    for (var j = 0; j < section2.length; j++) {
      if (conflict(section1[i], section2[j])) {
        return false;
      }
    }
  }
  return true;
}
module.exports.conflict = conflict;
module.exports.sectionCheck = sectionCheck;
