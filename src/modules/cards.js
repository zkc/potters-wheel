import { flat_data } from '../fakerDb'

export const  UPDATE_CARD = 'card/UPDATE_CARD'
export const  CHANGE_POS = 'card/CHANGE_POS'


const initialState = Object.assign({}, flat_data.cards) // why not? 

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_CARD:
      return {
        ...state, 
        [action.card.id]: action.card
      }
    case 'MOVE_CARD': 
    console.log('change pos')
      /// CAN USE same action to trigger two reducers!! 
      return {
        ...state, 
        // [action.card_id]: { ...[action.card_id], 
        //   pos: { current_list: action.new_list, array_index: action.new_array_index } }
      }
      
    default:
      return state
  }
}


export const updateCard = ({ card }) => ({
  type: UPDATE_CARD, 
  card
}) 

export const changeCardPos = ({ card_id, new_list, new_array_index }) => ({
  type: CHANGE_POS, 
  card_id, new_list, new_array_index
})