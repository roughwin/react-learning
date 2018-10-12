import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { render } from 'react-dom';
import moment from 'moment';
// import { Alert, message, Select, Table, Icon, Row, Col, Input, Button } from 'antd';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'moment/locale/zh-cn';
import Routes from 'components/routes'
import A from 'components/common/decoractor'
import { routerLink } from './index.less';

const rootEl = document.getElementById('root');

const ele = <div>
  <Router>
    <Route path="/">
      <div>
        <Routes />
      </div>
    </Route>
  </Router>
</div>

render(ele, rootEl);

