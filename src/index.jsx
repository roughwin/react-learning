import React, {Component} from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { Alert, message, Select, Table, Icon, Row, Col } from 'antd';
import 'moment/locale/zh-cn';
import {observable, action, computed, toJS} from 'mobx';
import {observer, inject, Provider} from 'mobx-react';

import 'test/GC_debug';

const Option = Select.Option;
const rootEl = document.getElementById('root');

const check = <span><input type="checkbox"/>{'name'}</span>
const count = 10

const ele = <div>
  <h1>Hello</h1>
</div>

render(ele, rootEl);
