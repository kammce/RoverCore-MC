var ModelInterval = setInterval(function()
{
	if(connection)
	{
		ModelJSONEditor.set(JSON.parse(model));
	}
}, 100);

var MessageInterval = setInterval(function()
{
	if(connection)
	{
		document.querySelector("#messages").innerHTML = messages;
	}
}, 100);

var SetCommanderInterval = setInterval(function()
{
	if(connection)
	{
		connection.write(
		{
			target: 'Cortex',
			command: target,
		});
		clearInterval(SetCommanderInterval);
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

var default_json = {
	"command":
	{
		"speed": 0,
		"angle": 90,
		 // S = Spin in Place
		 // D = Drive Mode
		"mode": "D"
	}
};

var TestEditor = new JSONEditor(document.querySelector("#info"), options);
var ModelJSONEditor = new JSONEditor(document.querySelector("#model"), options);

TestEditor.set(default_json);

console.log(TestEditor.get());

document.querySelector("#send-ctrl-signal").onclick = function()
{
	if(connection)
	{
		var target = document.querySelector("#target").value;

		var payload = {
			target: target,
			command: TestEditor.get()
		};
		connection.write(payload);
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

if (!('ongamepadconnected' in window)) {
  // No gamepad events available, poll instead.
  interval = setInterval(pollGamepads, 500);
}

function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if (gp) {
      console.log("Gamepad connected at index " + gp.index + ": " + gp.id +
        ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.");
      gameLoop();
      clearInterval(interval);
    }
  }
}

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 0.0;
}

var mode = 'D';

function gameLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads) {
    return;
  }


  var gp = gamepads[0];

  console.log(gp.axes[1]);

  if (buttonPressed(gp.buttons[0])) // X
  {
  	console.log("Drive Mode");
  	mode = 'D';
  }
  if (buttonPressed(gp.buttons[3])) // Triangle
  {
  	console.log("Spin in Place Mode");
  	mode = 'S';
  }

  start = requestAnimationFrame(gameLoop);
}