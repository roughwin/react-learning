import React, { Component } from 'react';
// import {} from 'antd';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },

  endDrag(props, monitor) {
  },
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { index: overIndex, id: overId } = props;
    if (overId === this.lastOverId && draggedId === this.lastdraggedId) return;
    this.lastdraggedId = draggedId;
    this.lastOverId = overId;
    if (draggedId !== overId) {
      props.moveCard(overIndex, draggedId);
    }
  },
};

@DropTarget('DndGrid', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource('DndGrid', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class DndItem extends Component {
  render() {
    const colors = ['red', 'yellow', 'green'];
    const { connectDropTarget, connectDragSource, isDragging } = this.props;
    return  connectDropTarget(connectDragSource(<div
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: '100',
        height: '100',
        margin: '1em',
        backgroundColor: colors[this.props.id - 1]
      }}
    >
      {this.props.id}
    </div>))
  }
}