import React, {Component} from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { Alert, message, Select, Table, Icon } from 'antd';
import 'moment/locale/zh-cn';
import {observable, action, computed} from 'mobx';
import {observer, inject, Provider} from 'mobx-react';

import MyTable from './table';
import store from './store';

const Option = Select.Option;
const rootEl = document.getElementById('root');

const check = <span><input type="checkbox"/>{'name'}</span>
const columns = [{
  title: check,
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
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
  let tabelData = [
    {
      name: 'score',
      title: '直达分',
      unit: '分',
      type: 'number',
      value: 0,
      placeholder: '修改直达分',
      editabel: false,
    },
    {
      name: 'coursetime',
      title: '课时',
      unit: '课时',
      type: 'number',
      value:0,
      placeholder: '赠送课时数',
      editabel: false,
    },
    {
      name: 'deepExplain',
      title: '逐题精讲',
      unit: '次',
      type: 'number',
      value: 0,
      placeholder: '赠送精讲月数',
      editabel: false,
    },
    {
      name: 'spokenCorrecting',
      title: '口语批改',
      unit: '次',
      type: 'number',
      value: 0,
      placeholder: '赠送次数',
      editabel: false,
    },
    {
      name: 'writeCorrecting',
      title: '写作批改',
      unit: '次',
      type: 'number',
      value: 0,
      placeholder: '赠送次数',
      editabel: false,
    },
    {
      name: 'validDay',
      title: '商品有效期',
      unit: '天',
      type: 'number',
      value: 0,
      placeholder: '赠送天数',
      editabel: false,
    },
    {
      name: 'rewrokTime',
      title: '可重读次数',
      unit: '次',
      type: 'number',
      value: 0,
      placeholder: '赠送次数',
      editabel: true,
    },    
  ]
store.getSubject(tabelData)
console.log('index getsubject')
var ele = 
  <Provider store={store}>
    <div>
        <Table columns={columns} dataSource={data} />
        <MyTable></MyTable>
    </div>
  </Provider>
render(ele, rootEl);









/*@inject("store")
@observer
class TodoBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('render')
        return (
            <div>
                <p>{store.getHelo}</p>
                <ul onClick={() => {this.props.store.setData()}}>{this.props.store.todos.map(todo => <li key={Math.random(1)}>{this.props.todo.title}</li>)}</ul>
            </div>
        );
    }
}*/






// render((<TodoBox></TodoBox>) ,rootEl);

// render(<TestSelect></TestSelect>, rootEl)