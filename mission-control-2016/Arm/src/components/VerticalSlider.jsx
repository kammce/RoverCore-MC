
var Slider = React.createClass({
	getDefaultProps: function() {
		return {min: 0, max: 10, hideTooltip: false, initialValue: 0, onChange: function(){}};
	},

	componentDidMount: function() {
		var options = {
			min: parseFloat(this.props.min),
			max: parseFloat(this.props.max),
			value: parseFloat(this.props.initialValue),
			orientation: 'vertical'
		};

		if (this.props.hideTooltip == true || this.props.hideTooltip == "true") {
			options.tooltip = 'hide';
		}

		$(this.refs.root).slider(options)
		.on('change', (event, val)=> {
			this.props.onChange({oldValue: event.value.oldValue, newValue: event.value.newValue});
		}.bind(this));

		this.refs.root.style.height = "100%";
	},

	componentWillUnmount: function() {
		$(this.refs.root).slider('destroy');
		$(this.refs.root).off('change');
	},

	render: function() {
		return (
				<div ref="root" style={{height: '100%'}}>
				</div>
		);
	}
});

export default Slider;
