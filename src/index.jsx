import React, {Component} from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { Alert, message, Select, Table, Icon, Row, Col } from 'antd';
import 'moment/locale/zh-cn';
import {observable, action, computed, toJS} from 'mobx';
import {observer, inject, Provider} from 'mobx-react';

import MyTable from './table';
import store from './store';
import TestSelect from './subComponent';

const Option = Select.Option;
const rootEl = document.getElementById('root');

const check = <span><input type="checkbox"/>{'name'}</span>
const count = 10

console.log('helo')
@observer
class Ele extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Provider store={store}>
      <div>
        <div>{store.helo}</div>
        <TestSelect value={store.helo}></TestSelect>
      </div>
    </Provider>
  }
}

render(<Ele></Ele>, rootEl);
