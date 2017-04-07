/*
=======================================================================================
BEGIN excerpts from oldermishcontrol armInterface.js and rovercore-mc test interface 
Added to arm-interface.html:
	<script type="text/javascript" src="js/testcontroller.js"></script>
	<script type="text/javascript" src="js/testprimus.js"></script>
=======================================================================================
*/

//Necessary to include if I don't have ace/json editor?
var options = {
	mode: 'code',
	modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
	error: function(err) {
		alert(err.toString());
	}
};

var command = {
	"rotunda": 400,
	"shoulder": 333,
	"elbow": 69,
	"wrist_pitch": 180,
	"wrist_roll": 0,
	"claw": 0,
};

/*
=====================================================================================
END excerpts from oldermishcontrol armInterface.js and rovercore-mc test interface js
=====================================================================================
*/

//BEGIN Cam View
	//Replace src
$("#ClawCam").click(function(){
	$("#camerafeed").attr('src', 'css/images/thatclaw.png');
	$("#ClawCam").addClass('btn-success');
	$("#ElbowCam").removeClass('btn-success');
	$("#BaseCam").removeClass('btn-success');
});

$("#ElbowCam").click(function(){
	$("#camerafeed").attr('src', 'css/images/thatelbow.png');
	$("#ClawCam").removeClass('btn-success');
	$("#ElbowCam").addClass('btn-success');
	$("#BaseCam").removeClass('btn-success');
});

$("#BaseCam").click(function(){
	$("#camerafeed").attr('src', 'css/images/thatbase.png');
	$("#ClawCam").removeClass('btn-success');
	$("#ElbowCam").removeClass('btn-success');
	$("#BaseCam").addClass('btn-success');
});
//END Cam View


//Manual Control Toggle @2
$("#ToggleManualControl").change(function(){
	if($(this).prop("checked") == true){
		//PAGE CONTROL, MC ON
		$("#manualControl").css("display", "block");
		$("#manualControl").css("opacity", "1");
		$("#camerafeed").css("height", "600px");
		//$("#displayedArmComponent").val=$("ArmComponentSliderValue") 
		//$("#RotundaState").html("MC");
		//$("#Wrist_RollState").html("MC");
		//$("#ShoulderState").html("MC");
		//$("#ElbowState").html("MC");
		//$("#Wrist_PitchState").html("MC");
		//$("#ClawState").html("MC");
	}else{
		//MIMIC CONTROL, MC OFF
		$("#camerafeed").css("height", "850px");
		$("#manualControl").css("display", "none");
		//$("#displayedArmComponent").val=gp.axes[...] OR .val=$("MimicAxesValue")
		/*
		$("#RotundaState").html(baseRotationDegree);
		$("#Wrist_RollState").html(wristRotationDegree);
		$("#ShoulderState").html(shoulderPitchDegree);
		$("#ElbowState").html(elbowPitchDegree);
		$("#Wrist_PitchState").html(wristPitchDegree);
		$("#ClawState").html(torqueDegree);
		*/

	/* 
		This script may need to be in the same script as the gamepad in order to work
		the __Degree is declared in the aforemetnioed script
	 */
	}

});

//Manual Control On Control
$("#RotundaSlider").slider({
	range: "min",
	value: 400,
	step: 1,
	min: 0,
	max: 1023,
	slide: function( event, ui ) {
	    $( "#RotundaInputBox" ).val(ui.value);
	    $( "#RotundaState" ).text(ui.value); //change this to converted degrees
	    $( "#messages" ).html("Rotunda Changed!"); //make this more detailed and scrollable and add timestamp
	}
});

	$("#RotundaInputBox").change(function () {
		$("#RotundaSlider").slider("value", parseInt(this.value));
		$("#RotundaState").text(parseInt(this.value)); //change this to converted degrees
		$( "#messages" ).html("Rotunda Changed!"); //make this more detailed and scrollable and add timestamp
		
	connection.write(payload);
});

