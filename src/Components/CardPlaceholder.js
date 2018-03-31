import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'

import types from '../types'
import { moveCard } from '../modules/lists'



const dropSpec = {
  hover(props, monitor) {
    console.log('over placeholder')
    // const dragItem = monitor.getItem()
    // if (dragItem.id !== props.id) {
    //   props.moveCard({ dragItemId: dragItem.id, hoverItemId: props.id })
    // }
  }
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropSource: connect.dropTarget()
  }
}


const Card = (props) => {
  return  props.connectDropSource(
    <div className="card" id={props.id} style={{ background: 'grey' }}>
      {/* <div className="edit" id={props.id}>E</div> */}
      {/* {props.title}
      {props.isDragging && 'DRAGGING  '} */}
    </div>
  
  )  
}

const DnDCard = DropTarget(types.CARD, dropSpec, dropCollect)(Card)

export default connect(null, { moveCard })(DnDCard)