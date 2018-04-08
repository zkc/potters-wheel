import { flat_data } from '../fakerDb'

import { NEW_LIST } from './lists'
export const FETCH_VIEW = 'view/FETCH_VIEW'
export const MOVE_LIST = 'view/MOVE_LIST' 

const initialState = Object.assign({}, flat_data.views)

export default (state=initialState, action) => {
  switch (action.type) {
    case FETCH_VIEW:
      /// update lists in view
      return {
        ...state
      }
    
    case MOVE_LIST: {
      /// id of moving list, id of list hovered over
      const dragListId = action.dragListId
      const hoverOverId = action.hoverOverId
      const new_list_id_map = state.base.list_id_map.slice()

      new_list_id_map.splice(state.base.list_id_map.indexOf(dragListId), 1)
      new_list_id_map.splice(state.base.list_id_map.indexOf(hoverOverId), 0, dragListId)
      return {
        ...state, 
        base: {
          list_id_map: new_list_id_map
        }
      }
    }

    case NEW_LIST: {
      return {
        ...state, 
        base: {
          list_id_map: [...state.base.list_id_map, action.list.id]
        }
      }
    }
    default:
      return state
  }
}

export const moveList = (fromTo) => {
  return {
    type: MOVE_LIST,
    ...fromTo
  }
}