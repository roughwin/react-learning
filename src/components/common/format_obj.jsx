import React, { Component } from 'react';
import { Form } from 'antd';
const { Item: FormItem } = Form;
class FormatObj extends Component {
  render() {
    const { obj, ruleMaps } = this.props;
    return <div>
      {
        Object.keys(obj).map(key => (<FormItem label={(ruleMaps[key] || {}).name || ''}>{obj[key]}</FormItem>))
      }
    </div>
  }
}

export default class FormatObjTest extends Component {
  render() {
    return <div></div>
  }
}