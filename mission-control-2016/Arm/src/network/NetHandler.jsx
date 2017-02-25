
import BaseNetwork from './BaseNetwork.jsx';
import DummyNetwork from './DummyNetwork.jsx';
import PrimusNetwork from './PrimusNetwork.jsx';

// find the global reference
var glob = (typeof(global) == "undefined" ? global : window);
// create a network object when there isn't already one.
glob.DummyNetwork = DummyNetwork;
glob.network = glob.network || new BaseNetwork();

var simulator = $("#simulator")[0]
if (simulator) {
  // Using the rover simulator...
  console.log("SIMULATION MODE DETECTED... CREATING DUMMY SIMULATOR NETWORK.");
  glob.network = new DummyNetwork(simulator);
} else {
  // Create a primus network.
  glob.network = new PrimusNetwork();
}

export default class NetHandler {
  constructor(target) {
    this.target = target;
    this.listenCbs = [];

    this.network = glob.network;
    this.network.sendPacket({"target": this.target, "connection": "connected"});

    this.network.listen((data) => {
      for (var listener of this.listenCbs) {
        listener(data);
      }
    });

    this.network.reconnect(() => {
      this.network.sendPacket({"target": this.target, "connection": "connected"});
    });

    console.warn("I see that you're using a NetHandler in your code! Make sure you call netHandler.close() on componentWillUnmount!");

    // Limiter to prevent too many packets being sent...
    this.packets = {};
  }

  // Save a packet so we can compare later
  savePacket(target, packet) {
  	if (!packet) {
  		return;
  	}
    this.packets[target] = JSON.parse(JSON.stringify(packet));
  }

  // Used to compare two packets to see if they are the same
  checkObject(object1, object2) {
    if (typeof object1 == "undefined" || typeof object2 == "undefined") {
      return false;
    }

    if (typeof object1 == "object" && typeof object2 == "object") {
      for (var key1 in object1) {
        if (!this.checkObject(object1[key1], object2[key1])) {
          return false;
        }
      }

      for (var key2 in object2) {
        if (!this.checkObject(object1[key2], object2[key2])) {
          return false;
        }
      }

      return true;
    } else {
	    return object1 == object2;
    }
  }

  // Used to check if we're spamming the same packets
  checkPacket(target, packet) {
    if (!this.packets[target]) {
      return false;
    }

    return this.checkObject(packet, this.packets[target]);
  }

  listen(cb) {
    this.listenCbs.push(cb);
  }

  unlisten(cb) {
    var index = this.listenCbs.indexOf(cb);
    if (index >= 0) {
      this.listenCbs.splice(index, 1);
    }
  }

  execute(target, data) {
    var commandPacket = {
      "target": target,
      "command": data
    }

    // backwards compatibility

    // preprocess arm
    if (this.target == "arm") {
      commandPacket.command.data = data;
    }

    // preprocess driveSystem
    if (target == "driveSystem") {
      commandPacket.command.limit = 100;
      commandPacket.command.PIDState = "on";
      if (commandPacket.command.mode == "car") {
        commandPacket.command.mode = "K";
      }
      if (commandPacket.command.mode == "crabwalk") {
        commandPacket.command.mode = "C";
      }
      if (commandPacket.command.mode == "swivel") {
        commandPacket.command.mode = "Q";
      }
    }

    // limiter
    if (this.checkPacket(target, commandPacket)) {
      return;
    }

    this.savePacket(target, commandPacket);

    this.network.sendPacket(commandPacket);
  }

  // Send data without preprocessing or limiting
  executeRaw(data) {
    this.network.sendPacket(data);
  }

  close() {
    this.network.sendPacket({
        "target": this.target,
        "connection": "disconnected"
    });

    // Network has been turned into a singleton.
    // Leave this as legacy.
    this.network.close();
  }
}
