"use strict";

var model = {  };

class ModelHandler extends Base
{
	constructor()
	{
		super();
	}
	set(data)
	{
		try
		{
			var tmp = (typeof data !== "object") ? JSON.parse(data) : data;
			var key = tmp["key"];
			model[key] = tmp[key];
			this.events_handlers["update"]();
		}
		catch(e)
		{
			console.warn(`Could not parse incoming model data = ${data}`, e);
		}
	}
	get(key)
	{
		return model[key];
	}
	getAll()
	{
		return model;
	}
}

