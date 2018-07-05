import React, { Component } from 'react';
import {} from 'antd';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import DnDItem from './dnd_item';
// import ItemTypes from './item_type';

@DropTarget('DndGrid', {drop() {}}, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class DndContainer extends Component {
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(<div>
      You Can Drop Here.
    </div>)
  }
}