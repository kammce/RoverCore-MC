var KnobButton = React.createClass({
    getDefaultProps: function() {
        return {onChange: function(){}, readOnly: "true"};
    },

	componentWillMount: function() {

	},

	render: function(){
		return (<div style={{display:'inline-block', padding:'2px'}}>
                <input ref="knob" data-angleoffset="90" data-width="100" data-height="100" data-cursor="true" data-fgcolor="#00BFFF" data-min="-360" data-max="0" data-step="1" data-thickness=".3" data-readOnly={this.props.readOnly}/> 
                </div>);
	},

    componentWillReceiveProps: function() {
        $(this.refs.knob).val(-this.props.myAngle).trigger("change");
    },

	componentDidMount: function() {

            $(this.refs.knob).knob({
                change : function (value) {
                    //console.log("change : " + value);
                    this.props
                },
                release : function (value) {
                    //console.log(this.$.attr('value'));
                    console.log("release : " + value);
                },
                cancel : function () {
                    console.log("cancel : ", this);
                },
                format : function (value) {
                    if (Math.floor(value) == value) {
                        return (-value);
                    } else {
                        return (-value) + 'º';
                    }
                },
                draw : function () {
                    // "tron" case
                    if(this.$.data('skin') == 'tron') {

                        this.cursorExt = 0.3;

                        var a = this.arc(this.cv)  // Arc
                            , pa                   // Previous arc
                            , r = 1;

                        this.g.lineWidth = this.lineWidth;

                        if (this.o.displayPrevious) {
                            pa = this.arc(this.v);
                            this.g.beginPath();
                            this.g.strokeStyle = this.pColor;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                            this.g.stroke();
                        }

                        this.g.beginPath();
                        this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                        this.g.stroke();

                        this.g.lineWidth = 2;
                        this.g.beginPath();
                        this.g.strokeStyle = this.o.fgColor;
                        this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                        this.g.stroke();

                        return true;
                    }
                }
            });
            // });
	},

	componentWillUnmount: function() {

	}

});


export default KnobButton;