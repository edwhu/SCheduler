$(document).ready(function(){
	$("#submitCourse").click(populateCal);
});
function populateCal(){
	$(".classBlock").remove();
	$.ajax({
		type:"POST",
		url:"/api",
		contentType:"application/json",
		dataType:"json",
		data: JSON.stringify({course:"MATH-226"}),
		success: function(data){
			console.log(JSON.stringify(data,null,2));
		}
});
	//$(".cal-col#T").prepend("<li class=\"classBlock\" style=\"min-height:50px;\">hello</li>");
}
