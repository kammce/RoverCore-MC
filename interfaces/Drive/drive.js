// ================================
// Capture Controllable DOM elements
// ================================
var arrow_speed = document.querySelector("#arrow-speed");
var arrow_orientation = document.querySelector("#arrow-orientation");
var speed_percent = document.querySelector("#speed-percent");
var max_speed_indicator = document.querySelector("#max-speed-indicator");
var capacity_indicator = document.querySelector("#capacity-indicator");
var capacity_value = document.querySelector("#capacity-value");

var mode_image = document.querySelector("#mode-image");
var mode_text = document.querySelector("#mode-text");
var max_speed_value = document.querySelector("#max-speed-value");
var compass = document.querySelectorAll("[id^='compass-']");
var joystick_indicator = document.querySelector("#joystick-indicator");
var camera_indicator = document.querySelector("#camera-indicator");

var video_stream = document.querySelector("#video-stream");

// ================================
// Variables & Data Structures
// ================================
const DEBUG = true;
const JOYSTICK = {
	X_AXIS:0,
	Y_AXIS:1,
	PADDLE_AXIS:3,
	BTN_6: 5,
	BTN_5: 4,
	BTN_4: 3,
	BTN_3: 2,
	TRIGGER: 0
}

var command = {
	speed: 0,
	angle: 0,
	mode: 'J'
};

var gameloop_interval, check_gamepad_interval;
var video_stream_interval;

// ================================
// Utility Functions
// ================================
function buttonPressed(b)
{
	if (typeof(b) == "object")
	{
		return b.pressed;
	}
	return b == 0.0;
}
function radToDeg(rads)
{
	return (180/Math.PI)*rads;
}

// ================================
// Event Listeners
// ================================
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

video_stream.onerror = function()
{
	video_stream.style.visibility = "hidden";
	$("#video-indicator").prop('checked', false).change();
	video_stream_interval = setTimeout(function()
	{
		video_stream.src = `http://192.168.1.50/video.mjpg?r=${Math.random()}`;
	}, 1000);
}
video_stream.onload = function()
{
	video_stream.style.visibility = "visible";
	$("#video-indicator").prop('checked', true).change();
}
video_stream.onclick = function()
{
	video_stream.src = "";
	console.log("testing onclick");
	setTimeout(function()
	{
		video_stream.src = `http://192.168.1.50/video.mjpg?r=${Math.random()}`;
	}, 50);
}

video_stream.onclick = function()
{
	video_stream.src = "";
	console.log("testing onclick");
	setTimeout(function()
	{
		video_stream.src = `http://192.168.1.50/video.mjpg?r=${Math.random()}`;
	}, 50);
}

$('#camera-indicator').change(function() {
	var mux = $(this).prop('checked') ? 1 : 0;
	var payload = {
		target: "Tracker",
		command: {
			activeCamera: mux
		}
	};
	primus.write(payload);
});


Model.on("update", () =>
{
	try
	{
		var level = model.Power.value.batteryPercentage.toFixed(3);
		$(capacity_indicator)
				.removeClass("progress-bar-disabled")
				.addClass("progress-bar-info")
				.addClass("active");
		capacity_indicator.style.height = `${level}%`;
		capacity_value.innerHTML = `Capacity ${level}%`;
	}
	catch(e)
	{}
}, 50);

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
			$(max_speed_indicator)
				.removeClass("progress-bar-disabled")
				.addClass("progress-bar-info")
				.addClass("active");
			intervalControl(true);
			$("#joystick-indicator").prop('checked', true).change();
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

var lag_angle = 0;

