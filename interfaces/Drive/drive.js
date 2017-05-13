var arrow = document.querySelector("#arrow");

var ModelInterval = setInterval(function()
{
	if(Connection.state === Connection.CONNECTED)
	{
		ModelJSONEditor.set(model);
	}
}, 100);

var MessageInterval = setInterval(function()
{
	if(Connection.state === Connection.CONNECTED)
	{
		document.querySelector("#messages").innerHTML = messages;
	}
}, 100);

var AssignmentInterval = setInterval(function()
{
	if(Connection.state === Connection.CONNECTED)
	{
		primus.write(
		{
			target: 'Cortex',
			command: 'DriveSystem',
		});
		clearInterval(AssignmentInterval);
	}
}, 100);


var options = {
    mode: 'code',
    history: false,
    modes: ['code', 'form', 'tree', 'view', 'text'], // allowed modes
    error: function(err) {
        alert(err.toString());
    }
};

var command = {
	speed: 0,
	angle: 0,
	mode: 'J'
};

var TestEditor = new JSONEditor(document.querySelector("#info"), options);
var ModelJSONEditor = new JSONEditor(document.querySelector("#model"), options);

TestEditor.set(command);

document.querySelector("#send-ctrl-signal").onclick = function()
{
	if(Connection.state === Connection.CONNECTED)
	{
		var payload = {
			target: "DriveSystem",
			command: TestEditor.get()
		};
		primus.write(payload);
	}
};

window.addEventListener("gamepadconnected", function(e) {
	var gp = navigator.getGamepads()[e.gamepad.index];
	console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
		gp.index,
		gp.id,
		gp.buttons.length,
		gp.axes.length
	);
});

var interval;

function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if (gp) {
      console.log("Gamepad connected at index " + gp.index + ": " + gp.id +
        ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.");
      interval = setInterval(gameLoop, 150);
    }
  }
}

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 0.0;
}

function gameLoop() {
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	if (!gamepads) {
	return;
	}

	var gp = gamepads[0];

	//console.log(command);

	command.speed = Math.round(-1*gp.axes[1]*100);
	if(Math.abs(gp.axes[3]) < 0.1 && Math.abs(gp.axes[2]) < 0.1)
	{
		command.angle = 0;
	}
	else if(gp.axes[3] > 0 && gp.axes[2] > 0)
	{
		command.angle = 90;
	}
	else if(gp.axes[3] > 0 && gp.axes[2] < 0)
	{
		command.angle = -90;
	}
	else
	{
		var angle = 0;
		if(command.mode === 'J')
		{
			x_coord_tmp = Math.pow(gp.axes[2], 2);
			x_coord = (gp.axes[2] < 0) ? -x_coord_tmp : x_coord_tmp;
			angle = Math.atan(x_coord/gp.axes[3]);
		}
		else
		{
			angle = Math.atan(gp.axes[2]/gp.axes[3]);
		}
		angle = (180/Math.PI)*angle;
		angle = -1*angle;
		angle = Math.round(angle);

		command.angle = angle;
		arrow.style.transform = `rotate(${angle-90}deg)`;
	}

	//command.angle = Math.round(gp.axes[2]*90);

	if (buttonPressed(gp.buttons[2])) // X
	{
		console.log("Drive Mode");
		command.mode = 'J';
	}
	else if (buttonPressed(gp.buttons[1])) // B
	{
		console.log("Spin in Place Mode");
		command.mode = 'O';
	}
	else if (buttonPressed(gp.buttons[3])) // Y
	{
		console.log("Translate Mode");
		command.mode = 'Y';
	}

	if(Connection.state === Connection.CONNECTED)
	{
		var payload = {
			target: "DriveSystem",
			command: command
		};
		//console.log(command);
		primus.write(payload);
	}
}

pollGamepads();