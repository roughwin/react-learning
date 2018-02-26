import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TransitionEx, { CssTransitionHOC } from 'components/common/react_transition'

const RouteWithTransition = CssTransitionHOC(Route);

@withRouter
export default class Routes extends Component {
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
          }}
        >
          <Switch
            location={this.props.location}
          >
            <Route path="/test/route2" render={() => {
              return <div>route2</div>
            }}/>
            <Route path="/test/react-transition-group" component={TransitionEx} />
          </Switch>
        </div>
      </CSSTransition>
      {/* <RouteWithTransition>
        <Route path="/test/react-transition-group" component={TransitionEx} />
      </RouteWithTransition> */}
    </TransitionGroup>
  }
}