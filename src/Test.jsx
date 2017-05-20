import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Form, Modal, Switch, Table, message } from 'antd';
import moment from 'moment';
import _ from 'lodash';

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

