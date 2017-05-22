/*
=========================
Arm Componnent Parameters
=========================
*/


// default state 
var ArmPayload = {
    "rotunda": 1700, //850-2350
    "shoulder": 180, //140-270 (180 = full horizontal)
    "elbow": 600, // 200-1000
    "wrist_pitch": 180, //90-270 (180 = full horizontal)
    "wrist_roll": 0, //0 = stop, 1=spins one way, 2=spins other way (incremenet 0,1,2)
    "claw": 0, // 1=close, 0=stop, 2=open (increment 0,1,2)
    "camera_select": 0, //commented out on Arm.js in rovercore-s
    "rotunda_camera": 0, //commented out on Arm.js in rovercore-s
};

function map(value, low1, high1, low2, high2)
{
    var result = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    return Math.round(result);
}

function limit(value, low, high)
{
    var result = value;
    result = (result < low) ? low : result;
    result = (result > high) ? high : result;
    return result;
}

const LIMITS = {
    "rotunda": [850, 2350],
    "shoulder": [140, 270],
    "elbow": [200, 1000],
    "wrist_pitch": [90, 270],
    "wrist_roll": [0, 2],
    "claw": [0, 2],
    "camera_select": [0, 2],
    "rotunda_camera": [0, 180]
};

var validator = {
    set: function(obj, prop, value)
    {
        if(prop in LIMITS)
        {
            obj[prop] = limit(value, LIMITS[prop][0], LIMITS[prop][1]);
        }
        else
        {
            obj[prop] = value;
        }
        // throw new TypeError('The age is not an integer');
        // Indicate success
        return true;
    }
};


//Command sent to RoverCore-S
var command = new Proxy(ArmPayload, validator);


//BEGIN Cam View
	//Replace src
$("#ClawCam").click(function(){
	$("#camerafeed").attr('src', 'interfaces/Arm/css/images/thatclaw.png?r={{ANTI-CACHE-MARKER}}');
	$("#ClawCam").addClass('btn-success');
	$("#ElbowCam").removeClass('btn-success');
	$("#BaseCam").removeClass('btn-success');
});

$("#ElbowCam").click(function(){
	$("#camerafeed").attr('src', 'http://192.168.1.51/video.mjpg?r={{ANTI-CACHE-MARKER}}');
	$("#ClawCam").removeClass('btn-success');
	$("#ElbowCam").addClass('btn-success');
	$("#BaseCam").removeClass('btn-success');
});

$("#BaseCam").click(function(){
	$("#camerafeed").attr('src', 'http://192.168.1.50/video.mjpg?r={{ANTI-CACHE-MARKER}}');
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
		$("#camerafeed").css("height", "800px");
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
	value: 1700,
	step: 1,
	min: LIMITS["rotunda"][0],
	max: LIMITS["rotunda"][1],
	slide: function( event, ui ) {
	    $( "#RotundaInputBox" ).val(ui.value);
	    $( "#RotundaState" ).text(ui.value); //change this to converted degrees
	    $( "#messages" ).html("Rotunda Changed!"); //make this more detailed and scrollable and add timestamp
	    command.rotunda = ui.value; //command sent to
	}
});

$("#RotundaInputBox").change(function () {
	$("#RotundaSlider").slider("value", parseInt(this.value));
	command.rotunda = this.value; //rovercore-s command
	$("#RotundaState").text(parseInt(this.value)); //change this to converted degrees
	$( "#messages" ).html("Rotunda Changed!"); //make this more detailed and scrollable and add timestamp
});

$("#Wrist_RollSlider").slider({
	range: "min",
	value: 0,
	step: 1,
	min: LIMITS["wrist_roll"][0],
	max: LIMITS["wrist_roll"][1],
	slide: function( event, ui ) {
	    $( "#Wrist_RollInputBox" ).val(ui.value);
	    $( "#Wrist_RollState" ).text(ui.value); //change this to converted degrees
		$( "#messages" ).html("Wrist_Roll Changed!"); //make this more detailed and scrollable and add timestamp
		command.wrist_roll = ui.value; //rovercore-s command
	}
});

	$("#Wrist_RollInputBox").change(function () {
		$("#Wrist_RollSlider").slider("value", parseInt(this.value));
		command.wrist_roll = this.value; //rovercore-s command
		$("#Wrist_RollState").text(parseInt(this.value)); //change this to converted degrees
		$( "#messages" ).html("Wrist_Roll Changed!"); //make this more detailed and scrollable and add timestamp
});