function gameLoop()
{
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

	if (!gamepads)
	{
		$("#joystick-indicator").prop('checked', false).change();
		intervalControl(false);
		return;
	}

	var gp = gamepads[0];

	if(gp === null)
	{
		$("#joystick-indicator").prop('checked', false).change();
		intervalControl(false);
	}

	var max_speed_axis = ((-gp.axes[JOYSTICK.PADDLE_AXIS])+1)/2;
	var max_speed = Math.round(max_speed_axis*100);

	var x = gp.axes[JOYSTICK.X_AXIS];
	var y = -gp.axes[JOYSTICK.Y_AXIS];

	var magnitude = Math.sqrt((x*x)+(y*y));
	var speed = Math.round(max_speed*magnitude);
	speed = (buttonPressed(gp.buttons[JOYSTICK.TRIGGER])) ? speed : 0;
	command.speed = (speed > max_speed) ? max_speed : speed;

	var angle = 0;

	if(Math.abs(x) < .1 && Math.abs(y) < .1) { }
	else
	{
		console.log(x, Math.pow(x,3));
		angle = Math.atan2(y, Math.pow(x,3));

		// console.log(x, Math.pow(x,1/3));
		// angle = Math.atan2(y, Math.pow(x,1/3));

		angle = -(radToDeg(angle)-90);
		angle = Math.round(angle);
		//angle = (y < 0) ? (angle-180) : angle;
		// angle = (angle < -90) ? -90 : angle;
		// angle = (angle >  90) ?  90 : angle;
	}

	command.speed = (90 < angle && angle <= 270) ? -command.speed : command.speed;

	weight = Math.abs(command.speed)/140;
	lag_angle = ((weight*lag_angle)+(1-weight)*(angle));

	command.angle = (90 < lag_angle && lag_angle <= 270) ? (180-lag_angle) : lag_angle;

	console.log(weight, angle, lag_angle);

	//var ratio = command.angle/90;
	//command.angle = (ratio*ratio)*command.angle;
	//console.log(command.angle, "::", y, "::", x);

	if (buttonPressed(gp.buttons[JOYSTICK.BTN_4]) || buttonPressed(gp.buttons[JOYSTICK.BTN_3])) // X
	{
		console.log("Drive Mode");
		command.mode = 'J';
		mode_image.src = `interfaces/Drive/assets/drive-arrow.png?random=${Math.random()}`;
		mode_text.innerHTML = "DRIVE";
	}
	else if (buttonPressed(gp.buttons[JOYSTICK.BTN_6])) // B
	{
		console.log("Spin in Place Mode");
		command.mode = 'O';
		mode_image.src = `interfaces/Drive/assets/rotation-arrow.png?random=${Math.random()}`;
		mode_text.innerHTML = "ROTATE";
	}
	else if (buttonPressed(gp.buttons[JOYSTICK.BTN_5])) // Y
	{
		console.log("Translate Mode");
		command.mode = 'Y';
		mode_image.src = `interfaces/Drive/assets/translate-arrow.png?random=${Math.random()}`;
		mode_text.innerHTML = "TRANSLATE";
	}

	if(Connection.state === Connection.CONNECTED)
	{
		var payload =
		{
			target: "Drive",
			command: command
		};
		primus.write(payload);
	}

	arrow_speed.style.clipPath = `inset(${ (buttonPressed(gp.buttons[JOYSTICK.TRIGGER])) ? (100-(magnitude*100)) : 100 }% 0px 0px 0px)`;
	speed_percent.innerHTML = `${command.speed}%`;
	arrow_orientation.style.transform = `translate(-50%, -50%) rotate(${lag_angle}deg)`;
	max_speed_indicator.style.height = `${max_speed}%`;
	max_speed_value.innerHTML = `Max Speed ${Math.round(max_speed)}%`;

	for(var i = 0; i < compass.length; i++)
	{
		compass[i].style.transform = `rotate(${(i*90)+lag_angle}deg)`;
	}
}

// ================================
// Initialize Special DOM Objects
// ================================
$('[data-toggle="toggle"]').bootstrapToggle();

// ================================
// Start Systems
// ================================
intervalControl(false);

if(DEBUG)
{
	var ext_angle = 0;
	// setInterval(function()
	// {
	// 	for(var i = 0; i < compass.length; i++)
	// 	{
	// 		var test = Math.cos(ext_angle) * (180/Math.PI) * 3;
	// 		compass[i].style.transform = `rotate(${(i*90)+test}deg)`;
	// 		ext_angle += .01;
	// 	}
	// }, 100);
}