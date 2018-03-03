import React, { Component } from 'react'
import autobind from 'auto-bind'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

import List from './List'
import CardEditor from './CardEditor'
import { updateCard } from '../modules/cards'
import { moveCard } from '../modules/lists'
import '../Styles/App.css'


// feel the rhythm, feel the rhyme, trust the array indexes... maybe

const mapStateToProps = (state) => ({
  data: state.data, 
  cards: state.cards, 
  lists: state.lists
})

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
    const eId = e.target.id*1
    switch (eClass) {
      case 'edit':
        this.setState({ selected_card: eId, edit_card: true }) // ? move this back to the card? 
        break

      case 'card':
        this.setState({ selected_card: eId, edit_card: false })
        break

      case 'card-space':
      case 'list-space':
      case 'App':
        this.setState({ edit_card: false })
        break

      default:
        break
    }
  }


  generateListDisplay() {
    const { list_id_map } = this.props.data
    const { cards, lists } = this.props
    const display_data = {
      all_cards: cards,
      lists: list_id_map.map((listId, i) => ({ 
        id:listId, title: lists[listId].title, 
        array_index: i,
        cards: lists[listId].card_id_map.map((c, i) => ({ ...cards[c], array_index: i })) }))
    }
    return display_data
  }



  render() {
    const display_data = this.generateListDisplay()
    const lists = display_data.lists.map(l => <List {...l} key={l.id}/>) 

    return (
      <div className="App" onClick={this.handleClick}>
        {this.state.edit_card && <CardEditor updateCard={this.props.updateCard} {...display_data.all_cards[this.state.selected_card]} card_id={this.state.selected_card} />}
        <div className="top-bar" style={{ textAlign: 'center' }}>
          <p>{this.state.selected_card}</p>
        </div>

        <div className="list-space" id='list-space' >
          {lists}
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, 
  { updateCard, moveCard }
)(DragDropContext(HTML5Backend)(App))
