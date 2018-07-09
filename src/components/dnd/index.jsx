import React, { Component } from 'react';
// import {} from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import DndContainer from './container';

import DnDItem from './item';
// import ItemTypes from './item_type';

@DragDropContext(HTML5Backend)
export default class DndTest extends Component {
  state = {
    items: [1, 2, 3],
  }
  findItemIndex = (id) => {
    return this.state.items.findIndex(item => item === id);
  } 
  render() {
    return <div>
      {
        this.state.items.map((id, index) => (<DnDItem
          moveCard={(targetIndex, sourceId) => {
            const items = this.state.items;
            const sourceIndex = this.findItemIndex(sourceId);
            const item = items.splice(sourceIndex, 1);
            items.splice(targetIndex, 0, item[0]);
            this.setState({items});
          }}
          id={id}
          index={index}
          key={id}
        />))
      }
    </div>
  }
}