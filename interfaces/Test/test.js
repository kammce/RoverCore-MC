var ModelInterval = setInterval(function()
{
	if(Connection.state === Connection.CONNECTED)
	{
		ModelJSONEditor.set(model);
	}
}, 200);

var MessageInterval = setInterval(function()
{
	if(Connection.state === Connection.CONNECTED)
	{
		document.querySelector("#messages").innerHTML = messages;
	}
}, 200);

var video_elem = document.querySelector("#video");

video_elem.onerror = function()
{
	video_elem.onerror = undefined;
	video_elem.src = "";
	video_elem.style.visibility = "hidden";
	console.log("Video Element Error");
};

var MessageInterval = setInterval(function()
{
	document.querySelector("#messages").innerHTML = messages;
}, 100);

var options = {
    mode: 'code',
    history: false,
    modes: ['code', 'form', 'tree', 'view', 'text'], // allowed modes
    error: function(err) {
        alert(err.toString());
    }
};

var TestEditor = new JSONEditor(document.querySelector("#info"), options);
var ModelJSONEditor = new JSONEditor(document.querySelector("#model"), options);

var command = {
	"rotunda": 1500,
	"shoulder": 700,
	"elbow": 125,
	"wrist_pitch": 180,
	"wrist_roll": 0,
	"claw": 0,
	"camera_select": 0,
	"rotunda_camera": 0
};

TestEditor.set(command);

document.querySelector("#send-ctrl-signal").onclick = function()
{
	if(Connection.state === Connection.CONNECTED)
	{
		var target = document.querySelector("#target").value;
		primus.write(
		{
			target: 'Cortex',
			command: target,
		});
		command = TestEditor.get();
		var payload = {
			target: target,
			command: command
		};

		primus.write(payload);
	}
};

function SendPayload(json)
{
	if(Connection.state === Connection.CONNECTED)
	{
		var target = document.querySelector("#target").value;
		var payload = {
			target: target,
			command: json
		};
		primus.write(payload);
	}
}