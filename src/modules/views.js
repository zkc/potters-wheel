import { flat_data } from '../fakerDb'

export const  FETCH_VIEW = 'view/FETCH_VIEW'

const initialState = Object.assign({}, flat_data.views)

export default (state=initialState, action) => {
  switch (action.type) {
    case FETCH_VIEW:
      /// update lists in view
      return {
        ...state
      }
      
    default:
      return state
  }
}


// export const updateCard = ({ card }) => ({
//   type: UPDATE_CARD, 
//   card
// }) 