$("#Wrist_RollSlider").slider({
	range: "min",
	value: 0,
	step: 1,
	min: 0,
	max: 1023,
	slide: function( event, ui ) {
	    $( "#Wrist_RollInputBox" ).val(ui.value);
	    $( "#Wrist_RollState" ).text(ui.value); //change this to converted degrees
		$( "#messages" ).html("Wrist_Roll Changed!"); //make this more detailed and scrollable and add timestamp
	}
});

	$("#Wrist_RollInputBox").change(function () {
		$("#Wrist_RollSlider").slider("value", parseInt(this.value));
		$("#Wrist_RollState").text(parseInt(this.value)); //change this to converted degrees
		$( "#messages" ).html("Wrist_Roll Changed!"); //make this more detailed and scrollable and add timestamp
});

$("#ShoulderSlider").slider({
	range: "min",
	value: 333,
	step: 1,
	min: 0,
	max: 1023,
	slide: function( event, ui ) {
	    $( "#ShoulderInputBox" ).val(ui.value);
	    $( "#ShoulderState" ).text(ui.value); //change this to converted degrees
		$( "#messages" ).html("Shoulder Changed!"); //make this more detailed and scrollable and add timestamp
	}
});

	$("#ShoulderInputBox").change(function () {
		$("#ShoulderSlider").slider("value", parseInt(this.value));
		$("#ShoulderState").text(parseInt(this.value)); //change this to converted degrees
		$( "#messages" ).html("Shoulder Changed!"); //make this more detailed and scrollable and add timestamp
});

$("#ElbowSlider").slider({
  range: "min",
  value: 69,
  step: 1,
  min: 0,
  max: 1023,
  slide: function( event, ui ) {
      $( "#ElbowInputBox" ).val(ui.value);
      $( "#ElbowState" ).text(ui.value); //change this to converted degrees
      $( "#messages" ).html("Elbow Changed!"); //make this more detailed and scrollable and add timestamp
  }
});

	$("#ElbowInputBox").change(function () {
		$("#ElbowSlider").slider("value", parseInt(this.value));
		$("#ElbowState").text(parseInt(this.value)); //change this to converted degrees
		$( "#messages" ).html("Elbow Changed!"); //make this more detailed and scrollable and add timestamp
});

$("#Wrist_PitchSlider").slider({
  range: "min",
  value: 180,
  step: 1,
  min: 0,
  max: 1023,
  slide: function( event, ui ) {
      $( "#Wrist_PitchInputBox" ).val(ui.value);
      $( "#Wrist_PitchState" ).text(ui.value); //change this to converted degrees
      $( "#messages" ).html("Wrist_Pitch Changed!"); //make this more detailed and scrollable and add timestamp
  }
});

	$("#Wrist_PitchInputBox").change(function () {
		$("#Wrist_PitchSlider").slider("value", parseInt(this.value));
		$("#Wrist_PitchState").text(parseInt(this.value)); //change this to converted degrees
		$( "#messages" ).html("Wrist_Pitch Changed!"); //make this more detailed and scrollable and add timestamp
});


$("#ClawSlider").slider({
  range: "min",
  value: 0,
  step: 0.01,
  min: 0,
  max: 2,
  slide: function( event, ui ) {
      $( "#ClawInputBox" ).val(ui.value);
      $( "#ClawState" ).text(ui.value); //change this to converted torque
      $( "#messages" ).html("Claw Changed!"); //make this more detailed and scrollable and add timestamp
  }
});

	$("#ClawInputBox").change(function () {
		$("#ClawSlider").slider("value", parseInt(this.value));
		$("#ClawState").text(parseInt(this.value)); //change this to converted torque
		$( "#messages" ).html("Claw Changed!"); //make this more detailed and scrollable and add timestamp
});

//Script for Pre-Set positions @11
//[A2]

//Open Claw
$("#method0").click(function(){
	$("#buttonDisplay").html("0: Open Claw");
	$("#method0").addClass('btn-info');
	$("#method1").removeClass('btn-info');
	$("#method2").removeClass('btn-info');
	$("#method3").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#method5").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 0: Open Claw!"); //add timestamp
	//insert appropriate slider values
	//arm.claw = 2;
	//SendPayload(arm);
	$("#ClawSlider").slider('value', 2);
	$("#ClawInputBox").val('2');
	$("#ClawState").text(parseInt(this.value)); //change this to converted torque

});

