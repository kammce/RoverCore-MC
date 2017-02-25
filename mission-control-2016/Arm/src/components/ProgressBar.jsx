var ProgressBar = React.createClass({
	getDefaultProps: function() {
		return {progress: "0", color: "primary"}
	},

	render: function() {
		return (
			<div className="progress">
			  <div className={"progress-bar progress-bar-" + this.props.color} role="progressbar" aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100" style={ {width: this.props.progress + "%"} }>
			    {this.props.progress}%
			  </div>
			</div>
		);
	}
});

export default ProgressBar;
