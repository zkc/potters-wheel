import React, { Component } from 'react'


class CardEditor extends Component {
  constructor(props) {
    super(props)
    // props: cardId, title, content

    this.state = {
      body: props.body || '', // setting inital values
      title: props.title || ''
    }
  }

  handleChange() {

  }

  componentWillUnmount() {
    this.props.updateCard({card: { ...this.state, id: this.props.card_id }})

    console.log(this.props.card_id, this.state)
  }

  // try contenteditable in place of inputs?v--- https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
  render() {
    return (
      <div className="card-editor">
        <textarea 
          className="title-input" 
          value={this.state.title}  
          onChange={e => this.setState({ title: e.target.value })}
        />
        <textarea 
          className="content-input" 
          value={this.state.body} 
          onChange={e => this.setState({ body: e.target.value })}
        />
      </div>
    )
  }
}


export default CardEditor
