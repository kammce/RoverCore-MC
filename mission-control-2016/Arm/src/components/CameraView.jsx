
// find the global reference
var glob = (typeof(global) == "undefined" ? global : window);

var simulator = $("#simulator")[0];

var CameraView = React.createClass({

	componentWillMount: function() {
		if (simulator) {
			// glob.network.cameraPitch;
		}
	},

	componentDidMount: function() {
		if (simulator) {
			console.log("uh");
			this.camera = new THREE.PerspectiveCamera( 60, 400 / 200, 0.1, 1000 );
			this.camera.rotation.x = 1.5;
			this.camera.position.z = 50;
			this.camera.position.y = -10;

			this.renderer = new THREE.WebGLRenderer({canvas: this.refs.canvas});

			this.render3D();
		}
	},


	render3D: function() {
		requestAnimationFrame(() => {
			this.render3D();
		});

		if (!glob.network.rover) { return; }

		var cameraGoal = glob.network.rover.position.clone();
		cameraGoal.z += 50;
		cameraGoal.y -= 10;

		this.camera.position.x = cameraGoal.x;
		this.camera.position.y = cameraGoal.y;
		this.camera.position.z = cameraGoal.z;


		this.camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));
		this.camera.quaternion.multiply((new THREE.Quaternion()).setFromAxisAngle(new THREE.Vector3(0, 0, 1), glob.network.rover.rotation.z + glob.network.cameraYaw));
		this.camera.quaternion.multiply((new THREE.Quaternion()).setFromAxisAngle(new THREE.Vector3(1, 0, 0), 1.5 + glob.network.cameraPitch));

		this.renderer.render(glob.network.scene, this.camera);
	},

	getDefaultProps: function() {
		{viewId: 1}
	},

	render: function() {
		if (simulator) {
			return (
				<div>
					<div style={{background: "black", display: "block", width: "400px", height: "200px", position: "relative"}}>
						<canvas ref="canvas" width="400" height="200"></canvas>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div style={{background: "black", display: "block", width: "400px", height: "200px", position: "relative"}}>
						<div style={{color: "white", textAlign: "center", width: "80%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
							We're waiting on Aris for this part.
						</div>
					</div>
				</div>
			);
		}
	}
});

export default CameraView;
