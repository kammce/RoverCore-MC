
import BaseNetwork from './BaseNetwork.jsx';

var loader = new THREE.TextureLoader();
var textureCache = {};

function clamp(val, min, max) {
	return Math.max(Math.min(val, max), min);
}

function loadTexture(img) {
	return new Promise(function(resolve, reject) {
		loader.load(
			img,
			// Function when resource is loaded
			function ( texture ) {
				textureCache[img] = texture;
				resolve();
			},
			// Function called when download progresses
			function ( xhr ) {
				console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
			},
			// Function called when download errors
			function ( xhr ) {
				console.log( 'An error happened' );
			}
		);
	});
}

/* Simulates a network with the rover. */
export default class DummyNetwork extends BaseNetwork {
	constructor(canvas) {
		super();

		this.canvas = canvas;

		// arm

		this.length1 = 50;
		this.length2 = 50;

		this.angle1 = 0;
		this.angle2 = 0;
		this.baseAngle = 0;
		this.handAngle = 0;

		// navi

		this.motorTrack1 = 0;

		// camera

		this.cameraPitch = 0;
		this.cameraYaw = 0;

		//

		this.currentTime = (new Date()).getTime();

		$("#forward").mousedown(() => {
			this.keydown["W"] = true;
		})

		$("#forward").mouseup(() => {
			this.keydown["W"] = false;
		})

		$("#backward").mousedown(() => {
			this.keydown["S"] = true;
		})

		$("#backward").mouseup(() => {
			this.keydown["S"] = false;
		})

		$("#left").mousedown(() => {
			this.keydown["A"] = true;
		})

		$("#left").mouseup(() => {
			this.keydown["A"] = false;
		})

		$("#right").mousedown(() => {
			this.keydown["D"] = true;
		})

		$("#right").mouseup(() => {
			this.keydown["D"] = false;
		})

		Promise.all([
			loadTexture("roversim/crate.gif"),
			loadTexture("roversim/tx_15_9.jpg"),
			null
		]).then(() => {
			this.createScene();
			this.render();

			setInterval(() => {
				// random packets
				this.listenCb({
					target: "arm",
					angle1: 0,
					angle2: 0,
					temperature: Math.floor(Math.random()*100),
					base: Math.floor(Math.random()*360),
					shld: Math.floor(Math.random()*360),
					elbow: Math.floor(Math.random()*360),
					wrist: Math.floor(Math.random()*360)
				});

				this.listenCb({
					target: "navi",
					motorTrack1: Math.floor(this.motorTrack1),
					motorTrack2: Math.floor((Math.sin((new Date()).getTime()/1000)+1)/2*360),
					motorTrack3: Math.floor((Math.sin((new Date()).getTime()/1000+22)+1)/2*360),
					motorTrack4: Math.floor((Math.sin((new Date()).getTime()/1000+33)+1)/2*360),
					motorTrack5: Math.floor((Math.sin((new Date()).getTime()/1000+33)+1)/2*360),
					motorTrack6: Math.floor((Math.sin((new Date()).getTime()/1000+33)+1)/2*360),
					speed1: Math.random()*1000,
					speed2: Math.random()*1000,
					speed3: Math.random()*1000,
					speed4: Math.random()*1000,
					speed5: Math.random()*1000,
					speed6: Math.random()*1000,
					torque1: Math.random()*360,
					torque2: Math.random()*360,
					torque3: Math.random()*360,
					torque4: Math.random()*360,
					torque5: Math.random()*360,
					torque6: Math.random()*360,
					power1: Math.random()*100,
					power2: Math.random()*100,
					power3: Math.random()*100,
					power4: Math.random()*100,
					power5: Math.random()*100,
					power6: Math.random()*100,
				});

				var long = (38.3981061-this.rover.position.y/10)+"º25.97389";
				var lat = (110.8925208+this.rover.position.x/10)+"º25.97389";

				this.listenCb({
					"GPS": {
						long: long,
						lat: lat
					}
				});

			}, 100);

		});

		// camera

		this.keydown = {};
	}

