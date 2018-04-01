import { flat_data } from '../fakerDb'

import { NEW_LIST } from './lists'
export const  FETCH_VIEW = 'view/FETCH_VIEW'

const initialState = Object.assign({}, flat_data.views)

export default (state=initialState, action) => {
  switch (action.type) {
    case FETCH_VIEW:
      /// update lists in view
      return {
        ...state
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


// export const updateCard = ({ card }) => ({
//   type: UPDATE_CARD, 
//   card
// }) 