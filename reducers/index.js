import { combineReducers } from 'redux'
import PlaceholderReducer from './PlaceholderReducer'
import UserReducer from './UserReducer'

export default combineReducers({
  placeholderState: PlaceholderReducer,
  UserReducer: UserReducer,
})