	sendPacket(packet) {
		setTimeout(() => {

			if (packet.target == "driveSystem") {

				if (packet.command.name == "move") {
					// mode: "tankmode", "crabwalk", "carmode"
					// if (mode == "tankmode") {

					// } else if (mode == "crabwalk") {

					// } else if (mode == "carmode") {

					// }
					this.moveMode = packet.command.mode;
					if (this.moveMode == "K") {
						this.moveMode = "car";
					}
					if (this.moveMode == "C") {
						this.moveMode = "crabwalk";
					}
					if (this.moveMode == "T") {
						this.moveMode = "tank";
					}

					this.moveSpeed = packet.command.speed;
					this.moveAngle = packet.command.angle / 180 * Math.PI;
				}

				if (packet.command.name == "forward") {
					if (packet.command.state == "on") {
						this.keydown["W"] = true;
					} else if (packet.command.state == "off") {
						this.keydown["W"] = false;
					}
				}

				if (packet.command.name == "backward") {
					if (packet.command.state == "on") {
						this.keydown["S"] = true;
					} else if (packet.command.state == "off") {
						this.keydown["S"] = false;
					}
				}

				if (packet.command.name == "rotate") {
					if (packet.command.state == "left") {
						this.keydown["A"] = true;
						this.keydown["D"] = false;
					} else if (packet.command.state == "left") {
						this.keydown["A"] = false;
						this.keydown["D"] = true;
					}

					if (packet.command.state == "right") {
						this.keydown["D"] = true;
						this.keydown["A"] = false;
					} else if (packet.command.state == "right") {
						this.keydown["D"] = false;
						this.keydown["A"] = true;
					}
				}

			} else if (packet.target == "arm") {

				if (packet.command.name == "move") {
					this.angle1 = packet.command.data.shoulder / 180 * Math.PI;
					this.angle2 = packet.command.data.elbow / 180 * Math.PI;
					this.baseAngle = packet.command.data.base / 180 * Math.PI;
					this.handAngle = packet.command.data.wrist / 180 * Math.PI;
				}

			} else if (packet.target == "camera") {

				if (packet.command.name == "angles") {
					this.cameraPitch = packet.command.pitch;
					this.cameraYaw = packet.command.yaw;
				}

			} else if (packet.target == "tracker") {

				if (packet.command.name == "moveAngleLocal") {
					this.cameraPitch = packet.command.pitch / 360 * Math.PI;
					this.cameraYaw = packet.command.yaw;
				} else if (packet.command.name == "moveInterval") {
					this.cameraPitch += packet.command.pitch / 360 * Math.PI;
					this.cameraYaw += packet.command.yaw;
				} else if (packet.command.name == "recalibrate") {
					this.cameraPitch = 0;
					this.cameraYaw = 0;
				}

			}

		}, 50);
	}

	close() {
	}

