/* stream page */

import NetHandler from "../../network/NetHandler.jsx";
import Stream from "../../components/Stream.jsx"

var inlineStyle = {
  display: 'inline-block',
  width: "47%",
  margin: "1.5%"
};

var StreamPage = React.createClass({
  componentDidMount: function() {
    this.info = {};
    this.netHandler = new NetHandler('videoStream');
    this.primus = new Primus('http://localhost:8000', { strategy: [ 'online', 'timeout', 'disconnect' ]});
  },
  componentWillUnmount: function() {
      if (this.netHandler) {
          this.netHandler.close();
      }
  },
  startStream1: function() {
    this.info.name = 'streamOn';
    this.info.data = {};
    this.info.data.stream = 1;
    this.info.data.camera = prompt("Select Camera (ex. Arm or Hull)").toLowerCase(); 
    console.log(this.info)
    this.netHandler.execute('videoStream',this.info);
  },
  startStream2: function() {
    this.info.name = 'streamOn';
    this.info.data = {};
    this.info.data.stream = 2;
    this.info.data.camera = prompt("Select Camera (ex. Arm or Hull)").toLowerCase();
    console.log(this.info)
    this.netHandler.execute('videoStream',this.info);
  },
  startStream3: function() {
    this.info.name = 'streamOn';
    this.info.data = {};
    this.info.data.stream = 3;
    this.info.data.camera = "tracker";
    console.log(this.info)
    this.netHandler.execute('videoStream',this.info);
  },
  adjustZoom: function() {
    this.info.name = 'zoom';
    this.info.data = {};
    this.info.data.zoom = parseInt(prompt("Select zoom number between (0-43)").toLowerCase());
    if(this.info.data.zoom > 43 || this.info.data.zoom < 0) {
      return;
    }
    this.info.data.camera = "tracker";
    console.log(this.info)
    this.netHandler.execute('videoStream',this.info);
  },
  endStream1: function() {
    this.info.name = 'streamOff';
    this.info.data = {}
    this.info.data.stream = 1;
    this.netHandler.execute('videoStream',this.info)
  },
  endStream2: function() {
    this.info.name = 'streamOff';
    this.info.data = {}
    this.info.data.stream = 2;
    this.netHandler.execute('videoStream',this.info)
  },
  endStream3: function() {
    this.info.name = 'streamOff';
    this.info.data = {}
    this.info.data.stream = 3;
    this.netHandler.execute('videoStream',this.info)
  },
  startVlc: function() {
    alert("VLC Started!");
    this.info.name = 'vlcOn';
    this.info.data = {}
    this.netHandler.execute('videoStream',this.info)
  },
  startAudio: function() {
    alert("Audio Started!");
    this.info.name = 'audioOn';
    this.info.data = {}
    this.netHandler.execute('videoStream',this.info)
  },
  endAudio: function() {
    alert("Audio Ended!");
    this.info.name = 'audioOff';
    this.info.data = {}
    this.netHandler.execute('videoStream',this.info)
  },
  getInitialState: function() {
    return { 
      stream1Status: 'src/images/dot-green.png',
      stream2Status: 'src/images/dot-green.png',
      selectStream: 1
    }
  },
  render: function() {
    return (
    <div>
      <div style={inlineStyle}>
        <h3> Stream 1 </h3>
        <Stream video="1"/>
        <br/>
        <button className="btn btn-default" onClick={this.startStream1}>Start Stream 1</button>
        <button className="btn btn-default" onClick={this.endStream1}>End Stream 1</button>
      </div>

      <div style={inlineStyle}>
        <h3> Stream 2  </h3>
        <Stream video="2"/>
        <br/>
        <button className="btn btn-default" onClick={this.startStream2}>Start Stream 2</button>
        <button className="btn btn-default" onClick={this.endStream2}>End Stream 2</button>
      </div>

      <div style={inlineStyle}>
        <h3> Stream 3 </h3>
        <Stream video="3"/>
        <br/>
        <button className="btn btn-default" onClick={this.startStream3}>Start Stream 3</button>
        <button className="btn btn-default" onClick={this.endStream3}>End Stream 3</button>
      </div>

      
      <button className="btn btn-default" onClick={this.startAudio}>Start Audio</button>
      <button className="btn btn-default" onClick={this.endAudio}>End Audio</button>
      
      <button className="btn btn-default" onClick={this.adjustZoom}>Adjust Zoom</button>
    </div>
    );
  }
});

export var route = {
  name: "Old Stream Page",
  link: "#/OldStream"
};

/* Export our newly created page so that the world can see it! */
export default StreamPage;