$("#ShoulderSlider").slider({
	range: "min",
	value: 180,
	step: 1,
	min: LIMITS["shoulder"][0],
	max: LIMITS["shoulder"][1],
	slide: function( event, ui ) {
	    $( "#ShoulderInputBox" ).val(ui.value);
	    $( "#ShoulderState" ).text(ui.value); //change this to converted degrees
		$( "#messages" ).html("Shoulder Changed!"); //make this more detailed and scrollable and add timestamp
		command.shoulder = ui.value; //rovercore-s command
	}
});

	$("#ShoulderInputBox").change(function () {
		$("#ShoulderSlider").slider("value", parseInt(this.value));
		command.shoulder = this.value; //rovercore-s command
		$("#ShoulderState").text(parseInt(this.value)); //change this to converted degrees
		$( "#messages" ).html("Shoulder Changed!"); //make this more detailed and scrollable and add timestamp
});

$("#ElbowSlider").slider({
  range: "min",
  value: 600,
  step: 1,
  min: LIMITS["elbow"][0],
  max: LIMITS["elbow"][1],
  slide: function( event, ui ) {
      $( "#ElbowInputBox" ).val(ui.value);
      $( "#ElbowState" ).text(ui.value); //change this to converted degrees
      $( "#messages" ).html("Elbow Changed!"); //make this more detailed and scrollable and add timestamp
      command.elbow = ui.value; //rovercore-s command
  }
});

	$("#ElbowInputBox").change(function () {
		$("#ElbowSlider").slider("value", parseInt(this.value));
		command.elbow = this.value; //rovercore-s command
		$("#ElbowState").text(parseInt(this.value)); //change this to converted degrees
		$( "#messages" ).html("Elbow Changed!"); //make this more detailed and scrollable and add timestamp
});

$("#Wrist_PitchSlider").slider({
  range: "min",
  value: 180,
  step: 1,
  min: LIMITS["wrist_pitch"][0],
  max: LIMITS["wrist_pitch"][1],
  slide: function( event, ui ) {
      $( "#Wrist_PitchInputBox" ).val(ui.value);
      $( "#Wrist_PitchState" ).text(ui.value); //change this to converted degrees
      $( "#messages" ).html("Wrist_Pitch Changed!"); //make this more detailed and scrollable and add timestamp
      command.wrist_pitch = ui.value; //rovercore-s command
  }
});

	$("#Wrist_PitchInputBox").change(function () {
		$("#Wrist_PitchSlider").slider("value", parseInt(this.value));
		command.wrist_pitch = this.value; //rovercore-s command
		$("#Wrist_PitchState").text(parseInt(this.value)); //change this to converted degrees
		$( "#messages" ).html("Wrist_Pitch Changed!"); //make this more detailed and scrollable and add timestamp
});


$("#ClawSlider").slider({
  range: "min",
  value: 0,
  step: 1,
  min: LIMITS["claw"][0],
  max: LIMITS["claw"][1],
  slide: function( event, ui ) {
      $( "#ClawInputBox" ).val(ui.value);
      //$( "#ClawState" ).text(ui.value); //change this to converted torque
      $( "#messages" ).html("Claw Changed!"); //make this more detailed and scrollable and add timestamp
      command.claw = ui.value; //rovercore-s command
  }
});

	$("#ClawInputBox").change(function () {
		$("#ClawSlider").slider("value", parseInt(this.value));
		command.claw = this.value; //rovercore-s command
		//$("#ClawState").text(parseInt(this.value)); //change this to converted torque
		$( "#messages" ).html("Claw Changed!"); //make this more detailed and scrollable and add timestamp
});

//Script for Pre-Set positions @11
//[A2]

