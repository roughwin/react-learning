import React, { Component } from 'react';
// import {} from 'antd';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const cardSource = {
  beginDrag(props) {
    console.log(props);
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index,
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  },
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;
    if (overId === this.lastOverId && draggedId === this.lastDraggedId) return;
    this.lastDraggedId = draggedId;
    this.lastOverId = overId;
    // if (draggedId !== overId) {
    //   const { index: overIndex } = props.findCard(overId);
    //   props.moveCard(draggedId, overIndex);
    // }
  },
};

// @DropTarget('DndGrid', cardTarget, connect => ({
//   connectDropTarget: connect.dropTarget(),
// }))
@DragSource('DndGrid', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class DndItem extends Component {
  render() {
    const { connectDropTarget, connectDragSource, isDragging } = this.props;
    console.log(isDragging)
    return connectDragSource(<div>
      You Can Drop Here.
    </div>)
  }
}