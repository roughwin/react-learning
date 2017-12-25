import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { render } from 'react-dom';
import moment from 'moment';
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

  // <Router>
  //   <Route path="/tab" render={() => {
  //       const Ele = High(PhoneInput)
  //       return <Ele />
  //     }} />
  // </Router>
render(ele, rootEl);

