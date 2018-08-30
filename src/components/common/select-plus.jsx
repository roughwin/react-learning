import React, { Component } from 'react';
import { Select, Button, Spin } from 'antd';

import { filter as sortWords, trans as str2pinyin } from './sortwords';

export default class SelectPlus extends Component {
  constructor(props) {
    super(props);
    const { children } = props;
    const allItems = this.children2Itmes(children);
    this.state = {
      items: allItems,
      filterItems: allItems,
      selectValues: [],
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
    this.itemsPinyinArr = str2pinyin(items.map(i => i.label));
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

  handleSearch = (keyword = '') => {
    this.setState({
      searching: true,
      filterItems: [],
    });
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(() => {
      let filterResult = this.state.items;
      if (keyword) {
        const result = sortWords(this.itemsPinyinArr, keyword);
        filterResult = result.map(([rank, label, index]) => (this.state.items[index]));
      }
      this.setState({
        filterItems: filterResult,
        searching: false,
      });
      this.searchTimer = false;
    }, 300);
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

  handleSelectAll = () => {
    this.setState({
      selectValues: this.state.filterItems.map(i => i.value),
    });
  }

  handleClearAll = () => {
    this.setState({
      selectValues: [],
    });
  }

  handleChange = (v) => {
    if (v && v.length === 0) {
      this.handleClearAll();
    }
  }

  render() {
    const { filterItems, selectValues, searching } = this.state;
    const menuListItems = filterItems.slice(0, 20);
    return <Select
        {...this.props}
        allowClear
        filterOption={false}
        onChange={this.handleChange}
        value={this.getShowValues(selectValues, menuListItems)}
        onSelect={this.handleSelect}
        onDeselect={this.handleDeselect}
        maxTagCount={2}
        onSearch={this.handleSearch}
        mode="multiple"
      >
        <Select.Option key="select__all" value="select__all" disabled>
          <div>
            <Button
              size="small"
              onClick={this.handleSelectAll}
            >选择全部</Button>
            {searching ? <Spin size="small" /> : null}
          </div>
        </Select.Option>
        {
          menuListItems.map(item => <Select.Option key={item.key} value={item.value}>{item.label}</Select.Option>)
        }
      </Select>;
  }
}
