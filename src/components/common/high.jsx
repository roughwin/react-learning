import React, { Component, PropTypes } from 'react';
import { Input, Select } from 'antd';
import _ from 'lodash';

// import PhoneInput from './phone_input';

function High(Target) {
    console.log('high', Target)
    return class extends Component {
        render() {
          console.log('render in high')
          return <Target {...this.props}/>
        }
      }
    }

export default High;
