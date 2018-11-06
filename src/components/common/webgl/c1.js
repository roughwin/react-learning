function initcanvas(canvas) {
    if (!canvas) return;
    var gl = getWebGLContext(canvas);
    var VSHADER_SOURCE = `
      attribute vec4 a_Position;
      void main() {
        gl_Position = a_Position;
        gl_PointSize = 9.0;
      }
    `
    var FSHADER_SOURCE =
      'void main() {\n' +
      ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the color
      '}\n';
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_posi2 = gl.getAttribLocation(gl.program, 'a_posi2');
    console.log('fdsf', a_Position, a_posi2)
    var n = initVertexBuffers(gl, new Float32Array([0.0, 0.5, -0.5,-0.5, 0.5, -0.5, 0.6, 0.3]));
    gl.drawArrays(gl.TRIANGLES, 0,n);
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // for (let x of [1, 2, 3, 4]) {
    //   gl.vertexAttrib3f(a_Position, Math.random(), Math.random(), 0.0);
    //   gl.drawArrays(gl.POINTS, 0,10);
    // }

  }


function initVertexBuffers(gl, vertices) {
  // var vertices = new Float32Array([0.0, 0.5, -0.5,-0.5, 0.5, -0.5, 0.6, 0.3])
  var n = vertices.length / 2;
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  var a_position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0,0);
  gl.enableVertexAttribArray(a_position);
  return n;
}

export default initcanvas;