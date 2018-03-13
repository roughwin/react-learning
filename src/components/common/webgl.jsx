import React, { Component } from 'react'

export default class WebGl extends Component {
  initcanvas = (canvas) => {
    var gl = getWebGLContext(canvas);
    var VSHADER_SOURCE =
      'void main() {\n' +
      ' gl_Position = vec4(-0.3, 0.2, 0.0, 1.0);\n' + // Coordinates
      ' gl_PointSize = 9.0;\n' + '}\n';
    var FSHADER_SOURCE =
      'void main() {\n' +
      ' gl_FragColor = vec4(0.1, 0.5, 0.5, 1.0);\n' + // Set the color
      '}\n';
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  render() {
    return <div>
      <canvas
        style={{
          border: '1px solid'
        }}
        ref={this.initcanvas}
        id="canvas-ex"
        width="400"
        height="400"
      >
        canvas
      </canvas>
    </div>
  }
}
