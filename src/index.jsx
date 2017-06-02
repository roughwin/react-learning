import React, {Component} from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { Alert, message, Select, Table, Icon, Row, Col } from 'antd';
import 'moment/locale/zh-cn';
import {observable, action, computed} from 'mobx';
import {observer, inject, Provider} from 'mobx-react';

import MyTable from './table';
import store from './store';

const Option = Select.Option;
const rootEl = document.getElementById('root');

const check = <span><input type="checkbox"/>{'name'}</span>
const count = 10

console.log('helo')
var ele = <div
  style={{
    fontSize: '3rem',
  }}
>
  <Row gutter={24}>
    <Col span={8}
      style={{
        backgroundColor: 'green',
        whiteSpace: 'nowrap',
      }}
    >
      <span
      style={{
        backgroundColor: 'red',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      >实际订单金额：</span>
      <span
        style={{
          marginLeft: '1rem'
        }}
      >{count}</span>
    </Col>
    <Col span={8}>
      <span
      style={{
        backgroundColor: 'yellow',
      }}
      >Hello</span></Col>
    <Col span={8}>
      <span
      style={{
        backgroundColor: 'blue',
      }}
      >Hello</span></Col>
  </Row>
</div>
render(ele, rootEl);
