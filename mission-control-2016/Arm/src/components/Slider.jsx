
var Slider = React.createClass({
	getDefaultProps: function() {
		return {min: 0, max: 10, hideTooltip: false, initialValue: 0, onChange: function(){}};
	},

	setVal: function(val) {
		$(this.refs.root).slider('setValue', val);
	},

	componentDidMount: function() {
		var options = {
			min: parseFloat(this.props.min),
			max: parseFloat(this.props.max),
			value: parseFloat(this.props.initialValue),
			orientation: 'horizontal'
		};

		if (this.props.hideTooltip == true || this.props.hideTooltip == "true") {
			options.tooltip = 'hide';
		}

		$(this.refs.root).slider(options)
		.on('change', (event, val)=> {
			this.props.onChange({oldValue: event.value.oldValue, newValue: event.value.newValue});
		}.bind(this));
	},

	componentWillUnmount: function() {
		$(this.refs.root).off('change');
		$(this.refs.root).slider('destroy');
	},

	render: function() {
		return (
			<p>
				<div ref="root" style={{width: '100%'}}>
				</div>
			</p>
		);
	}
});

export default Slider;
