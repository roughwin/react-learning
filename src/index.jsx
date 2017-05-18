import React, {Component} from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { Alert, message, Select } from 'antd';
import 'moment/locale/zh-cn';

import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';

const Option = Select.Option;
const rootEl = document.getElementById('root');

class Store {
    @observable todos;
    @observable testLabelList = [];
    @observable testLabelAll = [];
    @observable helo = '123'
    constructor() {
        // console.log(this.helo);
        this.testLabelAll = ['haha'];
        this.todos = [{
            title: 'helo',
            done: false,
        }];
    }
    @computed get getHelo() {
        return this.helo + 'haha';
    }
    @action setData() {
        window.setTimeout(() => {
            this.todos[0].title = 'haha';

        }, 3000);
        console.log('store', this.testLabelAll);
    }
}

@observer
class TodoBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('render')
        return (
            <div>
                <p>{this.props.store.getHelo}</p>
                <ul onClick={() => {this.props.store.setData()}}>{this.props.store.todos.map(todo => <li key={Math.random(1)}>{todo.title}</li>)}</ul>
            </div>
        );
    }
}

class TestSelect extends Component{
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        console.log('render')
        return <Select value={1} defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
            <Option key={1} value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
    </Select>
    }
}
const store = new Store();

function initOperationCheck() {
    var moving = true;
    var count = 0;
    var timer = window.setInterval(function() {
        if (moving) {
            count = 0;
            moving = false;
        } else {
            console.log(count);
            if(++count > 20) {
                window.clearInterval(timer);
                logout();
            }
        }
    },500);
    window.addEventListener('mousemove', function() {
        moving = true;
    }, true);
    function logout() {
        sessionStorage.clear();
        message.error('logout');
        location.href = '/login.html';
    }
};
initOperationCheck();
// window.checkOperate = {
//     lastTime: new Data().getTime(),
//     minuteCount: 0, 
// }
// window.addEventListener('mousemove', function() {
//     window.checkOperate.minuteCount = 0;
// }, true);
// window.setInterval(function() {
//     window.checkOperate.minuteCount++;
//     if(window.minuteCount)
// }, 3000)




render((<TodoBox store={store}></TodoBox>) ,rootEl);

// render(<TestSelect></TestSelect>, rootEl)