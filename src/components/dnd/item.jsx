import React, { Component } from 'react';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { height } from 'window-size';
import { relative } from 'path';

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
export default class DnDItem extends Component {
  state = {
    dragable: false,
  }
  render() {
    const { connectDropTarget, connectDragSource, isDragging } = this.props;
    const dropTarget = connectDropTarget(<div
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: 'relative',
      }}
    >
      {this.props.children}
      <div
        onMouseOver={() => {
          this.setState({
            dragable: true,
          })
        }}
        onMouseLeave={() => {
          this.setState({
            dragable: false,
          })
        }}
        style={{
          position: 'absolute',
          right: '50%',
          top: '50%',
          transform: 'translate(50%, -50%)',
          height: '2em',
          width: '2em',
          zIndex: 999,
          cursor: this.state.dragable ? 'move' : 'none',
          backgroundColor: 'black'
        }}
      >
        
      </div>
    </div>)
    if (!this.state.dragable) return dropTarget;
    return connectDragSource(dropTarget);
  }
}

export { DnDItem }