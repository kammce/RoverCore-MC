var primus;
var model = {};
var states = {};
var messages = "";
var Connection = {
	"DISCONNECTED": 0,
	"CONNECTED": 1,
	"ERROR": 2,
	state: 0
}

// =====================================
// Setup Button Listeners
// =====================================
$("#mc-disconnect").on('click', () =>
{
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
	Connection.state = Connection.CONNECTED;
};

var PrimusErrorHandler = (err) =>
{
	console.log('CONNECTION error!', err.stack);
	Connection.state = Connection.DISCONNECTED;
};

var PrimusDataHandler = (data) =>
{
	if("target" in data)
	{
		Connection.state = Connection.CONNECTED;
		switch(data.target)
		{
			case "model":
				model = (typeof data.message !== "object") ? JSON.parse(data.message) : data.message;
				break;
			case "Cortex":
				var lobe_status = {};
				//// Check if data is JSON
			    try
			    {
			    	lobe_status = JSON.parse(data.message);
			    }
		    	//// If JSON could not parse, then add to messages
			    catch (e)
			    {
					messages = data.message+messages;
					break;
			    }
			    //// Check if lobe property exists
				if("lobe" in lobe_status)
				{
					//// Save lobe state and add it to status structure
					status[lobe_status["lobe"]] = lobe_status["state"];
					var StatusMap = {
						"IDLING": "rover-idling",
						"RUNNING": "rover-active",
						"HALTED": "rover-halted"
					}
					//// Change lobe status
					$(`li#${lobe_status["lobe"]}`).removeClass().addClass(StatusMap[lobe_status["state"]]);
					//// {"lobe":"DriveSystem","controller":"LepuvXs","state":"IDLING"}
				}
				break;
			default:
				messages = data.message+messages;
				break;
		}
	}
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
// On Hash Change Listener
// =====================================
window.onhashchange = () =>
{
    /** Reload window if hash changes
     * NOTE: Reloading the page on URL hash changes IS contrary to using
	 * 		the URL hash to dynamically change the content on the page.
	 * 		But using it this way removes the need for a server side URL
	 *		routing scheme, keeping everything on the front end.
     */
    window.location.reload();
}

// =====================================
// Load Framework
// =====================================

function Failure(msg)
{
	$("#loading-text").html(msg);
	$("#loading-circles").addClass("loading-error");
	console.log(msg);
}

function PageLoadFailure(interface)
{
	Failure(`Failed to Load<br>${interface}/<br>Main.html`);
}
function SetupFailure()
{
	Failure("Failed to Load<br>Interfaces<br>json");
}

function SetupFramework(modules)
{
	// "Interfaces": [ "Test", "Drive", "Arm", "Captain", "Telemetry" ]
	if(!("Interfaces" in modules))
	{
		SetupFailure();
	}
	else
	{
		//// Get interface array of the object keys from modules
		var interfaces = modules["Interfaces"];
		//// Calculate Navigation Button Width based on number of modules.
		var navbar_width = (100/(interfaces.length+1));
		//// Generate Navigation Button HTML
		var navbar_items = "";

		for (var i = 0; i < interfaces.length; i++)
		{
			navbar_items += `
				<li
					id="${interfaces[i]}"
					class="rover-inactive"
					style="width:${navbar_width}%">
					<a href="#${interfaces[i]}">${interfaces[i]}</a>
				</li>
			`;
		}
		//// Set the Server select button to navbar_width
		$("li#navi-server").css("width", `${navbar_width}%`);
		//// Prepend navbar items to navigation bar
		$("ul#navigation").prepend(navbar_items);
		//// Find Hash in keys and remove first char #
		var page_select = interfaces.indexOf(window.location.hash.substr(1));
		//// Default to 0 if key not found.
		page_select = (page_select === -1) ? 0 : page_select;
		//// Generate page URL
		var page_url = `interfaces/${interfaces[page_select]}/main.html`;
		setTimeout(function() {
			$.ajax({
				url: page_url,
				cache: false,
				dataType: "html",
				success: function(data)
				{
					console.log( `Load of ${page_url} was performed.` );
					data = data.replace(/{{ANTI-CACHE-MARKER}}/g, Math.random());
					$("#mc-container").html(data);
				},
				failure: function()
				{
					PageLoadFailure(interfaces[page_select]);
				},
				error: function()
				{
					PageLoadFailure(interfaces[page_select]);
				}
			});
		}, 1000);
	}
}
//// Perform GET request for interfaces.json
$.get(
	"interfaces/interfaces.json?random=${Math.random()}",
	SetupFramework
).fail(function( event, jqxhr, settings, thrownError )
{
	console.log( event, jqxhr, settings, thrownError );
	SetupFailure();
});