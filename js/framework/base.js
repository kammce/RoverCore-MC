"use strict";

class Base
{
	constructor()
	{
		this.events_handlers = {
			update: function() {},
		}
	}
	on(event, callback)
	{
		switch(event)
		{
			case "update":
				this.events_handlers["update"] = callback;
				break;
			default:
				console.warn("Invalid event entered", update);
				break;
		}
	}
}