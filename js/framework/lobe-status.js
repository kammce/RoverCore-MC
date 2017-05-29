"use strict";

class LobeStatusHandler extends Base
{
	constructor()
	{
		super();
		this.status = { };
	}
	set(data)
	{
		this.status = data;
		this.events_handlers["update"]();
	}
	get(lobe)
	{
		return this.status[lobe];
	}
	getAll()
	{
		return this.status;
	}
}

