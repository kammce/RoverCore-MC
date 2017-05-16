var ModelInterval = setInterval(function()
{
	if(Connection.state === Connection.CONNECTED)
	{
		ModelJSONEditor.set(model);
	}
}, 200);

var prev_message = messages;
var MessageInterval = setInterval(function()
{
	if(prev_message !== messages)
	{
		document.querySelector("#messages").innerHTML = messages;
		prev_message = messages;
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
	SendPayload(TestEditor.get());
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