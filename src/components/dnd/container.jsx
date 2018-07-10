import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DnDItem } from './item';

@DragDropContext(HTML5Backend)
export default class DndContainer extends Component {
  state = {
  }
  findItemIndex = (id) => {
    return this.props.items.findIndex(item => item.id === id);
  }
  handleColChange = (id) => (newCol) => {
    const items = this.props.items;
    const index = this.findItemIndex(id);
    items[index].col = newCol;
    this.props.onChange(items);
  }
  handleOrderChange = (targetIndex, sourceId) => {
    const items = this.props.items;
    const sourceIndex = this.findItemIndex(sourceId);
    const item = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, item[0]);
    this.props.onChange(items);
  }
  render() {
    return <div>
      {
        this.props.items.map((item, index) => (
          <DnDItem
            isOtherDragging={this.state.isOneDragging}
            onDragChange={(isOneDragging) => {this.setState({ isOneDragging })}}
            moveCard={this.handleOrderChange}
            onChange={this.handleColChange(item.id)}
            col={item.col}
            id={item.id}
            index={index}
            key={item.key}
          >
            {
              item.ele
            }
          </DnDItem>
        ))
      }
    </div>;
  }
}