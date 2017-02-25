
import BaseNetwork from './BaseNetwork.jsx';

var primus;

export default class PrimusNetwork extends BaseNetwork {
	constructor() {
		super();
		primus = primus || new Primus("http://127.0.0.1:9000/", {});
		primus.on('reconnected', () => {
			this.reconnectCb();
		})

		primus.on('data', (data) => {
			if (data && data.model) {
				this.listenCb(JSON.parse(data.model));
			} else {
				console.error("Malformed data ", data);
			}
		});
	}

	sendPacket(packet) {
		primus.write(packet);
	}

	close() {
	}
}
