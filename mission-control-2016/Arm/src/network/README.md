# Network Handler
The **NetHandler** is an abstracted interface for networked communication with the rover. This basically means it defines a simplified way of sending and receiving information to and from the rover. (Abstraction generally means a simplification of an interface.)

# BaseNetwork, DummyNetwork, PrimusNetwork
The **Network** is used by the NetHandler to actually send and receive information. A BaseNetwork is a blank interface. DummyNetwork and PrimusNetwork actually define the interface. You use the **DummyNetwork** class if you want to simulate the rover. You use the **PrimusNetwork** class if you want to actually connect to the rover.

# Useage
```

import NetHandler from '../../network/NetHandler.jsx'

.. react component stuff ..
	componentWillMount: function() {
		// initialize a net handler with a target as a parameter (ARM, NAVI, whatever..)
		this.netHandler = new NetHandler("ARM");
		// listen for changes on the net handler
		this.netHandler.listen((changes) => {

		});
	},
...
	componentWillUnmount: function() {
		// close the nethandler.
		this.netHandler.close();
	}
...
	onButtonClick: function() {
		this.netHandler.execute("rotate", {
			"angle1": 180
		});
	},
...


```