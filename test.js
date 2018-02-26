const decoractor = (target) => {
  return class {
    constructor() {
      console.log('new class gen by decorator')
    }
  }
}

@decoractor
class A {
  constructor() {
    console.log('origin')
  }
}

const a = new A()
