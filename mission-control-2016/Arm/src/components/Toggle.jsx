
var Toggle = React.createClass({
	getDefaultProps: function() {
		return {min: 0, max: 10, initialValue: true, onChange: function(){}};
	},

	componentDidMount: function() {
		var state = "off";
		if (this.props.initialValue) {
			state = "on";
		}

		$(this.refs.root).bootstrapToggle(state)
		.change(() => {
			var value = $(this.refs.root).prop('checked');
			this.props.onChange({oldValue: !value, newValue: value});
		})
	},

	componentWillUnmount: function() {
		$(this.refs.root).off('change');
		$(this.refs.root).bootstrapToggle('destroy');
	},

	render: function() {
		return (
			<input ref="root" type="checkbox" data-toggle="toggle" />
		);
	}
});

export default Toggle;
