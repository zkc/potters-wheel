import React from 'react'


const Card = (props) => {
  return (
    <div className="card" id={props.id}>
      {props.title}
    </div>
  )
}


export default Card
