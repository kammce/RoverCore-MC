/*
#camera-claw
#camera-elbow
#camera-base

#three-dee-top
#three-dee-front
#three-dee-side

#mainscreen
*/

/* set one to be displayed by default */


$(document).ready(function(){
    $("#camera-claw").click(function(){
        $("#mainscreen").css("background-color", "red");
        $("#test").html("Claw View");
        //$("#camera-claw").addClass("active");

    });

});

$(document).ready(function(){
    $("#camera-elbow").click(function(){
        $("#mainscreen").css("background-color", "green");
        $("#test").html("Elbow View");
    });

});

$(document).ready(function(){
    $("#camera-base").click(function(){
        $("#mainscreen").css("background-color", "blue");
        $("#test").html("Base View");
    });

});

