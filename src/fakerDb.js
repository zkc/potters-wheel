export const flat_data = {
  lists: {
    10: {
      id: 10,
      title: 'Simple data for now', 
      card_id_map: [45, 46, 47]
    },
    11: {
      id: 11,
      title: 'Same cards, NEW LIST!', 
      card_id_map: [47, 45]
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
    }
  }, 
  list_id_map: [10, 11]
}



export const list_id_map = [10, 11]