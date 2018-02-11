import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import TransitionEx from 'components/common/react_transition'

export default class Routes extends Component {
  render() {
    return <div>
      <Route path="/test/react-transition-group" component={TransitionEx} />
    </div>
  }
}