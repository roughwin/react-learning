import React, { Component, PropTypes } from 'react';
import { Input, Select, Tabs } from 'antd';
import _ from 'lodash';

const TabPane = Tabs.TabPane

// import PhoneInput from './phone_input';

const High = (Target) => {
  console.log('high', Target)
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeKey: 'first',
        tabs: [],
      }
    }
    onChange = (e) => {
      console.log('onchante',e);
      this.setState({
        activeKey: e,
      })
    }
    add = (e) => {
      console.log('add')
    }
    remove = (e) => {
      this.props.removeTab();
      console.log(e);
    } 
    onEdit = (targetKey, action) => {
      console.log('onEdit');
      console.log(targetKey, action);
      // console.log(this[e])
    }
    
    render() {
      return <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
        hideAdd
      >
        <TabPane
          tab={"tab"}
          key={'first'}
          closable
        >
          <Target {...this.props}/>
        </TabPane>
        <TabPane
          tab="tab2"
          key="22"
          closable
        >

        </TabPane>
        
        { this.state.tabs.map((ele) => (<TabPane>ele</TabPane>)) }  
      </Tabs>; 
    }
  }
}

export default High;
