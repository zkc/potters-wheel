import React from 'react'

import Card from './Card'


const List = (props) => {
  const cards = props.cards.map(c => <Card {...c} key={c.id}/>)
  return (
    <div className="list" id={props.id}>
      <div className="list-title">{props.title}</div>
      <div className="card-space">
        {cards}
      </div>
    </div>
  )
}

export default List
