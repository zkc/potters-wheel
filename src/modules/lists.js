import { flat_data } from '../fakerDb'

export const  UPDATE_LIST = 'list/UPDATE_LIST'
export const MOVE_CARD = 'list/MOVE_CARD'

const initialState = Object.assign({}, flat_data.lists) // why not? 

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return {
        ...state, 
        [action.list.id]: action.list
      }
    case MOVE_CARD:
      const from_list_map = state[action.from.id].card_id_map.slice()
      from_list_map.splice(from_list_map.indexOf(action.card_id), 1)

      const to_list_map = state[action.to.id].card_id_map.slice()
      console.log('to list map', to_list_map)
      to_list_map.splice(action.to.array_index, 0, action.card_id)
      console.log('to list map post slice', to_list_map)


      return {
        ...state,
        [action.from.id]: { ...state[action.from.id], card_id_map: from_list_map }, 
        [action.to.id]: { ...state[action.to.id], card_id_map: to_list_map }
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
  // to/from: { id, array_index }
  type: MOVE_CARD, 
  from, to, card_id
})

