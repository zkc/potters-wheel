import { combineReducers } from 'redux'
import data from './data'
import cards from './cards'
import lists from './lists'


export default combineReducers({
  data,
  lists,
  cards

})