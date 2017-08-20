import React, {Component} from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { Alert, message, Select, Table, Icon, Row, Col } from 'antd';
import 'moment/locale/zh-cn';
import {observable, action, computed, toJS} from 'mobx';
import {observer, inject, Provider} from 'mobx-react';

// import 'test/GC_debug';
import PhoneInput from 'components/common/phone_input';
// import High from 'components/common/high';

import MyWorker from "components/workers/worker.js";

const Option = Select.Option;
const rootEl = document.getElementById('root');

// const check = <span><input type="checkbox"/>{'name'}</span>
// const count = 10

// var worker = new MyWorker();
const worker = new MyWorker();
worker.postMessage({a: 1});
worker.onmessage = function(event) {
  console.log(event)
};
worker.addEventListener("message", function(event) {
  console.log(event);
});

console.log(PhoneInput)

const ele = <div>
  hello
  <PhoneInput></PhoneInput>
</div>

render(ele, rootEl);
