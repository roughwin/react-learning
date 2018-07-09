import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DnDItem } from './item';


const colors = ['red', 'yellow', 'green', 'azure', 'orchid', 'gray'];
@DragDropContext(HTML5Backend)
export default class DndTest extends Component {
  state = {
    items: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    }],
  }
  findItemIndex = (id) => {
    return this.state.items.findIndex(item => item.id === id);
  }
  handleColChange = (id) => (newCol) => {
    console.log(id, newCol)
  }
  handleOrderChange = (targetIndex, sourceId) => {
    const items = this.state.items;
    const sourceIndex = this.findItemIndex(sourceId);
    const item = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, item[0]);
    this.setState({ items });
  }
  render() {
    const items = this.state.items.map((item) => ({
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
    return <div>
      {
        items.map((item, index) => (
          <DnDItem
            moveCard={this.handleOrderChange}
            onChange={this.handleColChange(item.id)}
            col={item.id}
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