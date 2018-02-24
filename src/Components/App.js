import React, { Component } from 'react';

import List from './List'
import '../Styles/App.css';

// feel the rhythm, feel the rhyme, trust the array indexes 
const data_lib = {
  details: {}, // stuff worth saving but no always shown on UI
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
      id: 1,
      title: 'Second list, in JSON', 
      cards: [
        {
          id: 9, 
          title: 'Need CRUD! edit JSON is bla', 
          content: 'Make this into markdown'
        }, {
          id: 10, 
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

    }
  }

  render() {
    const lists = data_lib.lists.map(l => <List {...l}/>) 

    return (
      <div className="App">
        <div className="top-bar"></div>
        <div className="list-space">
          {lists}
        </div>
      </div>
    );
  }
}

export default App;
