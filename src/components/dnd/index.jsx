import React, { Component } from 'react';
// import {} from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import DndContainer from './container';

import DnDItem from './item';
// import ItemTypes from './item_type';

@DragDropContext(HTML5Backend)
export default class DndTest extends Component {
  render() {
    return <div>
      <DnDItem id="123"></DnDItem>
    </div>
  }
}