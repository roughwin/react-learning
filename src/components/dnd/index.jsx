import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DndContainer from './container';


const colors = ['red', 'yellow', 'green', 'azure', 'orchid', 'gray'];
export default class DndTest extends Component {
  state = {
    items: [1, 2, 3, 4, 5, 6].map(id => ({
      id,
      key: id,
      col: 8,
      ele: <div
        style={{
          backgroundColor: colors[id - 1],
          width: '8em',
          height: '4em',
          margin: '0.5em 0'
        }}
      >
        {id}
      </div>
    })),
  }
  render() {
    return <DndContainer
      items={this.state.items}
      onChange={(items) => this.setState({ items })}
    />
  }
}