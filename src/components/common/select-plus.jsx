import React, { Component } from 'react';
import { Trigger } from 'rc-trigger';
import { Select, Popover } from 'antd';
const classNames = [
  'ant-select-focused',
  'ant-select-open',
  'ant-select',
  'ant-select-enabled',
  'ant-select-selection__rendered',
  'ant-select-arrow'
]
export default class SelectPlus extends Component {
  constructor() {
    super();
    this.state = {
      popOverVisible: false,
      items: [],
    };
  }

  componentWillReceiveProps(newPorps) {
    let { children } = newPorps;
    if (!Array.isArray(children)) {
      children = [children]
    }
    const items = children.filter(c => c).map(c => ({ key: c.key, value: c.props.value, label: c.props.children }))
    this.setState({ items });
  }

  render() {
    return <Select
        {...this.props}
        onFocus={() => {
          this.setState({
            popOverVisible: true,
          });
        }}
        onBlur={() => {
          this.setState({
            popOverVisible: false,
          });
        }}
      >
      </Select>;
  }
}



class SelectMenu extends Component {
  render() {
    const { items, visible } = this.props;
    return <div
      className={['ant-select-dropdown',
      'ant-select-dropdown--single',
      'ant-select-dropdown-placement-bottomLeft',
      !visible && 'ant-select-dropdown-hidden'
      ].join(' ')}
      style={{
        width: 300,
        top: 68,
        left: 0
      }}
    >
      <ul className="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical">
        {
          items.map(i => <li
            key={i.key}
            className="ant-select-dropdown-menu-item"
          >{i.label}</li>)
        }
      </ul>
    </div>
  }
}