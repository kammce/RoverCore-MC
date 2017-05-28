"use strict";

var primus;

var Framework 		= new FrameworkHandler();
var Messages 		= new MessageHandler(4095);
var Lobes 			= new LobeStatusHandler();
var Controllers 	= new MissionControllers();
var Model 			= new ModelHandler();
var Connection 		= new ConnectionHandler();


// =====================================
// Setup Button Listeners
// =====================================
$("#mc-disconnect").on('click', () =>
{
	Controllers.removeAll();
	Controllers.updateUI();
	primus.destroy();
});
/** Attach each server <li> element to an on-click event
 * that will run a PrimusConnect() routine with its
 * data-server attribute which should point a
 * server running RoverCore-S
 */
$("[id*=mc-connect-]").each((index, elem) =>
{
	$(elem).on('click', () =>
	{
		PrimusConnect($(elem).attr("data-server"));
	});
});

var PrimusOpenHandler = () =>
{
	console.log('Websockets Connection Open!');
	$("#navi-server").removeClass("rover-inactive rover-halted");
	$("#navi-server").addClass("rover-active");
	primus.write({
		target: "Cortex",
		command: {
			controller: page_name
		}
	});
	Connection.state = Connection.CONNECTED;
};

var PrimusErrorHandler = (err) =>
{
	console.log('CONNECTION error!', err.stack);
	Connection.state = Connection.DISCONNECTED;
};

var PrimusReconnect = () =>
{
	console.log('RECONNECTION attempt started!');
	$("#navi-server").removeClass("rover-active rover-inactive");
	$("#navi-server").addClass("rover-halted");
	Connection.state = Connection.DISCONNECTED;
};
var PrimusReconnectScheduled = (opts) =>
{
	console.log(`Reconnecting in ${opts.scheduled} ms`);
	console.log(`This is attempt ${opts.attempt} out of ${opts.retries}`);
	Connection.state = Connection.DISCONNECTED;
};
var PrimusReconnected = (opts) =>
{
	console.log(`It took ${opts.duration} ms to reconnect`);
	Connection.state = Connection.CONNECTED;
};
var PrimusReconnectTimeout = (err) =>
{
	console.log(`Timeout expired: ${err.message}`);
	Connection.state = Connection.DISCONNECTED;
};
var PrimusReconnectFailed = (err) =>
{
	console.log(`The reconnection failed: ${err.message}`);
	Connection.state = Connection.DISCONNECTED;
};
var PrimusEnd = () =>
{
	console.log('Disconnected from RoverCore');
	$("#navi-server").removeClass("rover-active rover-halted");
	$("#navi-server").addClass("rover-inactive");
	Connection.state = Connection.DISCONNECTED;
};

var PrimusDataHandler = (data) =>
{
	var tmp;
	if(typeof data === "string") { return; }
	else if("target" in data)
	{
		Connection.state = Connection.CONNECTED;

		try
		{
			tmp = JSON.parse(data.message);
		}
	    catch (e)
	    {
			Messages.append(data.message);
			return;
	    }

		switch(data.target)
		{
			case "model":
				Model.set(tmp);
				break;
			case "Cortex":
		    	switch(tmp["type"])
		    	{
		    		case "status":
		    			Lobes.set(tmp["data"]);
		    			break;
		    		case "mission_controllers":
		    			Controllers.set(tmp["data"]);
		    			Controllers.updateUI();
		    			break;
		    	}
			    break;
			default:
				Messages.append(data.message);
				break;
		}
	}
};

// =====================================
// Primus Connect Routine
// =====================================
function PrimusConnect(url)
{
	if(primus) { primus.destroy(); }

	console.log("Primus attempting to connect: ", `${url}:9000`);

	primus = Primus.connect(`${url}:9000`,
	{
		reconnect:
		{
			max: 2000, // Number: The max delay before we try to reconnect.
			min: 500, // Number: The minimum delay before we try reconnect.
			retries: Infinity // Number: How many times we should try to reconnect.
		}
	});

	primus.on('open', PrimusOpenHandler);
	primus.on('data', PrimusDataHandler);
	primus.on('error', PrimusErrorHandler);
	primus.on('reconnect', PrimusReconnect);
	primus.on('reconnect scheduled', PrimusReconnectScheduled);
	primus.on('reconnected', PrimusReconnected);
	primus.on('reconnect timeout', PrimusReconnectTimeout);
	primus.on('reconnect failed', PrimusReconnectFailed);
	primus.on('end', PrimusEnd);
}

// =====================================
// Load Framework
// =====================================
Framework.attachHashChangeHandler();
Framework.initialize();