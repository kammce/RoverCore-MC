"use strict";

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
	console.log(document.querySelector("#target").value);
	var payload = {
		target: document.querySelector("#target").value,
		command: TestEditor.get()
	};
	connection.write(payload);
};

var DriveInterval = setInterval(function()
{
	if(connection_flag)
	{
		connection.write(
		{
			target: 'Cortex',
			command: 'DriveSystem',
		});
		clearInterval(DriveInterval);
	}
}, 500);

var ModelInterval = setInterval(function() {
	if(connection_flag)
	{
		ModelJSONEditor.set(JSON.parse(model));
	}
}, 100);