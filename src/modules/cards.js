import { flat_data } from '../fakerDb'

export const UPDATE_CARD = 'card/UPDATE_CARD'
export const NEW_CARD = 'card/NEW_CARD' 

const initialState = Object.assign({}, flat_data.cards)

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_CARD:
      return {
        ...state, 
        [action.card.id]: action.card
      }
    case NEW_CARD: {
      return {
        ...state, 
        [action.card.id]: action.card
      }
    }
      
    default:
      return state
  }
}

const genId = (() => {
  let id = 100
  return () => id++
})()

export const updateCard = ({ card }) => ({
  type: UPDATE_CARD, 
  card
}) 

export const addCard = () => {
  return {
    type: NEW_CARD,
    card: {
      id: genId(),
      title: 'New Card', 
      body: 'Blank'
    }
    
  }
}