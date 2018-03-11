import React from 'react'
import { DropTarget } from 'react-dnd'
import types from '../types'

import Card from './Card'


const dropSpec = {
  hover(props, monitor, component) {
    console.log('overing over', props )
  },
  canDrop() {
    return false
  }
}

const dropCollect = (connect, monitor) => {
  return {
    connetDropSource: connect.dropTarget()
  }
}

const List = (props) => {
  const cards = props.cards.map(c => <Card {...c} current_list={props.id} key={c.id}/>)
  return props.connetDropSource(
    <div className="list" id={props.id}>
      <div className="list-title">{props.title}</div>
      <div className="card-space">
        {cards}
      </div>
    </div>
  )
}


export default DropTarget(types.LIST, dropSpec, dropCollect)(List)
