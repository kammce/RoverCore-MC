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

document.querySelector("#send-ctrl-signal").onclick = function()
{
	if(connection)
	{
		var target = document.querySelector("#target").value;
		connection.write(
		{
			target: 'Cortex',
			command: target,
		});
		var payload = {
			target: target,
			command: TestEditor.get()
		};
		connection.write(payload);
	}
};

// document.querySelector()
// var DriveInterval = setInterval(function()
// {
// 		connection.write(
// 		{
// 			target: 'Cortex',
// 			command: 'DriveSystem',
// 		});
// 		connection.write(
// 		{
// 			target: 'Cortex',
// 			command: 'Arm',
// 		});
// 		clearInterval(DriveInterval);
// 	}
// }, 500);
