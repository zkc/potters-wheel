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
  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      const dropOnCard = monitor.getDropResult()

      const to = {
        id: dropOnCard.list_id, 
        array_index: dropOnCard.array_index
      }
      const from = {
        id: props.current_list,
        array_index: props.array_index        
      }
      const to_action = { to, from, card_id: props.id}
  
      props.moveCard(to_action)
    }
  }
}

const dropSpec = {
  drop(props, monitor, component) {
    // console.log(monitor.getDropResult()) why is this null?
    return {
      id: props.id,
      array_index: props.array_index, 
      list_id: props.current_list
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
      <div className="card" id={props.id} style={{ display: props.isDragging && 'none' }}>
        <div className="edit" id={props.id}>E</div>
        {props.title}
        {props.isDragging && 'DRAGGING  '}
      </div>
    )
  )  
}

const DnDCard = DropTarget(types.CARD, dropSpec, dropCollect)(DragSource(types.CARD, dragSpec, dragCollect)(Card))

export default connect(null, { moveCard })(DnDCard)