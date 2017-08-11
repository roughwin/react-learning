import React, { Component, PropTypes } from 'react';
import { Input, Select } from 'antd';
import _ from 'lodash';

// import './phone_input.less';

const InputGroup = Input.Group;
const Option = Select.Option;

class PhoneInput extends Component {
  render() {
    return <InputGroup compact>
      <Select
        defaultValue="helo"
        dropdownMatchSelectWidth={false}
        dropdownClassName="select-popup"
        dropdownStyle={{
          width: '200px',
        }}
      >
        <Option value='helo'>helo0</Option>
        <Option value='haha' title="title">haha123</Option>
      </Select>
      <Input
        style={{width: '70%'}}
      />
    </InputGroup>;
  }
}

export default PhoneInput;
