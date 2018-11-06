import React, { Component } from 'react'
import c1 from './c1';
import c2 from './c2';

export default class WebGl extends Component {
  
  render() {
    return <div>
      <WebGlCanvas initcanvas={c2} />
      {/* <WebGlCanvas initcanvas={c1} /> */}
    </div>
  }
}


class WebGlCanvas extends Component {
  render() {
    const { initcanvas } = this.props;
    return <div>
      <canvas
        style={{
          border: '1px solid'
        }}
        ref={(c) => {
          if (!c) return;
          initcanvas(c);
        }}
        id="canvas-ex"
        width="400"
        height="400"
      >
        canvas
      </canvas>
    </div>
  }
}
