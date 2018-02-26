
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

const methodDecoractor = (target, name, descirptor) => {
  // console.log(target, name, descirptor)
  // let getter = descirptor.get
  // let setter = descirptor.set
  // descirptor.get = () => {
  //   console.log(this)
  // }
}
@decoractor
class A {
  constructor() {
    // super()
    this.echo()
  }
  @methodDecoractor hello = 'hahah'
  @methodDecoractor
  echo() {
    console.log('hello origin')
  }
}

export default A;
