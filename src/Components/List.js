import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'

import Card from './Card'
import types from '../types'
import { moveCard } from '../modules/lists'

const dropSpec = {
  // hover(props, monitor) {
  // check if card or list
  // }
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropSource: connect.dropTarget()
  }
}


const List = (props) => {
  const cards = props.cards.map(c => <Card {...c} current_list={props.id} key={c.id+'card'}/>)
  return props.connectDropSource(
    <div className="list" id={props.id}>
      <div className="list-title">{props.title}</div>
      <div className="card-space">
        {cards}
      </div>
    </div>
  )
}

const DnDList = DropTarget([types.LIST, types.CARD], dropSpec, dropCollect)(List)

export default connect(null, { moveCard })(DnDList)

