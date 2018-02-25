import {flat_data, list_id_map} from '../fakerDb'

export const UPDATE_CARD = 'card/UPDATE_CARD'

console.log(flat_data)
const initialState = {
  ...flat_data
}

console.log(initialState)
export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_CARD:
    
      return Object.assign({}, state, { cards: { ...state.cards, [action.card.id]: action.card } })
      
      break;
  
    default:
      return state
      break;
  }
}


export const updateCard = ({card, card_id}) => ({
  type: UPDATE_CARD, 
  card
}) 
