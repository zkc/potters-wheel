import React, { Component } from 'react';

import List from './List'
import CardEditor from './CardEditor'
import '../Styles/App.css';

// feel the rhythm, feel the rhyme, trust the array indexes 
const data_lib = {
  details: {// stuff worth saving but not always shown on UI
    cards: {
      9: {
        created: 'datetime', 
        edited: [{to: '', from:'', at:'datetime'}, ]
      }
    },
    lists: {
      1: {
        created: 'datetime', 
        edited: ['datetime', 'datetime' ]
      }
    }
  }, 
  lists: [
    {
      id: 1,
      title: 'First List, in JSON', 
      cards: [
        {
          id: 9, 
          title: 'Get JSON input working', 
          content: 'Make this into markdown'
        }, {
          id: 10, 
          title: 'Iterate to make cards and lists', 
          content: 'Make this into markdown'
        }
      ]
    }, {
      id: 2,
      title: 'Second list, in JSON', 
      cards: [
        {
          id: 11, 
          title: 'Need CRUD! edit JSON is bla', 
          content: 'Make this into markdown'
        }, {
          id: 112, 
          title: 'Add more lists', 
          content: 'Make this into markdown'
        }
      ]
    }
  ]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_card: null /// aka card being dragged
    }

    this.handleClick = this.handleClick.bind(this)
    this.moveCard = this.moveCard.bind(this)
  }

  handleClick(e) {
    const eClass = e.target.className
    const eId = e.target.id
    switch (eClass) {
      case 'card':
        this.setState({selected_card: eId})
        break;
    
      default:
        break;
    }
  }

  moveCard() {
    /// update store
    console.log('move card', this.state.selected_card)
  }

  render() {
    const lists = data_lib.lists.map(l => <List {...l} key={l.id}/>) 

    return (
      <div className="App">
        <div className="top-bar" style={{ textAlign: 'center' }}>
        <CardEditor />
          {this.state.selected_card}
          {
            this.state.selected_card &&
            <button onClick={this.moveCard}>Move</button>
          }
        </div>
        <div className="list-space" id='list-space' onClick={this.handleClick}>
          {lists}
        </div>
      </div>
    );
  }
}


export default App;
