import React, {Component} from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { Alert, message, Select } from 'antd';
import 'moment/locale/zh-cn';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

const Option = Select.Option;
const rootEl = document.getElementById('root');

let el = (<div>hello</div>);


class Store {
    @observable todos = [{
        title: 'helo',
        done: false,
    }];
}

@observer
class TodoBox extends Component {
    render() {
        return (
            <ul>{this.props.store.todos.map(todo => <li>{todo.title}</li>)}</ul>
        );
    }
}

class TestSelect extends Component{
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        return <Select value={1} defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
            <Option key={1} value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
    </Select>
    }
}
const store = new Store();
render((<TestSelect></TestSelect>) ,rootEl);