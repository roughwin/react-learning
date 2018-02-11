import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition'
import { Button } from 'antd'

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
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
      show: true,
    }
  }
  render() {
    return <div>
      <Button
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
