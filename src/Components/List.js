import React from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'

import Card from './Card'
import ListBottomBuffer from './ListBottomBuffer'
import types from '../types'
import { updateList } from '../modules/lists'
import { moveList } from '../modules/views'

const dropSpec = {
  hover(props, monitor) {
    if(monitor.getItemType() === types.LIST) {
      if (props.id !== monitor.getItem().id) {
        props.moveList({
          dragListId: monitor.getItem().id,
          hoverOverId: props.id
        })
      }
    }
  }
}

const dragSpec = {
  beginDrag(props, monitor) {
    const item = { id: props.id }
    return item
  }
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropSource: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }), 
    dragItem: monitor.getItem(),
    dragItemType: monitor.getItemType()
  }
}

const dragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  }
} 


const List = (props) => {
  const cards = props.cards.map(c => <Card {...c} current_list={props.id} key={c.id+'card'}/>)
  /// move to drag over to bottom of list
  cards.push(<ListBottomBuffer listId={props.id} />)

  return props.connectDropSource(
    props.connectDragSource(
      <div className="list" id={props.id}>
        <ContentEditable
          className="list-title"
          html={props.title}
          disabled={false}
          onChange={(e) => props.updateList({ id: props.id, title: e.target.value })}
        />
        <div className="card-space">
          {cards}
        </div>
      </div>
    )
  )
}

const DnDList = DragSource(types.LIST, dragSpec, dragCollect)(DropTarget([types.LIST, types.CARD], dropSpec, dropCollect)(List))

export default connect(null, { updateList, moveList })(DnDList)

