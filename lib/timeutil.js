//true if conflict, false if none
function conflict(obj1, obj2) {
  var onestart = convertToMin(obj1.start_time);
  var oneend = convertToMin(obj1.end_time);
  var twostart = convertToMin(obj2.start_time);
  var twoend= convertToMin(obj2.end_time);
  //if not on same day, no conflict possible
if(obj1.day === obj2.day){
  if (onestart === twostart) return true;
  if (onestart < twostart) {
    return (oneend > twostart);
  } else {
    return conflict(obj2, obj1);
  }
} else{
  return false;
}

}

//convert string 'HH:MM' to minutes
function convertToMin(hhmm){
  var explode = hhmm.split(':');
  var seconds = explode[0]*60+explode[1];
  return seconds;
}

module.exports.conflict = conflict;
