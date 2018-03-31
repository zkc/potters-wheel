import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'

import Card from './Card'
import CardPlaceholder from './CardPlaceholder'
import types from '../types'
import { moveCardToEmptyList } from '../modules/lists'

const dropSpec = {
  hover(props, monitor) {
    if (props.cards.length === 0) {
      props.moveCardToEmptyList({ dragItemId: monitor.getItem().id, listId: props.id  })
    }
  }
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropSource: connect.dropTarget(),
    isOver: monitor.isOver({ shalow: true }), 
    item: monitor.getItem()
  }
}


const List = (props) => {
  const cards = props.cards.map(c => <Card {...c} current_list={props.id} key={c.id+'card'}/>)
  // if (props.isOver) {
  //   console.log(props.item)
      /// want a placeholder when moving card to bottom of a different list. otherwise, no.
  //   cards.push(<CardPlaceholder />)
  // }
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

export default connect(null, { moveCardToEmptyList })(DnDList)

