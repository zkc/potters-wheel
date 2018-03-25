export const flat_data = {
  lists: {
    10: {
      id: 10,
      title: 'Simple data for now', 
      card_id_map: [45, 46, 47]
    },
    11: {
      id: 11,
      title: 'What\'s next!', 
      card_id_map: [88, 89, 90, 91]
    }
  }, 
  cards: {
    45: {
      id: 45,
      // current_list: 10,
      title: 'Put card edit on double click?', 
      body: 'make this into Markdown'
    }, 
    46: {
      id: 46, 
      // current_list: 10,
      title: 'Here\'s a great card', 
      body: 'Need to edit this one'
    }, 
    47: {
      id: 47, 
      // current_list: 10,  
      title: 'Will three cards work?',
      body: 'Let\'s find out'
    }, 
    88: {
      id: 88, 
      title: 'Put onto Github',
      body: 'whoo'
    },
    89: {
      id: 89,
      title: 'List as drop target',
      body: 'want to show gap while dragging'
    }, 
    90: {
      id: 90,
      title: 'Add new cards and Lists',
      body: 'Also add new styles for cards/list. Lists with limits. cards with different sizes. List with adjustable gaps on either side'
    }, 
    91 : {
      id: 91, 
      title: 'List reorder and hide', 
      body: ''
    }
  }, 
  views: {
    base: {
      list_id_map: [10, 11]
    }
  }
}



export const list_id_map = [10, 11]