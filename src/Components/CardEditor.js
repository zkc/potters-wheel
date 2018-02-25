import React, { Component } from 'react'


class CardEditor extends Component {
  constructor(props) {
    super(props)
    // props: cardId, title, content

    this.state = {
      content_input: props.body || '', // setting inital values
      title_input: props.title || ''
    }
  }

  handleChange() {

  }

  // try contenteditable in place of inputs?v--- https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
  render() {
    return (
      <div className="card-editor">
        <textarea 
          className="title-input" 
          value={this.state.title_input}  
          onChange={e => this.setState({ title_input: e.target.value })}
        />
        <textarea 
          className="content-input" 
          value={this.state.content_input} 
          onChange={e => this.setState({ content_input: e.target.value })}
        />
      </div>
    )
  }
}


export default CardEditor
