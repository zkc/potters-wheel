import { flat_data } from '../fakerDb'

export const  UPDATE_CARD = 'card/UPDATE_CARD'

const initialState = Object.assign({}, flat_data.cards)

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