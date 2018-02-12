
const decoractor = (aClass) => {
  aClass.prototype.echo = () => {
    // aClass.echo();
    console.log('hello hehehehhe')
  }
  return class {
    constructor() {
      console.log('helo another')
    }
  }
}

@decoractor
class A {
  constructor() {
    // super()
    this.echo()
  }
  echo() {
    console.log('hello origin')
  }
}

export default A;
