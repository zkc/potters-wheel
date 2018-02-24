import React from 'react'

import Card from './Card'


const List = (props) => {
  const cards = props.cards.map(c => <Card {...c} />)
  return (
    <div className="list">
      <div className="list-title">{props.title}</div>
      <div className="card-space">
        {cards}
      </div>
    </div>
  )
}

export default List
