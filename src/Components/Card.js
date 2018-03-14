import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'

import types from '../types'
import { moveCard } from '../modules/lists'


const dragSpec = {
  beginDrag(props, monitor, component) {
    // console.log(component)
    return {
      id: props.id,
      /// Sooo the array_index getter does update as props change, BUT the current_list does not
      array_index() { console.log('get ar i', component.props.array_index ); return component.props.array_index },  // this needs to be LOOKUP 
      list_id() { console.log('get list id', component.props.current_list ); return component.props.current_list }     // same here
    }
  }, 
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  }
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
  // drop(props, monitor, component) {
  //   // console.log(monitor.getDropResult()) why is this null?
  //   return {
  //     id: props.id,
  //     array_index: props.array_index, 
  //     list_id: props.current_list
  //   }
  // }, 
  hover(props, monitor, component) {

    // console.log(props.title)
    // console.log(monitor.getInitialClientOffset())
    // console.log(monitor.getInitialSourceClientOffset())
    // console.log(monitor.getClientOffset())
    // console.log(monitor.getDifferenceFromInitialOffset())
    // console.log(monitor.getSourceClientOffset())


    const drag_item = monitor.getItem()
    /// need to swtich to moving drag item TOO the new spot, not away
    if (drag_item.id !== props.id) {
      const from = {
        card_id: drag_item.id,
        id: drag_item.list_id(), /// lookup from compo
        array_index: drag_item.array_index() // lookup from compo
      }
      const to = {
        id: props.current_list,
        array_index: props.array_index,
        // card_id: props.id   
      }
      const to_action = { to, from, card_id: drag_item.id, }
      
      // console.log(to_action)
      // console.log(props, drag_item, to_action)
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

class Card extends Component {
  render() {
    const { props } = this
    props.isDragging && console.log('card drag render', props.current_list)
    return  props.connectDropSource(
      props.connectDragSource (
        props.isDragging ?
        <div className="card-dragging-filler" />
        :
        <div className="card" id={props.id} >
          <div className="edit" id={props.id}>E</div>
          {props.current_list}{'-list '}
          {props.title}
          {props.id}
          {props.isDragging && 'DRAGGING  '}
        </div>
      )
    )  
  }
}

// const Card = (props) => {
//   /// check props for hovering, then put filler square above/below?
// }

const mapStateToProps = (state, props) => ({
  the_card: state.cards[props.id]
  
})

const DnDCard = DropTarget(types.CARD, dropSpec, dropCollect)(DragSource(types.CARD, dragSpec, dragCollect)(Card))

export default connect(mapStateToProps, { moveCard })(DnDCard)