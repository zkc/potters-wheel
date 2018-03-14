import { flat_data } from '../fakerDb'

export const  UPDATE_CARD = 'card/UPDATE_CARD'
export const  CHANGE_POS = 'card/CHANGE_POS'
// export const MOVE_CARD = 'MOVE_CARD'



const initialState = Object.assign({}, flat_data.cards) // why not? 

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_CARD:
      return {
        ...state, 
        [action.card.id]: action.card
      }
      
    default:
      return state
  }
}


export const updateCard = ({ card }) => ({
  type: UPDATE_CARD, 
  card
}) 

// export const changeCardPos = ({ card_id, new_list, new_array_index }) => ({
//   type: MOVE_CARD, 
//   card_id, new_list, new_array_index
// })