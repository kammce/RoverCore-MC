/*
#camera-claw
#camera-elbow
#camera-base

#three-dee-top
#three-dee-front
#three-dee-side

#mainscreen
*/

/* 
	- ensure it only takes up a percentage of #mainscreen 

*/


$(document).ready(function(){
    $("#three-dee-top").click(function(){
    	$("threedeescreen").css("width", "40%");
        //$("#mainscreen").css("background", "url(/images/threedee-top.png)");
    });

});

$(document).ready(function(){
    $("#three-dee-front").click(function(){
        //$("#mainscreen").css("background", "url(/images/threedee-front.png)");
    });

});

$(document).ready(function(){
    $("#three-dee-side").click(function(){
        //$("#mainscreen").css("background", "url(/images/threedee-side.png)");
    });

});

