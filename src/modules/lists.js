import { flat_data } from '../fakerDb'

import { NEW_CARD } from './cards'
export const UPDATE_LIST = 'list/UPDATE_LIST'
export const NEW_LIST = 'list/NEW_LIST'
export const MOVE_CARD = 'list/MOVE_CARD'
export const MOVE_CARD_TO_EMPTY_LIST = 'list/MOVE_CARD_TO_EMPTY_LIST'

const initialState = Object.assign({}, flat_data.lists)

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST: {
      return {
        ...state, 
        [action.list.id]: { ...state[action.list.id], title: action.list.title }
      }
    }

    case NEW_LIST: {
      return {
        ...state, 
        [action.list.id]: action.list
      }
    }

    case NEW_CARD: {
      /// static for now, add listId later
      return {
        ...state, 
        [10]: { ...state[10], card_id_map: [...state[10].card_id_map, action.card.id] }
      }
    }

    case MOVE_CARD_TO_EMPTY_LIST: {
      const { dragItemId, listId } = action

      let dragListIndex, dragListSource

      for (const list in state) {
        const dragItemIndexCheck = state[list].card_id_map.indexOf(dragItemId) 
        if (dragItemIndexCheck > -1) {
          dragListIndex = dragItemIndexCheck
          dragListSource = list
        }
      }

      const source_card_id_map = state[dragListSource].card_id_map.slice()
      source_card_id_map.splice(dragListIndex, 1)

      const hoverListSource = state[listId].id
      
      return {
        ...state, 
        [dragListSource]: { ...state[dragListSource], card_id_map: source_card_id_map },
        [hoverListSource]: { ...state[hoverListSource], card_id_map: [dragItemId] }
      }
    }
      
    case MOVE_CARD: {
      const { dragItemId, hoverItemId } = action

      if (dragItemId === hoverItemId) {
        // just in case
        console.log(action, 'hey dude don\'t call me now bro')
        return state
      }

      let dragListSource, dragListIndex, hoverListSource, hoverListIndex

      for (const list in state) {
        // hey future me, why not make this lookup better?
        const dragItemIndexCheck = state[list].card_id_map.indexOf(dragItemId) 
        const hoverItemIndexCheck = state[list].card_id_map.indexOf(hoverItemId) 

        if (dragItemIndexCheck > -1) {
          dragListIndex = dragItemIndexCheck
          dragListSource = list
        }

        if (hoverItemIndexCheck > -1) {
          hoverListIndex = hoverItemIndexCheck
          hoverListSource = list
        }

      }

      if (dragListSource === hoverListSource) {
        const card_id_map = state[dragListSource].card_id_map.slice()
        card_id_map.splice(dragListIndex, 1)
        card_id_map.splice(hoverListIndex, 0, dragItemId)

        return {
          ...state, 
          [dragListSource]: { ...state[dragListSource], card_id_map: card_id_map }
        }

      } else {
        /// splice in dragItemId to hoverListSource at hoverListIndex
        const hover_card_id_map = state[hoverListSource].card_id_map.slice()
        hover_card_id_map.splice(hoverListIndex, 0, dragItemId)
        /// remove dragItemId from dragListSource at dragListIndex index
        const source_card_id_map = state[dragListSource].card_id_map.slice()
        source_card_id_map.splice(dragListIndex, 1)

        return {
          ...state, 
          [dragListSource]: { ...state[dragListSource], card_id_map: source_card_id_map },
          [hoverListSource]: { ...state[hoverListSource], card_id_map: hover_card_id_map }
        }
      }
    }

    default:
      return state
  }
}


export const addNewList = (list) => {
  return {
    type: NEW_LIST, 
    list
  }
}

export const updateList = (list) => {
  return {
    type: UPDATE_LIST, 
    list
  }
}

export const moveCard = (mover_ids) => ({
  type: MOVE_CARD, 
  ...mover_ids
})

export const moveCardToEmptyList = (details) => ({
  type: MOVE_CARD_TO_EMPTY_LIST,
  ...details
})
