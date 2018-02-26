import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom'

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
class AAA extends Component {
  render() {
    return <div>{
      this.props.children
    }</div>
  }
}

class TransitionEx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    }
    this.interval = setInterval(() => {
      this.setState({
        show: !this.state.show,
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
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
          const aaa = <AAA key={t}>{t}</AAA>
          list.push(aaa)
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
