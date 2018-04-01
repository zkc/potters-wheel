import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'

import types from '../types'
import { moveCardToBottomOfList } from '../modules/lists'



const dropSpec = {
  hover(props, monitor) {
    const dragItem = monitor.getItem()
    props.moveCardToBottomOfList({ dragItemId: dragItem.id, listId: props.listId })
  }
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropSource: connect.dropTarget()
  }
}


const ListBottomBuffer = (props) => {
  return  props.connectDropSource(
    <div className="list-bottom-buffer" id={props.id}></div>
  )  
}

const DnDBuffer = DropTarget(types.CARD, dropSpec, dropCollect)(ListBottomBuffer)

export default connect(null, { moveCardToBottomOfList })(DnDBuffer)