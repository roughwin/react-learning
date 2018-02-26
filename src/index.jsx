import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { render } from 'react-dom';
import moment from 'moment';
import Rx from 'rxjs/Rx';
import { Alert, message, Select, Table, Icon, Row, Col, Input } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'moment/locale/zh-cn';
import Routes from 'components/common/routes'
import A from 'components/common/decoractor'


const x = new A()


const Option = Select.Option;
const rootEl = document.getElementById('root');

const ele = <div>
  
  <Router>
    <Route path="/">
      <div>
        <div>hello route</div>
        <Link
          style={{
            margin: '3rem'
          }}
          to="/"
        >HOME</Link>
        <Link to="/test/route2">route2</Link>
        <Link to="/test/react-transition-group">TEST transition</Link>
        <div
          style={{
            marginTop: '3rem'
          }}
        >
          
        </div>
        

          <Routes />
      </div>
    </Route>
  </Router>
</div>
const ele1 = <div>
  <input type="text"/>
</div>
var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');
render(ele, rootEl);