//Reset
$("#reset").click(function(){

	if(Connection.state === Connection.CONNECTED)
	{
		primus.write(
		{
			target: 'Cortex',
			command: 'Arm',
		});
		clearInterval(LobeAssignmentInterval);
	}
	$("#buttonDisplay").html("Reset!");
	$("#reset").addClass('btn-info');
	$("#method0").removeClass('btn-info');
	$("#method1").removeClass('btn-info');
	$("#method2").removeClass('btn-info');
	$("#method3").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#method5").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("All sliders reset!"); //add timestamp

    $("#RotundaSlider").slider('value', 1700);
    $("#RotundaInputBox").val('1700');
    $("#RotundaState").html("1700");
    command.rotunda = 1700;

    $("#Wrist_RollSlider").slider('value', 0);
    $("#Wrist_RollInputBox").val('0');
    $("#Wrist_RollState").html("0");
    command.wrist_roll = 0;

    $("#ShoulderSlider").slider('value', 180);
    $("#ShoulderInputBox").val('180');
    $("#ShoulderState").html("180");
    command.shoulder = 180;

    $("#ElbowSlider").slider('value', 600);
    $("#ElbowInputBox").val('600');
    $("#ElbowState").html("600");
    command.elbow = 600;

    $("#Wrist_PitchSlider").slider('value', 180);
    $("#Wrist_PitchInputBox").val('180');
    $("#Wrist_PitchState").html("180");
    command.wrist_pitch = 180;

    $("#ClawSlider").slider('value', 0);
    $("#ClawInputBox").val('0');
    //$("#ClawState").html("0");
    command.claw = 0;
    /*@@@@@@@*/
	//$("#ClawSlider").slider('value', 2);
	//$("#ClawInputBox").val('2');
	//command.claw = 2;
	//$("#ClawState").text(parseInt(this.value)); //change this to converted torque
});


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
	$("#ClawSlider").slider('value', 2);
	$("#ClawInputBox").val('2');
	command.claw = 2;
	//$("#ClawState").text(parseInt(this.value)); //change this to converted torque
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
	$("#ClawSlider").slider('value', 1);
	$("#ClawInputBox").val('1');
	command.claw = 1;
	//$("#ClawState").text(parseInt(this.value)); //change this to converted torque
});

//Deploy POD
$("#method2").click(function(){
	//insert appropriate slider values
	$("#buttonDisplay").html("2: Wrist Roll A");
	$("#method0").removeClass('btn-info');
	$("#method1").removeClass('btn-info');
	$("#method2").addClass('btn-info');
	$("#method3").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#method5").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 2: Wrist Roll A!"); //add timestamp
	$("#Wrist_RollSlider").slider('value', 1);
	$("#Wrist_RollInputBox").val('1');
	command.wrist_roll = 1;
});

