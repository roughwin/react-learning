import React, { Component, PropTypes } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import { render } from 'react-dom';
import moment from 'moment';
import _ from 'lodash';
import { Alert, message, Select, Table, Icon, Row, Col, Input } from 'antd';
import 'moment/locale/zh-cn';
import PhoneInput from 'components/common/phone_input';

class Test extends Component {
  constructor() {
    super();
    console.log('constructor');
  }
  render() {
    return (<div>
      hello
      <PhoneInput></PhoneInput>
      <Input></Input>
    </div>);
  }
}

export default Test;
