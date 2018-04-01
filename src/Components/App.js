import React, { Component } from 'react'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend';
// import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

import List from './List'
import CardEditor from './CardEditor'
import { updateCard } from '../modules/cards'
import { addNewList } from '../modules/lists'
import '../Styles/App.css'


// feel the rhythm, feel the rhyme, trust the array indexes... maybe

const mapStateToProps = (state) => ({
  views: state.views, 
  cards: state.cards, 
  lists: state.lists
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected_card: null, /// aka card being dragged
      edit_card: false, 
      current_view: 'base'
    }

    this.listId = 20

    this.handleClick = this.handleClick.bind(this)
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
    const { cards, lists, views } = this.props
    const { current_view } = this.state
    const display_data = {
      all_cards: cards,
      lists: views[current_view].list_id_map.map((listId, i) => ({ 
        id:listId, title: lists[listId].title, 
        array_index: i,
        cards: lists[listId].card_id_map.map((c, i) => ({ ...cards[c], array_index: i })) }))
    }
    return display_data
  }

  addNewList() {
    this.listId++
    this.props.addNewList({
      id: this.listId,
      title: 'New List', 
      card_id_map: []
    })
  }


  render() {
    const display_data = this.generateListDisplay()
    const lists = display_data.lists.map(l => <List {...l} key={l.id}/>) 

    return (
      <div className="App" onClick={this.handleClick}>
        {this.state.edit_card && <CardEditor updateCard={this.props.updateCard} {...display_data.all_cards[this.state.selected_card]} card_id={this.state.selected_card} />}
        <div className="top-bar" style={{ textAlign: 'center' }}>
          <p>{this.state.selected_card}</p>
          <button onClick={() => {this.addNewList()}}>Add List</button>
        </div>

        <div className="list-space" id='list-space' >
          {lists}
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, 
  { updateCard, addNewList }
)(DragDropContext(HTML5Backend)(App))