//Close Claw
$("#method1").click(function(){
	//insert appropriate slider values
	$("#buttonDisplay").html("1: Close Claw");
	$("#method0").removeClass('btn-info');
	$("#method1").addClass('btn-info');
	$("#method2").removeClass('btn-info');
	$("#method3").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#method5").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 1: Close Claw!"); //add timestamp
	//arm.claw = 1;
	//SendPayload(arm);
	$("#ClawSlider").slider('value', 1);
	$("#ClawInputBox").val('1');
	$("#ClawState").text(parseInt(this.value)); //change this to converted torque
});

//Deploy POD
$("#method2").click(function(){
	//insert appropriate slider values
	$("#buttonDisplay").html("2: Deploy POD");
	$("#method0").removeClass('btn-info');
	$("#method1").removeClass('btn-info');
	$("#method2").addClass('btn-info');
	$("#method3").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#method5").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 2: Deploy POD!"); //add timestamp
});

//Retreive POD
$("#method3").click(function(){
	//insert appropriate slider values
	$("#buttonDisplay").html("3: Retrieve POD");
	$("#method0").removeClass('btn-info');
	$("#method1").removeClass('btn-info');
	$("#method2").removeClass('btn-info');
	$("#method3").addClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#method5").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 3: Retrieve POD!"); //add timestamp
});

//Touch Ground
$("#method4").click(function(){
	$("#buttonDisplay").html("4: Touch Ground");
	$("#method0").removeClass('btn-info');
	$("#method1").removeClass('btn-info');
	$("#method2").removeClass('btn-info');
	$("#method3").removeClass('btn-info');
	$("#method4").addClass('btn-info');
	$("#method5").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 4: Touch Ground!"); //add timestamp
	//insert appropriate slider value			
	//arm.shoulder = 590;
	//arm.wrist_pitch = 265;
	//SendPayload(arm);
	$("#ShoulderSlider").slider('value', 590);
	$("#ShoulderInputBox").val('590');
	$("#ShoulderState").text(parseInt(this.value));
});

//Reach Behind
$("#method5").click(function(){
	//insert appropriate slider value
	$("#buttonDisplay").html("5: Reach Behind");
	$("#method0").removeClass('btn-info');
	$("#method1").removeClass('btn-info');
	$("#method2").removeClass('btn-info');
	$("#method3").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#method5").addClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 5: Reach Behind!"); //add timestamp
});

//Reach Forward
$("#method6").click(function(){
	//insert appropriate slider value
	$("#buttonDisplay").html("6: Reach Forward");
	$("#method0").removeClass('btn-info');
	$("#method1").removeClass('btn-info');
	$("#method2").removeClass('btn-info');
	$("#method3").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#method5").removeClass('btn-info');
	$("#method6").addClass('btn-info');
    $( "#messages" ).html("Position changed to 6: Reach Forward!"); //add timestamp
});

