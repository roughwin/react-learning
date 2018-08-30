import React, { Component } from 'react';
import { Trigger } from 'rc-trigger';
import { Select } from 'antd';

const { Option } = Select;

export default class SelectPlus extends Component {
  constructor(props) {
    super(props);
    const { children } = props;
    this.state = {
      popOverVisible: false,
      items: this.children2Itmes(children),
      selectValues: []
    };
  }

  children2Itmes = (children) => {
    const kv = {};
    if (!Array.isArray(children)) {
      children = [children]
    }
    const items = children.filter(c => c).map(c => {
      const item = { key: c.key, value: c.props && c.props.value, label: c.props && c.props.children };
      if (item.value !== undefined) {
        kv[item.value] = item;
      }
      return item;
    });
    this.itemsKv = kv;
    return items;
  }

  /**
   * 如果value在当前menuList内，则返回value，否则返回label
   * menuListItems: 当前列表渲染出来的options
   * selectValues: 当前选中项的values
   */
  getShowValues = (selectValues, menuListItems) => {
    const kv = {};
    menuListItems.forEach(i => {
      if (i.value) {
        kv[i.value] = i;
      }
    });
    return selectValues.map(v => {
      if (menuListItems[v]) {
        return v;
      } else {
        const item = this.itemsKv[v];
        if (item) {
          return item.label;
        }
      }
      return v;
    });
  }
  componentWillReceiveProps(newPorps) {
    let { children } = newPorps;
    this.setState({
      items: this.children2Itmes(children),
    });
  }

  handleSelect = (newV) => {
    const { selectValues } = this.state;
    this.setState({
      selectValues: [...selectValues, newV],
    })
  }

  handleDeselect = (rmV) => {
    const { selectValues } = this.state;
    const index = selectValues.findIndex(ele => ele === rmV);
    if (index < 0) {
      throw new Error('Cannot find deselect item.');
    }
    selectValues.splice(index, 1);
    this.setState({ selectValues });
  }

  render() {
    const { items, selectValues } = this.state;

    return <Select
        {...this.props}
        value={this.getShowValues(selectValues, items)}
        onSelect={this.handleSelect}
        onDeselect={this.handleDeselect}
        onChange={(v) => {
          console.log('on change', v)
        }}
        onPopupScroll={}
        maxTagCount={3}
        mode="multiple"
      >
        {
          items.map(item => <Option key={item.key} value={item.value}>{item.label}</Option>)
        }
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