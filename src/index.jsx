import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { render } from 'react-dom';
import moment from 'moment';
import { notification } from 'antd';
// import { Alert, message, Select, Table, Icon, Row, Col, Input, Button } from 'antd';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'moment/locale/zh-cn';
import Routes from 'components/routes'
import A from 'components/common/decoractor'
import { routerLink } from './index.less';

const rootEl = document.getElementById('root');
console.log('hello');

window.sys_ws = new WebSocket("ws://hackathon2018.smartstudy.com/hello-world/", "sys_0");
window.userActions = [];
window.sys_listeners = [];
window.sys_ws.onmessage = function (m) {
  const { data } = m;
  try {
    const msg = JSON.parse(data);
    window.userActions.push(msg);
    if (window.userActions.length > 20) {
      window.userActions.shift();
    }
    notification.info({
      message: msg.action,
      description: msg.desc,
    })
    window.sys_listeners.forEach(fun => {
      fun()
    });
  } catch (e) {
    console.log(e);
  }
}

// class UserActionList extends Component {
//   constructor() {
//     super();
//     window.sys_listeners.push(() => {
//       this.forceUpdate();
//     })
//   }
//   render() {
//     return <div>{
//       [window.userActions].map(action => (
//         <div>{JSON.stringify(action)}</div>
//       ))
//     }</div>
//   }
// }
const ele = <div>
  {/* <UserActionList></UserActionList> */}
  <Router>
    <Route path="/">
      <div>
        <Routes />
      </div>
    </Route>
  </Router>
</div>

render(ele, rootEl);

