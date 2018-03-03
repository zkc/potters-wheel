import { flat_data } from '../fakerDb'

export const UPDATE_CARD = 'card/UPDATE_CARD'

const initialState = {
  ...flat_data /// Boooooo, separate out reducers for lists and cards?
}

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_CARD:
      return Object.assign({}, state, { cards: { ...state.cards, [action.card.id]: action.card } })
      
    default:
      return state
  }
}


export const updateCard = ({ card }) => ({
  type: UPDATE_CARD, 
  card
}) 
