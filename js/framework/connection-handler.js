"use strict";

class ConnectionHandler extends Base
{
	constructor()
	{
		super();

		this.DISCONNECTED = 0;
		this.CONNECTED = 1;
		this.ERROR = 2;

		this.status = this.DISCONNECTED;
	}
	set(status)
	{
		this.status = status;
	}
	getStatus()
	{
		return this.status;
	}
}

