"use strict";

class MissionControllers extends Base
{
	constructor()
	{
		super();
		this.controllers = {  };
	}
	updateUI()
	{
		for (var interface_page of interfaces)
		{
			var key_exists = (interface_page in this.controllers);
			var id = this.controllers[interface_page];

			if(!key_exists)
			{
				$(`#${interface_page}`).removeClass().addClass("rover-inactive");
			}
			else if(id !== "")
			{
				$(`#${interface_page}`).removeClass().addClass("rover-active");
			}
			else
			{
				$(`#${interface_page}`).removeClass().addClass("rover-halted");
			}
		}
	}
	removeAll()
	{
		this.controllers = {  };
	}
	set(n_controllers)
	{
		if(typeof n_controllers === "object")
		{
			this.controllers = n_controllers;
			this.events_handlers["update"]();
		}
		else
		{
			console.warn("Could not parse controllers = ", n_controllers);
		}
	}
}