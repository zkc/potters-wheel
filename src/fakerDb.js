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
  list_id_map: [10, 11],
  
  cards: {
    45: {
      id: 45,
      pos: {
        current_list: 10,
        array_index: 0
      },
      title: 'Put card edit on double click?', 
      body: 'make this into Markdown'
    }, 
    46: {
      id: 46, 
      pos: {
        current_list: 10,
        array_index: 1
      },
      title: 'Here\'s a great card', 
      body: 'Need to edit this one'
    }, 
    47: {
      id: 47, 
      pos: {
        current_list: 10,
        array_index: 2
      },  
      title: 'Will three cards work?',
      body: 'Let\'s find out'
    }, 
    88: {
      id: 88, 
      pos: {
        current_list: 11,
        array_index: 0
      },
      title: 'Put onto Github',
      body: 'whoo'
    },
    89: {
      id: 89,
      pos: {
        current_list: 11,
        array_index: 1
      },
      title: 'Drop target previewing',
      body: 'want to show gap while dragging'
    }, 
    90: {
      id: 90,
      pos: {
        current_list: 11,
        array_index: 2
      },
      title: 'Add new cards and Lists',
      body: 'Also add new styles for cards/list. Lists with limits. cards with different sizes. List with adjustable gaps on either side'
    }, 
    91 : {
      id: 91,
      pos: {
        current_list: 11,
        array_index: 3
      },
      title: 'List reorder and hide', 
      body: ''
    }
  }
}



export const list_id_map = [10, 11]