//Retreive POD
$("#method3").click(function(){
	//insert appropriate slider values
	$("#buttonDisplay").html("3: Wrist Roll B");
	$("#method0").removeClass('btn-info');
	$("#method1").removeClass('btn-info');
	$("#method2").removeClass('btn-info');
	$("#method3").addClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#method5").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 3: Wrist Roll B!"); //add timestamp
	$("#Wrist_RollSlider").slider('value', 2);
	$("#Wrist_RollInputBox").val('2');
	command.wrist_roll = 2;
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

/*=======================
Gamepad/Mimic Control @12
=========================*/
	var gamepadInfo = document.getElementById("gamepad-info");
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
		document.getElementById("gamepad-info").innerHTML = "MIMIC: On";
		gameLoop();
	});

	window.addEventListener("gamepaddisconnected", function() {
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

	//BEGIN MIMIC VALUE CONVERSION
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
	      bit = ((x+1)*midBit) - 1;
	 	}
	    bit = Math.round(bit);

	    return bit;
	}

	/*function posBitToDegree(x)
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
	*/

	//END MIMIC VALUE CONVERSION

	//BEGIN MIMIC CONTROL

	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	if (!gamepads)
	return;
	var gp = gamepads[0];

	if (buttonPressed(gp.buttons[0])) {
	document.getElementById("buttonDisplay").innerHTML = "0: Open Claw";
    document.getElementById("messages").innerHTML= "Position changed to 0: Open Claw!"; //add timestamp
	command.claw = 2;
	} else if (buttonPressed(gp.buttons[1])) {
	document.getElementById("buttonDisplay").innerHTML = "1: Close Claw";
    document.getElementById("messages").innerHTML= "Position changed to 1: Close Claw!"; //add timestamp
	command.claw = 1;
	}else{
		command.claw = 0;
	}
	if (buttonPressed(gp.buttons[5])) {
	document.getElementById("buttonDisplay").innerHTML = "5: Wrist Roll A";
    document.getElementById("messages").innerHTML= "Position changed to 5: Wrist Roll A!"; //add timestamp
	//command.rotunda = ;
	//command.shoulder = ;
	//command.elbow = ;
	//command.wrist_pitch = ;
	command.wrist_roll = 1;
	//command.claw = ;
	}
	else if (buttonPressed(gp.buttons[6]))
	{
	document.getElementById("buttonDisplay").innerHTML = "6: Wrist Roll B";
    document.getElementById("messages").innerHTML= "Position changed to 6: Wrist Roll B!"; //add timestamp
	//command.rotunda = ;
	//command.shoulder = ;
	//command.elbow = ;
	//command.wrist_pitch = ;
	command.wrist_roll = 2;
	//command.claw = ;
	}else{
		command.wrist_roll = 0;
	}

	if (buttonPressed(gp.buttons[4])) {
	document.getElementById("buttonDisplay").innerHTML = "4: Touch Ground?";
	//command.rotunda = ;
	//command.shoulder = ;
	//command.elbow = ;
	//command.wrist_pitch = ;
	//command.wrist_roll = ;
	//command.claw = ;

	}
	if (buttonPressed(gp.buttons[2])) {
	document.getElementById("buttonDisplay").innerHTML = "2: Reach Behind?";
	//command.rotunda = ;
	//command.shoulder = ;
	//command.elbow = ;
	//command.wrist_pitch = ;
	//command.wrist_roll = ;
	//command.claw = ;

	}
	if (buttonPressed(gp.buttons[3])) {
	document.getElementById("buttonDisplay").innerHTML = "3: Reach Forward?";
	//command.rotunda = ;
	//command.shoulder = ;
	//command.elbow = ;
	//command.wrist_pitch = ;
	//command.wrist_roll = ;
	//command.claw = ;

	}

	//rotunda axis from mimic
	if(gp.axes[0] != 0) {
	 var baseRotationBit = controllerToBit(gp.axes[0]);
	 command.rotunda = map(gp.axes[0], -1, 1, LIMITS["rotunda"][0], LIMITS["rotunda"][1]);
	 document.getElementById("RotundaState").innerHTML = command.rotunda;
	 //var baseRotationDegree = posNegBitToDegree(baseRotationBit);
	 //document.getElementById("RotundaState").innerHTML = baseRotationDegree;
	}

	//shoulder axis from mimic
	if(gp.axes[1] != 0) {
	var shoulderPitchBit = controllerToBit(gp.axes[1]);
	command.shoulder = map(gp.axes[1], -1, 1, LIMITS["shoulder"][0], LIMITS["shoulder"][1]);
	document.getElementById("ShoulderState").innerHTML = command.shoulder;
	//var shoulderPitchDegree = posBitToDegree(shoulderPitchBit);
	//document.getElementById("ShoulderState").innerHTML = shoulderPitchDegree;
	}

	//elbow axis from mimic
	if(gp.axes[2] != 0) {
	  var elbowPitchBit = controllerToBit(gp.axes[2]);
	 command.elbow = map(-gp.axes[2], -1, 1, LIMITS["elbow"][0], LIMITS["elbow"][1]);
	 document.getElementById("ElbowState").innerHTML = command.elbow;
	 //var elbowPitchDegree = posBitToDegree(elbowPitchBit);
	 //document.getElementById("ElbowState").innerHTML = elbowPitchDegree;
	}

	//claw from mimic
	if(gp.axes[3] != 0) {
	  var torqueBit = controllerToBit(gp.axes[3]);
	 //document.getElementById("ClawState").innerHTML = torqueBit;
	 //command.claw = torqueBit;
	 //var torqueDegree = posBitToDegree(torqueBit);
	 //document.getElementById("ClawState").innerHTML = torqueDegree;
	}

	//wrist_pitch from mimic
	if(gp.axes[4] != 0) {
		var wristPitchBit = controllerToBit(gp.axes[4]);
		command.wrist_pitch = map(-gp.axes[4], -1, 1, LIMITS["wrist_pitch"][0], LIMITS["wrist_pitch"][1]);
		document.getElementById("Wrist_PitchState").innerHTML = command.wrist_pitch;
		//var wristPitchDegree = posBitToDegree(wristPitchBit);
		//document.getElementById("Wrist_PitchState").innerHTML = wristPitchDegree;
	}

	//wrist_rotation from mimic
	if(gp.axes[5] != 0) {
		var wristRotationBit = controllerToBit(gp.axes[5]);
		//document.getElementById("Wrist_RollState").innerHTML = wristRotationBit;
		//command.wrist_rotation = wristRotationBit;
		//var wristRotationDegree = posNegBitToDegree(wristRotationBit);
		//document.getElementById("Wrist_RollState").innerHTML = wristRotationDegree;
	}

	var start = rAF(gameLoop);
};


/*
======================
rovercore-s connection
======================
*/

var LobeAssignmentInterval = setInterval(function()
{
	if(Connection.state === Connection.CONNECTED)
	{
		primus.write(
		{
			target: 'Cortex',
			command: 'Arm',
		});
		clearInterval(LobeAssignmentInterval);
	}
}, 100);

var SendToRoverCoreS = setInterval(() =>
{
	if(Connection.state === Connection.CONNECTED)
	{
		var payload = {
			target: 'Arm',
			command: ArmPayload
		};
		primus.write(payload);
	}
}, 100);