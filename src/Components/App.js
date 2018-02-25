import React, { Component } from 'react'
import autobind from 'auto-bind'
import { connect } from 'react-redux'

import List from './List'
import CardEditor from './CardEditor'
import { updateCard } from '../modules/data'
import '../Styles/App.css'
import { DragDropContextProvider } from 'react-dnd';

// feel the rhythm, feel the rhyme, trust the array indexes... maybe

const mapStateToProps = (state) => ({
  data: state.data
})

class App extends Component {
  constructor(props) {
    super(props)
    console.log(props)
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

  generateListDisplay() {
    const { list_id_map, cards, lists } = this.props.data
    const display_data = {
      all_cards: cards,
      lists: list_id_map.map(listId => ({ id:listId, title: lists[listId].title, cards: lists[listId].card_id_map.map(c => ({ ...cards[c] })) }))
    }
    return display_data
  }



  render() {
    const display_data = this.generateListDisplay()
    const lists = display_data.lists.map(l => <List {...l} key={l.id}/>) 

    return (
      <div className="App" onClick={this.handleClick}>
        {this.state.edit_card && <CardEditor {...display_data.all_cards[this.state.selected_card]} cardId={this.state.selected_card} />}
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


export default connect(mapStateToProps, {updateCard})(App)