	createScene() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, 640 / 480, 0.1, 1000 );
		this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
		this.renderer.setSize(640, 480);

		this.camera.rotation.x = 0.3;
		this.camera.position.z = 200;
		this.camera.position.y = -40;

		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.9 );
		hemiLight.color.setHSL( 0.6, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		hemiLight.position.set( 0, 500, 0 );
		this.scene.add( hemiLight );

	
		///

		var maxAnisotropy = this.renderer.getMaxAnisotropy();

		var groundTexture = textureCache["roversim/tx_15_9.jpg"];
		console.log(groundTexture);

		var groundGeo = new THREE.PlaneBufferGeometry( 1000, 1000 );
		var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505, map: groundTexture } );
		groundMat.color.setHSL( 0.095, 1, 0.75 );

		var ground = new THREE.Mesh( groundGeo, groundMat );
		ground.receiveShadow = true;
		this.scene.add( ground );

		this.createRover();
		// this.rover.add(this.camera);
	}

	createRover() {
		var rover = new THREE.Object3D();
		this.rover = rover;
		this.scene.add( rover );

		var materialRed = new THREE.MeshPhongMaterial( { color: 0xff0000 } );		
		var materialBlue = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
		var materialGreen = new THREE.MeshPhongMaterial( { color: 0x0000ff } );

		// Rover Body

		var geometryBody = new THREE.BoxGeometry( 50, 20, 40 );
		var body = new THREE.Mesh( geometryBody, materialRed );
		// The rover body was originally created for portrait view.
		// This will orient it in the correct direction.
		body.rotation.x = Math.PI/2;
		body.rotation.y = Math.PI/2;
		body.position.z = 10;

		var geometryJoint = new THREE.SphereGeometry(5.1, 5.1, 5.1);

		this.joint1 = new THREE.Mesh( geometryJoint, materialRed );
		this.joint2 = new THREE.Mesh( geometryJoint, materialRed );
		this.joint3 = new THREE.Mesh( geometryJoint, materialRed );

		// Joint 1 & Stick 1

		var geometryStick1 = new THREE.CylinderGeometry(5, 5, this.length1, 5);
		var stick1 = new THREE.Mesh( geometryStick1, materialBlue );
		stick1.position.y = -this.length1/2;
		this.joint1.add(stick1);

		// Joint 2 & Stick 2

		this.joint2.position.y = -this.length1;
		this.joint1.add(this.joint2);

		var geometryStick2 = new THREE.CylinderGeometry(5, 5, this.length2, 5);
		var stick2 = new THREE.Mesh( geometryStick2, materialGreen );
		stick2.position.y = -this.length2/2;
		this.joint2.add(stick2);

		// Joint 3 & Hand

		this.joint3.position.y = -this.length2;
		this.joint2.add(this.joint3);

		var geometryHand = new THREE.BoxGeometry( 5, 20, 20 );
		this.hand = new THREE.Mesh(geometryHand, materialGreen);
		this.hand.position.y = -10;

		this.joint3.add(this.hand);

		this.joint1.position.y = 10;
		this.joint1.position.x = 25;

		// Attach Joint 1 to the body, and the body to the rover.

		body.add( this.joint1 );
		rover.add(body);

	}

	render() {
		requestAnimationFrame(() => {
			this.render()
		});

		var time = (new Date()).getTime();
		var deltaTime = time - this.currentTime;
		this.currentTime = time;

		var t = time/1000

		// Generate random placeholder angles.

		// this.angle1 = Math.sin(t) * Math.PI/2 + Math.PI/4;
		// this.angle2 = Math.sin(t) * Math.PI/2 + Math.PI/4;
		// this.baseAngle = Math.sin(t) * Math.PI/2 + Math.PI/4;
		// this.handAngle = Math.sin(t) * Math.PI/2 + Math.PI/4;

		// Stop from rendering impossible angles

		this.angle1 = clamp(this.angle1, -Math.PI/4, Math.PI * (3/4));
		this.angle2 = clamp(this.angle2, Math.PI/4, Math.PI);
		this.baseAngle = clamp(this.baseAngle, 0, Math.PI);

		// Compute joint rotation based on angle input

		this.joint1.rotation.z = this.angle1 + Math.PI/2;
		this.joint2.rotation.z = this.angle2 + Math.PI;
		this.joint1.rotation.y = this.baseAngle - Math.PI/2;
		this.joint3.rotation.z = this.handAngle;

		var vel = new THREE.Vector3(0, 0, 0);

		// Move the rover around using key input

		if (this.keydown["W"]) {
			vel.y += deltaTime/10;
			this.motorTrack1 = (this.motorTrack1 + ((deltaTime/1000)*360 % 360)) % 360;
		}

		if (this.keydown["S"]) {
			vel.y -= deltaTime/10;
			this.motorTrack1 = (this.motorTrack1 - ((deltaTime/1000)*360 % 360) + 360) % 360;
		}

		if (this.keydown["A"]) {
			if (this.keydown["S"]) {
				this.rover.rotation.z -= deltaTime/1000;
			} else {
				this.rover.rotation.z += deltaTime/1000;
			}
		}

		if (this.keydown["D"]) {
			if (this.keydown["S"]) {
				this.rover.rotation.z += deltaTime/1000;
			} else {
				this.rover.rotation.z -= deltaTime/1000;
			}
		}

		// this.moveAngle = 30 / 180 * Math.PI;
		// this.moveSpeed = 1
		// this.moveMode = "tank";

		if (this.moveMode == "crabwalk") {
			// var finalAngle = this.rover.rotation.z + this.moveAngle;
			vel.x = Math.cos(this.moveAngle) * this.moveSpeed;
			vel.y = Math.sin(this.moveAngle) * this.moveSpeed;
		} else if (this.moveMode == "tank") {
			this.rover.rotation.z += this.moveAngle*deltaTime/1000 * this.moveSpeed;
			vel.y = this.moveSpeed;
		} else if (this.moveMode == "car") {
			this.rover.rotation.z += this.moveAngle*deltaTime/1000 * this.moveSpeed;
			vel.y = this.moveSpeed;
		}

		vel.applyQuaternion(this.rover.quaternion);
		this.rover.position.add(vel);

		// Slowly move the camera to follow the rover

		var cameraGoal = this.rover.position.clone();
		cameraGoal.z += 500;
		cameraGoal.y -= 100;

		this.camera.position.lerp(cameraGoal, 0.05);

		this.renderer.render(this.scene, this.camera);
	}

}
