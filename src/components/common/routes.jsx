import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TransitionEx, { CssTransitionHOC } from 'components/common/react_transition'

const RouteWithTransition = CssTransitionHOC(Route);

@withRouter
export default class Routes extends Component {
  render() {
    console.log('location in render', this.props.location)
    return <TransitionGroup>
      <CSSTransition
        timeout={{
          enter: 800,
          exit: 0,
         }}
        // classNames="fade"
        key={this.props.location.pathname}
        classNames={{
          // appear: 'my-appear',
          // appearActive: '',
          enter: 'fadeIn',
          enterActive: 'animated',
          // exit: 'fadeOutLeft',
          // exitActive: 'animated',
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
      </CSSTransition>
      {/* <RouteWithTransition>
        <Route path="/test/react-transition-group" component={TransitionEx} />
      </RouteWithTransition> */}
    </TransitionGroup>
  }
}