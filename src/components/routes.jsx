import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TransitionEx, { CssTransitionHOC } from 'components/common/react_transition'
import DndTest from 'components/dnd';
import FormatObj from 'components/common/format_obj';
import Graph from 'components/common/graph';
import Chat from 'components/common/chat';
import WebGl from 'components/common/webgl';
import BlocLearn from 'components/bloc_learn';

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
// @withRouter
export default class Routes extends Component {
  render() {
    return <TransitionRoutes>
      <Route path="/test/route2" component={BlocLearn} />
      <Route path="/test/react-transition-group" component={TransitionEx} />
      <Route path="/test/dnd-test" component={DndTest} />
      <Route path="/test/format-obj" component={FormatObj} />
      <Route path="/test/graph" component={Graph} />
      <Route path="/test/chat" component={Chat} />
      <Route path="/webgl" component={WebGl} />
    </TransitionRoutes>

  }
}