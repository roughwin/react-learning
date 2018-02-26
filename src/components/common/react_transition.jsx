import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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

const Fade2 = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames={{
      appear: 'my-appear',
      appearActive: '',
      enter: 'fadeIn',
      enterActive: 'animated',
      exit: 'fadeOut',
      exitActive: 'animated',
     }}
  >
    {children}
  </CSSTransition>
)

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


export const CssTransitionHOC = DefaultComponent => class extends Component {
  // constructor() {
  //   super();
  // }
  render() {
    return <CSSTransition
      {...this.props}
      timeout={1000}
      classNames={{
        appear: 'my-appear',
        appearActive: '',
        enter: 'fadeInUp',
        enterActive: 'animated',
        exit: 'fadeOutDown',
        exitActive: 'animated',
      }}
    >
      <DefaultComponent
        {...this.props}
      />
    </CSSTransition>
  }
}

@CssTransitionHOC
class Node extends Component {
  render() {
    return <div>{
      this.props.children
    }</div>
  }
}

class TransitionEx extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
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
      <TransitionGroup>
        {
          this.state.show &&
          <Fade2
            // in={this.state.show}
          >
            <div id={123}>
              hello9999999
            </div>
          </Fade2>
        }
      </TransitionGroup>
      <Button
        onClick={() => {
          const list = this.state.fadeList || [];
          const t = window.performance.now();
          const newNode = <Node key={t}>{t}</Node>
          list.push(newNode)
          this.setState({
            fadeList: list,
          })
        }}
      >
        PUSH
      </Button>
      <Button
        onClick={() => {
          const list = this.state.fadeList || [];
          list.pop();
          this.setState({
            fadeList: list,
          })
        }}
      >
        POP
      </Button>
      <Button
        onClick={() => {
          this.setState({
            fadeList: [],
          })
        }}
      >
        CLEAR
      </Button>
      <TransitionGroup>
        {
          this.state.fadeList
        }
      </TransitionGroup>
    </div>
  }
}



export default TransitionEx;
