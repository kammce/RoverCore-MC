var videoSize = {
  width: '100%'
};
var Stream = React.createClass({
	componentDidMount: function() {
		this.setStreamSrc(this.props);
	},

	componentWillUnmount: function() {

	},

	componentWillReceiveProps: function(nextProps) {
		this.setStreamSrc(nextProps);
	},
	restartSource: function() {
		var parent = this;
		var video_number = this.props.video;
		this.refs.stream.src = "";
		setTimeout(function() {
			var restart_video = "http://127.0.0.1:"+(9000+video_number*2)+"?rand="+Math.random();
			console.log(restart_video);
			parent.refs.stream.src = restart_video;
		}, 1000);
	},
	
	render: function() {
		return (<img style={videoSize} onClick={this.restartSource} ref="stream"/>);
	},

	setStreamSrc: function(props) {
		console.log(props);
		this.refs.stream.src = "http://127.0.0.1:"+(9000+props.video*2);
	}
});

export default Stream;
