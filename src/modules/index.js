import { combineReducers } from 'redux'
import cards from './cards'
import lists from './lists'
import views from './views'

export default combineReducers({
  views,
  lists,
  cards
})