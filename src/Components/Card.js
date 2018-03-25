import React from 'react'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'

import types from '../types'
import { moveCard } from '../modules/lists'


const dragSpec = {
  beginDrag(props, monitor, component) {
    return {
      id: props.id
    }
  }, 

  // isDragging(props, monitor) {
  //   //  THIS is what's plugged into the collect .isDragging functions
  //   props.id === monitor.getItem().id
  // }

}

const dropSpec = {
  hover(props, monitor) {
    const dragItem = monitor.getItem()
    if (dragItem.id !== props.id) {
      props.moveCard({ dragItemId: dragItem.id, hoverItemId: props.id })
    }
  }
}

const dragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(), 
    isDragging: monitor.isDragging()
  }
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropSource: connect.dropTarget()
  }
}


const Card = (props) => {
  return  props.connectDropSource(
    props.connectDragSource (
      <div className="card" id={props.id} style={{ background: props.isDragging && 'blue' }}>
        <div className="edit" id={props.id}>E</div>
        {props.title}
        {props.isDragging && 'DRAGGING  '}
      </div>
    )
  )  
}

const DnDCard = DropTarget(types.CARD, dropSpec, dropCollect)(DragSource(types.CARD, dragSpec, dragCollect)(Card))

export default connect(null, { moveCard })(DnDCard)