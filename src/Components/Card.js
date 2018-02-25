import React from 'react'


const Card = (props) => {
  return (
    <div className="card" id={props.id}>
      {props.content.title}
    </div>
  )
}


export default Card
