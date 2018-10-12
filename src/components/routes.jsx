import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TransitionEx, { CssTransitionHOC } from 'components/common/react_transition'

import Chat from 'components/common/chat';

@withRouter
class TransitionRoutes extends Component {
  render() {
    return <TransitionGroup
      style={{
        position: 'relative'
      }}
    >
      <CSSTransition
        timeout={{
          enter: 800,
          exit: 200,
        }}
        key={this.props.location.pathname}
        classNames={{
          enter: 'fadeInRight',
          enterActive: 'animated',
          exit: 'fadeOutLeft',
          exitActive: 'animated',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%'
          }}
        >
          <Switch
            location={this.props.location}
          >
           {
             this.props.children
           }
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  }
}

export default class Routes extends Component {
  render() {
    return <div>
      <Route path="/hw/chat" component={Chat} />
    </div>

  }
}