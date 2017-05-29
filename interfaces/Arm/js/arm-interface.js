
/*
=========================
Arm Component Parameters
=========================
*/


// default state 
var ArmPayload = {
    "rotunda": 1500, //850-2350
    "shoulder": 270, //150-280 (180 = full horizontal)
    "elbow": 600, // 200-1000
    "wrist_pitch": 180, //90-270 (180 = full horizontal)
    "wrist_roll": 0, //0 = stop, 1 = left, 2 = right
    "claw": 0, // 1=close, 0=stop, 2=open (increment 0,1,2)
    "claw_torque": 0, //0-100
    "camera_select": 0, //0 = , 1 = , 2 =
    "rotunda_camera": 180, //0-270 where 180 = straight ahead
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
    "shoulder": [150, 280],
    "elbow": [200, 1000],
    "wrist_pitch": [90, 270],
    "wrist_roll": [0, 2],
    "claw": [0, 2],
    "claw_torque": [0,100],
    "camera_select": [0, 2],
    "rotunda_camera": [0, 270]
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

//Camera Selection
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


/*
===============================
Manual Control and Mimic Toggle
===============================
*/

//[B]

$("#ToggleManualControl").change(function(){
	if($(this).prop("checked") == true){
		$("#manualControl").css("display", "block");
		$("#manualControl").css("opacity", "1");
		$("#camerafeed").css("height", "600px");
	    $( "#messages" ).html("Mission Control On!"); //add timestamp
	}else{
		$("#camerafeed").css("height", "800px");
		$("#manualControl").css("display", "none");
	    $( "#messages" ).html("Mission Control Off!"); //add timestamp
	}
});

$("#ToggleMimic").change(function(){
	if($(this).prop("checked") == true){
	    $( "#messages" ).html("Mimic On!"); //add timestamp
	}else{
	    $( "#messages" ).html("Mimic Off!"); //add timestamp
	}
});


/*
=====================
Sliders + Input Boxes
=====================
*/

//Rotunda Control
$("#RotundaSlider").slider({
	range: "min",
	value: 1500,
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

//Wrist Rotation Control
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

//Rotunda Camera Control
$("#Rotunda_CameraSlider").slider({
	range: "min",
	value: 180,
	step: 1,
	min: LIMITS["rotunda_camera"][0],
	max: LIMITS["rotunda_camera"][1],
	slide: function( event, ui ) {
	    $( "#Rotunda_CameraInputBox" ).val(ui.value);
	    $( "#Rotunda_CameraState" ).text(ui.value); //change this to converted degrees
		$( "#messages" ).html("Rotunda_Camera Changed!"); //make this more detailed and scrollable and add timestamp
		command.rotunda_camera = ui.value; //rovercore-s command
	}
});

$("#Rotunda_CameraInputBox").change(function () {
	$("#Rotunda_CameraSlider").slider("value", parseInt(this.value));
	command.rotunda_camera = this.value; //rovercore-s command
	$("#Rotunda_CameraState").text(parseInt(this.value)); //change this to converted degrees
	$( "#messages" ).html("Rotunda_Camera Changed!"); //make this more detailed and scrollable and add timestamp
});

//Shoulder Pitch Control
$("#ShoulderSlider").slider({
	range: "min",
	value: 270,
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

//Elbow Pitch Control
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

//Wrist Pitch Control
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

//Claw Torque Control 
$("#ClawSlider").slider({
  range: "min",
  value: 0,
  step: 1,
  min: LIMITS["claw_torque"][0],
  max: LIMITS["claw_torque"][1],
  slide: function( event, ui ) {
      $( "#ClawInputBox" ).val(ui.value);
      $( "#ClawState" ).text(ui.value); //change this to converted torque
      $( "#messages" ).html("Claw_torque Changed!"); //make this more detailed and scrollable and add timestamp
      command.claw_torque = ui.value; //rovercore-s command
  }
});

$("#ClawInputBox").change(function () {
	$("#ClawSlider").slider("value", parseInt(this.value));
	command.claw_torque = this.value; //rovercore-s command
	$("#ClawState").text(parseInt(this.value)); //change this to converted torque
	$( "#messages" ).html("Claw Changed!"); //make this more detailed and scrollable and add timestamp
});


/*
========================
Pre-set Position Buttons
========================
*/

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
	$("#OpenClaw").removeClass('btn-info');
	$("#CloseClaw").removeClass('btn-info');
	$("#wrist_roll_left").removeClass('btn-info');
	$("#wrist_roll_right").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#GrabMast").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("All sliders reset and position is at rest!"); //add timestamp

    $("#Wrist_RollSlider").slider('value', 0);
    $("#Wrist_RollInputBox").val('0');
    $("#Wrist_RollState").html("0");
    command.wrist_roll = 0;

    $("#ClawSlider").slider('value', 0);
    $("#ClawInputBox").val('0');
    $("#ClawState").html("0");
    command.claw_torque = 0;

    command.claw = 0;

    $("#RotundaSlider").slider('value', 1500);
    $("#RotundaInputBox").val('1500');
    $("#RotundaState").html("1500");
    command.rotunda = 1500;


	$("#Rotunda_CameraSlider").slider('value', 180);
    $("#Rotunda_CameraInputBox").val('180');
    $("#Rotunda_CameraState").html("180");
    command.rotunda_camera = 180;

    $("#ShoulderSlider").slider('value', 270);
    $("#ShoulderInputBox").val('270');
    $("#ShoulderState").html("270");
    command.shoulder = 270;

    $("#ElbowSlider").slider('value', 600);
    $("#ElbowInputBox").val('600');
    $("#ElbowState").html("600");
    command.elbow = 600;

    $("#Wrist_PitchSlider").slider('value', 180);
    $("#Wrist_PitchInputBox").val('180');
    $("#Wrist_PitchState").html("180");
    command.wrist_pitch = 180;

});

//Open Claw
$("#OpenClaw").click(function(){
	$("#buttonDisplay").html("0: Open Claw");
	$("#OpenClaw").addClass('btn-info');
	$("#CloseClaw").removeClass('btn-info');
	$("#wrist_roll_left").removeClass('btn-info');
	$("#wrist_roll_right").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#GrabMast").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 0: Open Claw!"); //add timestamp
	command.claw = 2;
});

//Close Claw
$("#CloseClaw").click(function(){
	$("#buttonDisplay").html("1: Close Claw");
	$("#OpenClaw").removeClass('btn-info');
	$("#CloseClaw").addClass('btn-info');
	$("#wrist_roll_left").removeClass('btn-info');
	$("#wrist_roll_right").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#GrabMast").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 1: Close Claw!"); //add timestamp
	command.claw = 1;
});

//Stop Claw
$("#stop_claw").click(function(){
	$("#buttonDisplay").html("Claw STOPPED");
	$("#OpenClaw").removeClass('btn-info');
	$("#CloseClaw").removeClass('btn-info');
	$("#wrist_roll_left").removeClass('btn-info');
	$("#wrist_roll_right").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#GrabMast").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
	$("#stop_claw").addClass('btn-info');	
    $( "#messages" ).html("Claw STOPPED"); //add timestamp
	command.claw = 0;
});

//Wrist Roll Left
$("#wrist_roll_left").click(function(){
	$("#buttonDisplay").html("2: Wrist Roll Left");
	$("#OpenClaw").removeClass('btn-info');
	$("#CloseClaw").removeClass('btn-info');
	$("#wrist_roll_left").addClass('btn-info');
	$("#wrist_roll_right").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#GrabMast").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 2: Wrist Roll Left!"); //add timestamp
    $("#Wrist_RollState").html("Roll left");
	command.wrist_roll = 1;
});

//Wrist Roll Right
$("#wrist_roll_right").click(function(){
	$("#buttonDisplay").html("3: Wrist Roll Right");
	$("#OpenClaw").removeClass('btn-info');
	$("#CloseClaw").removeClass('btn-info');
	$("#wrist_roll_left").removeClass('btn-info');
	$("#wrist_roll_right").addClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#GrabMast").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 3: Wrist Roll Right!"); //add timestamp
    $("#Wrist_RollState").html("Roll right");
	command.wrist_roll = 2;
});

//Stop Wrist Roll
$("#stop_wrist_roll").click(function(){
	$("#buttonDisplay").html("Wrist Roll STOPPED");
	$("#OpenClaw").removeClass('btn-info');
	$("#CloseClaw").removeClass('btn-info');
	$("#wrist_roll_left").removeClass('btn-info');
	$("#wrist_roll_right").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#GrabMast").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
	$("#stop_wrist_roll").addClass('btn-info');
    $( "#messages" ).html("Wrist Roll STOPPED"); //add timestamp
    $("#Wrist_RollState").html("0");
	command.wrist_roll = 0;
});


//Touch Ground
$("#method4").click(function(){
	$("#buttonDisplay").html("4: Touch Ground");
	$("#OpenClaw").removeClass('btn-info');
	$("#CloseClaw").removeClass('btn-info');
	$("#wrist_roll_left").removeClass('btn-info');
	$("#wrist_roll_right").removeClass('btn-info');
	$("#method4").addClass('btn-info');
	$("#GrabMast").removeClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 4: Touch Ground!"); //add timestamp

    //command sent to rovercore-s 
    /*
	command.rotunda = 
		//850-2350
	command.shoulder = 
		//150-280 
	command.elbow = 
		//200-1000
	command.wrist_pitch = 
		//90-270
	command.wrist_roll = 
		//0-2
	command.claw = 
		//0-2
	command.claw_torque = 
		//0-100
	//command.camera_select = 
		//0-2
	//command.rotunda_camera = 
		//0-270
	*/

    //GUI changes according to command
    /*
	$("#ShoulderSlider").slider('value', 590);
	$("#ShoulderInputBox").val('590');
	$("#ShoulderState").text(parseInt(this.value));
	*/
});

//Grab Mast
$("#GrabMast").click(function(){
	//insert appropriate slider value
	$("#buttonDisplay").html("5: Grab Mast");
	$("#OpenClaw").removeClass('btn-info');
	$("#CloseClaw").removeClass('btn-info');
	$("#wrist_roll_left").removeClass('btn-info');
	$("#wrist_roll_right").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#GrabMast").addClass('btn-info');
	$("#method6").removeClass('btn-info');
    $( "#messages" ).html("Position changed to 5: Grab Mast!"); //add timestamp
    //command sent to rovercore-s 
    /*
	command.rotunda = 
		//850-2350
	command.shoulder = 
		//150-280 
	command.elbow = 
		//200-1000
	command.wrist_pitch = 
		//90-270
	command.wrist_roll = 
		//0-2
	command.claw = 
		//0-2
	command.claw_torque = 
		//0-100
	//command.camera_select = 
		//0-2
	//command.rotunda_camera = 
		//0-270
	*/

    //GUI changes according to command
    /*
	$("#ShoulderSlider").slider('value', 590);
	$("#ShoulderInputBox").val('590');
	$("#ShoulderState").text(parseInt(this.value));
	*/
});

//Reach Forward
$("#method6").click(function(){
	//insert appropriate slider value
	$("#buttonDisplay").html("6: Reach Forward");
	$("#OpenClaw").removeClass('btn-info');
	$("#CloseClaw").removeClass('btn-info');
	$("#wrist_roll_left").removeClass('btn-info');
	$("#wrist_roll_right").removeClass('btn-info');
	$("#method4").removeClass('btn-info');
	$("#GrabMast").removeClass('btn-info');
	$("#method6").addClass('btn-info');
    $( "#messages" ).html("Position changed to 6: Reach Forward!"); //add timestamp
    //command sent to rovercore-s 
    /*
	command.rotunda = 
		//850-2350
	command.shoulder = 
		//150-280 
	command.elbow = 
		//200-1000
	command.wrist_pitch = 
		//90-270
	command.wrist_roll = 
		//0-2
	command.claw = 
		//0-2
	command.claw_torque = 
		//0-100
	//command.camera_select = 
		//0-2
	//command.rotunda_camera = 
		//0-270
	*/

    //GUI changes according to command
    /*
	$("#ShoulderSlider").slider('value', 590);
	$("#ShoulderInputBox").val('590');
	$("#ShoulderState").text(parseInt(this.value));
	*/
});

/*
================
Mimic Connection
================
*/

var ToggleMimic = document.querySelector("#ToggleMimic");
var gameloop_interval, check_gamepad_interval;

function buttonPressed(b) {
	if (typeof(b) == "object") {
		return b.pressed;
	}
	return b == 1.0;
}

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

window.addEventListener("gamepadconnected", function(e)
{
	var gp = navigator.getGamepads()[e.gamepad.index];
	console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
		gp.index,
		gp.id,
		gp.buttons.length,
		gp.axes.length
	);
});

function pollGamepads()
{
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	for (var i = 0; i < gamepads.length; i++)
	{
		var gp = gamepads[i];
		if (gp)
		{
			console.log("Gamepad connected at index " + gp.index + ": " + gp.id +
				". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.");
			intervalControl(true);
			$("#ToggleMimic").prop('checked', true).change();
		}
	}
}

function intervalControl(poll_gamepad)
{
	if(poll_gamepad)
	{
		gameloop_interval = setInterval(gameLoop, 100);
		clearInterval(check_gamepad_interval);
	}
	else
	{
		check_gamepad_interval = setInterval(pollGamepads, 1000);
		clearInterval(gameloop_interval);
	}
}

function gameLoop()
{
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

	if (!gamepads)
	{
		$("#ToggleMimic").prop('checked', false).change();
		intervalControl(false);
		return;
	}

	var gp = gamepads[0];

	if(gp === null)
	{
		$("#ToggleMimic").prop('checked', false).change();
		intervalControl(false);
	}

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
	document.getElementById("Wrist_RollState").innerHTML = "A";
	command.wrist_roll = 1;
	}
	else if (buttonPressed(gp.buttons[6]))
	{
	document.getElementById("buttonDisplay").innerHTML = "6: Wrist Roll B";
    document.getElementById("messages").innerHTML= "Position changed to 6: Wrist Roll B!"; //add timestamp
	command.wrist_roll = 2;
	document.getElementById("Wrist_RollState").innerHTML = "B";
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
	document.getElementById("buttonDisplay").innerHTML = "2: Grab Mast?";
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
	command.rotunda = map(gp.axes[0], 0, 1, LIMITS["rotunda"][0], LIMITS["rotunda"][1]);
	document.getElementById("RotundaState").innerHTML = command.rotunda;
	document.getElementById("messages").innerHTML = "MIMIC: Rotunda (Axis 0) changed!";
	}

	//shoulder axis from mimic
	if(gp.axes[1] != 0) {
	var shoulderPitchBit = controllerToBit(gp.axes[1]);
	command.shoulder = map(gp.axes[1], -1, 0.65, LIMITS["shoulder"][0], LIMITS["shoulder"][1]);
	document.getElementById("ShoulderState").innerHTML = command.shoulder;
	document.getElementById("messages").innerHTML = "MIMIC: Shoulder (Axis 1) changed!";
	}

	//elbow axis from mimic
	if(gp.axes[2] != 0) {
	var elbowPitchBit = controllerToBit(gp.axes[2]);
	command.elbow = map(-gp.axes[2], -1, 1, LIMITS["elbow"][0], LIMITS["elbow"][1]);
	document.getElementById("ElbowState").innerHTML = command.elbow;
	document.getElementById("messages").innerHTML = "MIMIC: Elbow (Axis 2) changed!";
	}

	//claw from mimic
	if(gp.axes[3] != 0) {
	var torqueBit = controllerToBit(gp.axes[3]);
	command.claw_torque = map(-gp.axes[3], -1, 1, LIMITS["claw_torque"][0], LIMITS["claw_torque"][1]);
	document.getElementById("ClawState").innerHTML = command.claw_torque;
	document.getElementById("messages").innerHTML = "MIMIC: Claw_torque (Axis 3) changed!";
	}

	//wrist_pitch from mimic
	if(gp.axes[4] != 0) {
		var wristPitchBit = controllerToBit(gp.axes[4]);
		command.wrist_pitch = map(-gp.axes[4], -1, 1, LIMITS["wrist_pitch"][0], LIMITS["wrist_pitch"][1]);
		document.getElementById("Wrist_PitchState").innerHTML = command.wrist_pitch;
		document.getElementById("messages").innerHTML = "MIMIC: Wrist_pitch (Axis 4) changed!";
	}

	//wrist_rotation from mimic
	if(gp.axes[5] != 0) {
		var wristRotationBit = controllerToBit(gp.axes[5]);
		command.wrist_roll = map(-gp.axes[5], -1, 1, LIMITS["wrist_roll"][0], LIMITS["wrist_roll"][1]);
		document.getElementById("Wrist_RollState").innerHTML = command.wrist_roll;
		document.getElementById("messages").innerHTML = "MIMIC: Wrist_roll (Axis 5) changed!";
	}

}


intervalControl(false);


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


$('[data-toggle="toggle"]').bootstrapToggle();



/*
   	     _
     .__(.)< ("Quack")
      \___)
~~~~~~~~~~~~~~~~~~~~

*/


