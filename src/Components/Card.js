import React from 'react'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'

import types from '../types'
import { moveCard } from '../modules/lists'


const dragSpec = {
  beginDrag(props, monitor, component) {
    return {
      id: props.id,
      array_index: props.array_index, 
      list_id: props.current_list
    }
  }, 
  // endDrag(props, monitor, component) {
  //   if (monitor.didDrop()) {
  //     const dropOnCard = monitor.getDropResult()

  //     const to = {
  //       id: dropOnCard.list_id, 
  //       array_index: dropOnCard.array_index
  //     }
  //     const from = {
  //       id: props.current_list,
  //       array_index: props.array_index        
  //     }
  //     const to_action = { to, from, card_id: props.id}
  
  //     props.moveCard(to_action)
  //   }
  // }
}

const dropSpec = {
  drop(props, monitor, component) {
    // console.log(monitor.getDropResult()) why is this null?
    return {
      id: props.id,
      array_index: props.array_index, 
      list_id: props.current_list
    }
  }, 
  hover(props, monitor, component) {

    // console.log(props.title)
    // console.log(monitor.getInitialClientOffset())
    // console.log(monitor.getInitialSourceClientOffset())
    // console.log(monitor.getClientOffset())
    // console.log(monitor.getDifferenceFromInitialOffset())
    // console.log(monitor.getSourceClientOffset())


    /// this only works one direction, and onliy in the same list
    const drag_item = monitor.getItem()
    if (drag_item.id !== props.id) {
      // console.log(monitor.getItem(), props.id)
      const to = {
        id: drag_item.list_id, 
        array_index: drag_item.array_index
      }
      const from = {
        id: props.current_list,
        array_index: props.array_index        
      }
      const to_action = { to, from, card_id: props.id}
  
      // console.log(to_action)
      props.moveCard(to_action)

    }

    /// if it goes 
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
  /// check props for hovering, then put filler square above/below?
  return  props.connectDropSource(
    props.connectDragSource (
      props.isDragging ?
      <div className="card-dragging-filler" />
      :
      <div className="card" id={props.id} >
        <div className="edit" id={props.id}>E</div>
        {props.title}
        {props.isDragging && 'DRAGGING  '}
      </div>
    )
  )  
}

const DnDCard = DropTarget(types.CARD, dropSpec, dropCollect)(DragSource(types.CARD, dragSpec, dragCollect)(Card))

export default connect(null, { moveCard })(DnDCard)