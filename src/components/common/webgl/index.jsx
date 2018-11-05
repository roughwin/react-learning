import React, { Component } from 'react'

export default class WebGl extends Component {
  initcanvas = (canvas) => {
    if (!canvas) return;
    var gl = getWebGLContext(canvas);
    var VSHADER_SOURCE = `
      attribute vec4 a_Position;
      void main() {
        gl_Position = a_Position;
        gl_PointSize = 9.0;
      }
    `
      // 'void main() {\n' +
      // ' gl_Position = vec4(-0.3, 0.2, 0.0, 1.0);\n' + // Coordinates
      // ' gl_PointSize = 9.0;\n' + '}\n';
    var FSHADER_SOURCE =
      'void main() {\n' +
      ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the color
      '}\n';
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    console.log('pos', a_Position)
    gl.vertexAttrib3f(a_Position, 0.6, 0.0, 0.0);
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);

    setInterval(() => {
      // gl.clear(gl.COLOR_BUFFER_BIT);
      for (let x of [1, 2, 3, 4]) {
        gl.vertexAttrib3f(a_Position, Math.random(), Math.random(), 0.0);
        gl.drawArrays(gl.POINTS, 0,10);
      }
    }, 1000)
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
