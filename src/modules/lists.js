import { flat_data } from '../fakerDb'

export const  UPDATE_LIST = 'list/UPDATE_LIST'
export const MOVE_CARD = 'list/MOVE_CARD'

const initialState = Object.assign({}, flat_data.lists)

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return {
        ...state, 
        [action.list.id]: action.list
      }

      
    case MOVE_CARD:
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

    default:
      return state
  }
}


export const updateList = ({ list }) => ({
  type: UPDATE_LIST, 
  list
}) 

export const moveCard = (mover_ids) => ({
  type: MOVE_CARD, 
  ...mover_ids
})

