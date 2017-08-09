import React, { Component, PropTypes } from 'react';
import { Input } from 'antd';
import _ from 'lodash';

const InputGroup = Input.Group;

class PhoneInput extends Component {
  render() {
    return <InputGroup>
      <Input></Input>
    </InputGroup>;
  }
}
