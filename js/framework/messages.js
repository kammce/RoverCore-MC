"use strict";

var messages = "";

class MessageHandler extends Base
{
	constructor(character_limit)
	{
		super();
		this.character_limit = character_limit;
	}
	append(msg)
	{
		//// append message and remove characters after character limit
		try
		{
			messages = (msg.toString()+messages).substr(0, this.character_limit);
			this.events_handlers["update"]();
		}
		catch(e)
		{
			console.warn("Message Append Error = ", e);
		}
	}
	set(msg)
	{
		try
		{
			messages = msg.toString();
			this.events_handlers["update"]();
		}
		catch(e)
		{
			console.warn("Message Set Error = ", e);
		}
	}
	get(key)
	{
		return messages;
	}
}