import React, { Component } from 'react'
import autobind from 'auto-bind'

import List from './List'
import CardEditor from './CardEditor'
import '../Styles/App.css'

// feel the rhythm, feel the rhyme, trust the array indexes... maybe


class App extends Component {
  constructor(props) {
    super(props)
    autobind(this)
    this.state = {
      selected_card: null, /// aka card being dragged
      edit_card: false
    }
  }

  handleClick(e) {
    const eClass = e.target.className
    const eId = e.target.id
    switch (eClass) {
      case 'card':
        this.setState({selected_card: eId, edit_card: true}) // ? move this back to the card? 
        break

      case 'list-space':
      case 'App':
        this.setState({edit_card:false})
        break

      default:
        break
    }
  }

  moveCard() {
    /// update store
    console.log('move card', this.state.selected_card)
  }

  editCard() {
    
  }



  render() {
    const { data } = this.props 
    const lists = data.lists.map(l => <List {...l} key={l.id}/>) 

    return (
      <div className="App" onClick={this.handleClick}>
        {this.state.edit_card && <CardEditor {...data.all_cards[this.state.selected_card]} cardId={this.state.selected_card} />}
        <div className="top-bar" style={{ textAlign: 'center' }}>
          <p>{this.state.selected_card}</p>
          {this.state.selected_card &&
          <div>
            <button onClick={this.moveCard}>Move</button>
            <button onClick={this.editCard}>Edit</button>            
          </div>}
        </div>

        <div className="list-space" id='list-space' >
          {lists}
        </div>
      </div>
    );
  }
}


export default App
