
export default class Network {
	constructor() {
		this.listenCb = ()=>{};
		this.reconnectCb = ()=>{};
	}

	listen(listenCb) {
		this.listenCb = listenCb;
	}

	reconnect(reconnectCb) {
		this.reconnectCb = reconnectCb;
	}

	sendPacket(packet) {
	}

	close() {
	}
}
