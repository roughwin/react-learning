import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DnDItem, DropTargetOnly } from './item';


const colors = ['red', 'yellow', 'green'];
@DragDropContext(HTML5Backend)
export default class DndTest extends Component {
  state = {
    items: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }],
  }
  findItemIndex = (id) => {
    return this.state.items.findIndex(item => item.id === id);
  }
  render() {
  const _items = this.state.items.map((item) => ({
    id: item.id,
    key: item.id,
    ele: <div
      key={item.id}
      style={{
        width: 100,
        height: 100,
        margin: '1em',
        backgroundColor: colors[item.id - 1]
      }}
    >
      {item.id}
    </div>,
  }));
  return<div>
      {
    _items.map((_item, index) => (
      <DnDItem
        moveCard={(targetIndex, sourceId) => {
          const items = this.state.items;
          const sourceIndex = this.findItemIndex(sourceId);
          const item = items.splice(sourceIndex, 1);
          items.splice(targetIndex, 0, item[0]);
          this.setState({ items });
        }}
        id={_item.id}
        index={index}
        key={_item.key}
      >
        {
          _item.ele
        }
      </DnDItem>
    ))
  }
    </div>
  }
}