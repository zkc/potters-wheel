import React, { Component } from 'react';
import autobind from 'auto-bind'

import List from './List'
import CardEditor from './CardEditor'
import '../Styles/App.css';

// feel the rhythm, feel the rhyme, trust the array indexes... maybe
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
        title: '',
        created: 'datetime', 
        edited: ['datetime', 'datetime' ]
      }
    }
  }, 
  lists: [
    {
      id: 1,
      get title() {
        console.log(this)
        return 'title'
      }, 
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

const flat_data = {
  10: {
    id: 10,
    type: 'list',
    content: {
      title: 'Put all in an object',
      card_ids: [45, 46, 47, 48]
    }, 
    meta: {
      created_at: '', 
      edit_log: []
    }
  }, 
  45: {
    id: 45,
    type: 'card', 
    current_list: 10, // getter, return most recent from history? 
    content: {
      title: 'Card in that object',
      body: 'This will be md'
    }, 
    meta: {
      created_at: '', // also getter from history?
      history: [{}] // log either a edit content or move card. [separate keys?]
    }
  }
}

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

  editCard() {
    
  }

  render() {
    const lists = data_lib.lists.map(l => <List {...l} key={l.id}/>) 

    return (
      <div className="App">
        {this.state.edit_card && <CardEditor {...data_lib} />}
        <div className="top-bar" style={{ textAlign: 'center' }}>
          <p>{this.state.selected_card}</p>
          {this.state.selected_card &&
          <div>
            <button onClick={this.moveCard}>Move</button>
            <button onClick={this.editCard}>Edit</button>            
          </div>}
        </div>

        <div className="list-space" id='list-space' onClick={this.handleClick}>
          {lists}
        </div>
      </div>
    );
  }
}


export default App;
