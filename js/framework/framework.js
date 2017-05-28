"use strict";

var interfaces = {  };
var page_select = 0;
var page_name = "";

class FrameworkHandler extends Base
{
	constructor()
	{
		super();
	}
	initialize()
	{
		//// Perform GET request for interfaces.json
		$.get(
			"interfaces/interfaces.json?random=${Math.random()}",
			this.setupUI
		).fail(( event, jqxhr, settings, thrownError ) =>
		{
			console.warn( event, jqxhr, settings, thrownError );
			this.setupFailure();
		});
	}
	attachHashChangeHandler()
	{
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
	}
	setupUI(modules)
	{
		// "Interfaces": [ "Test", "Drive", "Arm", "Captain", "Telemetry" ]
		if(!("Interfaces" in modules))
		{
			this.setupFailure();
		}
		else
		{
			//// Get interface array of the object keys from modules
			interfaces = modules["Interfaces"];
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
			page_select = interfaces.indexOf(window.location.hash.substr(1));
			//// Default to 0 if key not found.
			page_select = (page_select === -1) ? 0 : page_select;
			//// Storing page name
			page_name = interfaces[page_select];
			console.log(this.framework_test);
			//// Generate page URL
			var page_url = `interfaces/${page_name}/main.html`;
			setTimeout(() => {
				$.ajax({
					url: page_url,
					cache: false,
					dataType: "html",
					success: (data) =>
					{
						data = data.replace(/{{ANTI-CACHE-MARKER}}/g, Math.random());
						$("#mc-container").html(data);
						console.log(`${page_url} loaded successfully.`);
					},
					failure: () =>
					{
						this.pageLoadFailure(interfaces[page_select]);
					},
					error: () =>
					{
						this.pageLoadFailure(interfaces[page_select]);
					}
				});
			}, 1000);
		}
	}
	failure(msg)
	{
		$("#loading-text").html(msg);
		$("#loading-circles").addClass("loading-error");
		console.error(msg);
	}
	pageLoadFailure(interface_page)
	{
		this.failure(`Failed to Load<br>${interface_page}/<br>Main.html`);
	}
	setupFailure()
	{
		this.failure("Failed to Load<br>Interfaces<br>json");
	}
}