//Gamepad Mimic @12
	var gamepadInfo = document.getElementById("gamepad-info");
	var ball = document.getElementById("ball");
	var start;
	var a = 0;
	var b = 0;
	var rAF = window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.requestAnimationFrame;
	var rAFStop = window.mozCancelRequestAnimationFrame ||
	window.webkitCancelRequestAnimationFrame ||
	window.cancelRequestAnimationFrame;

	window.addEventListener("gamepadconnected", function() {
	var gp = navigator.getGamepads()[0];
	gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
	    document.getElementById("gamepad-info").innerHTML = "MIMIC: On";

	gameLoop();
	});

	window.addEventListener("gamepaddisconnected", function() {
	gamepadInfo.innerHTML = "Waiting for gamepad.";
	rAFStop(start);
	document.getElementById("gamepad-info").innerHTML = "MIMIC: Off";

	});

	if(!('GamepadEvent' in window)) {
	// No gamepad events available, poll instead.
	var interval = setInterval(pollGamepads, 500);
	}

	function pollGamepads() {
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	for (var i = 0; i < gamepads.length; i++) {
	var gp = gamepads[i];
	if(gp) {
	  gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
	  gameLoop();
	  clearInterval(interval);
			}
		}
	}

	function buttonPressed(b) {
	if (typeof(b) == "object") {
		return b.pressed;
	}
		return b == 1.0;
	}

	/*BEGIN MIMIC VALUE CONVERSION */

	function gameLoop() {
	var midBit = 512; 

	function controllerToBit(x)
	{
	  var bit
	    if(x == -1)
	    {
	      bit = 0;
	    }
	    else
	    {
	      bit = ((x+1)*midBit) -1;
	 	  }
	    bit = Math.round(bit);

	    return bit;
	}

	function posBitToDegree(x)
	{
	  var decimal
	  if(x == 0)
	  {
	    decimal =0;
	  }
	  else
	  {
	     decimal = ((x + 1)/midBit);
	  }
	  var degree = decimal*180;
	  degree = Math.round(degree);

	  return degree;
	}

	function posNegBitToDegree(x)
	{
	  var decimal;
	  if(x == 0)
	  {
	    decimal =-1;
	  }
	  else 
	  {
	    decimal = ((x + 1)/midBit) - 1;
	  }
	  var degree = decimal*360;
	  degree = Math.round(degree);
	  return degree;
	}

	/*END MIMIC VALUE CONVERSION */

	/* BEGIN MIMIC CONTROL */

	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	if (!gamepads)
	return;
	var gp = gamepads[0];

	if (buttonPressed(gp.buttons[0])) {
	document.getElementById("buttonDisplay").innerHTML = "0: Open Claw";

	} 

	if (buttonPressed(gp.buttons[1])) {
	document.getElementById("buttonDisplay").innerHTML = "1: Close Claw";


	} 
	if (buttonPressed(gp.buttons[2])) {
	document.getElementById("buttonDisplay").innerHTML = "2: Drop POD";


	} 
	if (buttonPressed(gp.buttons[3])) {
	document.getElementById("buttonDisplay").innerHTML = "3: Retrieve POD";


	} 
	if (buttonPressed(gp.buttons[4])) {
	document.getElementById("buttonDisplay").innerHTML = "4: Touch Ground";

	} 
	if (buttonPressed(gp.buttons[5])) {
	document.getElementById("buttonDisplay").innerHTML = "5: Reach Behind";

	} 
	if (buttonPressed(gp.buttons[6])) {
	document.getElementById("buttonDisplay").innerHTML = "6: Reach Forward";

	} 

	if(gp.axes[0] != 0) {

	 var baseRotationBit = controllerToBit(gp.axes[0]);
	 var baseRotationDegree = posNegBitToDegree(baseRotationBit);
	 document.getElementById("RotundaState").innerHTML = baseRotationDegree;
	} 

	if(gp.axes[1] != 0) {
	var shoulderPitchBit = controllerToBit(gp.axes[1]);
	 var shoulderPitchDegree = posBitToDegree(shoulderPitchBit);
	 document.getElementById("ShoulderState").innerHTML = shoulderPitchDegree;
	} 

	if(gp.axes[2] != 0) {
	  var elbowPitchBit = controllerToBit(gp.axes[2]);
	 var elbowPitchDegree = posBitToDegree(elbowPitchBit);
	 document.getElementById("ElbowState").innerHTML = elbowPitchDegree;
	} 

	if(gp.axes[3] != 0) {
	  var torqueBit = controllerToBit(gp.axes[3]);
	 var torqueDegree = posBitToDegree(torqueBit);
	 document.getElementById("ClawState").innerHTML = torqueDegree;
	} 


	if(gp.axes[4] != 0) {
	  var wristPitchBit = controllerToBit(gp.axes[4]);
	 var wristPitchDegree = posBitToDegree(wristPitchBit);
	 document.getElementById("Wrist_PitchState").innerHTML = wristPitchDegree;
	} 


	if(gp.axes[5] != 0) {
	 var wristRotationBit = controllerToBit(gp.axes[5]);
	 var wristRotationDegree = posNegBitToDegree(wristRotationBit);
	 document.getElementById("Wrist_RollState").innerHTML = wristRotationDegree;
	} 


	ball.style.left = a*2 + "px";
	ball.style.top = b*2 + "px";
	var start = rAF(gameLoop);
	};




