import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { render } from 'react-dom';
import moment from 'moment';
import Rx from 'rxjs/Rx';
import { Alert, message, Select, Table, Icon, Row, Col, Input } from 'antd';
import 'moment/locale/zh-cn';


const Option = Select.Option;
const rootEl = document.getElementById('root');

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: 100,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
  width: 100,
}, {
  title: 'Action',
  key: 'action',
  width: 100,
  fixed: 'right',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const ele = <div>
  <Table
    columns={columns}
    dataSource={data}
  />
</div>
const ele1 = <div>
  <input type="text"/>
</div>
  // <Router>
  //   <Route path="/tab" render={() => {
  //       const Ele = High(PhoneInput)
  //       return <Ele />
  //     }} />
  // </Router>
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

