import React, { Component } from 'react';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { height } from 'window-size';
import { relative } from 'path';
import { InputNumber } from 'antd';

const cardSource = {
  beginDrag(props) {
    props.onDragChange(true);
    return {
      id: props.id,
      index: props.index,
    };
  },

  endDrag(props, monitor) {
    props.onDragChange(false);
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
    const { connectDropTarget, connectDragSource, isDragging, isOtherDragging } = this.props;
    const dropTarget = connectDropTarget(<div
      style={{
        opacity: isDragging ? 0 : 1,
        position: 'relative',
        cursor: this.state.dragable ? 'move' : 'default',
      }}
      onMouseEnter={() => {
        if (isOtherDragging) return;
        this.setState({ focus: true, dragable: true });
      }}
      onMouseLeave={() => {
        this.setState({ focus: false, dragable: false });
      }}
    >
      <div
        style={{
          filter: this.state.focus ? 'blur(2px)' : 'none'
        }}
      >
        <div style={{ "pointerEvents": (this.state.focus || isOtherDragging) ? "none" : "auto" }}>
          {this.props.children}
        </div>
      </div>
      {
        (this.state.focus || this.state.inputFocus) &&
        <InputNumber
          size="small"
          min={1}
          max={24}
          precision={0}
          value={this.props.col}
          onChange={this.props.onChange}
          onFocus={() => this.setState({ inputFocus: true })}
          onBlur={() => this.setState({ inputFocus: false })}
          onMouseOver={() => {
            this.setState({
              dragable: false,
            })
          }}
          onMouseLeave={() => {
            this.setState({
              dragable: true,
            })
          }}
          style={{
            position: 'absolute',
            right: '50%',
            top: '50%',
            transform: 'translate(50%, -50%)',
            width: '4em',
            zIndex: 999,
          }}
        />
      }
    </div>)
    if (!this.state.dragable) return dropTarget;
    return connectDragSource(dropTarget);
  }
}

export { DnDItem }