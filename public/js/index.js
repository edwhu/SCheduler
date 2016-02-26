AJAX_BASE_URL="/api"
$(document).ready(function(){
	$("#submitCourse").click(populateCal);
});

function populateCal(){
	$(".classBlock").remove();
	$.ajax({
    type:"GET",
    contentType: "application/json",
    url:"/api",
    data: JSON.stringify( {course:"MATH-226"} )
})
	$(".cal-col#T").prepend("<li class=\"classBlock\" style=\"min-height:50px;\">hello</li>");
}
