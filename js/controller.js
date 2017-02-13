var modules = {};
var connection;
var send_protolobe_interval;
var connection_flag = false;
var model = {};
var states = {};
var messages = "";
var navbar_width = 12.5;

$(function() {
	$.get( "interfaces/interfaces.json", function( data )
	{
		modules = data;
		var navigation_items = "";
		navbar_width = (100/(Object.keys(modules).length+1));

		for( interface in modules )
		{
			navigation_items += `
			<li id="${interface}" class="rover-inactive" style="width:${navbar_width}%">
				<a href="#${modules[interface]}">${interface}</a>
			</li>`;
		}

		console.log($("li#navi-server"));
		$("li#navi-server").css("width", `${navbar_width}%`);
		$("ul#navigation").prepend(navigation_items);

		var default_page = Object.keys(modules)[0];

		var default_page_url = `interfaces/${default_page}/${modules[default_page]}`;

		$.get(`${default_page_url}?random=${Math.random()}`, function( data )
		{
			$("#container").html( data );
			console.log( `Load of ${default_page_url} was performed.` );
		});
	});
});

$("#mc-disconnect").on('click', function()
{
	connection.destroy();
	connection = undefined;
});
$("#mc-connect-kammce").on('click', function()
{
	primusConnect("http://kammce.io");
});
$("#mc-connect-rover").on('click', function()
{
	primusConnect("http://192.168.1.10");
});
$("#mc-connect-localhost").on('click', function()
{
	primusConnect("http://127.0.0.1");
});

function primusConnect(url)
{
	if(connection) { connection.destroy(); }

	connection = Primus.connect(`${url}:9000`,
	{
		reconnect:
		{
			max: 2000, // Number: The max delay before we try to reconnect.
			min: 500, // Number: The minimum delay before we try reconnect.
			retries: Infinity // Number: How many times we should try to reconnect.
		}
	});
	connection.on('open', () =>
	{
		console.log('Connected to RoverCore-S!');
		$("#navi-server").removeClass("rover-inactive rover-halted");
		$("#navi-server").addClass("rover-active");
	});
	connection.on('data', (data) =>
	{
		//console.log('PRINTED FROM SERVER:', data);
		if("target" in data)
		{
			switch(data.target)
			{
				case "model":
					model = data.message;
					break;
				case "Cortex":
					var lobe_status = {};
				    try { lobe_status = JSON.parse(data.message); }
				    catch (e)
				    {
						messages += data.message;
						break;
				    }
					if("lobe" in lobe_status)
					{
						status[lobe_status["lobe"]] = lobe_status["state"];
						var StatusMap = {
							"IDLING": "rover-idling",
							"RUNNING": "rover-active",
							"HALTED": "rover-halted"
						}
						$(`li#Test`).removeClass().addClass(StatusMap[lobe_status["state"]]);
						//{"lobe":"DriveSystem","controller":"LepuvXs","state":"IDLING"}
					}
					break;
				default:
					messages += data.message;
					break;
			}
		}
	});
	connection.on('error',  (err) =>
	{
		console.log('CONNECTION error!', err.stack);
	});
	connection.on('reconnect', () =>
	{
		console.log('RECONNECTION attempt started!');
		$("#navi-server").removeClass("rover-active rover-inactive");
		$("#navi-server").addClass("rover-halted");
	});
	connection.on('reconnect scheduled', (opts) =>
	{
		console.log(`Reconnecting in ${opts.scheduled} ms`);
		console.log(`This is attempt ${opts.attempt} out of ${opts.retries}`);
	});
	connection.on('reconnected', (opts) =>
	{
		console.log(`It took ${opts.duration} ms to reconnect`);
	});
	connection.on('reconnect timeout', (err) =>
	{
		console.log(`Timeout expired: ${err.message}`);
	});
	connection.on('reconnect failed', (err) =>
	{
		console.log(`The reconnection failed: ${err.message}`);
	});
	connection.on('end', () =>
	{
		console.log('Disconnected from RoverCore');
		$("#navi-server").removeClass("rover-active rover-halted");
		$("#navi-server").addClass("rover-inactive");
	});
}