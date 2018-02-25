import React from 'react';
import ReactDOM from 'react-dom';

import './Styles/index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';


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
        return 'List title in a get?'
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

const flat_data_bigger_demo = {
  10: {
    id: 10,
    type: 'list',
    content: {
      title: 'Put all info in an object',
      card_ids: [45, 46]
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
      title: 'Card aaa in that object',
      body: 'This will be md' // ? card could contain another list?
    }, 
    meta: {
      created_at: '', // also getter from history?
      history: [{}] // log either a edit content or move card. [separate keys?]
    }
  },
  46: {
    id: 46,
    type: 'card', 
    current_list: 10, // getter, return most recent from history? 
    content: {
      title: 'Card bbb in that object',
      body: 'This will be md' // ? card could contain another list?
    }, 
    meta: {
      created_at: '', // also getter from history?
      history: [{}] // log either a edit content or move card. [separate keys?]
    }
  },
}

const flat_data = {
  lists: {
    10: {
      id: 10,
      title: 'Simple data for now', 
      card_id_map: [45, 46, 47]
    },
    11: {
      id: 10,
      title: 'Same cards, NEW LIST!', 
      card_id_map: [47, 45]
    }
  }, 
  cards: {
    45: {
      id: 45,
      current_list_id: 10,
      title: 'Put card edit on double click?', 
      body: 'make this into Markdown'
    }, 
    46: {
      id: 46, 
      current_list: 10,
      title: 'Here\'s a great card', 
      body: 'Need to edit this one'
    }, 
    47: {
      id: 47, 
      current_list: 10,  
      title: 'Will three cards work?',
      body: 'Let\'s find out'
    }
  }
}



const list_id_map = [10, 11]

const gen_data_lib = {
  all_cards: flat_data.cards,
  lists: list_id_map.map(listId => ({ id:listId, title: flat_data.lists[listId].title, cards: flat_data.lists[listId].card_id_map.map(c => ({ ...flat_data.cards[c] })) }))
}

ReactDOM.render(<App data={gen_data_lib}/>, document.getElementById('root'));
registerServiceWorker();
