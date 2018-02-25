import React from 'react'


const Card = (props) => {
  return (
    <div className="card" id={props.id}>
      <div className="edit" id={props.id}>E</div>
      {props.title}
    </div>
  )
}


export default Card
