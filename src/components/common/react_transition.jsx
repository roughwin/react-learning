import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition'
import { Button } from 'antd'

const duration = 150

const defaultStyle = {
  transition: `${duration}ms ease-in-out`,
  // transform: 'translateX(100px)',
  opacity: 0,
}

const transitionStyles = {
  entering: { transform: 'translateX(100px)', opacity: 0 },
  entered: { transform: 'translateX(0px)', opacity: 1 },
  exiting: { transform: 'translateX(0px)', opacity: 1},
  exited: { transform: 'translateX(100px)', opacity: 0},
}

const Fade = ({ in: inProp }) => (
  <div>
    hello
    <Transition in={inProp} timeout={duration}>
      {
        (state) => (<div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          I'm A fade Transition!
        </div>)
      }
    </Transition>
  </div>
)

class TransitionEx extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    }
    setInterval(() => {
      this.setState({
        show: !this.state.show,
      })
    }, 1000)
  }
  render() {
    return <div>
      <Button
        type="primary"
        onClick={() => {
          this.setState({
            show: !this.state.show,
          })
        }}
      >Button</Button>
      <Fade
        in={this.state.show}
      ></Fade>
    </div>
  }
}

export default TransitionEx;
