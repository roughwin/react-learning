import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Form, Modal, Switch, Table, message, Select } from 'antd';
import moment from 'moment';
import _ from 'lodash';

const Option = Select.Option;
@inject('store')
@observer
class TestSelect extends Component{
    constructor(props) {
        super(props);
        console.log('constructor---->', this.props);
        this.helo = this.props.store.helo;
    }
    handleChange = (e) => {
        console.log(`selected ${e.target.value}`, this.props.store);
        this.props.store.helo = e.target.value;
    }
    render() {
        console.log('render')
        return <div
            onClick={this.handleChange}
        >
        <input type="text" value={this.props.store.helo} onChange={this.handleChange}/>
            {this.props.store.helo}
        </div>
        return <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
            <Option key={1} value="jack">Jack</Option>
            <Option key={2} value="lucy">Lucy</Option>
            <Option key={3} value="disabled" disabled>Disabled</Option>
            <Option key={4} value="Yiminghe">yiminghe</Option>
    </Select>
    }
}
export default TestSelect;
