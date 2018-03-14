import { flat_data } from '../fakerDb'

export const  UPDATE_LIST = 'list/UPDATE_LIST'
export const MOVE_CARD = 'MOVE_CARD'


const initialState = Object.assign({}, flat_data.lists) // why not? 

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return {
        ...state, 
        [action.list.id]: action.list
      }

    case MOVE_CARD:
      if (action.from.id === action.to.id) {
        
        const list_id = action.to.id
        const list_map = state[list_id].card_id_map.slice()
        const from_card_index = list_map.indexOf(action.card_id)        
        list_map.splice(from_card_index, 1)        
        list_map.splice(action.to.array_index, 0, action.card_id)

        return {
          ...state, 
          [list_id]: { ...state[list_id], card_id_map: list_map }
        }

      } else {
        const from_list_map = state[action.from.id].card_id_map.slice() // lookup index!
        const to_list_map = state[action.to.id].card_id_map.slice()        
        const from_card_index = from_list_map.indexOf(action.card_id)
        console.log(from_card_index, from_list_map, action.to.id, action.from.id)
        if (from_card_index > -1) {
          from_list_map.splice(from_card_index, 1)
          to_list_map.splice(action.to.array_index, 0, action.card_id)
        }

  
        return {
          ...state,
          [action.from.id]: { ...state[action.from.id], card_id_map: from_list_map }, 
          [action.to.id]: { ...state[action.to.id], card_id_map: to_list_map }
        }
      }

      
    default:
      return state
  }
}


export const updateList = ({ list }) => ({
  type: UPDATE_LIST, 
  list
}) 

export const moveCard = ({ to, from, card_id }) => ({
  // to/from: { id~list~, array_index }
  type: MOVE_CARD, 
  to, from, card_id
})

